import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaymentPage = () => {
  const [showPayPal, setShowPayPal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Ban đầu là null, chưa có gói nào được chọn

  const plans = {
    Individual: {
      price: "10.00",
      description: "Individual",
      features: [
        "1 Premium account",
        "Cancel anytime",
        "Skip as many songs as you want",
      ],
      color: "text-red-500", // Màu chữ cho từng gói
      backgroundColor: "bg-red-100", // Màu nền cho gói
    },
    Duo: {
      price: "12.99",
      description: "Duo",
      features: [
        "Two accounts, one payment",
        "Ad-free music",
        "Offline listening",
      ],
      color: "text-blue-500", // Màu chữ cho từng gói
      backgroundColor: "bg-blue-100", // Màu nền cho gói
    },
    Family: {
      price: "14.99",
      description: "Family",
      features: [
        "Up to 6 accounts",
        "Ad-free music",
        "Offline listening",
        "Spotify Kids app",
      ],
      color: "text-green-500", // Màu chữ cho từng gói
      backgroundColor: "bg-green-100", // Màu nền cho gói
    },
    Student: {
      price: "4.99",
      description: "Student",
      features: [
        "Ad-free music",
        "Offline listening",
        "Skip as many songs as you want",
        "50% off on Premium",
      ],
      color: "text-yellow-500", // Màu chữ cho từng gói
      backgroundColor: "bg-yellow-100", // Màu nền cho gói
    },
  };

  const handleBuyNowClick = () => {
    if (!selectedPlan) {
      alert("Please select a plan before proceeding to payment.");
      return;
    }
    setShowPayPal(true);  // Hiển thị PayPal khi nhấn "Buy Now"
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="max-w-4xl w-full bg-black p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Upgrade to Premium
        </h1>

        {/* Đưa tất cả vào một div duy nhất */}
        <div className="flex flex-col justify-center items-center">
          {/* Các gói cước */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {Object.keys(plans).map((plan) => (
              <div
                key={plan}
                className={`${plans[plan].backgroundColor} p-6 rounded-lg shadow-md w-80`}
              >
                <h2 className={`text-2xl font-bold text-center ${plans[plan].color} mb-4`}>
                  {plans[plan].description}
                </h2>
                <p className="text-center text-lg text-gray-600 mb-4">
                  Enjoy ad-free music, offline listening, and much more!
                </p>
                <div className="text-center mb-4">
                  <p className="text-xl font-bold text-green-600">${plans[plan].price}</p>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
                <ul className="text-left text-sm text-gray-600">
                  {plans[plan].features.map((feature, index) => (
                    <li key={index} className="mb-2">• {feature}</li>
                  ))}
                </ul>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setSelectedPlan(plan)}  // Cập nhật gói khi người dùng chọn
                    className={`px-4 py-2 rounded ${selectedPlan === plan ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600`}
                  >
                    {plan} Plan
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Nút Buy Now */}
          <div className="flex justify-center mb-6">
            {/* Hiển thị Buy Now chỉ khi đã chọn gói */}
            <button
              onClick={handleBuyNowClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={!selectedPlan}  // Disable nếu chưa chọn gói
            >
              Buy Now
            </button>
          </div>

          {/* Hiển thị PayPal */}
          {showPayPal && selectedPlan && (
            <div className="flex justify-center items-center mb-6 w-full">
              <div className="w-full max-w-md"> 
                <PayPalButtons
                  style={{
                    layout: 'vertical',
                    height: 40,
                    width: '100%',  
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: plans[selectedPlan].price, 
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                      alert("Transaction completed by " + details.payer.name.given_name);
                    });
                  }}
                />
              </div>
            </div>
          )}

          {/* Điều khoản và chính sách */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By clicking "Subscribe", you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
