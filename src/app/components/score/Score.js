import styles from "./Score.module.css";

const Score = ({ inningData }) => {
  return (
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
  );
};

export default Score;
