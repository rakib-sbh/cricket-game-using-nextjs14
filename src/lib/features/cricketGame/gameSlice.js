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
      bowlerSelected: false,
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
    selectBowler: (state, action) => {
      const inning = state.currentInning;
      const playerName = action.payload;

      state[inning].currentBowler = state[inning].bowlingCountryPlayers.find(
        (player) => player.name === playerName
      );
      state[inning].bowlerSelected = true;
    },
    bowlBall: (state, action) => {
      const inning = state.currentInning;
      const { score } = action.payload;

      // update the current over balls and scores
      state[inning].currentOverBalls += 1;
      state[inning].currentOverScores.push(score);

      // updating oversplayed
      state[inning].oversPlayed += 0.1;
      if (state[inning].currentOverBalls === 6) {
        state[inning].oversPlayed = Math.ceil(state[inning].oversPlayed);
      }

      //! Updating bowler stats
      //* current bowler stats
      state[inning].currentBowler.totalBallDelivered += 1;

      //* bowler in the bowlingCountryPlayers stat
      const bowlerIndex = state[inning].bowlingCountryPlayers.findIndex(
        (player) => player.name === state[inning].currentBowler.name
      );
      if (bowlerIndex !== -1) {
        state[inning].bowlingCountryPlayers[bowlerIndex] = {
          ...state[inning].bowlingCountryPlayers[bowlerIndex],
          totalBallDelivered: state[inning].currentBowler.totalBallDelivered,
        };
      }

      //! updating batsman stat. It is depend upon score. If the score is wicket, then update wicketBy field

      state[inning].strikeBatsman.numberOfBallsPlayed += 1;
      const batsmanIndex = state[inning].battingCountryPlayers.findIndex(
        (player) => player.name === state[inning].strikeBatsman.name
      );

      if (score === -1) {
        // this is wicket. so update numberOfWickets of the bowler
        state[inning].currentBowler.numberOfWickets += 1;
        const bowlerIndex = state[inning].bowlingCountryPlayers.findIndex(
          (player) => player.name === state[inning].currentBowler.name
        );
        if (bowlerIndex !== -1) {
          state[inning].bowlingCountryPlayers[bowlerIndex] = {
            ...state[inning].bowlingCountryPlayers[bowlerIndex],
            numberOfWickets: state[inning].currentBowler.numberOfWickets,
          };
        }

        // update wicketBy field for batsman
        state[inning].strikeBatsman.wicketBy = state[inning].currentBowler.name;
        if (batsmanIndex !== -1) {
          state[inning].battingCountryPlayers[batsmanIndex] = {
            ...state[inning].battingCountryPlayers[batsmanIndex],
            wicketBy: state[inning].currentBowler.name,
            numberOfBallsPlayed:
              state[inning].strikeBatsman.numberOfBallsPlayed,
          };
        }
      } else {
        //! score is not wicket. Score can be (0, 1, 2, 3, 4, 6)
        // update current batsman score
        state[inning].strikeBatsman.numberOfRuns += score;
        if (score == 4) {
          state[inning].strikeBatsman.numberOfFours += 1;
        }
        if (score === 6) state[inning].strikeBatsman.numberOfSixes += 1;

        state[inning].battingCountryPlayers[batsmanIndex] = {
          ...state[inning].battingCountryPlayers[batsmanIndex],
          numberOfRuns: state[inning].strikeBatsman.numberOfRuns,
          numberOfFours: state[inning].strikeBatsman.numberOfFours,
          numberOfSixes: state[inning].strikeBatsman.numberOfSixes,
          numberOfBallsPlayed: state[inning].strikeBatsman.numberOfBallsPlayed,
        };
      }

      // ! decision about strike change or innings complete
      if (
        state[inning].oversPlayed === state[inning].totalOvers ||
        state[inning].totalWickets === 10
      ) {
        //TODO: inning completed. Write logic
      } else {
        // inning is not completed.
        // if the last score is wicket and it is the last ball of the over
        if (score === -1 && state[inning].currentOverBalls === 6) {
          // change the strike
          state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
          state[inning].nonStrikeBatsman =
            state[inning].battingCountryPlayers[
              state[inning].nextBatsmanIndex++
            ];
        } else if (score === -1 && state[inning].currentOverBalls !== 6) {
          // only change the strike batsman
          state[inning].strikeBatsman =
            state[inning].battingCountryPlayers[
              state[inning].nextBatsmanIndex++
            ];
        } else if (score % 2 === 0 && state[inning].currentOverBalls === 6) {
          // change the strike
          const batsman = state[inning].strikeBatsman;
          state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
          state[inning].nonStrikeBatsman = batsman;
        } else if (score % 2 === 1 && state[inning].currentOverBalls !== 6) {
          // change the strike
          const batsman = state[inning].strikeBatsman;
          state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
          state[inning].nonStrikeBatsman = batsman;
        }
      }
    },
  },
});

export const {
  initializeGame,
  updateTotalRuns,
  updateWickets,
  changeStrike,
  updateBatsmanRun,
  selectBowler,
  bowlBall,
} = gameSlice.actions;

export default gameSlice.reducer;
