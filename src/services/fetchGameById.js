import matchRepository from "@/repositories/matchRepository";

const fetchGameById = async (id) => {
  const matchData = await matchRepository.fetchGameById(id);

  return matchData;
};

export { fetchGameById };
