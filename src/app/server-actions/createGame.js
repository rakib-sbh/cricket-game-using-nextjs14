"use server";

import data from "@/data/team-and-players";
import Match from "@/models/match.model";
import { connect } from "@/db/connect";
import { redirect } from "next/navigation";

import fs from "fs";
import path from "path";

const selectBattingAndBowlingCountry = (teams, winnerDecision, tossWinner) => {
  let battingCountry;
  let bowlingCountry;
  if (winnerDecision === "batting") {
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


const createGame = async ({ teams, overs, tossWinner, winnerDecision }) => {
  // db connection
  connect();

  let { battingCountry, bowlingCountry } = selectBattingAndBowlingCountry(
    teams,
    winnerDecision,
    tossWinner
  );

  const battingCountryPlayers = makePlayerList(battingCountry);

  const bowlingCountryPlayers = makePlayerList(bowlingCountry);

  //   creating match
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

  let match = new Match({
    firstInning,
    secondInning,
    toss: {
      winnerCountry: tossWinner,
      decision: winnerDecision
    }
  });

  match = await match.save();

  // const filePath = path.join(process.cwd(), "src", "utils", "currentGameId.txt");
  // fs.writeFileSync(filePath, match._id.toString());

  // redirect("/matches")

  match = match ? JSON.parse(JSON.stringify(match)) : null;
  return match._id;
};

export { createGame };
