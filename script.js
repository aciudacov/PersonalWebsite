const header = document.getElementById("site-header");
const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const themeToggle = document.getElementById("theme-toggle");
const sectionEntries = navLinks
    .map((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        return section ? { link, section } : null;
    })
    .filter(Boolean);
const THEME_STORAGE_KEY = "theme-preference";
const systemThemeMedia = window.matchMedia("(prefers-color-scheme: dark)");
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
updateScrollSpy();
