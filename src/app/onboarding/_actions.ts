"use server";

import db from "@/db/db";
import { auth } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();

  const newUser = await db.user.create({
    data: {
      // Set the properties of the new user here
      clerkId: formData.get("clerkId")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      birthYear: parseInt(formData.get("birthYear")?.toString() ?? "") || null,
      birthMonth:
        parseInt(formData.get("birthMonth")?.toString() ?? "") || null,
      birthDay: parseInt(formData.get("birthDay")?.toString() ?? "") || null,
      handicap: parseInt(formData.get("handicap")?.toString() ?? "") || null,
      gender: formData.get("gender")?.toString() || "",
    },
  });

  if (!userId) {
    return { message: "No Logged In User" };
  }

  try {
    // const res = await clerkClient.users.updateUser(userId, {
    //   publicMetadata: {
    //     onboardingComplete: true,
    //     applicationName: formData.get("applicationName"),
    //     applicationType: formData.get("applicationType"),
    //   },
    // });
    // return { message: res.publicMetadata };
    return "teset";
  } catch (err) {
    return { error: "There was an error updating the user metadata." };
  }
};
