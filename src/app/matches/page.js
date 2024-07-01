"use client"

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { fetchGame } from "../server-actions/fetchGame";
import { updateGame } from "../server-actions/updateGame";
import { initializeGame, selectBowler, bowlBall } from "@/lib/features/cricketGame/gameSlice";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import Link from "next/link";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const id = localStorage.getItem("gameId");


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
  }

  const handleSelectBowler = (e) => {
    dispatch(selectBowler(e.target.value));
    setCurrentScore("Bowler selected");
  };

  const handleSummaryClick = () => {
    router.push(`/summary/${id}`);
  }

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
    }

    fetchGameData();

  }, [dispatch, id]);

  useEffect(() => {
    if (typeof gameState.firstInning.strikeBatsman === "object") {
      updateGame({ id, gameState });
    }
  }, [currentScore, gameState, id]);

  return (
    <div className={styles.game_container}>
      <header className={styles.game_header}>
        <h1>{inningData.battingCountry} VS {inningData.bowlingCountry}</h1>
        <h3>{gameState.currentInning}</h3>
      </header>
      <main className={styles.game_body}>
        <div className={styles.team_container}>
          <h1>Batting Team</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  {inningData.battingCountry}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                inningData.battingCountryPlayers.map((player, index) => {
                  const isStrikeBatsman = player.name === inningData.strikeBatsman.name;
                  const isNonStrikeBatsman = player.name === inningData.nonStrikeBatsman.name;
                  return <tr key={index} className={`${styles.tr} ${isStrikeBatsman ? styles.strikeBatsman : isNonStrikeBatsman ? styles.nonStrikeBatsman : ""}`}>
                    <td className={styles.td}>
                      {player.name}{isStrikeBatsman && ' *'} {player.numberOfRuns}{" "}({player.numberOfBallsPlayed})
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
        <div className={`${styles.current_game} ${styles.verticalLayout}`}>
          <div className={styles.scoreSection}>
            <h2 className={styles.scoreHeader}>
              {inningData.bowlingCountry} vs {inningData.battingCountry}
            </h2>
            <div className={styles.scoreDetails}>
              <span className={styles.currentScore}>{inningData.totalRuns}-{inningData.totalWickets}</span>
              <span className={styles.oversPlayed}>{inningData.oversPlayed} overs ({inningData.totalOvers})</span>
            </div>
          </div>
          <div className={styles.overSection}>
            <h2>This Over: <span className={styles.ballContainer}>{inningData.currentOverScores.map((score, index) => (
              <span key={index} className={styles.ball}>
                {score === -1 ? <span className={styles.wicket}>WC</span> : score}
              </span>
            ))}</span></h2>
          </div>

          <div className={styles.simulateSection}>
            <button className={styles.btn} onClick={handlePlay} disabled={!inningData.bowlerSelected || gameState.winner !== ""}>Simulate Ball</button>
          </div>
          {
            gameState.winner && <div className={styles.winnerSection}>
              <h1>Winner is {gameState.winner}</h1>
            </div>
          }
          <div className={styles.summarySection}>
            <Link href={`/summary/${id}`} prefetch={false}>
              <button className={styles.btn} onClick={handleSummaryClick} >Match Summary</button></Link>
          </div>
        </div>
        <div className={styles.team_container}>
          <h1>Bowling Team</h1>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  {inningData.bowlingCountry}
                </th>
              </tr>
            </thead>
            <tbody>
              {
                inningData.bowlingCountryPlayers.map((player, index) => {
                  const isCurrentBowler = player.name === inningData.currentBowler.name;
                  return <tr key={index} className={`${styles.tr} ${isCurrentBowler ? styles.currentBowler : ""}`}>
                    <td className={styles.td}>{player.name}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <div className={styles.bowlerSelection}>
            {!inningData.bowlerSelected && (
              <div className={styles.selectBowlerContainer}>
                <label htmlFor="bowler" className={styles.bowlerLabel}>Select Bowler</label>
                <select
                  name="selectBowler"
                  id="bowler"
                  onChange={handleSelectBowler}
                  className={styles.bowlerSelect}
                >
                  <option value="">Select current bowler</option>
                  {inningData.bowlingCountryPlayers
                    .filter(
                      (player) => player.name !== inningData.currentBowler.name
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
      </main>
    </div>
  );
};

export default Game;
