import { createSlice } from "@reduxjs/toolkit";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  currentAnimation: null,
  skins: [],
  isCompleted: false,
  itemClaim: null,
  totalRepeat: 1,
};

const slice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // SET ANIMATION
    setAnimation(state, action) {
      state.isLoading = false;
      state.currentAnimation = action.payload;
    },

    // SET IMAGE URL
    setSkins(state, action) {
      state.skins = action.payload;
    },

    // SET IS FINISHED ANIMATION
    setIsCompleted(state, action) {
      state.isCompleted = action.payload;
    },

    // SET ITEM CLAIM
    setItemClaim(state, action) {
      state.itemClaim = action.payload;
    },

    // SET REPEAT AMOUNT
    setTotalRepeat(state, action) {
      state.totalRepeat = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setAnimation,
  setSkins,
  setIsCompleted,
  setItemClaim,
  setTotalRepeat,
} = slice.actions;
