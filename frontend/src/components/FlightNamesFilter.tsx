import { flightNames } from "../config/flight-options-config";

type Props = {
  selectedFlightNames: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FlightNamesFilter = ({ selectedFlightNames, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Flight Name</h4>
      {flightNames.map((flightName) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={flightName}
            checked={selectedFlightNames.includes(flightName)}
            onChange={onChange}
          />
          <span>{flightName}</span>
        </label>
      ))}
    </div>
  );
};

export default FlightNamesFilter;