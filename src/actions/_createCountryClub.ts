"use server";
import db from "@/db/db";
import { getClerkUserId } from "@/lib/getClerkUserId";

export async function createCountryClub(formData: FormData) {
  let clerkUserId = await getClerkUserId();

  if (typeof clerkUserId === "object" && "failure" in clerkUserId) {
    // getClerkUserId was not successful
    console.error(clerkUserId.failure);
    return { failure: "Not authenticated" };
  }

  let countryClub;
  try {
    countryClub = await db.countryClub.create({
      data: {
        name: formData.get("name") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipCode: Number(formData.get("zipCode")),
        address: formData.get("address") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        authorId: clerkUserId,
      },
    });

    return { success: countryClub };
  } catch (err) {
    console.error(err);
    return { failure: "There was an error creating the country club." };
  }
}
