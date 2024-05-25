"use server";

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";
import AWS from "aws-sdk";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: number, file: string) {
  const { userId } = auth();

  if (!userId) {
    return { failure: "Not authenticated" };
  }

  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    console.error(error);
    return { failure: "Error deleting post from database" };
  }

  if (
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_REGION ||
    !process.env.AWS_BUCKET_NAME
  ) {
    return { failure: "AWS configuration variables are not set" };
  }

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const s3 = new AWS.S3();

  const key = file?.split("/")?.pop() || "";

  if (!key) {
    return { failure: "Invalid file path" };
  }

  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
  };

  try {
    await s3.deleteObject(params).promise();
  } catch (error) {
    console.error(error);
    return { failure: "Error deleting file" };
  }

  revalidatePath("/");

  return { success: true };
}
