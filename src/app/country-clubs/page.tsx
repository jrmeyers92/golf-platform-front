import CountryClubCreateModal from "@/components/CountryClubCreateModal";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import db from "@/db/db";
import Image from "next/image";
import Link from "next/link";

const getCountryClubs = async () => {
  try {
    const countryClubs = await db.countryClub.findMany({
      take: 20,
    });
    return countryClubs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const countryClubs = async () => {
  const countryClubs = await getCountryClubs();
  return (
    <div className="">
      <div className="relative">
        <Image
          src="/heroBg.jpg"
          alt="Golf course"
          width={1200}
          height={400}
          className="h-[600px] w-screen object-cover brightness-50"
        />
        <div className="absolute left-1/2 top-1/2 z-10 -my-4 mb-6 flex -translate-x-1/2 flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Country Clubs</h1>
          <CountryClubCreateModal
            buttonText="Create a Country Club"
            buttonClasses="mt-4"
          />
        </div>
      </div>

      <div className="container flex flex-col items-center justify-center">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countryClubs.map((countryClub) => (
            <li key={countryClub.id}>
              <Card>
                <CardHeader className="p-0">
                  <Image
                    src="/heroBg.jpg"
                    alt="Golf course"
                    width={300}
                    height={200}
                  />
                </CardHeader>
                <CardContent className="px-2 pt-2">
                  <h2 className="text-lg font-bold">{countryClub.name}</h2>
                  <p className="italic text-slate-600">
                    {countryClub.city}, {countryClub.state}
                  </p>
                </CardContent>
                <CardFooter className="px-2">
                  <Link
                    href={`/country-clubs/${countryClub.id}`}
                    className={buttonVariants()}
                  >
                    See Details
                  </Link>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default countryClubs;
