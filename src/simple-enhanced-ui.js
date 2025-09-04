// Simple Enhanced UI System - Compatible with existing code
class SimpleEnhancedUI {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        console.log('🎨 Simple Enhanced UI initialized');
    }

    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            // Initialize theme
            const currentTheme = localStorage.getItem('theme') || 'dark';
            this.setTheme(currentTheme);
            
            toggle.addEventListener('click', () => {
                const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
                this.setTheme(newTheme);
            });
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        
        // Announce theme change for accessibility
        this.announceThemeChange(theme);
    }

    announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.style.position = 'absolute';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.padding = '0';
        announcement.style.margin = '-1px';
        announcement.style.overflow = 'hidden';
        announcement.style.clip = 'rect(0, 0, 0, 0)';
        announcement.style.whiteSpace = 'nowrap';
        announcement.style.border = '0';
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Đã chuyển sang chế độ ${theme === 'light' ? 'sáng' : 'tối'}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }
}

// Initialize Simple Enhanced UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.simpleEnhancedUI = new SimpleEnhancedUI();
});
