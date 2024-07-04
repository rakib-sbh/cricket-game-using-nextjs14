"use server";

import { createNewGame } from "@/services/createNewGame";

const createGame = async ({ teams, overs, tossWinner, winnerDecision }) => {
  const id = await createNewGame({
    teams,
    overs,
    winnerDecision,
    tossWinner,
  });
  createNewGame;

  return id;
};

export { createGame };
