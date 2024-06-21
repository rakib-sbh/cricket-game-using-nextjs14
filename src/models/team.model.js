import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Please provide country name"],
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
