from playwright.sync_api import sync_playwright, expect
import requests
import os
import time

def run():
    print("Verifying Sitemap...")
    try:
        r = requests.get("http://localhost:4321/sitemap.xml")
        if r.status_code != 200:
            print(f"Sitemap failed with status {r.status_code}")
            print(f"Response: {r.text[:200]}")
        assert r.status_code == 200
        content = r.text
        # Check for some expected pages
        assert "impressum" in content
        assert "wohnmobil" in content
        assert "<loc>http://localhost:4321/</loc>" in content
        print("Sitemap verification passed.")
    except Exception as e:
        print(f"Sitemap verification failed: {e}")

    print("Verifying Open Graph...")
    try:
        r = requests.get("http://localhost:4321/")
        assert r.status_code == 200
        if 'content="/images/logo-og.png"' in r.text or 'logo-og.png' in r.text:
            print("Open Graph verification passed.")
        else:
            print("Open Graph verification FAILED: logo-og.png not found in source.")
    except Exception as e:
        print(f"Open Graph verification failed: {e}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # Mobile Context
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()

        print("Navigating to Homepage (Mobile)...")
        page_mobile.goto("http://localhost:4321/")

        # Scroll to Media & Insights to check layout
        try:
            media_section = page_mobile.get_by_text("Transparenz schafft Vertrauen")
            media_section.scroll_into_view_if_needed()
            page_mobile.wait_for_timeout(1000)

            os.makedirs("/home/jules/verification", exist_ok=True)
            page_mobile.screenshot(path="/home/jules/verification/mobile_media_layout.png")
            print("Screenshot mobile_media_layout.png taken.")
        except Exception as e:
            print(f"Media section verification failed: {e}")

        # Scroll to Calculator
        try:
            calc = page_mobile.locator("#rechner")
            calc.scroll_into_view_if_needed()
            page_mobile.wait_for_timeout(1000)

            page_mobile.screenshot(path="/home/jules/verification/mobile_calculator_step1.png")
            print("Screenshot mobile_calculator_step1.png taken.")

            # Test Calculator Flow
            # 1. Size: Kleinwagen
            page_mobile.get_by_text("Kleinwagen", exact=False).first.click()
            page_mobile.wait_for_timeout(500)

            # 2. Condition: Normal (Alltag)
            page_mobile.get_by_text("Normal (Alltag)", exact=False).first.click()
            page_mobile.wait_for_timeout(500)

            # 3. Package: Premium Aufbereitung
            page_mobile.get_by_text("Premium Aufbereitung", exact=False).first.click()
            page_mobile.wait_for_timeout(500)

            # Now at Result.
            page_mobile.screenshot(path="/home/jules/verification/mobile_calculator_result.png")
            print("Screenshot mobile_calculator_result.png taken.")
        except Exception as e:
            print(f"Calculator verification failed: {e}")
            page_mobile.screenshot(path="/home/jules/verification/error_screenshot.png")

        browser.close()

if __name__ == "__main__":
    run()
