import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REVIEWS_FILE = path.join(__dirname, '../src/data/reviews.json');
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID; // The Place ID for R.G.Detailing

async function updateReviews() {
  if (!API_KEY || !PLACE_ID) {
    console.error('Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID environment variables.');
    process.exit(1);
  }

  try {
    // 1. Read existing reviews
    console.log('Reading existing reviews...');
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8');
    const existingReviews = JSON.parse(data);

    // 2. Fetch new reviews from Google Places API
    console.log('Fetching reviews from Google Places API...');
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${API_KEY}&language=de`;

    const response = await fetch(url);
    const json = await response.json();

    if (!json.result || !json.result.reviews) {
      console.log('No reviews found in API response.');
      return;
    }

    const apiReviews = json.result.reviews;
    let newReviewsCount = 0;

    // 3. Merge reviews (avoid duplicates based on author name)
    // We iterate through API reviews and add them only if they don't exist in our file
    const newReviews = apiReviews.map(review => {
      return {
        name: review.author_name,
        date: review.relative_time_description, // e.g., "vor 2 Wochen"
        stars: review.rating,
        text: review.text
      };
    }).filter(newReview => {
      const exists = existingReviews.some(
        existing => existing.name === newReview.name
      );
      if (!exists) {
        newReviewsCount++;
        return true;
      }
      return false;
    });

    if (newReviewsCount > 0) {
      console.log(`Found ${newReviewsCount} new reviews. Adding them to the list.`);

      // Prepend new reviews to the top of the list
      const updatedReviews = [...newReviews, ...existingReviews];

      // 4. Write back to file
      await fs.writeFile(REVIEWS_FILE, JSON.stringify(updatedReviews, null, 2));
      console.log('Successfully updated reviews.json');
    } else {
      console.log('No new reviews to add. Local file is up to date.');
    }

  } catch (error) {
    console.error('Error updating reviews:', error);
    process.exit(1);
  }
}

updateReviews();
