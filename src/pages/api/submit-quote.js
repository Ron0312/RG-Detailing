import { z } from 'zod';

const QuoteSchema = z.object({
  size: z.enum(['small', 'medium', 'large']),
  condition: z.enum(['new', 'good', 'bad']),
  service: z.enum(['sale', 'shine', 'defect']),
});

const BASE_PRICES = {
  sale: 150,
  shine: 250,
  defect: 400
};

const SIZE_MULTIPLIERS = {
  small: 1.0,
  medium: 1.2,
  large: 1.5
};

const CONDITION_MULTIPLIERS = {
  new: 1.0,
  good: 1.2,
  bad: 1.5
};

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const result = QuoteSchema.safeParse(body);

    if (!result.success) {
      return new Response(JSON.stringify({ error: 'Invalid data', details: result.error }), { status: 400 });
    }

    const { size, condition, service } = result.data;

    // Core calculation logic
    const base = BASE_PRICES[service];
    const sizeMult = SIZE_MULTIPLIERS[size];
    // Condition multiplier applies mostly to shine and defect, less to sale?
    // Simplified logic as per prompt requirements: "SUV mit stark verwittertem Lack deutlich teurer"
    const condMult = CONDITION_MULTIPLIERS[condition];

    const calculatedPrice = Math.round(base * sizeMult * condMult);

    // Create a range (+/- 10%)
    const minPrice = Math.floor(calculatedPrice * 0.9 / 10) * 10;
    const maxPrice = Math.ceil(calculatedPrice * 1.1 / 10) * 10;

    // In a real scenario, we would use nodemailer here to send an email
    // console.log(`Sending email for quote: ${minPrice}-${maxPrice} EUR`);

    return new Response(JSON.stringify({
      success: true,
      minPrice,
      maxPrice
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server Error' }), { status: 500 });
  }
}
