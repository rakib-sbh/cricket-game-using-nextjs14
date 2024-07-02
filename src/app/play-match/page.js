"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { fetchGame } from "../server-actions/fetchGame";
import { updateGame } from "../server-actions/updateGame";
import {
  initializeGame,
  selectBowler,
  bowlBall,
} from "@/lib/features/cricketGame/gameSlice";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

import styles from "./page.module.css";
import Header from "../components/header/Header";
import BattingTeam from "../components/batting-team/BattingTeam";
import BowlingTeam from "../components/bowling-team/BowlingTeam";
import { GAME } from "@/constants/gameConstants";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const Game = () => {
  const dispatch = useDispatch();
  const [currentScore, setCurrentScore] = useState("");
  const [id, setId] = useState(null);
  const router = useRouter();

  const gameState = useSelector((state) => state.game);
  const currentInning = gameState.currentInning;
  const inningData = gameState[currentInning];

  const handlePlay = () => {
    const random = generateRandomNumber(7);
    const score = scoreTypes[random];

    setCurrentScore(score);
    dispatch(bowlBall({ score }));
  };

  const handleSelectBowler = (e) => {
    dispatch(selectBowler(e.target.value));
    setCurrentScore("Bowler selected");
  };

  const handleSummaryClick = () => {
    router.push(`/summary/${id}`);
  };

  useEffect(() => {
    const storedId = localStorage.getItem("gameId");
    setId(storedId);
  }, []);

  useEffect(() => {
    const fetchGameData = async () => {
      if (id) {
        const gameData = await fetchGame(id);

        dispatch(initializeGame(gameData));
      }
    };

    fetchGameData();
  }, [dispatch, id]);

  useEffect(() => {
    if (typeof gameState.firstInning.strikeBatsman === "object") {
      updateGame({ id, gameState });
    }
  }, [currentScore, gameState, id]);

  console.log("game state", gameState);

  return (
    <div className={styles.game_container}>
      <Header gameState={gameState} />
      <main className={styles.game_body}>
        <BattingTeam inningData={inningData} />
        <div className={`${styles.current_game} ${styles.verticalLayout}`}>
          <div className={styles.scoreSection}>
            <h2 className={styles.scoreHeader}>
              {inningData.bowlingCountry} vs {inningData.battingCountry}
            </h2>
            <div className={styles.scoreDetails}>
              <span className={styles.currentScore}>
                {inningData.totalRuns}-{inningData.totalWickets}
              </span>
              <span className={styles.oversPlayed}>
                {inningData.oversPlayed} overs ({inningData.totalOvers})
              </span>
            </div>
          </div>
          <div className={styles.overSection}>
            <h2>
              This Over{" "}
              <span className={styles.ballContainer}>
                {inningData.currentOverScores.map((score, index) => (
                  <span key={index} className={styles.ball}>
                    {score === -1 ? (
                      <span className={styles.wicket}>{GAME.WICKET}</span>
                    ) : (
                      score
                    )}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <div className={styles.simulateSection}>
            <button
              className={styles.btn}
              onClick={handlePlay}
              disabled={!inningData.bowlerSelected || gameState.winner !== ""}
            >
              {GAME.SIMULATE_BALL}
            </button>
          </div>
          {gameState.winner && (
            <div className={styles.winnerSection}>
              <h1>Winner is {gameState.winner}</h1>
            </div>
          )}
          <div className={styles.summarySection}>
            <Link href={`/summary/${id}`} prefetch={false}>
              <button className={styles.btn} onClick={handleSummaryClick}>
                {GAME.MATCH_SUMMARY}
              </button>
            </Link>
          </div>
        </div>
        <BowlingTeam
          inningData={inningData}
          handleSelectBowler={handleSelectBowler}
        />
      </main>
    </div>
  );
};

export default Game;
