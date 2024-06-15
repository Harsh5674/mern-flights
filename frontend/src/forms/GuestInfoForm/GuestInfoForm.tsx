import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";
import { useForm } from "react-hook-form";
// import { useQuery } from "react-query";
// import * as apiClient from "../../api-client";

type Props = {
    flightId: string;
    totalPrice: number;
    aduCount:number;
    chilCount:number;
  };

  type GuestInfoFormData = {
    luggage: string;
    cabin: string;
    adultCount: number;
    childCount: number;
  };

const GuestInfoForm = ({ flightId, totalPrice,aduCount,chilCount }: Props)=>{
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();


    const {
        //watch,
        register,
        handleSubmit,
        //setValue,
        formState: { errors },
      } = useForm<GuestInfoFormData>({
        defaultValues: {
          adultCount: search.adultCount,
          childCount: search.childCount,
        },
      });

      const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues(
          "","",search.departureDate,
          data.adultCount,
          data.childCount,
          ""
        );
        navigate("/sign-in", { state: { from: location } });
      };

      const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues(
            "","",search.departureDate,
            data.adultCount,
            data.childCount,
            ""
        );
        navigate(`/flight/${flightId}/booking`);
      };

    return(
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
        <h3 className="text-md font-bold">₹{totalPrice} per Adult</h3>
        <form
          onSubmit={
            isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
          }
        >
          <div className="grid grid-cols-1 gap-4 items-center">
                <label className="items-center flex bg-white px-2 py-1">
                    *Luggage:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="text"
                    />
                </label>
                <label className="items-center flex bg-white px-2 py-1">
                    *Cabin:
                    <input
                        className="w-full p-1 focus:outline-none font-bold"
                        type="text"
                    />
                </label>
            <div className="flex bg-white px-2 py-1 gap-2">
              <label className="items-center flex">
                Adults:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={1}
                  max={aduCount}
                  {...register("adultCount", {
                    required: "This field is required",
                    min: {
                      value: 1,
                      message: "There must be at least one adult",
                    },
                    valueAsNumber: true,
                  })}
                />
              </label>
              <label className="items-center flex">
                Children:
                <input
                  className="w-full p-1 focus:outline-none font-bold"
                  type="number"
                  min={0}
                  max={chilCount}
                  {...register("childCount", {
                    valueAsNumber: true,
                  })}
                />
              </label>
              {errors.adultCount && (
                <span className="text-red-500 font-semibold text-sm">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
            {isLoggedIn ? (
              <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                Book Now
              </button>
            ) : (
              <button className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                Sign in to Book
              </button>
            )}
          </div>
        </form>
      </div>
    );
}
export default GuestInfoForm;