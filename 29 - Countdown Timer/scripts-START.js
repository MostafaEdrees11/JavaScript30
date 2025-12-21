const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const fixedValuesBTNs = document.querySelectorAll('button[data-time]');
const inputForm = document.querySelector('#custom');
// console.log(fixedValuesBTNs);

let counterInterval = null;

function convertSecondsIntoHrMiSe(seconds) {
    let remindar = 0;
    let hours = Math.trunc(seconds / 3600);
    remindar = seconds % 3600;
    let minutes = Math.trunc(remindar / 60);
    seconds = remindar % 60;

    return { hours, minutes, seconds };
}

function updateEndTime(timeObj) {
    const now = new Date();
    let currentHoures = now.getHours();
    let currentMinutes = now.getMinutes();
    endTime.innerHTML = `Be back at ${String(currentHoures + timeObj.hours).padStart(2, 0)}:${String(currentMinutes + timeObj.minutes).padStart(2, 0)}`;
}

function updateCountdownTimer(totalTime, timeObj) {
    timeLeft.innerHTML = `${String(timeObj.hours).padStart(2, 0)}:${String(timeObj.minutes).padStart(2, 0)}:${String(timeObj.seconds).padStart(2, 0)}`;
    document.title = timeLeft.innerHTML;

    counterInterval = setInterval(() => {
        if (totalTime === 0) return clearInterval(counterInterval);

        totalTime--;
        timeObj = convertSecondsIntoHrMiSe(totalTime);
        timeLeft.innerHTML = `${String(timeObj.hours).padStart(2, 0)}:${String(timeObj.minutes).padStart(2, 0)}:${String(timeObj.seconds).padStart(2, 0)}`;
        document.title = timeLeft.innerHTML;
    }, 1000);
}

function startTimer(e) {
    if (counterInterval) clearInterval(counterInterval);
    // console.log(this);
    const time = this.dataset.time;
    // console.log(time);

    const timeObj = convertSecondsIntoHrMiSe(time);
    // console.log(timeObj);

    updateEndTime(timeObj);
    updateCountdownTimer(time, timeObj);
}

fixedValuesBTNs.forEach((btn) => btn.addEventListener('click', startTimer));
inputForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // console.log(this);
    const minutesInput = this.querySelector('input[type="text"]');
    if (+minutesInput.value > 0) {
        minutesInput.dataset.time = +minutesInput.value * 60;
        // console.log(minutesInput, minutesInput.value);
        startTimer.apply(minutesInput, e);
    }
})