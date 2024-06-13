import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageFlightForm from "../forms/ManageFlightForm/ManageFlightForm";
import { useAppContext } from "../contexts/AppContext";

const EditFlight = () => {
  const { flightId } = useParams();
  const { showToast } = useAppContext();

  const { data: flight } = useQuery(
    "fetchMyFlightById",
    () => apiClient.fetchMyFlightById(flightId || ""),
    {
      enabled: !!flightId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateMyFlightById, {
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

  return (
    <ManageFlightForm flight={flight} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditFlight;