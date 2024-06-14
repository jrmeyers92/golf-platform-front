import { Button } from "@/components/ui/button";
import db from "@/db/db";

const getCountryClub = async (id: number) => {
  console.log(id);
  try {
    const countryClub = await db.countryClub.findUnique({
      where: {
        id,
      },
    });
    return countryClub;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default async function countryClubSingle({
  params,
}: {
  params: { id: string };
}) {
  const countryClub = await getCountryClub(parseInt(params.id));

  if (!countryClub) {
    return <div>Country Club not found</div>;
  }

  return (
    <div className="container flex flex-col items-center justify-center">
      <Button className="ml-auto mt-6">Add Post</Button>

      <div>
        <h1 className="mb-2 text-3xl">{countryClub.name}</h1>
        <span className="italic text-slate-800">
          {countryClub.city}, {countryClub.state}
        </span>
      </div>
    </div>
  );
}
