/* ============================================================
   SCROLL FADE-IN ANIMATION
============================================================ */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});
document.querySelectorAll(".fade").forEach(el => observer.observe(el));



/* ============================================================
   TYPING TEXT ANIMATION
============================================================ */
const typingText = [
    "roblox scripter",
    "lua enjoyer",
    "ui / ux logic",
    "clean code lover"
];

let index = 0;
let charIndex = 0;

function type() {
    const display = document.querySelector(".typing");

    if (!display) return;

    if (charIndex < typingText[index].length) {
        display.textContent += typingText[index][charIndex];
        charIndex++;
        setTimeout(type, 70);
    } else {
        setTimeout(erase, 1400);
    }
}

function erase() {
    const display = document.querySelector(".typing");
    if (!display) return;

    if (charIndex > 0) {
        display.textContent = typingText[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 45);
    } else {
        index = (index + 1) % typingText.length;
        setTimeout(type, 200);
    }
}

type();



/* ============================================================
   FUN CONSOLE MESSAGES + CLOSE/OPEN TERMINAL
============================================================ */

const messages = [
    "> loading golding...",
    "> loading modules...",
    "> initializing creativity.exe...",
    "> connecting to roblox API...",
    "> compiling clean code...",
    "> success.",
    "",
    "> hey!",
    "> hope you're doing well today :)",
    "> you're very reliable & appreciated",
    "> remember to take breaks",
    "> i hope my work will amaze you, they are all made with care and passion.",
    "> there's discounts on my work, but don't rely too much on them :3, ",
    "> bye! have a great day! :)",
    "> end of transmission.",
];

let consoleIndex = 0;
let consoleSpeed = 600;

function showConsoleMessage() {
    const box = document.getElementById("consoleMessages");
    if (!box) return;

    if (consoleIndex < messages.length) {
        box.textContent += messages[consoleIndex] + "\n";
        consoleIndex++;
        setTimeout(showConsoleMessage, consoleSpeed);
    }
}

showConsoleMessage();

/* CLOSE TERMINAL */
function closeTerminal() {
    const wrapper = document.getElementById("terminalWrapper");
    wrapper.classList.add("fade-out");

    setTimeout(() => {
        wrapper.style.display = "none";
        document.getElementById("openTerminal").classList.add("visible");
    }, 500);
}

/* OPEN TERMINAL */
function openTerminal() {
    const wrapper = document.getElementById("terminalWrapper");
    wrapper.style.display = "block";
    wrapper.classList.remove("fade-out");

    // reset messages
    document.getElementById("consoleMessages").textContent = "";
    consoleIndex = 0;
    showConsoleMessage();

    document.getElementById("openTerminal").classList.remove("visible");
}




/* ============================================================
   VIDEO HOVER PREVIEW + SAVE TIMESTAMP
============================================================ */

/* ============================================================
   VIDEO SYSTEM
   - Fast page load
   - Videos load in background after page loads
   - Hover preview still works
============================================================ */

let videoTimestamps = {};

const videoCards = document.querySelectorAll(".video-card");

// Prepare videos (no loading at start)
videoCards.forEach(card => {
    const video = card.querySelector(".preview");
    const videoUrl = card.getAttribute("data-video");

    if (!video) return;

    // Store source but don't load yet
    video.dataset.src = videoUrl;
    video.preload = "none";
    video.autoplay = false;

    // Hover / touch play
    card.addEventListener("mouseenter", () => {
        if (!video.src) {
            video.src = video.dataset.src;
            video.load();
        }

        video.currentTime = videoTimestamps[videoUrl] || 0;
        video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
        video.pause();
        videoTimestamps[videoUrl] = video.currentTime;
    });

    // Touch devices (iPad / phone)
    card.addEventListener("touchstart", () => {
        if (!video.src) {
            video.src = video.dataset.src;
            video.load();
        }
    });
});


/* ============================================================
   BACKGROUND PRELOAD (after page loads)
============================================================ */

