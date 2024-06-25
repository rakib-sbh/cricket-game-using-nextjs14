"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGame } from "@/app/actions/fetchGame";
import { updateGame } from "@/app/actions/updateGame";
import {
  initializeGame,
  updateTotalRuns,
  updateWickets,
  updateBatsmanRun,
} from "@/lib/features/cricketGame/gameSlice";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const CricketGame = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch();

  const [currentScore, setCurrentScore] = useState("");
  const [currentInning, setCurrentInning] = useState("");

  const firstInning = useSelector((state) => state.game.firstInning);

  const gameState = useSelector((state) => state.game);

  const handlePlay = () => {
    const random = generateRandomNumber(7);
    const score = scoreTypes[random];

    if (score === -1) {
      setCurrentScore("Wicket");
      dispatch(updateWickets());
    } else {
      setCurrentScore(score);
      dispatch(updateTotalRuns(score));
      dispatch(updateBatsmanRun({ currentInning, score }));
    }
  };

  useEffect(() => {
    const fetchMatchData = async () => {
      const data = await fetchGame(id);
      if (!data.firstInning.isCompleted) {
        setCurrentInning("firstInning");
      } else {
        setCurrentInning("secondInning");
      }
      dispatch(initializeGame(data));
    };

    fetchMatchData();
  }, [id]);

  useEffect(() => {
    console.log("updated gamestate", gameState);
    if (typeof gameState.firstInning.strikeBatsman === "object") {
      updateGame({ id, gameState });
    }
  }, [currentScore]);

  console.log("first inning", firstInning);

  return (
    <div>
      <h2>Welcome to specific cricket game</h2>
      {firstInning.isCompleted ? (
        <div>
          <p>First Innings completed</p>
        </div>
      ) : (
        <div>
          <p>First Inning is Runing</p>
          <div>
            <p>Batting Country : {firstInning?.battingCountry}</p>
            <p>Total Overs : {firstInning?.totalOvers}</p>
            <p>Total Runs : {firstInning?.totalRuns}</p>
            <p>Wickets : {firstInning?.totalWickets}</p>
          </div>
          <p>Bowling Country : {firstInning?.bowlingCountry}</p>
          <div>
            <p>Batsmen</p>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Stike : {firstInning?.strikeBatsman.name}</p>
              <p>Fours : {firstInning?.strikeBatsman?.numberOfFours}</p>
              <p>Sixes : {firstInning?.strikeBatsman?.numberOfSixes}</p>
              <p>Runs : {firstInning?.strikeBatsman?.numberOfRuns}</p>
            </div>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Non Stike : {firstInning?.nonStrikeBatsman.name} </p>
              <p>Fours : {firstInning?.nonStrikeBatsman?.numberOfFours}</p>
              <p>Sixes : {firstInning?.nonStrikeBatsman?.numberOfSixes}</p>
              <p>Runs : {firstInning?.nonStrikeBatsman?.numberOfRuns}</p>
            </div>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Bowler : {firstInning?.currentBowler?.name}</p>
              <p>Wickets : {firstInning?.currentBowler?.numberOfWickets}</p>
              <p>
                Total Ball : {firstInning?.currentBowler?.totalBallDelivered}
              </p>
            </div>
            {currentScore && (
              <div>
                <p>Current Score : {currentScore}</p>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={handlePlay}>Play</button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Link href={`/summary/${id}`}>
          <button>View Match Summarys</button>
        </Link>
      </div>
    </div>
  );
};

export default CricketGame;
