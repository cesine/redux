import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import Repo from './Repo'

describe('Repo component', () => {
  it('should render a div tag', () => {
    const actions = {
      onClick: expect.createSpy()
    };
    const owner = {
      login: 'acme'
    };
    const repo = {
      name: 'ACME',
      description: 'test repo'
    };
    const component = shallow(
      <Repo owner={owner} repo={repo} {...actions} />
    );

    const links = component.find('Link');
    expect(links.length).toEqual(2);
    expect(links.get(0).props.to).toEqual('/acme/ACME');
    expect(links.get(1).props.to).toEqual('/acme');

    const title = component.find('h3');
    expect(title.type()).toEqual('h3');
    expect(title.text()).toEqual('<Link /> by <Link />');
    expect(title.html()).toEqual('<h3><a>ACME</a> by <a>acme</a></h3>');

    const desc = component.find('p');
    expect(desc.length).toEqual(1);
    expect(desc.type()).toEqual('p');
    expect(desc.text()).toEqual('test repo');
  });
});
