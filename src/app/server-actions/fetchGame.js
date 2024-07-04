"use server";

import { fetchGameById } from "@/services/fetchGameById";
import { revalidatePath } from "next/cache";

const fetchGame = async (id) => {
  const matchData = await fetchGameById(id);

  if (!matchData) {
    process.exit(1);
  }

  revalidatePath(`/match/${id}/summary`);

  return matchData;
};

export { fetchGame };
