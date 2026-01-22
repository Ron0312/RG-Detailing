# Google Reviews Update Automation

This project includes a script to fetch Google Reviews via the Google Places API.

## Setup

1.  **Get a Google Places API Key**
    *   Go to Google Cloud Console.
    *   Enable "Places API".
    *   Create an API Key.

2.  **Find your Place ID**
    *   Use the [Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
    *   Search for "RG Detailing Tensfeld".

## Usage (Manual)

```bash
export GOOGLE_PLACES_API_KEY="your_api_key_here"
export PLACE_ID="your_place_id_here"
node scripts/update_reviews.js
```

## Usage (GitHub Actions / Weekly Automation)

You can set up a GitHub Action to run this weekly.

1.  Go to your GitHub Repository Settings > Secrets and variables > Actions.
2.  Add `GOOGLE_PLACES_API_KEY` and `PLACE_ID`.
3.  Create a workflow file `.github/workflows/update-reviews.yml` (content is in the script comments).

The script is located at `scripts/update_reviews.js`.
