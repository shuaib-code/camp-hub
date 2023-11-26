import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axiosPublic from "../config/axios.config.js";
import useAuth from "../hook/useAuth";
import toast from "react-hot-toast";

const ChackOutForm = ({ fee, id, modal, refech }) => {
  const { campName, date, time, _id } = id;
  const [btn, setBtn] = useState(1);
  const [error, setError] = useState("");
  const [clientSecret, setSecret] = useState();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    axiosPublic
      .post("/paymentintent", { fee })
      .then((r) => setSecret(r.data.clientSecret));
  }, [fee]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBtn(0);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //   console.log("Payment Error:", error);
      setError(error.message);
    } else {
      //   console.log("Payment Method", paymentMethod);
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displyaName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirmerror", confirmError);
    } else {
      //   console.log("payment Intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        const history = {
          campName,
          date,
          time,
          fee,
          status: paymentIntent.status,
          transiction: paymentIntent.id,
          paid: paymentIntent.created,
          email: user.email,
        };
        axiosPublic.post(`/paymenthistory?id=${_id}`, history).then(() => {
          toast.success("Payment Successfull");
          refech();
        });
      }

      setBtn(1);
      modal(0);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-center mt-3 w-full">
        <button
          className="btn-small my-4 px-9"
          type="submit"
          disabled={!stripe || !clientSecret || !btn}
        >
          {btn ? "Pay" : "Processing..."}
        </button>
      </div>
      <p className="text-red-700">{error}</p>
      {/* {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )} */}
    </form>
  );
};

export default ChackOutForm;
