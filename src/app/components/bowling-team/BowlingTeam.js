import styles from "./BowlingTeam.module.css";
import { GAME } from "@/constants/gameConstants";

const BowlingTeam = ({ inningData, handleSelectBowler }) => {
  return (
    <div className={styles.team_container}>
      <h1>{GAME.BOWLING_TEAM}</h1>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th className={styles.th}>{inningData.bowlingCountry}</th>
          </tr>
        </thead>
        <tbody>
          {inningData.bowlingCountryPlayers.map((player, index) => {
            const isCurrentBowler =
              player.name === inningData.currentBowler.name;
            return (
              <tr
                key={index}
                className={`${styles.tr} ${
                  isCurrentBowler ? styles.currentBowler : ""
                }`}
              >
                <td className={styles.td}>{player.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.bowlerSelection}>
        {!inningData.bowlerSelected && (
          <div className={styles.selectBowlerContainer}>
            <label htmlFor="bowler" className={styles.bowlerLabel}>
              {GAME.SELECT_BOWLER}
            </label>
            <select
              name="selectBowler"
              id="bowler"
              onChange={handleSelectBowler}
              className={styles.bowlerSelect}
            >
              <option value="">{GAME.SELECT_CURRENT_BOWLER}</option>
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
  );
};

export default BowlingTeam;
