import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "cricket",
  initialState: {
    firstInning: {
      battingCountry: "",
      bowlingCountry: "",
      battingCountryPlayers: [],
      bowlingCountryPlayers: [],
      strikeBatsman: "",
      nonStrikeBatsman: "",
      nextBatsmanIndex: 2,
      currentBowler: "",
      totalRuns: 0,
      totalWickets: 0,
      totalOvers: 0,
      oversPlayed: 0,
      currentOverBalls: 0,
      currentOverScores: [],
      isCompleted: false,
    },
    secondInning: {
      battingCountry: "",
      bowlingCountry: "",
      battingCountryPlayers: [],
      bowlingCountryPlayers: [],
      strikeBatsman: "",
      nonStrikeBatsman: "",
      nextBatsmanIndex: 2,
      currentBowler: "",
      totalRuns: 0,
      totalWickets: 0,
      totalOvers: 0,
      oversPlayed: 0,
      currentOverBalls: 0,
      currentOverScores: [],
      isCompleted: false,
    },
    currentInning: "firstInning",
    target: 0,
    toss: {
      winnerCountry: "",
      decision: "",
    },
    winner: "",
  },

  reducers: {
    initializeGame: (_state, action) => {
      return action.payload;
    },
    updateTotalRuns: (state, action) => {
      const inning = state.currentInning;
      state[inning].totalRuns += action.payload;
    },
    updateWickets: (state, action) => {
      const inning = state.currentInning;
      state[inning].totalWickets += 1;

      // bowler related update
      const currentBowlerIndex = state[inning].bowlingCountryPlayers.findIndex(
        (player) => player.name === state[inning].currentBowler.name
      );
      if (currentBowlerIndex !== -1) {
        state[inning].bowlingCountryPlayers[
          currentBowlerIndex
        ].numberOfWickets += 1;
      }
      state[inning].currentBowler.numberOfWickets += 1;

      // batsman related update
      const strikeBatsmanIndex = state[inning].battingCountryPlayers.findIndex(
        (player) => player.name === state[inning].strikeBatsman.name
      );
      // update wicketBy field
      if (strikeBatsmanIndex !== -1) {
        state[inning].battingCountryPlayers[strikeBatsmanIndex].wicketBy =
          state[inning].currentBowler.name;
      }
      // change strike batsman
      state[inning].strikeBatsman =
        state[inning].battingCountryPlayers[state[inning].nextBatsmanIndex++];
    },
    changeStrike: (state, action) => {
      const inning = state.currentInning;
      const batsman = state[inning].strikeBatsman;
      state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
      state[inning].nonStrikeBatsman = batsman;
    },
    updateBatsmanRun: (state, action) => {
      const inning = state.currentInning;
      const { score } = action.payload;

      state[inning].strikeBatsman.numberOfRuns += score;
      state[inning].strikeBatsman.numberOfBallsPlayed += 1;

      if (score == 4) {
        state[inning].strikeBatsman.numberOfFours += 1;
      }
      if (score == 6) {
        state[inning].strikeBatsman.numberOfSixes += 1;
      }

      // update the batsman in the battingCountryPlayers array
      const batsmanIndex = state[inning].battingCountryPlayers.findIndex(
        (player) => player.name === state[inning].strikeBatsman.name
      );

      if (batsmanIndex !== -1) {
        state[inning].battingCountryPlayers[batsmanIndex] = {
          ...state[inning].battingCountryPlayers[batsmanIndex],
          numberOfRuns: state[inning].strikeBatsman.numberOfRuns,
          numberOfBallsPlayed: state[inning].strikeBatsman.numberOfBallsPlayed,
          numberOfFours: state[inning].strikeBatsman.numberOfFours,
          numberOfSixes: state[inning].strikeBatsman.numberOfSixes,
        };
      }
    },
    bowlBall: (state, action) => {
      const inning = state.currentInning;
      const { score } = action.payload;

      state[inning].currentOverBalls += 1;

      // updating oversplayed
      state[inning].oversPlayed += 0.1;
      if (state[inning].currentOverBalls === 6) {
        state[inning].oversPlayed = Math.ceil(state[inning].oversPlayed);
      }

      // update bowler's stats
      state[inning].currentBowler.totalBallDelivered += 1;

      const bowlerIndex = state[inning].bowlingCountryPlayers.findIndex(
        (player) => player.name === state[inning].currentBowler.name
      );

      if (bowlerIndex !== -1) {
        state[inning].bowlingCountryPlayers[bowlerIndex] = {
          ...state[inning].bowlingCountryPlayers[bowlerIndex],
          totalBallDelivered: state[inning].currentBowler.totalBallDelivered,
        };

        // update the current over scores
        state[inning].currentOverScores.push(score);
      }
    },
    setCurrentInning: (state, action) => {
      state.currentInning = action.payload;
    },
  },
});

export const {
  initializeGame,
  updateTotalRuns,
  updateWickets,
  changeStrike,
  updateBatsmanRun,
  bowlBall,
  setCurrentInning,
} = gameSlice.actions;

export default gameSlice.reducer;
