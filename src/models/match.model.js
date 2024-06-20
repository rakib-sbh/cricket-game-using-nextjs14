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
  batsmen: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      runsScored: { type: Number, default: 0 },
      ballsFaced: { type: Number, default: 0 },
      fours: { type: Number, default: 0 },
      sixes: { type: Number, default: 0 },
      dismissalInfo: String,
    },
  ],
  bowlers: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      oversBowled: { type: Number, default: 0 },
      maidens: { type: Number, default: 0 },
      runsConceded: { type: Number, default: 0 },
      wicketsTaken: { type: Number, default: 0 },
      economyRate: { type: Number, default: 0 },
    },
  ],
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
