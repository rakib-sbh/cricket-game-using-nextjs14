import mongoose, { Mongoose } from "mongoose";
import { playerSchema } from "@/schemas/player.schema";

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
  nextBatsmanIndex: {
    type: Number,
    default: 2,
  },
  currentBowler: {
    // type: mongoose.Schema.Types.Mixed,
    type: playerSchema,
  },

  bowlerSelected: {
    type: Boolean,
    default: false,
  },

  totalRuns: {
    type: Number,
    default: 0,
  },
  totalWickets: {
    type: Number,
    default: 0,
  },
  totalOvers: {
    type: Number,
    default: 50,
  },
  oversPlayed: {
    type: Number,
    default: 0,
  },

  currentOverBalls: {
    type: Number,
    default: 0,
  },
  currentOverScores: [
    {
      type: Number,
    },
  ],

  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const matchSchema = new mongoose.Schema({
  firstInning: inningSchema,
  secondInning: inningSchema,
  currentRun: {
    type: mongoose.Schema.Types.Mixed,
  },
  currentInning: {
    type: String,
    default: "firstInning",
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
    default: "",
  },
});

const Match = mongoose.models.Match || mongoose.model("Match", matchSchema);

export default Match;
