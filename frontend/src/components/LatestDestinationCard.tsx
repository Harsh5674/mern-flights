import { Link } from "react-router-dom";
import { FlightType } from "../../../backend/src/shared/types";

type Props = {
  flight: FlightType;
};

const LatestDestinationCard = ({ flight }: Props) => {
  return (
    <Link
      to={`/detail/${flight._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={flight.imageUrls[1]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
          {flight.fromCity} to {flight.toCity}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;