window.addEventListener("load", () => {

    // Start preloading after a short delay (page already visible)
    setTimeout(() => {

        videoCards.forEach((card, index) => {
            const video = card.querySelector(".preview");

            // Faster stagger loading
            setTimeout(() => {
                if (!video.src) {
                    video.src = video.dataset.src;
                    video.preload = "metadata"; // loads preview only
                    video.load();
                }
            }, index * 200); // 0.2s instead of 0.8s

        });

    }, 1500); // wait 1.5s after page load
});

/* ============================================================
   VIDEO MODAL (kept from your original)
============================================================ */

const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

function closeModal() {
    modal.style.display = "none";
    modalVideo.pause();
}

document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("click", () => {
        const videoFile = card.getAttribute("data-video");

        modalVideo.src = videoFile;

        if (videoTimestamps[videoFile] !== undefined) {
            modalVideo.currentTime = videoTimestamps[videoFile];
        }

        modal.style.display = "block";
        modalVideo.play();
    });
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


/* ============================================================
   ABOUT ME TERMINAL ANIMATION
============================================================ */

/* ============================================================
   ABOUT ME TERMINAL ANIMATION (RESTART ON VIEW)
============================================================ */

const aboutLines = [
    "im golding, a roblox scripter that can:",
    "",
    "- make clean systems that dont break",
    "- build ui logic that feels smooth",
    "- create fun combat & hit effects",
    "- write modules that actually make sense",
    "- handle datastore stuff without wiping ur data",
    "- fix your spaghetti code (probably)",
    "",
    "> skills loaded."
];

let aboutTerminal = document.getElementById("aboutTerminal");
let aboutIndex2 = 0;
let aboutSpeed2 = 60;
let aboutLinePause2 = 500;
let typingActive = false;

function playAboutAnimation() {
    if (!aboutTerminal) return;

    typingActive = true;
    aboutTerminal.textContent = "";     // reset terminal
    aboutIndex2 = 0;                    // reset line index
    typeNextLine();                     // start typing
}

function typeNextLine() {
    if (!typingActive) return;
    if (aboutIndex2 >= aboutLines.length) return;

    let line = aboutLines[aboutIndex2];
    let charIdx = 0;

    function typeChar() {
        if (!typingActive) return;

        if (charIdx < line.length) {
            aboutTerminal.textContent += line[charIdx];
            charIdx++;
            setTimeout(typeChar, aboutSpeed2);
        } else {
            aboutTerminal.textContent += "\n";
            aboutIndex2++;
            setTimeout(typeNextLine, aboutLinePause2);
        }
    }

    typeChar();
}

/* OBSERVER — restart animation when visible */
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            typingActive = true;
            playAboutAnimation();
        } else {
            typingActive = false; // stop animation when off screen
        }
    });
}, { threshold: 0.4 });

aboutObserver.observe(aboutTerminal);

/* ==========================
   OPEN STOCK POPUP
========================== */

function openStockPopup() {
    document.getElementById("stockPopup").style.display = "flex";
}

document.getElementById("popupClose").onclick = () => {
    document.getElementById("stockPopup").style.display = "none";
};


/* ============================================
   INTRO ANIMATION (HACKER BOOT SEQUENCE)
============================================ */

const introLines = [
    "> initializing golding.exe...",
    "> loading modules...",
    "> loading combat systems...",
    "> loading vfx...",
    "> loading ui logic...",
    "> optimizing scripts...",
    "> boot sequence complete.",
    "> welcome user."
];

let introIndex = 0;
let introChar = 0;
let currentLine = "";

function typeIntro() {
    const introText = document.getElementById("introText");
    const introScreen = document.getElementById("introScreen");

    if (!introText) return;

    if (introIndex < introLines.length) {
        if (introChar < introLines[introIndex].length) {
            introText.textContent += introLines[introIndex][introChar];
            introChar++;
            setTimeout(typeIntro, 40);
        } else {
            introText.textContent += "\n";
            introIndex++;
            introChar = 0;
            setTimeout(typeIntro, 300);
        }
    } else {
        setTimeout(() => {
            introScreen.classList.add("fadeOutIntro");
        }, 600);
    }
}

window.addEventListener("load", typeIntro);

