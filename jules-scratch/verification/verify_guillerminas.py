from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Navegar al archivo local
        page.goto("file:///app/guillerminas.html")

        # Esperar a que la página se cargue completamente
        page.wait_for_load_state('networkidle')

        # Tomar la captura de pantalla
        page.screenshot(path="jules-scratch/verification/verification.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()