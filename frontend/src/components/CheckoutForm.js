import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/ticket",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button style={{ marginTop: 16 }} disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default CheckoutForm;
