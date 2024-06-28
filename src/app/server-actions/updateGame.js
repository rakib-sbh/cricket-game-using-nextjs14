"use server";

const { connect } = require("@/db/connect");
import Match from "@/models/match.model";

const updateGame = async ({ id, gameState }) => {
  // db connection
  connect();

  try {
    await Match.findByIdAndUpdate(id, gameState, { new: true });
    console.log("Game state updated");
  } catch (error) {
    console.log("Error updating game state");
  }
};

export { updateGame };
