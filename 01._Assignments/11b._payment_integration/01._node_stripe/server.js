
import stripe from 'stripe';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:8080';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripeInstance.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1RM2e1PEFOgloLnVHK2wexfX',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});
app.get('/checkout', (req, res) => {
    res.sendFile('checkout.html', { root: './public' });
  });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});