"use server";

import { redirect } from "next/navigation";

import Player from "@/models/player.model";
import data from "@/data/team-and-players";
import { connect } from "@/db/connect";
import Team from "@/models/team.model";
import Match from "@/models/match.model";

const createGame = async ({
  battingCountry,
  bollingCountry,
  tossWinner,
  playingOver,
  winnerDecision,
}) => {
  // db connection
  connect();
  const battingPlayers = data[battingCountry];
  console.log(battingPlayers);

  const bollingPlayers = data[bollingCountry];

  // saving batting country players in db and storing battinig players id in a array
  let battingPlayersIds = [];
  for (const player of battingPlayers) {
    let newPlayer = await Player.findOne({ name: player.name });

    if (!newPlayer) {
      newPlayer = new Player({
        name: player.name,
        roles: player.roles,
        country: battingCountry,
      });
      newPlayer = await newPlayer.save();
    }

    battingPlayersIds.push(newPlayer._id);
  }

  // saving bowling country players in db and storing their ids
  let bollingPlayersIds = [];
  for (const player of bollingPlayers) {
    let newPlayer = await Player.findOne({ name: player.name });

    if (!newPlayer) {
      newPlayer = new Player({
        name: player.name,
        roles: player.roles,
        country: battingCountry,
      });
      newPlayer = await newPlayer.save();
    }

    bollingPlayersIds.push(newPlayer._id);
  }

  let teamsIds = [];

  // creating batting team
  let battingTeam = await Team.findOne({ country: battingCountry });
  if (!battingTeam) {
    battingTeam = new Team({
      country: battingCountry,
      players: battingPlayersIds,
    });

    battingTeam = await battingTeam.save();
    teamsIds.push(battingTeam._id);
  }

  // creating bowling team
  let bollingTeam = await Team.findOne({ country: bollingCountry });
  if (!bollingTeam) {
    bollingTeam = new Team({
      country: bollingCountry,
      players: bollingPlayersIds,
    });

    bollingTeam = await bollingTeam.save();
    teamsIds.push(bollingTeam._id);
  }

  console.log("Teams Ids:", teamsIds);

  // creating match collection
  let match = await Match.findOne({
    teams: { $all: teamsIds },
  });

  if (!match) {
    match = new Match({
      teams: teamsIds,
      toss: {
        winningTeam:
          tossWinner === battingCountry ? battingTeam._id : bollingCountry._id,
        decision: winnerDecision,
      },
      inning: {
        battingTeam: battingTeam._id,
        bollingTeam: bollingTeam._id,
      },
      battingTeamPlayers: battingPlayersIds,
      bollingTeamPlayers: bollingPlayersIds,
    });

    match = await match.save();

    console.log("match id", match._id);

    redirect(`/dashboard/${match._id}`);
  }
};

export { createGame };
