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
      oversPlayed: 0,
      isCompleted: false,
    },
    currentOver: 0,
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
      state.firstInning.totalRuns =
        state.firstInning.totalRuns + action.payload;
    },
    updateWickets: (state, action) => {
      state.firstInning.totalWickets += 1;
    },
    changeStrike: (state, action) => {},
    updateBatsmanRun: (state, action) => {
      const { currentInning, score } = action.payload;
      state[currentInning].strikeBatsman.numberOfRuns += score;

      if (score == 4) {
        state[currentInning].strikeBatsman.numberOfFours += 1;
      }
      if (score == 6) {
        state[currentInning].strikeBatsman.numberOfSixes += 1;
      }
    },
  },
});

export const {
  initializeGame,
  updateTotalRuns,
  updateWickets,
  updateBatsmanRun,
} = gameSlice.actions;

export default gameSlice.reducer;
