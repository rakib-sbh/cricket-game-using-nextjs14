const InningSummary = ({ inning }) => {
  const { battingCountry, totalRuns, totalWickets, oversPlayed } = inning;
  return (
    <h2>
      {battingCountry} {totalRuns}-{totalWickets} ({oversPlayed} overs)
    </h2>
  );
};

export default InningSummary;
