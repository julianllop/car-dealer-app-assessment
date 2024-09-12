// components/MakeButtonList.tsx
import React from "react";
import { IVehicleMakes } from "@/interfaces/vehicleMakes";

interface MakeButtonListProps {
    filteredMakes: IVehicleMakes[];
    handleMakeSelection: (make: IVehicleMakes) => void;
}

const OptionList: React.FC<MakeButtonListProps> = ({
    filteredMakes,
    handleMakeSelection,
}) => {
    return (
        <div className="overflow-y-scroll max-h-[300px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-thumb]:rounded-full">
            {filteredMakes.map((make, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center px-4 text-brown1 hover:bg-slate-100"
                >
                    <button
                        type="button"
                        onClick={() => handleMakeSelection(make)}
                        className="bg-transparent w-auto rounded-md px-4 p-2 text-lg text-left"
                    >
                        {make.MakeName}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default OptionList;
