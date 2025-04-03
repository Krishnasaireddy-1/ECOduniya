import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    alert("Payment successful!");
    navigate("/business/home"); // Redirect to home
  };

  return (
    <div className="payment-container">
      <h2>Complete Your Payment</h2>
      <p>Amount: ₹500</p>
      <button onClick={handlePaymentSuccess}>Pay Now</button>
    </div>
  );
};

export default Payment;
