import styles from "./Over.module.css";
import { GAME } from "@/constants/gameConstants";

const Over = ({ inningData }) => {
  return (
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
  );
};

export default Over;
