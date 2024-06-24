import mongoose from "mongoose";
import { playerSchema } from "./player.model";

const inningSchema = new mongoose.Schema({
  battingCountry: {
    type: String,
  },
  bowlingCountry: {
    type: String,
  },

  battingCountryPlayers: [
    {
      type: playerSchema,
    },
  ],
  bowlingCountryPlayers: [
    {
      type: playerSchema,
    },
  ],

  strikeBatsman: {
    type: playerSchema,
  },
  nonStrikeBatsman: {
    type: playerSchema,
  },
  currentBowler: {
    type: playerSchema,
  },

  totalRuns: {
    type: Number,
    default: 0,
  },
  totalWickets: {
    type: Number,
    default: 0,
  },
  oversPlayed: {
    type: Number,
    default: 0,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

const matchSchema = new mongoose.Schema({
  firstInning: inningSchema,
  secondInning: inningSchema,
  currentOver: {
    type: Number,
    default: 0,
  },
  target: {
    type: Number,
    default: 0,
  },
  toss: {
    winnerCountry: {
      type: String,
    },
    decision: {
      type: String,
    },
  },

  winner: {
    type: String,
  },
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
