import matchRepository from "@/repositories/matchRepository";

const updateGameById = async (id, gameState) => {
  const isUpdated = await matchRepository.updateGameById(id, gameState);

  return isUpdated;
};

export { updateGameById };
