import react, { useEffect, useState, Suspense } from "react";
import { IVehicleMakes } from "@/interfaces/vehicleMakes";
import { IoClose } from "react-icons/io5";
import Spinner from "./spinner";
const OptionList = react.lazy(() => import("../components/optionList"));

interface DropdownSelectProps {
    vehicleMakes: IVehicleMakes[];
    selectedMake: IVehicleMakes | null;
    setSelectedMake: (make: IVehicleMakes | null) => void;
}

export const DropdownSelect: React.FC<DropdownSelectProps> = ({
    vehicleMakes,
    selectedMake,
    setSelectedMake,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredMakes, setFilteredMakes] =
        useState<IVehicleMakes[]>(vehicleMakes);
    const [selectedMakeName, setSelectedMakeName] = useState<string | null>(
        null
    );

    useEffect(() => {
        const filtered = vehicleMakes.filter((make) =>
            make.MakeName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMakes(filtered);
    }, [searchTerm, vehicleMakes]);

    useEffect(() => {
        if (selectedMake) {
            setSelectedMakeName(selectedMake.MakeName);
        } else {
            setSelectedMakeName(null);
        }
    }, [selectedMake]);

    const handleMakeSelection = (make: IVehicleMakes) => {
        setSelectedMakeName(make.MakeName);
        setSelectedMake(make);
        setIsOpen(false);
    };

    return (
        <div className="min-w-[250px] w-[80%] max-w-[500px]">
            <div className="relative bg-white w-full flex flex-col justify-start items-center gap-20">
                <div className="bg-white absolute h-10 w-full px-4 gap-2 flex justify-between items-center shadow-md hover:shadow-lg text-xl  rounded focus:outline-none cursor-pointer">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={`font-medium w-full h-10 text-start ${
                            selectedMakeName === null
                                ? "text-slate-700 opacity-70"
                                : "text-slate-950"
                        }`}
                    >
                        {selectedMakeName || "VEHICLE MAKE"}
                    </button>
                    {selectedMake && (
                        <button
                            onClick={() => {
                                setSelectedMake(null);
                                setSelectedMakeName(null);
                            }}
                            className="p-1 hover:shadow-lg rounded-full hover:bg-slate-200"
                        >
                            <IoClose />
                        </button>
                    )}
                </div>
                <div
                    onClick={() => setIsOpen(false)}
                    className={`fixed inset-0 bg-black/15 flex justify-center items-start pt-20 md:items-center md:p-0 transition-colors ${
                        isOpen ? "visible" : "invisible"
                    }`}
                ></div>

                {isOpen && (
                    <div className="absolute bg-white mt-14 flex flex-col w-full max-h-[400px] z-50 shadow-md rounded-md">
                        <input
                            type="text"
                            className="px-2 py-1 text-xl focus:outline-none rounded-md shadow-md z-50"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                        />
                        <Suspense fallback={<Spinner />}>
                            {filteredMakes.length > 0 && (
                                <OptionList
                                    filteredMakes={filteredMakes}
                                    handleMakeSelection={handleMakeSelection}
                                />
                            )}
                        </Suspense>
                    </div>
                )}
            </div>
        </div>
    );
};
