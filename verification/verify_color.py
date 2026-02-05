from playwright.sync_api import sync_playwright, expect

def verify_color_change(page):
    page.goto("http://localhost:4321")

    # Check the "Neuwagen-Gefühl" span.
    # In index.astro: <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-primary-800">
    # We can check computed style of an element using primary color.

    # Let's check the "Kostenlos Preis berechnen" button bg color.
    # It has class `bg-primary-700` (which we didn't change in the quick test, we changed 400, 500, 600).
    # Wait, in the patch I changed 400, 500, 600.
    # The button uses `bg-primary-700`.
    # Let's check a link that uses `text-primary`.
    # The "Labocosmetica Zertifiziert" badge uses text-white.

    # In Header.astro: `group-hover:text-primary` for the logo text.

    # Let's check the "Neuwagen-Gefühl" gradient.
    # It uses `from-primary-500`.
    # Computed style is hard for gradients.

    # Let's look for something with `text-primary-500` or `bg-primary-500`.
    # The mobile menu button uses... no.

    # Ah, I see `text-primary` is mapped to `var(--color-primary-500)`.
    # So if I find an element with `text-primary`, its color should be blue (#3b82f6 approx rgb(59, 130, 246)).

    # The Services headline "Ihr Fahrzeug in besten Händen" has `text-primary`.
    # <span class="text-primary font-bold tracking-widest text-sm uppercase">Ihr Fahrzeug in besten Händen</span>

    headline = page.get_by_text("Ihr Fahrzeug in besten Händen")
    headline.scroll_into_view_if_needed()

    # Take screenshot for visual confirmation
    page.screenshot(path="verification/blue_theme.png", full_page=True)
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_color_change(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
