import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AutoCompleteSearch } from "../components/AutoCompleteSearch";
import { RadioGroup } from "../components/RadioGroup";

export const SelectionPage = () => {
  const [planetList, setPlanetList] = useState();
  const [vehicleList, setVehicleList] = useState();
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [destination, setDestination] = useState({
    d1: {
      planet: null,
      vehicle: null,
    },
    d2: {
      planet: null,
      vehicle: null,
    },
    d3: {
      planet: null,
      vehicle: null,
    },
    d4: {
      planet: null,
      vehicle: null,
    },
  });

  const getPlanets = async () => {
    const res = await axios.get("https://findfalcone.geektrust.com/planets");
    // console.log("Planet Response", res.data);
    setPlanetList(res.data);
  };

  const getVehicles = async () => {
    const res = await axios.get("https://findfalcone.geektrust.com/vehicles");
    // console.log("Vehicle Response", res.data);
    setVehicleList(res.data);
  };

  const getResult = async () => {
    const res = await axios.post("https://findfalcone.geektrust.com/token");
    console.log(res.data);
  };

  useEffect(() => {
    getPlanets();
    getVehicles();
  }, []);

  useEffect(() => {
    console.log("Selected Planets", destination);
    var temp = 0;
    Object.keys(destination)?.forEach((item) => {
      if (destination[item].planet && destination[item].vehicle) {
        temp +=
          destination[item].planet.distance / destination[item].vehicle.speed;
      }
    });
    setTotalTime(temp);
  }, [destination]);

  return (
    <div className="flex flex-col flex-1 items-center justify-around">
      <div>
        <p className="text-2xl font-semibold">
          Select planets you want to search in:
        </p>
        <p className="text-2xl font-semibold">Total:{totalTime}</p>
      </div>
      <div className="flex w-[80%] justify-center gap-x-5 flex-wrap">
        {Object.keys(destination)?.map((item, index) => {
          return (
            <div key={item} className="flex flex-col mt-6">
              <p>Destination {index + 1}</p>
              <AutoCompleteSearch
                list={planetList}
                onSelect={(val) => {
                  setDestination((prev) => ({
                    ...prev,
                    [item]: {
                      ...prev[item],
                      planet: val,
                    },
                  }));
                }}
              />
              <RadioGroup
                list={vehicleList}
                name={item}
                show={destination[item].planet ? true : false}
                onSelect={(val) => {
                  setDestination((prev) => ({
                    ...prev,
                    [item]: {
                      ...prev[item],
                      vehicle: val,
                    },
                  }));
                }}
              />
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={getResult}
          className="flex justify-center items-center bg-blue-700 rounded-lg h-10 w-[200px]"
        >
          <p className="text-white">Done</p>
        </button>
      </div>
    </div>
  );
};
