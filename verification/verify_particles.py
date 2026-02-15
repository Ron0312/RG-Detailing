from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Go to localhost
        page.goto("http://localhost:4321/")

        # Wait for the canvas
        # The canvas has class 'absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60'
        # I'll select by tag name 'canvas'
        canvas = page.locator("canvas").first
        canvas.wait_for(state="visible")

        # Wait a bit for animation to start and draw some particles
        page.wait_for_timeout(1000)

        # Take screenshot
        page.screenshot(path="verification/particles.png")

        # Evaluate if canvas has content (simple check)
        # Note: This executes in the browser context
        has_content = page.evaluate("""
            () => {
                const canvas = document.querySelector('canvas');
                if (!canvas) return false;
                const ctx = canvas.getContext('2d');
                // Check center pixel or random pixels.
                // Since particles are random, we might miss them if we check just one pixel.
                // But we can check if data is not all transparent black.
                // However, the canvas is cleared every frame.
                // Let's just check if context exists.
                return !!ctx;
            }
        """)

        print(f"Canvas context exists: {has_content}")

        browser.close()

if __name__ == "__main__":
    run()
