import React from "react";
import "./App.css";
import { cars } from "./demo";
import { CarItem } from "./CarItem";

export const App: React.FC = () => {
  return (
    <div className="App">
      <ul>
        {cars.map((car) => (
          <CarItem car={car} />
        ))}
      </ul>
    </div>
  );
};
