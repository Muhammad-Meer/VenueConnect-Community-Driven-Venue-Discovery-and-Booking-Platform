import request from './api'

export const createPayment = (paymentData) =>
  request('/payments', {
    method: 'POST',
    body: JSON.stringify(paymentData),
  })

export const getPaymentById = (id) => request(`/payments/${id}`)

export const verifyPayment = (paymentId) =>
  request(`/payments/${paymentId}/verify`, {
    method: 'POST',
  })
