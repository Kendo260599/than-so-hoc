// Enhanced UI/UX JavaScript Features
class NumerologyEnhancedUI {
    constructor() {
        this.themeManager = new ThemeManager();
        this.formValidator = new FormValidator();
        this.animationObserver = new AnimationObserver();
        this.mobileHandler = new MobileHandler();
        this.init();
    }

    init() {
        this.setupProgressSteps();
        this.setupFloatingMenu();
        this.setupGestures();
        console.log('🎨 Enhanced UI/UX System initialized');
    }

    setupProgressSteps() {
        const form = document.getElementById('numerologyForm');
        const steps = document.querySelectorAll('.progress-step');
        
        if (form && steps.length > 0) {
            form.addEventListener('input', () => {
                this.updateProgressSteps();
            });
        }
    }

    updateProgressSteps() {
        const form = document.getElementById('numerologyForm');
        const steps = document.querySelectorAll('.progress-step');
        
        // Check form completion
        const requiredFields = form.querySelectorAll('input[required]');
        const filledFields = Array.from(requiredFields).filter(field => field.value.trim() !== '');
        
        // Update progress
        const progress = filledFields.length / requiredFields.length;
        
        steps.forEach((step, index) => {
            const stepNum = index + 1;
            const circle = step.querySelector('.step-circle');
            
            if (stepNum === 1 && progress > 0) {
                step.classList.add('completed');
                circle.classList.add('completed');
            } else if (stepNum === 2 && progress >= 0.7) {
                step.classList.add('active');
                circle.classList.add('active');
            } else if (stepNum === 3 && progress === 1) {
                step.classList.add('active');
                circle.classList.add('active');
            }
        });
    }

    setupFloatingMenu() {
        const toggle = document.getElementById('navMenuToggle');
        const menu = document.getElementById('floatingMenu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menu.contains(e.target) && !toggle.contains(e.target)) {
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                }
            });

            // Handle menu item clicks
            const menuItems = menu.querySelectorAll('.floating-menu-item');
            menuItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    const module = e.target.dataset.module;
                    this.activateModule(module);
                    menu.classList.remove('active');
                    toggle.classList.remove('active');
                });
            });
        }
    }

    activateModule(module) {
        console.log(`🎯 Activating module: ${module}`);
        
        // Hide all advanced sections first
        const sections = document.querySelectorAll('.advanced-section, .enhanced-section');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the requested module
        const moduleMap = {
            'crystal': 'crystalContainer',
            'color': 'colorContainer', 
            'career': 'careerContainer',
            'dream': 'dreamContainer',
            'feng-shui': 'fengShuiContainer',
            'advanced': 'advanced-features'
        };

        const targetId = moduleMap[module];
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.style.display = 'block';
            targetElement.scrollIntoView({ behavior: 'smooth' });
            
            // Add entrance animation
            targetElement.classList.add('fade-in-observer');
            setTimeout(() => {
                targetElement.classList.add('visible');
            }, 100);
        }
    }

    setupGestures() {
        // Enable swipe gestures for mobile
        if ('ontouchstart' in window) {
            const results = document.getElementById('results');
            if (results) {
                new TouchGestureHandler(results);
                
                results.addEventListener('swipeLeft', () => {
                    this.nextTab();
                });
                
                results.addEventListener('swipeRight', () => {
                    this.prevTab();
                });
            }
        }
    }

    nextTab() {
        const tabs = document.querySelectorAll('.tab-btn');
        const activeTab = document.querySelector('.tab-btn.active');
        
        if (activeTab && tabs.length > 0) {
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabs.length;
            tabs[nextIndex].click();
        }
    }

    prevTab() {
        const tabs = document.querySelectorAll('.tab-btn');
        const activeTab = document.querySelector('.tab-btn.active');
        
        if (activeTab && tabs.length > 0) {
            const currentIndex = Array.from(tabs).indexOf(activeTab);
            const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
            tabs[prevIndex].click();
        }
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();
        
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.updateToggleIcon();
        this.announceThemeChange();
    }
    
    updateToggleIcon() {
        const icon = document.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }
    
    announceThemeChange() {
        const announcement = document.createElement('div');
        announcement.className = 'sr-only';
        announcement.setAttribute('aria-live', 'polite');
        announcement.textContent = `Đã chuyển sang chế độ ${this.theme === 'light' ? 'sáng' : 'tối'}`;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Form Validator
class FormValidator {
    constructor() {
        this.init();
    }
    
    init() {
        const form = document.getElementById('numerologyForm');
        if (form) {
            const inputs = form.querySelectorAll('.form-control');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearValidation(input));
            });
        }
    }
    
    validateField(input) {
        const group = input.closest('.form-group');
        const message = group?.querySelector('.validation-message');
        
        if (!group || !message) return false;
        
        if (!input.value && input.required) {
            this.showError(group, message, 'Trường này là bắt buộc');
            return false;
        }
        
        if (input.type === 'text' && input.value.length < 2) {
            this.showError(group, message, 'Tên phải có ít nhất 2 ký tự');
            return false;
        }
        
        if (input.type === 'number') {
            const min = parseInt(input.min) || 0;
            const max = parseInt(input.max) || Infinity;
            const value = parseInt(input.value);
            
            if (value < min || value > max) {
                this.showError(group, message, `Giá trị phải từ ${min} đến ${max}`);
                return false;
            }
        }
        
        this.showSuccess(group, message);
        return true;
    }
    
    showError(group, message, text) {
        group.classList.add('error-state');
        group.classList.remove('success-state');
        message.textContent = text;
        message.className = 'validation-message error-message';
    }
    
    showSuccess(group, message) {
        group.classList.add('success-state');
        group.classList.remove('error-state');
        message.textContent = 'Hợp lệ';
        message.className = 'validation-message success-message';
    }
    
    clearValidation(input) {
        const group = input.closest('.form-group');
        if (group) {
            group.classList.remove('error-state', 'success-state');
        }
    }
}

// Animation Observer
class AnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        this.init();
    }
    
    init() {
        // Wait for DOM to be ready
        setTimeout(() => {
            const elements = document.querySelectorAll(
                '.fade-in-observer, .slide-in-left-observer, .slide-in-right-observer'
            );
            
            elements.forEach(el => {
                this.observer.observe(el);
            });
        }, 100);
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Mobile Handler
class MobileHandler {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupTouchOptimizations();
    }
    
    setupMobileMenu() {
        const menu = document.getElementById('floatingMenu');
        if (menu && window.innerWidth <= 768) {
            menu.classList.add('mobile-optimized');
        }
    }
    
    setupTouchOptimizations() {
        // Add touch-friendly classes to interactive elements
        const buttons = document.querySelectorAll('button, .btn');
        buttons.forEach(btn => {
            btn.classList.add('touch-target');
        });
    }
}

// Touch Gesture Handler
class TouchGestureHandler {
    constructor(element) {
        this.element = element;
        this.startX = 0;
        this.startY = 0;
        this.init();
    }
    
    init() {
        this.element.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.element.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.element.addEventListener('touchend', this.handleTouchEnd.bind(this));
    }
    
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
        this.startY = e.touches[0].clientY;
    }
    
    handleTouchMove(e) {
        if (!this.startX || !this.startY) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = this.startX - currentX;
        const diffY = this.startY - currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                this.element.dispatchEvent(new CustomEvent('swipeLeft'));
            } else if (diffX < -50) {
                this.element.dispatchEvent(new CustomEvent('swipeRight'));
            }
        }
    }
    
    handleTouchEnd() {
        this.startX = 0;
        this.startY = 0;
    }
}

// Initialize Enhanced UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.numerologyEnhancedUI = new NumerologyEnhancedUI();
    console.log('🚀 Enhanced Numerology UI/UX System ready!');
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NumerologyEnhancedUI,
        ThemeManager,
        FormValidator,
        AnimationObserver,
        MobileHandler,
        TouchGestureHandler
    };
}
