import { createSlice } from "@reduxjs/toolkit";
import data from "@/data/team-and-players"

const findPlayerIndex = (state, batsmandIndex = true) => {
  return batsmandIndex
    ? state.battingCountryPlayers.findIndex(
      (player) => player.name === state.strikeBatsman.name
    )
    : state.bowlingCountryPlayers.findIndex(
      (player) => player.name === state.currentBowler.name
    );
};

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
    gameCreate: (state, action) => {
      const { teams, overs, tossWinner, winnerDecision } = action.payload;

      const inning = state.currentInning;

      if (winnerDecision === "batting") {
        state[inning].battingCountry = tossWinner;
        state[inning].battingCountryPlayers = data[tossWinner];

        state[inning].bowlingCountry = tossWinner === teams.firstTeam ? teams.secondTeam : teams.firstTeam;
        state[inning].bowlingCountryPlayers = data[state[inning].bowlingCountry]
      } else {
        state[inning].bowlingCountry = tossWinner;
        state[inning].bowlingCountryPlayers = data[tossWinner];

        state[inning].battingCountry = tossWinner === teams.firstTeam ? teams.secondTeam : teams.firstTeam;
        state[inning].battingCountryPlayers = data[state[inning].battingCountry]
      }

      state[inning].totalOvers = overs;
      state.toss.winnerCountry = tossWinner;
      state.toss.decision = winnerDecision;
    },
    initializeGame: (_state, action) => {
      return action.payload;
    },
    selectBowler: (state, action) => {
      const inning = state.currentInning;
      const playerName = action.payload;

      state[inning].currentBowler = state[inning].bowlingCountryPlayers.find(
        (player) => player.name === playerName
      );
      state[inning].bowlerSelected = true;
      state[inning].currentOverBalls = 0;
      state[inning].currentOverScores = [];
    },
    bowlBall: (state, action) => {
      const inning = state.currentInning;
      const { score } = action.payload;

      state[inning].currentOverBalls += 1;
      state[inning].currentOverScores.push(score);

      state[inning].oversPlayed =
        Math.round((state[inning].oversPlayed + 0.1) * 10) / 10;
      if (state[inning].currentOverBalls === 6) {
        state[inning].oversPlayed = Math.ceil(state[inning].oversPlayed);
      }

      state[inning].currentBowler.totalBallDelivered += 1;

      const bowlerIndex = findPlayerIndex(state[inning], false);
      if (bowlerIndex !== -1) {
        state[inning].bowlingCountryPlayers[bowlerIndex] = {
          ...state[inning].bowlingCountryPlayers[bowlerIndex],
          totalBallDelivered: state[inning].currentBowler.totalBallDelivered,
        };
      }
      state[inning].strikeBatsman.numberOfBallsPlayed += 1;
      const batsmanIndex = findPlayerIndex(state[inning]);

      if (score === -1) {
        state[inning].totalWickets += 1;
        state[inning].currentBowler.numberOfWickets += 1;
        if (bowlerIndex !== -1) {
          state[inning].bowlingCountryPlayers[bowlerIndex] = {
            ...state[inning].bowlingCountryPlayers[bowlerIndex],
            numberOfWickets: state[inning].currentBowler.numberOfWickets,
          };
        }

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
        state[inning].totalRuns += score;
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

      const {
        totalRuns,
        totalOvers,
        totalWickets,
        oversPlayed,
        currentOverBalls,
      } = state[inning];
      let gameStatus = "";

      if (
        inning === "firstInning" &&
        (oversPlayed == totalOvers || totalWickets === 10)
      ) {
        gameStatus = "FIRST_INNING_COMPLETE";
      } else if (
        inning === "secondInning" &&
        totalRuns >= state.target &&
        (oversPlayed <= totalOvers || totalWickets <= 10)
      ) {
        gameStatus = "SECOND_INNING_WIN";
      } else if (
        inning === "secondInning" &&
        totalRuns === state.target - 1 &&
        (oversPlayed <= totalOvers || totalWickets <= 10)
      ) {
        gameStatus = "MATCH_TIE";
      } else if (
        inning === "secondInning" &&
        totalRuns < state.target &&
        (oversPlayed === totalOvers || totalWickets === 10)
      ) {
        gameStatus = "SECOND_INNING_LOSS";
      } else {
        gameStatus = "INNING_NOT_COMPLETE";
      }

      switch (gameStatus) {
        case "FIRST_INNING_COMPLETE":
          state.firstInning.isCompleted = true;
          state.currentInning = "secondInning";
          state.secondInning.battingCountryPlayers =
            state.firstInning.bowlingCountryPlayers;
          state.secondInning.bowlingCountryPlayers =
            state.firstInning.battingCountryPlayers;
          state.target = state.firstInning.totalRuns + 1;
          break;

        case "SECOND_INNING_WIN":
          state.secondInning.isCompleted = true;
          state.winner = state[inning].battingCountry;
          break;

        case "MATCH_TIE":
          state.winner = "Match Tie";
          break;

        case "SECOND_INNING_LOSS":
          state.secondInning.isCompleted = true;
          state.winner = state[inning].bowlingCountry;
          break;

        case "INNING_NOT_COMPLETE":
          if (score === -1 && currentOverBalls === 6) {
            state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
            state[inning].nonStrikeBatsman =
              state[inning].battingCountryPlayers[
              state[inning].nextBatsmanIndex++
              ];
          } else if (score === -1 && currentOverBalls !== 6) {
            state[inning].strikeBatsman =
              state[inning].battingCountryPlayers[
              state[inning].nextBatsmanIndex++
              ];
          } else if (score % 2 === 0 && currentOverBalls === 6) {
            const batsman = state[inning].strikeBatsman;
            state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
            state[inning].nonStrikeBatsman = batsman;
          } else if (score % 2 === 1 && currentOverBalls !== 6) {
            const batsman = state[inning].strikeBatsman;
            state[inning].strikeBatsman = state[inning].nonStrikeBatsman;
            state[inning].nonStrikeBatsman = batsman;
          }
          break;

        default:
          break;
      }

      if (state[inning].currentOverBalls === 6) {
        state[inning].bowlerSelected = false;
      }
    },
  },
});

export const { gameCreate, initializeGame, selectBowler, bowlBall } = gameSlice.actions;

export default gameSlice.reducer;
