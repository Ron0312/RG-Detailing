from playwright.sync_api import sync_playwright
import re

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to homepage...")
            page.goto("http://localhost:4321", timeout=60000)

            # Remove dev toolbar if present
            page.evaluate("document.querySelector('astro-dev-toolbar')?.remove()")

            print("Checking Footer Links...")
            leasing_link = page.get_by_role("link", name="Leasingrückgabe")
            if leasing_link.count() > 0:
                print("✅ Leasing link found in footer")
            else:
                print("❌ Leasing link NOT found")

            ahrensburg_footer = page.locator("footer").get_by_role("link", name="Ahrensburg")
            if ahrensburg_footer.count() > 0:
                print("✅ Ahrensburg link found in footer")
            else:
                print("❌ Ahrensburg link NOT found in footer")

            print("Checking Service Area Section...")
            service_area = page.get_by_text("Unser Einzugsgebiet")
            if service_area.count() > 0:
                print("✅ Service Area section found")
                service_area.scroll_into_view_if_needed()
            else:
                print("❌ Service Area section NOT found")

            elmshorn_text = page.get_by_text("Elmshorn", exact=False)
            if elmshorn_text.count() > 0:
                 print("✅ Elmshorn text found")
            else:
                 print("❌ Elmshorn text NOT found")

            # Take screenshot of the bottom area
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(1000) # Wait for potential lazy load or scroll
            page.screenshot(path="verification/seo_verification.png")
            print("📸 Screenshot taken")

            # Check Schema
            content = page.content()
            if '"name": "Ahrensburg"' in content:
                print("✅ 'Ahrensburg' found in Schema (page source)")
            else:
                print("❌ 'Ahrensburg' NOT found in Schema")

            if '"name": "Elmshorn"' in content:
                 print("✅ 'Elmshorn' found in Schema")
            else:
                 print("❌ 'Elmshorn' NOT found in Schema")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
