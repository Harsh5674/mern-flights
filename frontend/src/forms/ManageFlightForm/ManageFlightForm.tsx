import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import NameSection from "./NameSection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import { FlightType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";


export type FlightFormData = {
    name: string;
    fromCity: string;
    toCity: string;
    adultCount: number;
    childCount: number;
    class:string;
    economyAdultPrice: number;
    economyChildPrice: number;
    businessChildPrice: number;
    businessAdultPrice: number;
    totalPrice: number;
    departureDate:Date;
    departureTime:string;
    arrivalTime:string;
    flightTime:string;
    imageFiles: FileList;
    imageUrls: string[];
  };
 
type Props = {
    flight?: FlightType;
    onSave: (flightFormData: FormData) => void;
    isLoading: boolean;
  };  

const ManageFlightForm = ({ onSave, isLoading,flight}: Props) => {
    const formMethods = useForm<FlightFormData>();
    const {handleSubmit,reset} = formMethods;

    useEffect(() => {
        reset(flight);
      }, [flight, reset]);

    const onSubmit = handleSubmit((formDataJson: FlightFormData) => {
        console.log(formDataJson);
        const formData = new FormData();
        if (flight) {
            formData.append("flightId", flight._id);
        }
        formData.append("class",formDataJson.class);
        formData.append("fromCity",formDataJson.fromCity);
        formData.append("toCity",formDataJson.toCity);
        formData.append("economyAdultPrice",formDataJson.economyAdultPrice.toString());
        formData.append("economyChildPrice",formDataJson.economyChildPrice.toString());
        formData.append("businessChildPrice",formDataJson.businessChildPrice.toString());
        formData.append("businessAdultPrice",formDataJson.businessAdultPrice.toString());
        formData.append("totalPrice",formDataJson.totalPrice.toString());
        formData.append("departureTime",formDataJson.departureTime);
        formData.append("arrivalTime",formDataJson.arrivalTime);
        formData.append("flightTime",formDataJson.flightTime);
        formData.append("departureDate",formDataJson.departureDate.toString());
        formData.append("name",formDataJson.name);
        formData.append("adultCount",formDataJson.adultCount.toString());
        formData.append("childCount",formDataJson.childCount.toString());

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
              formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });

        onSave(formData);

    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <NameSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                <button
                    disabled={isLoading}
                    type="submit"
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                >
                 {isLoading ? "Saving..." : "Save"}
                </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageFlightForm;