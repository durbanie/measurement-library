import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Col, Row, Button} from 'react-bootstrap';
import {UserInfoForm} from '../../components/UserInfoForm/UserInfoForm.js';
import {useHistory} from 'react-router-dom';
import './CheckoutScreen.css';
import {MiniCart} from '../../components/MiniCart/MiniCart.js';
// eslint-disable-next-line max-len
import {BillingInfoForm} from '../../components/BillingInfoForm/BillingInfoForm.js';
import {clearCart} from '../../store/StoreHelpers.js';

/**
 * The ID for the personal info form the user will fill out on this page.
 * @const {string}
 */
const USER_FORM_ID = 'user-info-form';

/**
 * The ID for the billing info form the user will fill out on this page.
 * @const {string}
 */
const BILLING_FORM_ID = 'billing-info-form';

/**
 * Page component for a user to enter in personal billing information
 * and confirm the items in their cart.
 * @param {function()} clearCart A function to clear all items from cart.
 * @return {!JSX}
 */
const CheckoutScreenBase = ({clearCart}) => {
  const [shippingDone, setShippingDone] = useState(false);
  const /** !Object */ history = useHistory();

  /**
   * If the personal information the user has put in is valid,
   * display the billing information form.
   * Otherwise, alert the user that their form is invalid.
   */
  function continueIfPersonalValid() {
    const form = document.getElementById(USER_FORM_ID);
    if (form.checkValidity()) {
      setShippingDone(true);
    } else {
      form.reportValidity();
    }
  }

  /**
   * Navigate to the thank you page iff the user info form and
   * billing forms are valid.
   * Otherwise, alert the user of invalid form fields
   */
  function navIfFormValid() {
    const formPersonal = document.getElementById(USER_FORM_ID);
    const formBilling = document.getElementById(BILLING_FORM_ID);
    if (formBilling.checkValidity() && formPersonal.checkValidity()) {
      clearCart();
      // navigate to thank you page with react-router
      history.push('/thanks');
    } else {
      formPersonal.reportValidity();
      formBilling.reportValidity();
    }
  }

  const submitUserInfoButton =
      <Button onClick={continueIfPersonalValid}>Continue</Button>;
  const billingForm = (<>
    <BillingInfoForm formId={BILLING_FORM_ID}/>
    <Button onClick={navIfFormValid}>Confirm order</Button>
  </>);

  return (
    <Container>
      <Row className='checkout-header'>
        <Col xs={12} md={6}>Billing Details</Col>
        <Col xs={12} md={6} className='hide-medium-or-smaller'>Your order</Col>
      </Row>
      <Row className='checkout-content'>
        <Col xs={12} md={6}>
          <UserInfoForm formId={USER_FORM_ID}/>
        </Col>
        <Col xs={12} className='hide-medium-or-bigger checkout-header'>
          Your order
        </Col>
        <Col xs={12} md={6}>
          <MiniCart/>
          {shippingDone ? billingForm : submitUserInfoButton}
        </Col>
      </Row>
    </Container>
  );
};

CheckoutScreenBase.propTypes = {
  clearCart: PropTypes.func,
};

export const CheckoutScreen = connect(null,
    {clearCart})(CheckoutScreenBase);
