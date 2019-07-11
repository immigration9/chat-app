import React from 'react';
import { mount } from 'enzyme';
import { Input } from 'antd';
import Login from 'containers/Login/Login';
import Root from 'Root';

let wrapper;

describe('login test', () => {
  beforeEach(() => {
    wrapper = mount(
      <Root>
        <Login />
      </Root>
    )
  })

  afterEach(() => {
    wrapper.unmount();
  })

  it('value change', () => {
    wrapper.find('input').simulate('change', {
      target: { value: 'immigration9' }
    })
    expect(wrapper.find('input').prop('value')).toBe('immigration9');
  })
})