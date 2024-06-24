import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  players: [playerSchema],
  inningsCompleted: {
    type: Boolean,
    default: false,
  },
  runsScored: {
    type: Number,
    default: 0,
  },
  wicketsLost: {
    type: Number,
    default: 0,
  },
  oversPlayed: {
    type: Number,
    default: 0,
  },
  stikeBatsman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  nonStrikeBatsman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  currentBowler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
