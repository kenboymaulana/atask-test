import { combineReducers } from 'redux';

// project import
import Users from '@/store/reducers/users/reducer';
import Repos from '@/store/reducers/repos/reducer';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  Users,
  Repos,
});

export default reducers;
