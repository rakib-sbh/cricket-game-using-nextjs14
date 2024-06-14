"use client";

import Image from "next/image";
import { useState } from "react";
import { connect } from "@/db/connect";

import data from "@/data/team-and-players";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

const countries = Object.keys(data);

export default function Home() {
  const [players, setPlayer] = useState({
    countryOne: "",
    countryTwo: "",
  });

  const [tossWinner, setTossWinner] = useState(null);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setPlayer({
      ...players,
      [name]: value,
    });
  };

  const handleTossWinner = () => {
    const randomNumber = generateRandomNumber();
    if (randomNumber === 0) {
      setTossWinner(players.countryOne);
    } else {
      setTossWinner(players.countryTwo);
    }
  };

  const handleWinnerDecision = (event) => {
    const { name, value } = event.target;
    console.log("Inside winner decision");
    console.log(`${tossWinner} choose ${value}`);
  };

  const filteredCountries = countries.filter(
    (country) => country !== players.countryOne
  );

  return (
    <main>
      <form>
        <div>
          <label htmlFor="countryOne">Select First Country : </label>
          <select
            id="countryOne"
            onChange={handleSelectChange}
            name="countryOne"
          >
            <option value="">-- Select a Country ---</option>
            {countries.map((country, index) => {
              return (
                <option
                  value={country}
                  key={index}
                  selected={country === players.countryOne}
                >
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="countryTwo">Select First Country : </label>
          <select
            id="countryTwo"
            onChange={handleSelectChange}
            name="countryTwo"
          >
            <option value="">-- Select a Country ---</option>
            {filteredCountries.map((country, index) => {
              return (
                <option
                  value={country}
                  key={index}
                  selected={country === players.countryTwo}
                >
                  {country}
                </option>
              );
            })}
          </select>
        </div>
      </form>
      <h1>First Country: {players.countryOne}</h1>
      <h1>Second Country: {players.countryTwo}</h1>
      {players.countryOne && players.countryTwo && (
        <button onClick={handleTossWinner} disabled={tossWinner !== null}>
          Toss
        </button>
      )}
      {tossWinner && <h1>Toss Winner is {tossWinner}</h1>}

      <div>
        <label htmlFor="decision">Choose either batting or bolling</label>
        <select
          name="winnerDecision"
          id="decision"
          onChange={handleWinnerDecision}
        >
          <option value="">Select an option</option>
          <option value="batting">Batting</option>
          <option value="bolling">Bolling</option>
        </select>
      </div>
    </main>
  );
}
