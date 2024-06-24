import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roles: [String],
  country: {
    type: String,
    required: [true, "Please provide country name"],
  },
  numberOfWickets: {
    type: Number,
    default: 0,
  },
  numberOfFours: {
    type: Number,
    default: 0,
  },
  numberOfSixes: {
    type: Number,
    default: 0,
  },
  numberOfRuns: {
    type: Number,
    default: 0,
  },
  wicketBy: String,
  totalOverPlayed: {
    type: Number,
    default: 0,
  },
  totalBallDelivered: {
    type: Number,
    default: 0,
  },
});

const Player = mongoose.models.Player || mongoose.model("Player", playerSchema);

export { playerSchema };

export default Player;
