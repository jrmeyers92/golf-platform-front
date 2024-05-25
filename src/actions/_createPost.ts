"use server";
import db from "@/db/db";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3Config: S3ClientConfig = {
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
};

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

const maxFileSize = 1024 * 1024 * 10; // 10MB

const s3 = new S3Client(s3Config);

export async function createPost(
  type: string,
  size: number,
  checksum: string,
  formData: FormData,
) {
  const { userId } = auth();

  if (!userId) {
    return { failure: "not authenticated" };
  }

  if (!acceptedTypes.includes(type)) {
    return { failure: "invalid file type" };
  }

  if (size > maxFileSize) {
    return { failure: "file too large" };
  }

  const putObjectParams: PutObjectCommandInput = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFileName(),
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: {
      userId,
    },
  };

  const putObjectCommand = new PutObjectCommand(putObjectParams);

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  let user;

  try {
    user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return { failure: "User not found." };
    }
  } catch (err) {
    console.error(err);
    return { failure: "There was an error finding the user." };
  }

  let post;
  try {
    post = await db.post.create({
      data: {
        // Set the properties of the new post here
        authorId: user.id,
        title: formData.get("title")?.toString() || "",
        content: formData.get("content")?.toString() || "",
        file: signedUrl.split("?")[0],
      },
    });
  } catch (err) {
    console.error(err);
    return { failure: "There was an error creating the post." };
  }

  revalidatePath("/");

  return {
    success: {
      url: signedUrl,
    },
  };
}
