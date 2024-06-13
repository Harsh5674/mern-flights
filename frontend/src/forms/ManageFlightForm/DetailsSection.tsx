import { useFormContext } from "react-hook-form";
import { FlightFormData } from "./ManageFlightForm";


function DetailsSection(){
    const {
        register,
        formState: { errors },
      } = useFormContext<FlightFormData>();

      return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Flight</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Class
                <input
                type="text"
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("class", { required: "This field is required" })}
                ></input>
                {errors.class && (
                <span className="text-red-500">{errors.class.message}</span>
                )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                FromCity
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("fromCity", { required: "This field is required" })}
                ></input>
                {errors.fromCity && (
                    <span className="text-red-500">{errors.fromCity.message}</span>
                )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                ToCity
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("toCity", { required: "This field is required" })}
                ></input>
                {errors.toCity && (
                    <span className="text-red-500">{errors.toCity.message}</span>
                )}
                </label>
            </div>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    EconomyAdultPrice
                    <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("economyAdultPrice", { required: "This field is required" })}
                    ></input>
                    {errors.economyAdultPrice && (
                    <span className="text-red-500">{errors.economyAdultPrice.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    EconomyChildPrice
                    <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("economyChildPrice", { required: "This field is required" })}
                    ></input>
                    {errors.economyChildPrice && (
                    <span className="text-red-500">{errors.economyChildPrice.message}</span>
                    )}
                </label>
            </div>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    BusinessAdultPrice
                    <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("businessAdultPrice", { required: "This field is required" })}
                    ></input>
                    {errors.businessAdultPrice && (
                    <span className="text-red-500">{errors.businessAdultPrice.message}</span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    BusinessChildPrice
                    <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("businessChildPrice", { required: "This field is required" })}
                    ></input>
                    {errors.businessChildPrice && (
                    <span className="text-red-500">{errors.businessChildPrice.message}</span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    TotalPrice
                    <input
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("totalPrice", { required: "This field is required" })}
                    ></input>
                    {errors.totalPrice && (
                    <span className="text-red-500">{errors.totalPrice.message}</span>
                    )}
            </label>
            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                    DepartureDate
                    <input
                    type="date"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("departureDate", { required: "This field is required" })}
                    ></input>
                    {errors.departureDate && (
                    <span className="text-red-500">{errors.departureDate.message}</span>
                    )}
            </label>
            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                DepartureTime
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("departureTime", { required: "This field is required" })}
                ></input>
                {errors.departureTime && (
                    <span className="text-red-500">{errors.departureTime.message}</span>
                )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                ArrivalTime
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("arrivalTime", { required: "This field is required" })}
                ></input>
                {errors.arrivalTime && (
                    <span className="text-red-500">{errors.arrivalTime.message}</span>
                )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                FlightTime
                <input
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal"
                    {...register("flightTime", { required: "This field is required" })}
                ></input>
                {errors.flightTime && (
                    <span className="text-red-500">{errors.flightTime.message}</span>
                )}
            </label>
        </div>
      );
}

export default DetailsSection;