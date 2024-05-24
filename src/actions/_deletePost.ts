"use server";

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export async function deletePost(postId: number) {
  const { userId } = auth();

  if (!userId) {
    return { failure: "not authenticated" };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return { failure: "post not found" };
  }

  if (post.authorId !== userId) {
    return { failure: "not authorized" };
  }

  await db.post.delete({
    where: {
      id: postId,
    },
  });

  return { success: true };
}
