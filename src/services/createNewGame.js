import data from "@/data/team-and-players";
import { GAME } from "@/constants/gameConstants";

const selectBattingAndBowlingCountry = (teams, winnerDecision, tossWinner) => {
  let battingCountry;
  let bowlingCountry;
  if (winnerDecision === GAME.BATTING_CONDITION) {
    battingCountry =
      teams.firstTeam === tossWinner ? teams.firstTeam : teams.secondTeam;
    bowlingCountry =
      teams.firstTeam === battingCountry ? teams.secondTeam : teams.firstTeam;
  } else {
    bowlingCountry =
      teams.firstTeam === tossWinner ? teams.firstTeam : teams.secondTeam;
    battingCountry =
      teams.firstTeam === bowlingCountry ? teams.secondTeam : teams.firstTeam;
  }

  return { battingCountry, bowlingCountry };
};

const makePlayerList = (country) => {
  return data[country].map((player) => {
    return {
      name: player.name,
      roles: player.roles,
      country: country,
    };
  });
};

const createNewGame = ({ teams, overs, tossWinner, winnerDecision }) => {
  let { battingCountry, bowlingCountry } = selectBattingAndBowlingCountry(
    teams,
    winnerDecision,
    tossWinner
  );

  const battingCountryPlayers = makePlayerList(battingCountry);

  const bowlingCountryPlayers = makePlayerList(bowlingCountry);

  let firstInning = {
    battingCountry,
    bowlingCountry,
    battingCountryPlayers,
    bowlingCountryPlayers,
    strikeBatsman: battingCountryPlayers[0],
    nonStrikeBatsman: battingCountryPlayers[1],
    currentBowler: "",
    totalOvers: overs,
  };
  let secondInning = {
    battingCountry: bowlingCountry,
    bowlingCountry: battingCountry,
    battingCountryPlayers: bowlingCountryPlayers,
    bowlingCountryPlayers: battingCountryPlayers,
    strikeBatsman: bowlingCountryPlayers[0],
    nonStrikeBatsman: bowlingCountryPlayers[1],
    currentBowler: "",
    totalOvers: overs,
  };

  const matchData = {
    firstInning,
    secondInning,
    toss: {
      winnerCountry: tossWinner,
      decision: winnerDecision,
    },
  };

  return matchData;
};

export { createNewGame };
