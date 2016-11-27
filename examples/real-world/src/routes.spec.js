import expect from 'expect'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'

import routes from './routes'

/**
https://raw.githubusercontent.com/ReactTraining/react-router/master/modules/__tests__/serverRendering-test.js
*/
describe('server rendering', function() {
  xit('should show user page', function(done) {
    match({
      routes,
      location: '/acme'
    }, function(error, redirectLocation, renderProps) {
      expect(renderProps.location.pathname).toEqual('/acme');
      expect(renderProps.params.login).toEqual('acme');

      console.log(renderProps.components[0]);
      expect(renderProps.components[0].displayName).toEqual('Connect(App)');
      expect(renderProps.components[1].displayName).toEqual('Connect(UserPage)');

      /**
      Invariant Violation: Could not find "store" in either the context or props of "Connect(App)".
      Either wrap the root component in a <Provider>, or explicitly pass "store" as
      a prop to "Connect(App)".

      contextTypes: { store: { [Function: bound checkType] isRequired: [Function: bound checkType] } },
      propTypes: { store: { [Function: bound checkType] isRequired: [Function: bound checkType] } } }
      */
      // console.log('Root', Root.propTypes);
      const asString = renderToString(
        <RouterContext {...renderProps} />
      );
      expect(asString).toEqual('')
      done();
    });
  });
});
