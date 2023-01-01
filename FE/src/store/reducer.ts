import { combineReducers } from '@reduxjs/toolkit';

import authentication from '../auth/authenticationSlice';

const rootReducer = combineReducers({
  authentication,
});

export default rootReducer;
