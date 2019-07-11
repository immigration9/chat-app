import { loginUser } from 'actions';
import { LOGIN } from 'actions/types';

/**
 * Action Test는 모두 Type Checking과 Payload Checking 두 가지를 갖는다.
 */
describe('login user', () => {
  it('type check', () => {
    const action = loginUser();

    expect(action.type).toEqual(LOGIN);
  })

  it('payload check', () => {
    const actionWithPayload = loginUser('immigration9');

    expect(actionWithPayload.payload).toEqual('immigration9');
  })
})