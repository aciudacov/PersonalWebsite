const header = document.getElementById("site-header");
const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#']"));
const sectionEntries = navLinks
    .map((link) => {
        const id = link.getAttribute("href").slice(1);
        const section = document.getElementById(id);
        return section ? { link, section } : null;
    })
    .filter(Boolean);
let ticking = false;

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

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", updateScrollSpy);
updateScrollSpy();
