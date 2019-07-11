import { LOGIN } from 'actions/types';

export const initialState = {
  user: undefined
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload }
    default:
      return state;
  }
}