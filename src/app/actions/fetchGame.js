"use server";

import Match from "@/models/match.model";
import { connect } from "@/db/connect";

const fetchGame = async (id) => {
  // db connection
  connect();

  const matchData = await Match.findById(id).lean();
  return matchData ? JSON.parse(JSON.stringify(matchData)) : null;
};

export { fetchGame };
