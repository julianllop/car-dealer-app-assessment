import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IVehicleMakes } from "@/interfaces/vehicleMakes";

interface NextButtonProps {
    selectedMake: IVehicleMakes | null;
    selectedYear: string | null;
}

const NextButton: React.FC<NextButtonProps> = ({
    selectedMake,
    selectedYear,
}) => {
    const [isDisabled, setIsDisabled] = useState(true);
    const [href, setHref] = useState("");

    useEffect(() => {
        if (selectedMake && selectedYear) {
            setIsDisabled(false);
            setHref(`/result/${selectedMake.MakeId}/${selectedYear}`);
        } else {
            setIsDisabled(true);
            setHref("");
        }
    }, [selectedMake, selectedYear]);

    return (
        <Link
            href={href}
            className={`${
                isDisabled
                    ? "bg-slate-400 text-slate-500 cursor-default"
                    : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg"
            } flex items-center justify-center min-w-[250px] w-[80%] max-w-[500px] h-10 px-10 rounded shadow-md font-medium`}
        >
            NEXT
        </Link>
    );
};

export default NextButton;
