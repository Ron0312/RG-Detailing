from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("Navigating to homepage...")
        page.goto("http://localhost:4321/")

        print("Waiting for gallery...")
        page.wait_for_selector("#gallery")

        # Click "Lack" filter
        print("Clicking 'Lack' filter...")
        page.get_by_role("button", name="Lack").click()
        page.wait_for_timeout(1000) # Wait for filter animation

        # Verify new images are present by Alt text
        print("Verifying new images...")
        new_alts = [
            "Lackdefekt Korrektur und Kratzerentfernung Tensfeld",
            "Tiefe Kratzer im Lack entfernen vorher nachher",
            "Professionelle Lackpolitur Detailaufnahme RG Detailing",
            "Starke Lackdefekte und Swirls unter Speziallicht",
            "Hochglanz nach mehrstufiger Lackveredelung"
        ]

        for alt in new_alts:
            expect(page.get_by_alt_text(alt)).to_be_visible()
            print(f"Found: {alt}")

        page.screenshot(path="verification/gallery_lack_verified.png")
        print("Screenshot saved to verification/gallery_lack_verified.png")

        # Click "Keramik" filter and verify the moved image
        print("Clicking 'Keramik' filter...")
        page.get_by_role("button", name="Keramik").click()
        page.wait_for_timeout(1000)

        moved_alt = "Fahrzeugaufbereitung Detailarbeit Ergebnis"
        expect(page.get_by_alt_text(moved_alt)).to_be_visible()
        print(f"Found moved image: {moved_alt}")

        page.screenshot(path="verification/gallery_keramik_verified.png")
        print("Screenshot saved to verification/gallery_keramik_verified.png")

        browser.close()

if __name__ == "__main__":
    run()
