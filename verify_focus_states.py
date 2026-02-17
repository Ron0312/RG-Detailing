from playwright.sync_api import sync_playwright
import time

def verify_focus_states():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.goto("http://localhost:4321/")

        # Remove obstructions
        page.evaluate("""
            const toolbar = document.querySelector('astro-dev-toolbar');
            if (toolbar) toolbar.remove();
            const header = document.querySelector('header');
            if (header) header.style.display = 'none';
            const cookie = document.querySelector('#cookie-banner');
            if (cookie) cookie.remove();
        """)

        page.wait_for_timeout(2000)

        # 1. Teaser Focus
        # Scroll to it
        teaser = page.get_by_text("Jetzt Preis berechnen").first
        teaser.scroll_into_view_if_needed()

        # Click BEFORE the teaser to reset focus, then Tab
        # Click on the h3 above it
        page.get_by_text("Dein individueller Preis").click()
        page.keyboard.press("Tab") # Should focus the button

        page.wait_for_timeout(500)
        page.screenshot(path="verification_teaser_focus_tab.png")
        print("Teaser Tab screenshot taken.")

        # Activate
        page.keyboard.press("Enter")
        page.wait_for_timeout(1000)

        # 2. BackButton Focus
        # Size step. No back button. Select first option.
        # Tab to first option.
        page.keyboard.press("Tab")
        page.keyboard.press("Space") # Select
        page.wait_for_timeout(500)

        # Now at Condition. Back button is first focusable?
        # Let's see. The focus might be on the title (programmatic).
        # Shift+Tab might reach BackButton?
        # Or Tab?
        # StepTitle has tabIndex=-1.
        # BackButton is before StepTitle in DOM?
        # DOM Order: BackButton, StepTitle, Cards.
        # So if focus is on StepTitle, Shift+Tab should go to BackButton.
        page.keyboard.press("Shift+Tab")
        page.wait_for_timeout(500)
        page.screenshot(path="verification_back_focus_tab.png")
        print("Back Tab screenshot taken.")

        # 3. WhatsApp Focus
        # Navigate forward.
        # Focus is on BackButton.
        # Tab -> StepTitle (not focusable via tab) -> First Card.
        page.keyboard.press("Tab") # First card
        page.keyboard.press("Space") # Select Condition
        page.wait_for_timeout(500)

        # Package Step. Select first.
        page.keyboard.press("Tab")
        page.keyboard.press("Space")
        page.wait_for_timeout(1000)

        # Result Step.
        # Focus is on StepTitle (programmatic).
        # Tab sequence: BackButton (Korrigieren), WhatsApp, Email Input, Submit.
        # Wait, BackButton is ABOVE result?
        # Code: <BackButton ...> {renderResult} <form ...> <BackButton ...>
        # So first tab is BackButton (top), then inside renderResult (WhatsApp), then form.

        # From StepTitle (focused):
        # Tab -> BackButton? No, StepTitle is inside renderResult?
        # Let's check DOM structure.
        # {step === STEPS.RESULT ... BackButton ... renderResult ... form ... BackButton}
        # renderResult has StepTitle.
        # So BackButton is BEFORE StepTitle.
        # If focus is on StepTitle, Shift+Tab -> BackButton.
        # Tab -> WhatsAppButton.

        page.keyboard.press("Tab") # Should be WhatsApp Button?
        page.wait_for_timeout(500)
        page.screenshot(path="verification_whatsapp_focus_tab.png")
        print("WhatsApp Tab screenshot taken.")

        # 4. Submit Focus
        # Tab -> Email Input
        page.keyboard.press("Tab")
        # Tab -> Submit
        page.keyboard.press("Tab")
        page.wait_for_timeout(500)
        page.screenshot(path="verification_submit_focus_tab.png")
        print("Submit Tab screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_focus_states()
