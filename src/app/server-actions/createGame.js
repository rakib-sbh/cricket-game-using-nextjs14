"use server";

import { createNewGame } from "@/services/createNewGame";

import matchRepository from "@/repositories/matchRepository";

const createGame = async ({ teams, overs, tossWinner, winnerDecision }) => {
  const matchData = createNewGame({
    teams,
    overs,
    winnerDecision,
    tossWinner,
  });

  try {
    let match = await matchRepository.create(matchData);
    console.log("match id", match._id);
    return match._id;
  } catch (error) {
    process.exit(1);
  }
};

export { createGame };
