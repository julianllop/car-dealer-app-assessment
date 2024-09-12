"use client";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

// Obtener el año actual
const currentYear = new Date().getFullYear();

interface YearSelectProps {
    selectedYear: string | null; // Año seleccionado o null
    setSelectedYear: (year: string | null) => void; // Función para actualizar el año seleccionado
}

export const YearSelect: React.FC<YearSelectProps> = ({
    selectedYear,
    setSelectedYear,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Generar un array de años desde 2015 hasta el año actual
    const modelYears = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, index) => 2015 + index
    );

    // Manejar la selección de un año
    const handleYearSelection = (year: number) => {
        setSelectedYear(year.toString()); // Guardar el año seleccionado
        setIsOpen(false); // Cerrar el dropdown
    };

    return (
        <div className="relative min-w-[250px] w-[80%] max-w-[500px]">
            <div className="bg-white absolute h-10 w-full px-4 gap-2 flex justify-between items-center shadow-md hover:shadow-lg text-xl rounded focus:outline-none cursor-pointer">
                <button
                    type="button"
                    name="years"
                    id="years"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`font-medium w-full h-10 text-start ${
                        selectedYear === null || selectedYear === "MODEL YEAR"
                            ? "text-slate-700 opacity-70"
                            : "text-slate-950"
                    }`}
                >
                    {selectedYear || "MODEL YEAR"}{" "}
                    {/* Mostrar el año seleccionado o "MODEL YEAR" */}
                </button>
                {selectedYear !== null && (
                    <button
                        onClick={() => setSelectedYear(null)} // Establecer el año seleccionado como null
                        className="p-1 hover:shadow-lg rounded-full hover:bg-slate-200"
                    >
                        <IoClose />
                    </button>
                )}
            </div>
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black/15 flex justify-center items-start pt-20 z-40 md:items-center md:p-0 transition-colors ${
                    isOpen ? "visible" : "invisible"
                }`}
            ></div>

            {isOpen && (
                <div className="absolute mt-14 bg-white flex flex-col w-full max-h-[400px] z-50 shadow-md rounded-md">
                    {modelYears.length > 0 && (
                        <div className="overflow-y-scroll max-h-[300px] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-thumb]:rounded-full">
                            {modelYears.map((year, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center px-4 text-brown1 hover:bg-slate-100"
                                >
                                    <button
                                        type="button"
                                        value={year}
                                        onClick={() =>
                                            handleYearSelection(year)
                                        } // Manejar la selección del año
                                        className="bg-transparent w-full rounded-md px-4 p-2 text-lg text-left"
                                    >
                                        {year}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
