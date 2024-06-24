import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "cricket",
  initialState: {
    firstInning: {
      battingCountry: "",
      bollingCountry: "",
      battingCountryPlayers: [],
      bowlingCountryPlayers: [],
      strikeBatsman: "",
      nonStrikeBatsman: "",
      currentBowler: "",
      totalRuns: 0,
      totalWickets: 0,
      oversPlayed: 0,
      completed: false,
    },
    secondInning: {
      battingCountry: "",
      bollingCountry: "",
      battingCountryPlayers: [],
      bollingCountryPlayers: [],
      strikeBatsman: "",
      nonStrikeBatsman: "",
      currentBowler: "",
      totalRuns: 0,
      totalWickets: 0,
      oversPlayed: 0,
      completed: false,
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
    setFirstInning: (state, action) => {
      state.firstInning = action.payload;
    },
    setSecondInning: (state, action) => {
      state.secondInning = action.payload;
    },
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    setToss: (state, action) => {
      state.toss = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});

export const {
  setFirstInning,
  setSecondInning,
  setTarget,
  setToss,
  setWinner,
} = gameSlice.actions;

export default gameSlice.reducer;
