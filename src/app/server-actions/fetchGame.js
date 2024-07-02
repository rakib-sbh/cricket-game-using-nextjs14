"use server";

import matchRepository from "@/repositories/matchRepository";

const fetchGame = async (id) => {
  const matchData = await matchRepository.fetchGameById(id);

  if (!matchData) {
    process.exit(1);
  }

  return matchData;
};

export { fetchGame };
