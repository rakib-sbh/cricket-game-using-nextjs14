import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "./features/cricketGame/gameSlice";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;
