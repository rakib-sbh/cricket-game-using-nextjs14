import Match from "@/models/match.model";
import { connect } from "@/db/connect";

class MatchRepository {
  constructor() {
    connect();
  }
  async create(matchData) {
    const match = new Match(matchData);
    await match.save();
    return match ? JSON.parse(JSON.stringify(match)) : null;
  }

  async fetchGameById(id) {
    const matchData = await Match.findById(id).lean();
    return matchData ? JSON.parse(JSON.stringify(matchData)) : null;
  }
  async updateGameById(id, gameState) {
    try {
      await Match.findByIdAndUpdate(id, gameState, { new: true });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new MatchRepository();
