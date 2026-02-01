from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Verify Dampfreinigung
        print("Navigating to /dampfreinigung...")
        page.goto("http://localhost:4321/dampfreinigung")

        # Check background logo (Image component generates an img)
        bg_logo = page.locator('img[alt="Dampfdrachen Hintergrund"]')
        expect(bg_logo).to_be_visible()
        print("Background logo visible")

        # Check Partner Logo
        partner_logo = page.locator('img[alt="Dampfdrachen Logo"]')
        expect(partner_logo).to_be_visible()
        print("Partner logo visible")

        page.screenshot(path="verification/dampfreinigung_images.png", full_page=True)
        print("Screenshot saved to verification/dampfreinigung_images.png")

        # Verify Index Background
        print("Navigating to /...")
        page.goto("http://localhost:4321/")

        # Check for the YouTube teaser background
        # The style attribute contains the optimized image URL (which changes every build), so we check if style contains 'background-image'
        youtube_teaser = page.locator('a[href*="youtube.com"] div[style*="background-image"]')
        expect(youtube_teaser).to_be_visible()
        print("Index background visible")

        page.screenshot(path="verification/index_background.png")
        print("Screenshot saved to verification/index_background.png")

        browser.close()

if __name__ == "__main__":
    run()
