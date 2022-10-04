import { combineReducers } from 'redux';
import user from './user';
import discoveryAnimals from './discoveryAnimals';
import heartAnimals from './heartAnimals';

const rootReducer = combineReducers({
  user,
  discoveryAnimals,
  heartAnimals,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
