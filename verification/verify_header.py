from playwright.sync_api import sync_playwright, expect
import re
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 720})
        page = context.new_page()

        print("Navigating to home page...")
        try:
            page.goto("http://localhost:4321/", wait_until="networkidle")
        except Exception as e:
            print(f"Navigation failed: {e}")
            return

        page.wait_for_timeout(2000)

        # Regex for exact class match (avoiding hover:text-white)
        active_class = re.compile(r"(^|\s)text-white(\s|$)")

        # 1. Check initial state (Startseite)
        print("Checking Startseite...")
        start_link = page.get_by_role("link", name="Startseite").first

        try:
            expect(start_link).to_have_class(active_class, timeout=5000)
            print("Startseite is active.")
        except AssertionError:
            print("Startseite is NOT active.")
            page.screenshot(path="verification/failed_start.png")
            print(f"Classes: {start_link.get_attribute('class')}")
            browser.close()
            return

        # 2. Scroll down
        print("Scrolling down to 800px...")
        page.evaluate("window.scrollTo(0, 800)")
        page.wait_for_timeout(1000)

        # Check Startseite inactive
        print("Checking Startseite inactive...")
        try:
            expect(start_link).not_to_have_class(active_class)
            print("Startseite is inactive.")
        except AssertionError:
            print("Startseite is STILL active.")
            page.screenshot(path="verification/failed_inactive.png")
            print(f"Classes: {start_link.get_attribute('class')}")
            # Continue anyway

        # Check Leistungen active (at 800px)
        leistungen_link = page.get_by_role("link", name="Leistungen").first
        print("Checking Leistungen active...")
        try:
            expect(leistungen_link).to_have_class(active_class, timeout=5000)
            print("Leistungen is active.")
        except AssertionError:
            print("Leistungen is NOT active.")
            page.screenshot(path="verification/failed_leistungen.png")
            print(f"Classes: {leistungen_link.get_attribute('class')}")

            # Debug: Scroll further?
            page.evaluate("window.scrollTo(0, 1500)")
            page.wait_for_timeout(1000)
            gallery_link = page.get_by_role("link", name="Galerie").first
            try:
                expect(gallery_link).to_have_class(active_class)
                print("Gallery is active.")
            except:
                print("Gallery not active either.")


        # 3. Scroll back up
        print("Scrolling back to top...")
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(1000)

        print("Checking Startseite active again...")
        try:
            expect(start_link).to_have_class(active_class)
            print("Startseite active again.")
        except:
            print("Startseite failed to reactivate.")

        # Final screenshot
        page.screenshot(path="verification/header_verification.png")
        print("Verification complete.")

        browser.close()

if __name__ == "__main__":
    run()
