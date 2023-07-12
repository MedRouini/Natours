const stripe = Stripe('pk_test_51MahyXB6OCm6U3hyz5Eh6VfCD7CTnl0z43OpjW3iRkfKTg7w5eKrg1WyRpQQnVtkr7YPlvP8zDtqFN4KePFVH5xp009ZbtkqSS');
import axios from 'axios';
import { showAlert  } from './alerts';
export const bookTour = async (tourId) => {

  try {
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
    console.log(session);
  } catch (error) {
    console.log(error);
    showAlert('error', error)
  }
};