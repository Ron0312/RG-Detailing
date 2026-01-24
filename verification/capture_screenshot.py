import asyncio
from playwright.async_api import async_playwright

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Capture Dampfreinigung (Image change)
        print("Capturing /dampfreinigung...")
        try:
            await page.goto("http://localhost:4321/dampfreinigung", timeout=60000)
            await page.wait_for_selector('main')
            # Wait a bit for images to load
            await page.wait_for_timeout(2000)
            await page.screenshot(path="verification/dampfreinigung_final_v2.png", full_page=True)
            print("Saved: verification/dampfreinigung_final_v2.png")
        except Exception as e:
            print(f"Error capturing dampfreinigung: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(capture())
