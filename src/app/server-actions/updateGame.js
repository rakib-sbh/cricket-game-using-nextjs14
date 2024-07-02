"use server";

import { revalidatePath } from "next/cache";
import matchRepository from "@/repositories/matchRepository";

const updateGame = async ({ id, gameState }) => {
  await matchRepository.updateGameById(id, gameState);
  revalidatePath(`/summary/${id}`);
};

export { updateGame };
