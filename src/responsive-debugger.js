// Mobile vs Desktop Debug Tool
class ResponsiveDebugger {
    constructor() {
        this.init();
    }

    init() {
        this.addDebugInfo();
        this.setupResizeListener();
        this.detectDevice();
        this.fixCommonIssues();
    }

    addDebugInfo() {
        // Thêm thông tin debug (chỉ hiện khi dev)
        if (window.location.search.includes('debug=1')) {
            const debugInfo = document.createElement('div');
            debugInfo.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 200px;
            `;
            debugInfo.id = 'responsive-debug';
            document.body.appendChild(debugInfo);
            this.updateDebugInfo();
        }
    }

    updateDebugInfo() {
        const debugEl = document.getElementById('responsive-debug');
        if (!debugEl) return;

        const info = {
            width: window.innerWidth,
            height: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1,
            userAgent: this.getDeviceType(),
            orientation: screen.orientation?.type || 'unknown'
        };

        debugEl.innerHTML = `
            <strong>Responsive Debug</strong><br>
            Width: ${info.width}px<br>
            Height: ${info.height}px<br>
            DPR: ${info.devicePixelRatio}<br>
            Device: ${info.userAgent}<br>
            Orientation: ${info.orientation}
        `;
    }

    setupResizeListener() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateDebugInfo();
                this.fixCommonIssues();
            }, 100);
        });
    }

    getDeviceType() {
        const ua = navigator.userAgent;
        if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
        if (/Android/.test(ua)) return 'Android';
        if (/Windows Phone/.test(ua)) return 'Windows Phone';
        if (window.innerWidth <= 768) return 'Mobile';
        if (window.innerWidth <= 1024) return 'Tablet';
        return 'Desktop';
    }

    detectDevice() {
        const deviceType = this.getDeviceType();
        document.body.dataset.device = deviceType.toLowerCase();
        
        // Thêm class cho các device khác nhau
        if (deviceType === 'iOS') {
            document.body.classList.add('ios-device');
        } else if (deviceType === 'Android') {
            document.body.classList.add('android-device');
        }
    }

    fixCommonIssues() {
        // Fix 1: Viewport height cho mobile
        this.fixViewportHeight();
        
        // Fix 2: Touch events
        this.optimizeTouchEvents();
        
        // Fix 3: Font scaling
        this.preventFontScaling();
        
        // Fix 4: Pyramid responsive
        this.fixPyramidLayout();
    }

    fixViewportHeight() {
        // Fix 100vh issue trên mobile
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    optimizeTouchEvents() {
        // Cải thiện touch events trên mobile
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            
            // Cải thiện click trên mobile
            const clickElements = document.querySelectorAll('.pyramid-position, .calculate-btn, .control-btn');
            clickElements.forEach(el => {
                el.style.cursor = 'pointer';
                el.style.webkitTapHighlightColor = 'rgba(0,0,0,0.1)';
            });
        }
    }

    preventFontScaling() {
        // Ngăn auto-zoom khi focus input trên iOS
        if (this.getDeviceType() === 'iOS') {
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                    input.style.fontSize = '16px';
                }
            });
        }
    }

    fixPyramidLayout() {
        const pyramidContainer = document.querySelector('.life-pyramid-container');
        if (!pyramidContainer) return;

        const containerWidth = pyramidContainer.offsetWidth;
        const levels = pyramidContainer.querySelectorAll('.pyramid-level');
        
        levels.forEach((level, index) => {
            const positions = level.querySelectorAll('.pyramid-position');
            const levelNumber = 4 - index; // Level 4, 3, 2, 1
            
            // Tính toán width tự động
            if (window.innerWidth <= 768) {
                // Mobile: stack vertically
                level.style.flexDirection = 'column';
                level.style.width = '100%';
                
                positions.forEach(pos => {
                    pos.style.width = 'calc(100% - 2rem)';
                    pos.style.maxWidth = '320px';
                    pos.style.margin = '0 auto 1rem auto';
                });
            } else {
                // Desktop: horizontal layout
                level.style.flexDirection = 'row';
                const levelWidths = [700, 500, 300, 200]; // Level 1,2,3,4
                level.style.width = `${levelWidths[4 - levelNumber]}px`;
            }
        });
    }

    // Method để test responsive
    testResponsive() {
        console.log('Testing responsive design...');
        console.log('Device type:', this.getDeviceType());
        console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
        console.log('Device pixel ratio:', window.devicePixelRatio);
        
        // Test các breakpoints
        const breakpoints = [320, 480, 768, 1024, 1200];
        breakpoints.forEach(bp => {
            if (window.innerWidth <= bp) {
                console.log(`Breakpoint: <= ${bp}px`);
                return;
            }
        });
    }
}

// Khởi tạo khi DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.responsiveDebugger = new ResponsiveDebugger();
    
    // Auto-test nếu có debug parameter
    if (window.location.search.includes('debug=1')) {
        setTimeout(() => {
            window.responsiveDebugger.testResponsive();
        }, 1000);
    }
});

// Export cho global scope
window.ResponsiveDebugger = ResponsiveDebugger;
