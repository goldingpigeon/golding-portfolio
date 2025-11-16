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
    "> have a great day.",
    "> end of transmission."
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

let videoTimestamps = {}; // store timestamps individually

document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector(".preview");
    const videoId = card.getAttribute("data-video");

    // On hover → play from saved timestamp
    card.addEventListener("mouseenter", () => {
        if (videoTimestamps[videoId] !== undefined) {
            video.currentTime = videoTimestamps[videoId];
        } else {
            video.currentTime = 0;
        }

        video.play();
    });

    // On leave → pause + save timestamp
    card.addEventListener("mouseleave", () => {
        video.pause();
        videoTimestamps[videoId] = video.currentTime;
    });
});



/* ============================================================
   VIDEO MODAL POPUP
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

        // Load video into popup
        modalVideo.src = videoFile;

        // Continue from hover timestamp
        if (videoTimestamps[videoFile] !== undefined) {
            modalVideo.currentTime = videoTimestamps[videoFile];
        }

        modal.style.display = "block";
        modalVideo.play();
    });
});

// Close modal when clicking outside video
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});


/* ============================================================
   ABOUT ME TERMINAL ANIMATION
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
