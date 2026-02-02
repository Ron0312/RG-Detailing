from playwright.sync_api import sync_playwright, expect

def verify_homepage(page):
    # Go to homepage
    page.goto("http://localhost:4321")

    # Wait for hero to load
    expect(page.get_by_role("heading", name="Neuwagen-Gefühl")).to_be_visible()

    # Check if Title contains Config Name
    expect(page).to_have_title("Premium Fahrzeugaufbereitung & Keramikversiegelung | RG Detailing")

    # Check for "RG Detailing" text
    expect(page.get_by_text("RG Detailing").first).to_be_visible()

    # Take screenshot
    page.screenshot(path="verification/homepage.png", full_page=True)
    print("Screenshot saved to verification/homepage.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_homepage(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
