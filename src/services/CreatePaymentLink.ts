import { PayType } from '@/models/Appointment';

import axios from 'axios';

export const createPaymentLink = async (paymentType: PayType, value: Number) => {
  const api = axios.create({
    baseURL: 'https://sandbox.asaas.com/api/v3/',
    headers: {
      'Content-Type': 'application/json',
      access_token:
        '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzE1MDk6OiRhYWNoX2MzMGM1YWRmLWYzZjMtNDc4Yy04MmU0LTgwY2Y3YzYwNmJhOA==',
      'Access-Control-Allow-Origin': 'http://localhost:3000', // Allow CORS for localhost
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  const paymentData = {
    billingType: paymentType === PayType.PIX ? 'PIX' : 'CREDIT_CARD',
    chargeType: 'DETACHED',
    name: 'Corte de Cabelo',
    description: 'Pagamento corte de cabelo',
    dueDateLimitDays: 10,
    value: value,
    notificationEnabled: false,
  };

  try {
    const response = await api.post('/paymentLinks', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error creating payment link:', error);
    throw error;
  }
};

export const requestPaymentLink = async (paymentType: PayType, value: Number) => {
  const paymentData = {
    billingType: paymentType === PayType.PIX ? 'PIX' : 'CREDIT_CARD',
    chargeType: 'DETACHED',
    name: 'Corte de Cabelo',
    description: 'Pagamento corte de cabelo',
    dueDateLimitDays: 10,
    value: value,
    notificationEnabled: false,
  };

  const response = await fetch('https://sandbox.asaas.com/api/v3/paymentLinks', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token:
        '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzE1MDk6OiRhYWNoX2MzMGM1YWRmLWYzZjMtNDc4Yy04MmU0LTgwY2Y3YzYwNmJhOA==',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Credentials': 'true',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
