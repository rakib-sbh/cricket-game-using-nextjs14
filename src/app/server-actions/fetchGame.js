"use server";

import Match from "@/models/match.model";
import { connect } from "@/db/connect";

const fetchGame = async (id) => {
  try {
    connect();
    const matchData = await Match.findById(id).lean();
    return matchData ? JSON.parse(JSON.stringify(matchData)) : null;
  } catch (error) {
    process.exit();
  }
};

export { fetchGame };
