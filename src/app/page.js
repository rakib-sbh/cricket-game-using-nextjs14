"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import styles from "./page.module.css";
import data from "@/data/team-and-players";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const countries = Object.keys(data);

let batsmanIndex = 0;

const changeStrike = (player) => {
  const strikePlayer = player.nonStrike;
  const nonStrikePlayer = player.strike;

  return {
    strike: strikePlayer,
    nonStrike: nonStrikePlayer,
  };
};

export default function Home() {
  const [players, setPlayer] = useState({
    countryOne: "",
    countryTwo: "",
  });
  const [bowlers, setbowlers] = useState([]);
  const [nextbowlers, setNextbowlers] = useState([]);
  const [currentBoller, setCurrentBoller] = useState(null);

  const [tossWinner, setTossWinner] = useState(null);
  const [wicket, setWicket] = useState(0);
  const [over, setOver] = useState(0);
  const [numOfBalls, setNumOfBalls] = useState(0);
  const [run, setRun] = useState(0);
  const [currentScore, setCurrentScore] = useState(null);

  const [batsmen, setBatsmen] = useState([]);
  const [currentBatsman, setCurrentBatsman] = useState({
    strike: null,
    nonStrike: null,
  });
  const [battingCountry, setBattingCountry] = useState(null);
  const [bollingCountry, setBollingCountry] = useState(null);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setPlayer({
      ...players,
      [name]: value,
    });
  };

  const handleTossWinner = () => {
    const randomNumber = generateRandomNumber(2);
    if (randomNumber === 0) {
      setTossWinner(players.countryOne);
    } else {
      setTossWinner(players.countryTwo);
    }
  };

  const handleWinnerDecision = (event) => {
    const { name, value } = event.target;
    console.log(`${tossWinner} choose ${value}`);

    if (value === "batting" && tossWinner === players.countryOne) {
      setBatsmen(data[players.countryOne]);
      setbowlers(data[players.countryTwo]);

      setBattingCountry(players.countryOne);
      setBollingCountry(players.countryTwo);
      setCurrentBatsman({
        strike: data[players.countryOne][batsmanIndex++].name,
        nonStrike: data[players.countryOne][batsmanIndex++].name,
      });
    } else if (value === "bolling" && tossWinner === players.countryOne) {
      setBatsmen(data[players.countryTwo]);
      setbowlers(data[players.countryOne]);

      setBattingCountry(players.countryTwo);
      setBollingCountry(players.countryOne);
      setCurrentBatsman({
        strike: data[players.countryTwo][batsmanIndex++].name,
        nonStrike: data[players.countryTwo][batsmanIndex++].name,
      });
    } else if (value === "batting" && tossWinner === players.countryTwo) {
      setBatsmen(data[players.countryTwo]);
      setbowlers(data[players.countryOne]);

      setBattingCountry(players.countryTwo);
      setBollingCountry(players.countryOne);
      setCurrentBatsman({
        strike: data[players.countryTwo][batsmanIndex++].name,
        nonStrike: data[players.countryTwo][batsmanIndex++].name,
      });
    } else {
      setbowlers(data[players.countryTwo]);
      setBatsmen(data[players.countryOne]);

      setBattingCountry(players.countryOne);
      setBollingCountry(players.countryTwo);
      setCurrentBatsman({
        strike: data[players.countryOne][batsmanIndex++].name,
        nonStrike: data[players.countryOne][batsmanIndex++].name,
      });
    }
  };

  const selectBoller = (boller) => {
    setCurrentBoller(boller);
  };

  const playGame = (e) => {
    //TODO: When score is 0 and over occurred, strike change functionality does not working

    const score = generateRandomNumber(7);
    if (scoreTypes[score] === -1) {
      setCurrentScore("Wicket");
      setWicket(wicket + 1);
      if (numOfBalls === 5) {
        // changing the strike
        const newBatsman = changeStrike(currentBatsman);
        setCurrentBatsman(newBatsman);
      } else {
        setCurrentBatsman({
          ...currentBatsman,
          strike: data[battingCountry][batsmanIndex++].name,
        });
      }
      setNumOfBalls(numOfBalls + 1);
    } else if (scoreTypes[score] === 1 || scoreTypes[score] === 3) {
      setCurrentScore(scoreTypes[score]);
      setRun(run + scoreTypes[score]);
      setNumOfBalls(numOfBalls + 1);

      if (numOfBalls !== 5) {
        // changing strike
        const newBatsman = changeStrike(currentBatsman);
        console.log(newBatsman);
        setCurrentBatsman(newBatsman);
      }
    } else {
      // no need to change strike
      setRun(run + scoreTypes[score]);
      setNumOfBalls(numOfBalls + 1);
      setCurrentScore(scoreTypes[score]);
    }

    if (numOfBalls === 5) {
      const filteredbowlers = bowlers.filter(
        (boller) => boller.name !== currentBoller.name
      );
      console.log(filteredbowlers);
      setNextbowlers(filteredbowlers);
    }
  };

  useEffect(() => {
    if (numOfBalls === 6) {
      console.log("Inside useEffect");
      setOver(over + 1);
      setNumOfBalls(0);
      const randomIndex = generateRandomNumber(nextbowlers.length);
      setCurrentBoller(nextbowlers[randomIndex]);
    }
  }, [numOfBalls]);

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
                <option value={country} key={index}>
                  {country}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="countryTwo">Select Second Country : </label>
          <select
            id="countryTwo"
            onChange={handleSelectChange}
            name="countryTwo"
          >
            <option value="">-- Select a Country ---</option>
            {filteredCountries.map((country, index) => {
              return (
                <option value={country} key={index}>
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
      <div>
        <h3>Batsman</h3>
        <ul>
          {batsmen &&
            batsmen.map((batman, i) => (
              <li key={i}>
                {batman.name}{" "}
                {currentBatsman.strike === batman.name && " (Strike) "}{" "}
                {currentBatsman.nonStrike === batman.name && " (Non Strike) "}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3>bowlers</h3>
        <ul>
          {bowlers &&
            bowlers.map((boller, i) => (
              <li key={i}>
                <button
                  className={styles.btn}
                  onClick={() => selectBoller(boller)}
                  disabled={boller.name === currentBoller?.name}
                >
                  {boller.name}
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h2>Current Boller = {currentBoller?.name}</h2>
      </div>
      <div>
        <h2>Strike Batsman = {currentBatsman.strike}</h2>
        <h2>Non Strike Batsman = {currentBatsman.nonStrike}</h2>
      </div>
      <hr />

      {currentBoller && currentBatsman && (
        <div>
          <button onClick={playGame}>Play</button>
        </div>
      )}

      <div>
        <h2>Game Details</h2>
        <h3>Current Score : {currentScore}</h3>
        <h3>Over : {over}</h3>
        <h3>Wicket : {wicket}</h3>
        <h3>Number of Balls : {numOfBalls}</h3>
        <h3>Runs : {run}</h3>
      </div>
    </main>
  );
}
