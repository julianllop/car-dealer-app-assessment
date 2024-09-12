import { Suspense } from 'react';
import { IVehicleMakes } from '@/interfaces/vehicleMakes';
import Spinner from '@/app/components/spinner';
import VehicleList from '@/app/components/vehicleList';
import { IVehicle } from '@/interfaces/vehicle';
import Link from 'next/link';

const allMakesUrl = process.env.NEXT_PUBLIC_ALL_MAKES_URL;

export async function generateStaticParams() {
  if (!allMakesUrl) {
    throw new Error('The ALL_MAKES_URL environment variable is not defined');
  }

  const response = await fetch(allMakesUrl);
  const vehicles = await response.json();

  return vehicles.Results.map((vehicle: IVehicleMakes) => ({
    makeId: vehicle.MakeId,
  }));
}

interface PageProps {
  params: {
    makeId: string;
    makeName: string;
    year: string;
  };
}

async function fetchVehicles(makeId: string, year: string) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  const data = await response.json();

  const vehicles = data.Results.map((vehicle: IVehicle) => ({
    ...vehicle,
    Make_Name: vehicle.Make_Name || 'Unknown Make',
  }));

  return vehicles;
}

export default async function ResultPage({ params }: PageProps) {
  const vehiclesPromise = fetchVehicles(params.makeId, params.year);
  const vehicles = await vehiclesPromise;

  const makeName = vehicles.length > 0 ? vehicles[0].Make_Name : 'Unknown Make';

  return (
    <div className="min-h-[calc(100vh-100px)] w-full bg-lime-50 flex flex-col items-center justify-start py-10 md:pt-20 lg:pt-32 gap-10">
      {vehicles ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="text-2xl font-bold text-slate-800 w-[90%] text-center">
            These are the {makeName} vehicles available from year {params.year}
          </p>

          <Suspense fallback={<Spinner />}>
            <VehicleList vehicles={vehicles} />
          </Suspense>
          <p className="text-xl font-bold text-slate-800 w-[90%]  text-center">
            Do you want to go{' '}
            <Link href={'/'} className="text-xl font-medium text-blue-400 underline cursor-pointer">
              home
            </Link>{' '}
            and look for another option?
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-[90%]  min-h-[200px] rounded-lg bg-red-600/50 flex items-center justify-center">
            <p className="text-2xl font-bold text-red-700 w-[90%]  text-center">
              I&apos;m sorry, there are no vehicles available matching the options you chose
            </p>
          </div>

          <p className="text-xl font-bold text-slate-800 w-[90%]  text-center">
            Let&apos;s go{' '}
            <Link href={'/'} className="text-xl font-medium text-blue-400 underline cursor-pointer">
              home
            </Link>{' '}
            and try another option
          </p>
        </div>
      )}
    </div>
  );
}
