import { LOGIN } from 'actions/types';
import userInfoReducer, { initialState } from 'reducers/userInfo'

/**
 * 모든 Reducer는 아래와 같은 테스트 과정을 거친다.
 * 1. Action 실행 후 정상적인 값의 변경
 * 2. 해당되지 않은 타입이 들어간 경우
 */
describe('user info', () => {
  it ('before user reducer', () => {
    const username = 'immigration9'
    const action = {
      type: LOGIN,
      payload: username
    }
    const newState = userInfoReducer(initialState, action);

    initialState.user = username;
    expect(newState).toEqual(initialState);
  })

  it ('unsupported action type', () => {
    const unsupportedAction = {
      type: 'SOMETHING WRONG',
      payload: 'SOMETHING WRONG'
    }
    const newState = userInfoReducer(initialState, unsupportedAction);

    expect(newState).toEqual(initialState)
  })
})