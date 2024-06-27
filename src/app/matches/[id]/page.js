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
  changeStrike,
  updateBatsmanRun,
  selectBowler,
  bowlBall,
} from "@/lib/features/cricketGame/gameSlice";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const CricketGame = ({ params }) => {
  const { id } = params;
  const dispatch = useDispatch();

  const [currentScore, setCurrentScore] = useState("");

  const gameState = useSelector((state) => state.game);
  const currentInning = gameState.currentInning;
  const inningData = gameState[currentInning];

  const handleSelectBowler = (e) => {
    dispatch(selectBowler(e.target.value));
  };

  const handlePlay = () => {
    const random = generateRandomNumber(7);
    const score = scoreTypes[random];

    if (score === -1) {
      setCurrentScore("Wicket");
      dispatch(bowlBall({ score: "wicket" }));
      dispatch(updateWickets());
      // dispatch(changeStrike());
    } else {
      setCurrentScore(score);
      dispatch(bowlBall({ score }));
      dispatch(updateTotalRuns(score));
      dispatch(updateBatsmanRun({ score }));

      if (score % 2 !== 0) {
        dispatch(changeStrike());
      }
    }
  };

  useEffect(() => {
    const fetchMatchData = async () => {
      const data = await fetchGame(id);
      if (data.firstInning.isCompleted) {
        dispatch(setCurrentInning("secondInning"));
      }
      dispatch(initializeGame(data));
    };

    fetchMatchData();
  }, [id]);

  useEffect(() => {
    if (typeof gameState.firstInning.strikeBatsman === "object") {
      updateGame({ id, gameState });
    }

    console.log("current balls : ", inningData.currentOverBalls);
  }, [currentScore]);

  // console.log("first inning", inningData);

  return (
    <div>
      <h2>Welcome to specific cricket game</h2>
      {gameState.firstInning.isCompleted ? (
        <div>
          <p>First Innings completed</p>
        </div>
      ) : (
        <div>
          <p>First Inning is Runing</p>
          <div>
            <p>Batting Country : {inningData?.battingCountry}</p>
            <p>Total Overs : {inningData?.totalOvers}</p>
            <p>Played Overs : {inningData?.oversPlayed}</p>
            <p>Current Over Balls : {inningData?.currentOverBalls}</p>
            <p>Total Runs : {inningData?.totalRuns}</p>
            <p>Wickets : {inningData?.totalWickets}</p>
          </div>
          <p>Bowling Country : {inningData?.bowlingCountry}</p>
          <div>
            <p>Batsmen</p>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Stike : {inningData?.strikeBatsman.name}</p>
              <p>Fours : {inningData?.strikeBatsman?.numberOfFours}</p>
              <p>Sixes : {inningData?.strikeBatsman?.numberOfSixes}</p>
              <p>Runs : {inningData?.strikeBatsman?.numberOfRuns}</p>
            </div>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Non Stike : {inningData?.nonStrikeBatsman.name} </p>
              <p>Fours : {inningData?.nonStrikeBatsman?.numberOfFours}</p>
              <p>Sixes : {inningData?.nonStrikeBatsman?.numberOfSixes}</p>
              <p>Runs : {inningData?.nonStrikeBatsman?.numberOfRuns}</p>
            </div>
            <div
              style={{
                border: "1px solid red",
                margin: "1rem",
                padding: "1rem",
              }}
            >
              <p>Bowler : {inningData?.currentBowler?.name}</p>
              <p>Wickets : {inningData?.currentBowler?.numberOfWickets}</p>
              <p>
                Total Ball : {inningData?.currentBowler?.totalBallDelivered}
              </p>
            </div>
            {currentScore && (
              <div>
                <p>Current Score : {currentScore}</p>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handlePlay}
                disabled={!inningData.bowlerSelected}
              >
                Play
              </button>
              {!inningData.bowlerSelected && (
                <div>
                  <label htmlFor="bowler">Select Bowler</label>
                  <select
                    name="selectBowler"
                    id="bowler"
                    onChange={handleSelectBowler}
                  >
                    <option value="" disabled>
                      do not select current bowler
                    </option>
                    {inningData.bowlingCountryPlayers
                      .filter(
                        (player) =>
                          player.name !== inningData.currentBowler.name
                      )
                      .map((player, i) => {
                        return (
                          <option value={player.name} key={i}>
                            {player.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
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
