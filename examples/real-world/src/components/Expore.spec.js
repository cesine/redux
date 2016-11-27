import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Explore from './Explore'

describe('Explore component', () => {
  it('should call onChange', () => {
    const onChange = expect.createSpy();

    const component = shallow(
      <Explore value='sillsdev' onChange={onChange} />
    );

    const input = component.find('input');
    expect(input.type()).toEqual('input');
    expect(input.props().defaultValue).toEqual('sillsdev');

    const button = component.find('button');
    expect(button.type()).toEqual('button');
    expect(button.text()).toEqual('Go!');

    const e = {
      type: 'click',
      preventDefault: () => {
      }
    };
    button.simulate('click', e);
    expect(onChange).toHaveBeenCalledWith('sillsdev');
  });

  it('should use the input to call onChange', () => {
    const onChange = expect.createSpy();

    const component = shallow(
      <Explore value='' onChange={onChange} />
    );

    const input = component.find('input');
    expect(input.type()).toEqual('input');
    expect(input.text()).toEqual('');

    const button = component.find('button');
    expect(button.type()).toEqual('button');
    expect(button.text()).toEqual('Go!');

    const e = {
      type: 'click',
      preventDefault: () => {
      }
    };
    try {
      button.simulate('click', e);
    } catch (err) {
      expect(err.message).toEqual('Cannot read property \'value\' of undefined');
    }

    // How to simulate typing
    // https://github.com/airbnb/enzyme/issues/76
    const typing = {
      target: {
        value: 'acme'
      }
    };
    input.simulate('change', typing);
    button.simulate('click', e);
    expect(onChange).toHaveBeenCalledWith('acme');
  });
});
