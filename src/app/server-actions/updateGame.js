"use server";

import { revalidatePath } from "next/cache";

import { updateGameById } from "@/services/updateGameById";

const updateGame = async ({ id, gameState }) => {
  const isOk = await updateGameById(id, gameState);

  if (!isOk) {
    process.exit(1);
  }

  revalidatePath(`/summary/${id}`);
};

export { updateGame };
