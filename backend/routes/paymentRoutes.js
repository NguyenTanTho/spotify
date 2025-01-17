import express from 'express';
import paypal from '@paypal/checkout-server-sdk';

const router = express.Router();

// Cấu hình PayPal SDK
// if (!process.env.CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
//   throw new Error("PayPal client ID or secret is missing");
// }

const environment = new paypal.core.SandboxEnvironment(
  process.env.CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Route thanh toán
router.post('/create-payment', async (req, res) => {
  const { price } = req.body;

  // Kiểm tra xem giá có hợp lệ không
  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    return res.status(400).send('Invalid price value');
  }

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: price,  // Giá truyền từ client
        },
      },
    ],
    application_context: {
      return_url: 'http://localhost:5000/api/payment/success',
      cancel_url: 'http://localhost:5000/api/payment/cancel',
    },
  });

  try {
    const order = await client.execute(request);
    res.json(order.result);
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    res.status(500).send('Error creating PayPal payment');
  }
});

// Endpoint thanh toán thành công
router.get('/success', (req, res) => {
  // Thêm xử lý sau khi thanh toán thành công (lưu thông tin, gửi email, v.v.)
  res.send('Payment successful');
});

// Endpoint thanh toán bị hủy
router.get('/cancel', (req, res) => {
  res.send('Payment canceled');
});

export default router;
