import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import {CartScreen} from './screens/CartScreen/CartScreen.js';
import {CheckoutScreen} from './screens/CheckoutScreen/CheckoutScreen.js';
import {HomeScreen} from './screens/HomeScreen/HomeScreen.js';
import {ProductScreen} from './screens/ProductScreen/ProductScreen.js';
import {ThankScreen} from './screens/ThankScreen/ThankScreen.js';

/**
 * Component to wrap the rest of the website with common components.
 * @return {!JSX} Returns site presentation for header, navigation,
 *     and shopping cart.
 */
export function Router() {
  return (
    <Switch>
      <Route path="/product/:id">
        <ProductScreen/>
      </Route>
      <Route path="/checkout">
        <CheckoutScreen/>
      </Route>
      <Route path="/cart">
        <CartScreen/>
      </Route>
      <Route path="/thanks">
        <ThankScreen/>
      </Route>
      <Route path="/">
        <HomeScreen/>
      </Route>
    </Switch>
  );
}
