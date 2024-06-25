"use server";

const { connect } = require("@/db/connect");
import Match from "@/models/match.model";

const updateGame = async ({ id, gameState }) => {
  // db connection
  connect();

  let match = await Match.findById(id);

  Object.assign(match, gameState);

  await match.save();
  console.log("Match saved successfully");
};

export { updateGame };
