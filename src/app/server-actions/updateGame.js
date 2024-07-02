"use server";

const { connect } = require("@/db/connect");
import Match from "@/models/match.model";
import { revalidatePath } from "next/cache";

const updateGame = async ({ id, gameState }) => {
  try {
    connect();
    await Match.findByIdAndUpdate(id, gameState, { new: true });
    revalidatePath(`/summary/${id}`);
  } catch (error) {
    process.exit(1);
  }
};

export { updateGame };
