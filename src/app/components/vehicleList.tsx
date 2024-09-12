import { IVehicle } from "@/interfaces/vehicle";

interface VehicleListProps {
    vehicles: IVehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center content-center gap-2">
            {vehicles?.map((vehicle, index) => (
                <div
                    key={index}
                    className="min-w-[250px] w-[80%] max-w-[500px] flex justify-center items-center rounded-md bg-blue-800/20"
                >
                    {/* <h2>{vehicle.Make_Name}</h2>
                    <p>{vehicle.Model_Id}</p> */}
                    <p className="text-left text-xl px-2 py-1  text-blue-800 ">
                        {vehicle.Model_Name}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default VehicleList;
