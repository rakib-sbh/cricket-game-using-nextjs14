const calculateStrikeRate = (numberOfRuns, numberOfBalls) => {
  const strikeRate = (numberOfRuns / numberOfBalls) * 100;
  return Math.round(strikeRate * 100) / 100;
};

export { calculateStrikeRate };
