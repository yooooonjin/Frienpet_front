import { combineReducers } from 'redux';
import user from './user';
import discoveryAnimals from './discoveryAnimals';

const rootReducer = combineReducers({
  user,
  discoveryAnimals,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
