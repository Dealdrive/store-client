import React from 'react';
import styled from 'styled-components';
import paystack from 'paystack';
import PaystackButton from 'paystack-react/dist/index';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Input = styled.input`
  height: 32px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 8px;
`;

class PaymentForm extends React.Component {
  state = {
    name: '',
    email: '',
    amount: '',
    transaction: null,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, amount } = this.state;

    // Initialize the Paystack payment
    const transaction = await paystack.transaction.initialize({
      key: process.env.PAYSTACK_SECRET_KEY,
      email,
      amount: parseInt(amount, 10) * 100, // Paystack requires the amount in kobo
      callback_url: `${process.env.BASE_URL}/paystack/callback`,
    });

    this.setState({ transaction });
  };

  render() {
    const { name, email, amount, transaction } = this.state;

    if (transaction) {
      return (
        <PaystackButton
          text="Make Payment"
          className="payButton"
          callback={(response) => console.log(response)}
          close={() => console.log('Payment closed')}
          embed={false}
          reference={transaction.reference}
          email={email}
          amount={amount * 100}
          paystackkey={process.env.PAYSTACK_PUBLIC_KEY}
        />
      );
    }

    return (
      <FormContainer>
        <form onSubmit={this.handleSubmit}>
          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </FormField>
          <FormField>
            <Label htmlFor="amount">Amount (in Naira)</Label>
            <Input
              type="number"
              name="amount"
              value={amount}
              onChange={this.handleChange}
              required/>
              </FormField>
              <Input type="submit" value="Submit" />
              </form>
              </FormContainer>
              );
            }
          }
          export default PaymentForm;