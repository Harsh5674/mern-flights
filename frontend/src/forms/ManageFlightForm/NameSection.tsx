import { useFormContext } from "react-hook-form";
import { flightNames } from "../../config/flight-options-config";
import { FlightFormData } from "./ManageFlightForm";

const NameSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FlightFormData>();

  const typeWatch = watch("name");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Flight Name</h2>
      <div className="grid grid-cols-5 gap-2">
        {flightNames.map((name) => (
          <label
            className={
              typeWatch === name
                ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={name}
              {...register("name", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{name}</span>
          </label>
        ))}
      </div>
      {errors.name && (
        <span className="text-red-500 text-sm font-bold">
          {errors.name.message}
        </span>
      )}
    </div>
  );
};

export default NameSection;