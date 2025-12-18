import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import Navbar from "../components/Navbar";
import { styles } from "./Payment.styles";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Payment() {
  const location = useLocation();
  const booking = location.state || {};

  // Demo-style: Stripe calls this function to get the clientSecret
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
  }, [booking]);

  return (
    <div style={styles.pageWrap}>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Payment</h2>

        <div style={styles.checkoutWrap}>
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ fetchClientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}

export default Payment;
