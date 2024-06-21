import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  result: {
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  toss: {
    winningTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    decision: {
      type: String,
    },
  },
  inning: {
    battingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    bollingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  },
  runsScored: { type: Number, default: 0 },
  wicketsLost: { type: Number, default: 0 },
  oversPlayed: { type: Number, default: 0 },
  battingTeamPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  bollingTeamPlayers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
