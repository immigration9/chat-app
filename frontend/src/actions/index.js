import { LOGIN } from 'actions/types';

export function loginUser(username) {
  return {
    type: LOGIN,
    payload: username
  }
}