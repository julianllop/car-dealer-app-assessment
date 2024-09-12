'use client';
import { useEffect, useState } from 'react';
import { DropdownSelect } from './components/dropdownSelect';
import { YearSelect } from './components/yearSelect';
import { IVehicleMakes } from '@/interfaces/vehicleMakes';
import NextButton from './components/nextButton';

export default function FilterPage() {
  const url = process.env.NEXT_PUBLIC_MAKES_URL;

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [vehicleMakes, setVehicleMakes] = useState<IVehicleMakes[]>([]);
  const [selectedMake, setSelectedMake] = useState<IVehicleMakes | null>(null);

  useEffect(() => {
    if (selectedMake) {
      localStorage.setItem('MakeName', selectedMake.MakeName);
    }
  }, [selectedMake]);

  useEffect(() => {
    const fetchVehicleMakes = async () => {
      if (!url) {
        console.error('URL is not defined');
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setVehicleMakes(data.Results);
      } catch (error) {
        console.error('Failed to fetch vehicle makes:', error);
      }
    };

    fetchVehicleMakes();
  }, [url]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center w-full">
      <main className="h-[calc(100vh-50px)] flex flex-col items-center justify-start pt-10 md:pt-20 lg:pt-32 gap-20 w-full bg-lime-50">
        <div className="flex flex-col items-center gap-10 max-w-[700px]">
          <p className="text-2xl font-bold text-slate-800 w-[90%] text-center">
            Choose your desired vehicle make and the model year
          </p>
          <div className="flex flex-col items-center justify-center gap-20 w-full">
            <DropdownSelect vehicleMakes={vehicleMakes} selectedMake={selectedMake} setSelectedMake={setSelectedMake} />
            <YearSelect selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
            <NextButton selectedMake={selectedMake} selectedYear={selectedYear} />
          </div>
        </div>
      </main>
    </div>
  );
}
