import {
  CLOSE_IMPORT_DIALOG,
  SHOW_IMPORT_DIALOG,
} from '../actions/import_actions';

const INITIAL_STATE = false;

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_IMPORT_DIALOG:
      return action.payload;
    case CLOSE_IMPORT_DIALOG:
      return action.payload;
    default:
      return state;
  }
}
