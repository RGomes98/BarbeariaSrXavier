import { Haircut, PaymentMethod } from '@/lib/schemas';

import axios from 'axios';

export const createPaymentLink = async (paymentType: PaymentMethod, hairCut: Haircut) => {
  const api = axios.create({
    baseURL: 'https://api.asaas.com/api/v3',
    headers: {
      'Content-Type': 'application/json',
      access_token:
        '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA0MDE4MDQ6OiRhYWNoX2JhNzMyYjlhLWQxMGUtNDY4OS05MjMxLTA1NDY3YzBlZmQ1YQ==',
      'Access-Control-Allow-Origin': 'http://localhost:3000', // Allow CORS for localhost
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  const paymentData = {
    billingType: paymentType === 'PIX' ? 'PIX' : 'CREDIT_CARD',
    chargeType: 'DETACHED',
    name: hairCut.name,
    description: hairCut.description,
    dueDateLimitDays: 10,
    value: hairCut.price,
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

export const requestPaymentLink = async (paymentType: PaymentMethod, hairCut: Haircut) => {
  const paymentData = {
    billingType: paymentType === 'PIX' ? 'PIX' : 'CREDIT_CARD',
    chargeType: 'DETACHED',
    name: hairCut.name,
    description: hairCut.description,
    dueDateLimitDays: 10,
    value: hairCut.price,
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
