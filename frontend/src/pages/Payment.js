import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {  EmbeddedCheckoutProvider,  EmbeddedCheckout,} from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Payment() {
  // Demo-style: Stripe calls this function to get the clientSecret
  const location = useLocation();
const booking = location.state || {};

  const fetchClientSecret = useCallback(() => {
    return fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movieTitle: booking.movieTitle || "Movie Ticket",
      showtime: booking.showtime || "",
      seats: booking.seats || [],
        theatreName: booking.theatreName || "",
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Payment</h2>

        <div style={{ maxWidth: 520 }}>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </>
  );
}

export default Payment;
