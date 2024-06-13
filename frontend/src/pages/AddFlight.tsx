import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageFlightForm from "../forms/ManageFlightForm/ManageFlightForm";
import * as apiClient from "../api-client";


function AddFlight(){
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addMyFlight, {
      onSuccess: () => {
        showToast({ message: "Flight Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Flight", type: "ERROR" });
      },
    });
  
    const handleSave = (flightFormData: FormData) => {
      mutate(flightFormData);
    };

    return <ManageFlightForm onSave={handleSave} isLoading={isLoading} />;
}

export default AddFlight;