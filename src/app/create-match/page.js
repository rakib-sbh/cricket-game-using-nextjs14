"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { createGame } from "../server-actions/createGame";
import { gameCreate } from "@/lib/features/cricketGame/gameSlice";
import Select from "../components/select/Select";
import styles from "./page.module.css";
import data from "@/data/team-and-players";
import { GAME } from "@/constants/gameConstants";

const countries = Object.keys(data);
const overValues = [1, 2, 3, 5, 10];

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [teams, setTeams] = useState({
    firstTeam: "",
    secondTeam: "",
  });
  const [overs, setOvers] = useState("");
  const [tossWinner, setTossWinner] = useState("");

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

  const handleWinnerDecision = async (e) => {
    const { value } = e.target;
    dispatch(gameCreate({ teams, overs, tossWinner, winnerDecision: value }));
    const matchId = await createGame({
      teams,
      overs,
      tossWinner,
      winnerDecision: value,
    });
    localStorage.setItem("gameId", matchId);
    router.push("/play-match");
  };

  return (
    <div>
      <h1 className={styles.heading}>Select Teams and Overs</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <Select
            name={"firstTeam"}
            handleSelect={selectTeams}
            tossWinner={tossWinner}
            data={countries}
            teams={teams}
          />
          <div className={styles.table_container}>
            {teams.firstTeam && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>{teams.firstTeam}</th>
                  </tr>
                </thead>
                <tbody>
                  {data[teams.firstTeam].map((player, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.td}>{player.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
        <div className={styles.card}>
          <div>
            <label className={styles.card_label}>Select Overs </label>
            <select
              name="overs"
              onChange={handleOvers}
              disabled={tossWinner !== ""}
              className={styles.card_select}
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
              <button
                onClick={handleToss}
                disabled={tossWinner !== ""}
                className={styles.btn}
              >
                {GAME.TOSS}
              </button>
            )}
          </div>
          <div className={styles.winningText}>
            {tossWinner && (
              <div>
                <p>{tossWinner} has won the toss</p>
              </div>
            )}
          </div>
          <div>
            {tossWinner && (
              <div>
                <button
                  value={"batting"}
                  onClick={handleWinnerDecision}
                  className={styles.btn}
                >
                  {GAME.BATTING}
                </button>
                <button
                  value={"bowling"}
                  onClick={handleWinnerDecision}
                  className={styles.btn}
                >
                  {GAME.BOWLING}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.card}>
          <Select
            name={"secondTeam"}
            handleSelect={selectTeams}
            tossWinner={tossWinner}
            data={countries}
            teams={teams}
          />
          <div className={styles.table_container}>
            {teams.secondTeam && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>{teams.secondTeam}</th>
                  </tr>
                </thead>
                <tbody>
                  {data[teams.secondTeam].map((player, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.td}>{player.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
