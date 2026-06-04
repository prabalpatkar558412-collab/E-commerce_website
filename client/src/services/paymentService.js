import api from "./api";

export const createRazorpayOrder = async (amount) => {
  const response = await api.post("/payments/create-order", {
    amount,
  });

  return response.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const response = await api.post("/payments/verify", paymentData);

  return response.data;
};