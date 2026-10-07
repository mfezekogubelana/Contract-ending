const readyCheck = document.getElementById("readyCheck");
const continueButton = document.getElementById("continueButton");


// =========================================
// PAGE 1 - CHECKBOX
// =========================================

if (readyCheck && continueButton) {

    readyCheck.addEventListener("change", function() {

        if (readyCheck.checked) {
            continueButton.disabled = false;
        } else {
            continueButton.disabled = true;
        }

    });

    continueButton.addEventListener("click", function() {

        window.location.href = "countdown.html";

    });

}


// =========================================
// PAGE 2 - COUNTDOWN
// =========================================


const targetDate = new Date("2026-10-08T00:55:00").getTime();


const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const zeroMessage = document.getElementById("zeroMessage");
const soundButton = document.getElementById("soundButton");

let countdownFinished = false;


// =========================================
// WARNING SOUND
// =========================================

let audioContext;

function playWarningSound() {

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.setValueAtTime(
        180,
        audioContext.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        60,
        audioContext.currentTime + 1
    );

    gain.gain.setValueAtTime(
        0.15,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 1
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 1
    );
}

function playRevealSound() {

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";

    oscillator.frequency.setValueAtTime(
        220,
        now
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        440,
        now + 0.5
    );

    oscillator.frequency.exponentialRampToValueAtTime(
        880,
        now + 1
    );

    gain.gain.setValueAtTime(
        0.001,
        now
    );

    gain.gain.exponentialRampToValueAtTime(
        0.2,
        now + 0.2
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 1.5
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(now);

    oscillator.stop(now + 1.5);
}


if (soundButton) {
    soundButton.classList.remove("show");

    soundButton.addEventListener("click", function() {

        playWarningSound();

        soundButton.textContent =
            "🔊 WARNING SOUND ACTIVATED";

    });

}


// =========================================
// COUNTDOWN
// =========================================

function updateCountdown() {

    const now = new Date().getTime();

    let distance = targetDate - now;


    // =====================================
    // WHEN COUNTDOWN REACHES ZERO
    // =====================================

    if (distance <= 0) {

        distance = 0;

        if (!countdownFinished) {

            countdownFinished = true;

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";


            // Show the ZERO message

            if (zeroMessage) {
                zeroMessage.classList.add("show");
            }

            if (soundButton) {
                soundButton.classList.add("show");
            }


            // Play warning sound

            playWarningSound();

            setTimeout(function() {
            playRevealSound();
            }, 800);


            // Change the page title

            document.title = "☠️ TIME'S UP";


            // Make the screen shake

            document.body.classList.add("zero-reached");

        }

        return;
    }


    // =====================================
    // CALCULATE TIME
    // =====================================

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    // =====================================
    // DISPLAY
    // =====================================

    if (daysElement) {
        daysElement.textContent =
            String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent =
            String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent =
            String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent =
            String(seconds).padStart(2, "0");
    }

}


// Start countdown

updateCountdown();


// Update every second

setInterval(updateCountdown, 1000);
