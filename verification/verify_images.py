from playwright.sync_api import sync_playwright, expect
import time

def verify_images(page):
    # Navigate to home
    page.goto("http://localhost:4321")

    # Wait for hydration
    page.wait_for_load_state("networkidle")

    # Accept cookies to clear the banner (optional, but good for visibility)
    # page.get_by_role("button", name="Akzeptieren").click()

    # Verify Gallery Grid
    gallery_section = page.locator("#gallery")
    gallery_section.scroll_into_view_if_needed()

    # Small sleep to allow animations to finish
    time.sleep(1)

    # Verify first image
    first_gallery_image = gallery_section.locator("img").first
    expect(first_gallery_image).to_be_visible()

    # Screenshot the section
    gallery_section.screenshot(path="verification/gallery_section.png")
    print("Gallery screenshot taken.")

    # Verify Dampfdrachen and Glossboss
    dampfdrachen_heading = page.get_by_role("heading", name="Dampfdrachen")
    dampfdrachen_heading.scroll_into_view_if_needed()
    time.sleep(1)

    # Check for the images
    dampf_img = page.get_by_alt_text("Dampfdrachen Reinigungsgerät")
    expect(dampf_img).to_be_visible()

    # Screenshot the dampfdrachen container
    dampf_container = dampf_img.locator("..") # Parent
    dampf_container.screenshot(path="verification/dampfdrachen.png")

    # Glossboss image has alt="Glossboss Logo"
    gloss_img = page.get_by_alt_text("Glossboss Logo")
    expect(gloss_img).to_be_visible()

    # Screenshot glossboss container
    gloss_container = gloss_img.locator("..")
    gloss_container.screenshot(path="verification/glossboss.png")

    print("Partners screenshot taken.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        # Set a large viewport to verify layout
        page.set_viewport_size({"width": 1280, "height": 800})
        try:
            verify_images(page)
        finally:
            browser.close()
