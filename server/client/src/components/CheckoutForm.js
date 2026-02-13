
import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { connect } from 'react-redux';
import * as actions from '../actions';

class CheckoutForm extends Component {


  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.confirmPayment(this.props.paymentIntent.id);
    
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
          confirmPayment={this.props.confirmPayment(this.props.paymentIntent.id)}
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