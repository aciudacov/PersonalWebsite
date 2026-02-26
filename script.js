const header = document.getElementById("site-header");
const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const themeToggle = document.getElementById("theme-toggle");
const interactiveCards = Array.from(document.querySelectorAll(".work-item, .portfolio-card"));
const sectionEntries = navLinks
    .map((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        return section ? { link, section } : null;
    })
    .filter(Boolean);
const THEME_STORAGE_KEY = "theme-preference";
const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
let ticking = false;
let themePreference = getStoredThemePreference();

applyThemePreference(themePreference);
syncThemeToggleState();

function updateScrollSpy() {
    if (!header || !sectionEntries.length) {
        return;
    }

    const marker = window.scrollY + header.offsetHeight + 24;
    let activeEntry = sectionEntries[0];

    for (const entry of sectionEntries) {
        if (marker >= entry.section.offsetTop) {
            activeEntry = entry;
        } else {
            break;
        }
    }

    for (const entry of sectionEntries) {
        const isActive = entry === activeEntry;
        entry.link.classList.toggle("is-active", isActive);

        if (isActive) {
            entry.link.setAttribute("aria-current", "location");
        } else {
            entry.link.removeAttribute("aria-current");
        }
    }
}

function onScroll() {
    if (ticking) {
        return;
    }

    ticking = true;
    window.requestAnimationFrame(() => {
        updateScrollSpy();
        ticking = false;
    });
}

function getStoredThemePreference() {
    try {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        return stored === "light" || stored === "dark" ? stored : null;
    } catch (error) {
        return null;
    }
}

function setStoredThemePreference(nextTheme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
        // Ignore storage failures (private browsing, restricted settings, etc.)
    }
}

function applyThemePreference(preference) {
    const root = document.documentElement;

    if (preference === "light" || preference === "dark") {
        root.setAttribute("data-theme", preference);
    } else {
        root.removeAttribute("data-theme");
    }
}

function isDarkModeActive(preference) {
    if (preference === "dark") {
        return true;
    }

    if (preference === "light") {
        return false;
    }

    return systemThemeMedia.matches;
}

function syncThemeToggleState() {
    if (!themeToggle) {
        return;
    }

    const darkModeOn = isDarkModeActive(themePreference);
    themeToggle.checked = darkModeOn;
    themeToggle.setAttribute("aria-label", darkModeOn ? "Switch to light mode" : "Switch to dark mode");
}

function onThemeToggleChange() {
    if (!themeToggle) {
        return;
    }

    themePreference = themeToggle.checked ? "dark" : "light";
    setStoredThemePreference(themePreference);
    applyThemePreference(themePreference);
    syncThemeToggleState();
}

function onSystemThemeChange() {
    if (themePreference === "light" || themePreference === "dark") {
        return;
    }

    syncThemeToggleState();
}

function setupCardTilt() {
    if (!interactiveCards.length) {
        return;
    }

    const maxTilt = 2;
    const baseShadowY = 16;
    const baseShadowBlur = 24;
    const baseShadowSpread = -10;
    const baseShadowOpacity = 0.16;

    for (const card of interactiveCards) {
        let frameId = null;
        let tiltX = 0;
        let tiltY = 0;
        let shadowX = 0;
        let shadowY = baseShadowY;
        let shadowBlur = baseShadowBlur;
        let shadowSpread = baseShadowSpread;
        let shadowOpacity = baseShadowOpacity;

        const renderTilt = () => {
            card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
            card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
            card.style.setProperty("--tilt-shadow-x", `${shadowX.toFixed(2)}px`);
            card.style.setProperty("--tilt-shadow-y", `${shadowY.toFixed(2)}px`);
            card.style.setProperty("--tilt-shadow-blur", `${shadowBlur.toFixed(2)}px`);
            card.style.setProperty("--tilt-shadow-spread", `${shadowSpread.toFixed(2)}px`);
            card.style.setProperty("--tilt-shadow-opacity", shadowOpacity.toFixed(3));
            frameId = null;
        };

        const queueTiltRender = () => {
            if (frameId !== null) {
                return;
            }

            frameId = window.requestAnimationFrame(renderTilt);
        };

        const resetTilt = () => {
            tiltX = 0;
            tiltY = 0;
            shadowX = 0;
            shadowY = baseShadowY;
            shadowBlur = baseShadowBlur;
            shadowSpread = baseShadowSpread;
            shadowOpacity = baseShadowOpacity;
            queueTiltRender();
        };

        card.addEventListener("mousemove", (event) => {
            if (reducedMotionMedia.matches) {
                return;
            }

            const rect = card.getBoundingClientRect();
            const pointerX = (event.clientX - rect.left) / rect.width;
            const pointerY = (event.clientY - rect.top) / rect.height;
            const normalizedX = (pointerX - 0.5) * 2;
            const normalizedY = (pointerY - 0.5) * 2;
            const tiltStrength = Math.max(Math.abs(normalizedX), Math.abs(normalizedY));

            tiltX = -normalizedY * maxTilt;
            tiltY = normalizedX * maxTilt;
            shadowX = -normalizedX * 10;
            shadowY = baseShadowY + tiltStrength * 10;
            shadowBlur = baseShadowBlur + tiltStrength * 14;
            shadowSpread = baseShadowSpread + tiltStrength * 3;
            shadowOpacity = baseShadowOpacity + tiltStrength * 0.12;
            queueTiltRender();
        });

        card.addEventListener("mouseleave", resetTilt);
        card.addEventListener("blur", resetTilt, true);
    }
}

function resetCardTiltForReducedMotion() {
    if (!reducedMotionMedia.matches) {
        return;
    }

    for (const card of interactiveCards) {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--tilt-shadow-x", "0px");
        card.style.setProperty("--tilt-shadow-y", "16px");
        card.style.setProperty("--tilt-shadow-blur", "24px");
        card.style.setProperty("--tilt-shadow-spread", "-10px");
        card.style.setProperty("--tilt-shadow-opacity", "0.16");
    }
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateScrollSpy);
if (themeToggle) {
    themeToggle.addEventListener("change", onThemeToggleChange);
}
if (typeof systemThemeMedia.addEventListener === "function") {
    systemThemeMedia.addEventListener("change", onSystemThemeChange);
} else if (typeof systemThemeMedia.addListener === "function") {
    systemThemeMedia.addListener(onSystemThemeChange);
}
if (typeof reducedMotionMedia.addEventListener === "function") {
    reducedMotionMedia.addEventListener("change", resetCardTiltForReducedMotion);
} else if (typeof reducedMotionMedia.addListener === "function") {
    reducedMotionMedia.addListener(resetCardTiltForReducedMotion);
}
setupCardTilt();
resetCardTiltForReducedMotion();
updateScrollSpy();
