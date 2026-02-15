// import React,{Component} from 'react';
// import StripeCheckout from 'react-stripe-checkout';
// import {connect} from 'react-redux';
// import * as actions from '../actions';


// class Payments extends Component {
// render(){
//     debugger;
// return(
// <StripeCheckout
// name="Emaily"
// description="$5 for 5 email credits"
// amount={500}
// token={token=>this.props.handleToken(token)}
// stripeKey={process.env.REACT_APP_STRIPE_KEY}
// >
// <button className="btn">Add Credits</button>
// </StripeCheckout>
// )
// }
// }
// export default connect(null, actions)(Payments);


import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { useState, useEffect } from 'react';
import axios from 'axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage('');

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/api/stripeconfirm`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      onClose(); // Close popup after successful payment
    }
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <button type="submit" disabled={isProcessing || !stripe} className="btn">
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
      <button type="button" onClick={onClose} className="btn" style={{ marginLeft: '10px' }}>
        Cancel
      </button>
    </form>
  );
};

// class Payments extends Component {
 
//   renderContent() {
//     this.props.fetchClientSecret();
//     // Fetch clientSecret from your backend
//     switch(this.props.clientSecret){
//       case null:
//         return <div>Loading...</div>;
//       case false:
//         return <div>Error loading payment form</div>;
//       default:
//         return <Elements 
//         stripe={stripePromise} 
//         options={{
//           clientSecret: this.props.clientSecret,
//           appearance: {
//             theme: 'stripe',
//           },
//         }}
//       >
//         <CheckoutForm/>
//       </Elements>;

//      }
//   }

  

//   render() {
//     return (
//         <div>
//       <button onClick={() => this.props.fetchClientSecret()}>
//         Add Credits
//     </button>
//     </div>
   
  
//     );
//   }
// }

class Payments extends Component {
    state = {
      showPopup: false
    };
  
    handleOpenPopup = async () => {
      // Fetch clientSecret when opening popup
      await this.props.fetchClientSecret();
      this.setState({ showPopup: true });
    };
  
    handleClosePopup = () => {
      this.setState({ showPopup: false });
    };
  
    renderContent() {
        console.log("rendercontent is called");
      const clientSecret  = this.props.paymentIntent.client_secret;
      
      if (!clientSecret) {
        return <div>Loading payment form...</div>;
      }
  
      return (
        <Elements 
          stripe={stripePromise} 
          options={{
            clientSecret: clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <CheckoutForm 
          onClose={this.handleClosePopup}
          />
        </Elements>
      );
    }
  
    render() {
      const { showPopup } = this.state;
  
      return (
        <div>
          <button onClick={this.handleOpenPopup} className="btn">
            Add Credits
          </button>
  
          {/* Popup Modal */}
          {showPopup && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}>
              <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '8px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto'
              }}>
                <h2 style={{ marginTop: 0 }}>Add Credits</h2>
                {this.renderContent()}
              </div>
            </div>
          )}
        </div>
      );
    }
  }


function mapStateToProps(state) {
    return {
        paymentIntent: state.paymentIntent,  // Clean separation
        auth: state.auth
    };
}
    

export default connect(mapStateToProps, actions)(Payments);
