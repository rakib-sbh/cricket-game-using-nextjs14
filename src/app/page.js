"use client";

import { useState } from "react";

import data from "@/data/team-and-players";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { createGame } from "./actions/createGame";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];
const countries = Object.keys(data);

let batsmanIndex = 0;

const Page = () => {
  const [teams, setTeams] = useState({
    firstTeam: "",
    secondTeam: "",
  });
  const [overs, setOvers] = useState("");
  const [tossWinner, setTossWinner] = useState("");
  const [winnerDecision, setWinnerDecision] = useState(null);

  const selectTeams = (e) => {
    const { name, value } = e.target;
    setTeams({
      ...teams,
      [name]: value,
    });
  };

  const handleOvers = (e) => {
    setOvers(e.target.value);
  };

  const handleToss = () => {
    const randomNumber = generateRandomNumber(2);
    if (randomNumber === 0) {
      setTossWinner(teams.firstTeam);
    } else {
      setTossWinner(teams.secondTeam);
    }
  };

  const handleWinnerDecision = (e) => {
    const { value } = e.target;
    setWinnerDecision(value);
  };

  const initializeGame = () => {
    createGame({ teams, overs, tossWinner, winnerDecision });
  };

  const filteredCountries = countries.filter(
    (country) => country !== teams.firstTeam
  );

  return (
    <div>
      <h1>Welcome to Cricket Game</h1>
      {/* Selecting the first team */}
      <div>
        <label htmlFor="firstTeam">Select First Team : </label>
        <select id="firstTeam" onChange={selectTeams} name="firstTeam">
          <option value=""> Select a Team </option>
          {countries.map((country, index) => {
            return (
              <option value={country} key={index}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      {/* Selecting the second team */}
      <div>
        <label htmlFor="secondTeam">Select Second Team : </label>
        <select id="secondTeam" onChange={selectTeams} name="secondTeam">
          <option value=""> Select a Team</option>
          {filteredCountries.map((country, index) => {
            return (
              <option value={country} key={index}>
                {country}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor="over">How many overs : </label>
        <input type="number" value={overs} onChange={(e) => handleOvers(e)} />
      </div>
      {/* Toss */}
      {teams.firstTeam && teams.secondTeam && overs && (
        <button onClick={handleToss} disabled={tossWinner !== ""}>
          Toss
        </button>
      )}
      {tossWinner && (
        <div>
          <label htmlFor="decision">Choose either batting or bowling</label>
          <select
            name="winnerDecision"
            id="decision"
            onChange={handleWinnerDecision}
          >
            <option value="">Select an option</option>
            <option value="batting">Batting</option>
            <option value="bowling">Bolling</option>
          </select>
        </div>
      )}
      {tossWinner && winnerDecision && (
        <div>
          <p>
            {tossWinner} won the toss and choose to {winnerDecision}
          </p>
          <button onClick={initializeGame}>Start the Game</button>
        </div>
      )}
    </div>
  );
};

export default Page;
