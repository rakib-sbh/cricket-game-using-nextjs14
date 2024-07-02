import styles from "./BattingTable.module.css";
import { GAME } from "@/constants/gameConstants";

const BattingTable = ({ players }) => {
  return (
    <table className={styles.batting_table}>
      <thead>
        <tr>
          <th>{GAME.BATSMAN}</th>
          <th>{GAME.RUNS}</th>
          <th>{GAME.BALLS}</th>
          <th>{GAME.FOURS}</th>
          <th>{GAME.SIXES}</th>
          <th>{GAME.STRIKE_RATE}</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => {
          const {
            name,
            numberOfRuns,
            numberOfFours,
            numberOfSixes,
            numberOfBallsPlayed,
          } = player;
          if (numberOfBallsPlayed == 0) {
            return (
              <tr key={index}>
                <td> {name} </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
                <td> - </td>
              </tr>
            );
          } else
            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{numberOfRuns}</td>
                <td>{numberOfBallsPlayed}</td>
                <td>{numberOfFours}</td>
                <td>{numberOfSixes}</td>
                <td>
                  {Math.floor((numberOfRuns / numberOfBallsPlayed) * 100)}
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default BattingTable;
