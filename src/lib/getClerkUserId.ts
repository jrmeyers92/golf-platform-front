import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export async function getClerkUserId(): Promise<number | { failure: string }> {
  const { userId } = auth();

  if (!userId) {
    return { failure: "not authenticated" };
  }

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

    return user.id;
  } catch (err) {
    console.error(err);
    return { failure: "There was an error finding the user." };
  }
}
