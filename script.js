/**
 * Muhammed Rayhan - Personal Portfolio Script Matrix
 * Pure JavaScript Frameworkless Interactive Features Engine
 */

document.addEventListener("DOMContentLoaded", () => {
    initTypingEffect();
    initDateTimeTracker();
    initScrollNavbar();
    initScrollReveal();
    initMobileMenu();
    initThemeManager();
    initBackToTop();
    initContentToggle();
});

// 1. WELCOME POPUP MODAL CONTROL
function closeModal() {
    const modal = document.getElementById("welcomeModal");
    modal.style.opacity = "0";
    setTimeout(() => {
        modal.style.display = "none";
    }, 400);
}

// 2. ANIMATED TYPING TIMELINE ENGINE
function initTypingEffect() {
    const targetTextElement = document.getElementById("typing-text");
    const rolesArray = ["Student.", "Developer.", "Fitness Lover.", "Tech Enthusiast."];
    let elementIndex = 0;
    let characterIndex = 0;
    let isDeletingState = false;

    function executionLoop() {
        const currentRole = rolesArray[elementIndex];
        
        if (isDeletingState) {
            targetTextElement.textContent = currentRole.substring(0, characterIndex - 1);
            characterIndex--;
        } else {
            targetTextElement.textContent = currentRole.substring(0, characterIndex + 1);
            characterIndex++;
        }

        let speedMetric = isDeletingState ? 60 : 120;

        if (!isDeletingState && characterIndex === currentRole.length) {
            speedMetric = 2000; // Standstill at completion
            isDeletingState = true;
        } else if (isDeletingState && characterIndex === 0) {
            isDeletingState = false;
            elementIndex = (elementIndex + 1) % rolesArray.length;
            speedMetric = 400; // Pause before writing next line
        }

        setTimeout(executionLoop, speedMetric);
    }
    
    if(targetTextElement) executionLoop();
}

// 3. LIVE MATRIX DATE & TIME DISPLAY
function initDateTimeTracker() {
    const trackerDisplay = document.getElementById("liveDateTime");
    
    function refreshClock() {
        const structuralDate = new Date();
        const outputString = structuralDate.toLocaleDateString('en-US', {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        }) + " | " + structuralDate.toLocaleTimeString('en-US', { hour12: false });
        
        if(trackerDisplay) trackerDisplay.textContent = outputString;
    }
    
    setInterval(refreshClock, 1000);
    refreshClock();
}

// 4. NAVBAR SCROLL ACTION ENGINE
function initScrollNavbar() {
    const navbarElement = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbarElement.classList.add("scrolled");
        } else {
            navbarElement.classList.remove("scrolled");
        }
    });
}

// 5. LIGHT/DARK ENGINE AND COLOR ACCENT SELECTOR
function initThemeManager() {
    const themeToggleBtn = document.getElementById("themeToggle");
    const accentToggleBtn = document.getElementById("accentToggle");
    const rootElement = document.documentElement;

    // Dark/Light toggle implementation
    themeToggleBtn.addEventListener("click", () => {
        const activeTheme = rootElement.getAttribute("data-theme");
        if (activeTheme === "dark") {
            rootElement.setAttribute("data-theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            rootElement.setAttribute("data-theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Color Accent Palette Shifter
    accentToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("alt-accent");
    });
}

// 6. CONTENT TOGGLE MECHANISM (HIDE / SHOW)
function initContentToggle() {
    const toggleButton = document.getElementById("toggleMoreBtn");
    const structuralContainer = document.getElementById("moreContent");

    if (toggleButton && structuralContainer) {
        toggleButton.addEventListener("click", () => {
            if (structuralContainer.style.display === "block") {
                structuralContainer.style.display = "none";
                toggleButton.textContent = "Read Core Philosophy";
            } else {
                structuralContainer.style.display = "block";
                toggleButton.textContent = "Collapse Architecture";
            }
        });
    }
}

// 7. SCROLL REVEAL ANIMATIONS ENGINE
function initScrollReveal() {
    const sectionsToReveal = document.querySelectorAll(".scroll-reveal");

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    sectionsToReveal.forEach(section => scrollObserver.observe(section));
}

// 8. MOBILE NAV NAVIGATION OVERLAY SYSTEM
function initMobileMenu() {
    const burgerToggle = document.getElementById("mobileMenu");
    const navigationList = document.querySelector(".nav-links");

    if (burgerToggle && navigationList) {
        burgerToggle.addEventListener("click", () => {
            navigationList.classList.toggle("active");
            burgerToggle.innerHTML = navigationList.classList.contains("active") ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close dropdown when picking a specific segment link
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                navigationList.classList.remove("active");
                burgerToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// 9. FLOATING BACK TO TOP CONTROL BUTTON
function initBackToTop() {
    const floatingArrowBtn = document.getElementById("backToTop");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            floatingArrowBtn.classList.add("show");
        } else {
            floatingArrowBtn.classList.remove("show");
        }
    });

    floatingArrowBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}