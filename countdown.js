const readyCheck = document.getElementById("readyCheck");
const continueButton = document.getElementById("continueButton");


// ==============================
// PAGE 1 - CHECKBOX
// ==============================

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


// ==============================
// PAGE 2 - COUNTDOWN
// ==============================

// CHANGE THIS DATE TO WHATEVER DATE YOU WANT

const targetDate = new Date("2026-11-05T00:00:00").getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;


    // Calculate the time remaining

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

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


    // Display the countdown

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");


    if (daysElement) {
        daysElement.textContent = days;
    }

    if (hoursElement) {
        hoursElement.textContent = hours;
    }

    if (minutesElement) {
        minutesElement.textContent = minutes;
    }

    if (secondsElement) {
        secondsElement.textContent = seconds;
    }

}


// Update immediately

updateCountdown();


// Update every second

setInterval(updateCountdown, 1000);