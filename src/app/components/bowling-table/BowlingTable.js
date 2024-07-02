import { convertBallsToOvers } from "@/utils/convertBallsToOvers";

import styles from "./BowlingTable.module.css";
import { GAME } from "@/constants/gameConstants";

const BowlingTable = ({ players }) => {
  return (
    <table className={styles.bowling_table}>
      <thead>
        <tr>
          <th>{GAME.BOWLER}</th>
          <th>{GAME.OVERS}</th>
          <th>{GAME.WICKETS}</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => {
          const { name, totalBallDelivered, numberOfWickets } = player;
          if (totalBallDelivered == 0) {
            return (
              <tr key={index}>
                <td> {name} </td>
                <td> - </td>
                <td> - </td>
              </tr>
            );
          } else
            return (
              <tr key={index}>
                <td>{name}</td>
                <td>{convertBallsToOvers(totalBallDelivered)}</td>
                <td>{numberOfWickets}</td>
              </tr>
            );
        })}
      </tbody>
    </table>
  );
};

export default BowlingTable;
