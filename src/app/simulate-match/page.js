"use client";

import { useState } from "react";

import data from "@/data/team-and-players";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { createGame } from "../server-actions/createGame";

import Select from "../components/select/Select";

import styles from "./page.module.css";

const countries = Object.keys(data);
const overValues = [1, 2, 3, 5, 10];

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

  return (
    <div>
      <h1 className={styles.heading}>Select Teams and Overs</h1>
      <div className={styles.container}>
        <Select
          name={"firstTeam"}
          handleSelect={selectTeams}
          tossWinner={tossWinner}
          data={countries}
          teams={teams}
        />
        <div className={styles.card}>
          <div>
            <label htmlFor="overs">Select Overs : </label>
            <select
              name="overs"
              id="overs"
              onChange={handleOvers}
              disabled={tossWinner !== ""}
            >
              <option value="">select over</option>
              {overValues.map((over, index) => {
                return (
                  <option value={over} key={index}>
                    {over} over
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {teams.firstTeam && teams.secondTeam && overs && (
              <button onClick={handleToss} disabled={tossWinner !== ""}>
                Toss
              </button>
            )}
          </div>
          <div>
            {tossWinner && (
              <div>
                <p>{tossWinner} has won the toss.</p>
              </div>
            )}
          </div>
          <div>
            {tossWinner && (
              <div>
                <select name="winnerDecision" onChange={handleWinnerDecision}>
                  <option value="">Select an option</option>
                  <option value="batting">Batting</option>
                  <option value="bowling">Bolling</option>
                </select>
              </div>
            )}
          </div>
          <div>
            {tossWinner && winnerDecision && (
              <div>
                <p>
                  {tossWinner} won the toss and choose to {winnerDecision}
                </p>
                <button onClick={initializeGame}>Start the Game</button>
              </div>
            )}
          </div>
        </div>
        <Select
          name={"secondTeam"}
          handleSelect={selectTeams}
          tossWinner={tossWinner}
          data={countries}
          teams={teams}
        />
      </div>
    </div>
  );
};

export default Page;
