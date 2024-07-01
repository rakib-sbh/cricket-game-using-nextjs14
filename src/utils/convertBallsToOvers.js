const convertBallsToOvers = (balls) => {
    const ballsPerOver = 6;
    const overs = Math.floor(balls / ballsPerOver);
    const remainingBalls = balls % ballsPerOver;

    return parseFloat(`${overs}.${remainingBalls}`);
}

export { convertBallsToOvers }