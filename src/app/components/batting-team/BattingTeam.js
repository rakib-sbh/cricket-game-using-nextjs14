import styles from "./BattingTeam.module.css";
import { GAME } from "@/constants/gameConstants";

const BattingTeam = ({ inningData }) => {
  return (
    <div className={styles.team_container}>
      <h1>{GAME.BATTING_TEAM}</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>{inningData.battingCountry}</th>
          </tr>
        </thead>
        <tbody>
          {inningData.battingCountryPlayers.map((player, index) => {
            const isStrikeBatsman =
              player.name === inningData.strikeBatsman.name;
            const isNonStrikeBatsman =
              player.name === inningData.nonStrikeBatsman.name;
            return (
              <tr
                key={index}
                className={`${styles.tr} ${
                  isStrikeBatsman
                    ? styles.strikeBatsman
                    : isNonStrikeBatsman
                    ? styles.nonStrikeBatsman
                    : ""
                }`}
              >
                <td className={styles.td}>
                  {player.name}
                  {isStrikeBatsman && " *"} {player.numberOfRuns} (
                  {player.numberOfBallsPlayed})
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BattingTeam;
