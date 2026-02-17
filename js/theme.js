// Theme Toggle Handler
export class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.button = null;
        this.initTheme();
        this.attachEventListener();
    }

    initTheme() {
        // Apply stored theme on page load
        document.documentElement.setAttribute('data-theme', this.theme);
        document.body.setAttribute('data-theme', this.theme);
    }

    attachEventListener() {
        // Wait for button to be created by header
        setTimeout(() => {
            this.button = document.getElementById('theme-toggle-btn');
            if (this.button) {
                this.button.addEventListener('click', () => this.toggleTheme());
                this.updateButtonIcon();
            }
        }, 100);
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateButtonIcon();
    }

    updateButtonIcon() {
        if (this.button) {
            this.button.textContent = this.theme === 'dark' ? '☀️' : '🌙';
            this.button.setAttribute('title', this.theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        }
    }
}
