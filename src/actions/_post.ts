"use server";

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export const createPost = async (formData: FormData) => {
  const { userId } = auth();

  if (!userId) {
    return { error: "User not found." };
  }

  let user;

  try {
    user = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return { error: "User not found." };
    }
  } catch (err) {
    console.error(err);
    return { error: "There was an error finding the user." };
  }

  try {
    const post = await db.post.create({
      data: {
        // Set the properties of the new post here
        authorId: user.id,
        title: formData.get("title")?.toString() || "",
        content: formData.get("content")?.toString() || "",
        file: formData.get("file")?.toString() || "",
      },
    });
    return { success: true, post };
  } catch (err) {
    console.error(err);
    return { error: "There was an error creating the post." };
  }
};
