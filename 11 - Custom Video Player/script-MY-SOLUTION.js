let video = document.querySelector('.player__video');
let videoProgress = document.querySelector(".progress .progress__filled");
let progressBar = document.querySelector(".progress");
let playBTN = document.querySelector(".toggle");
let ctrlTimeBTN = document.querySelectorAll(".player__controls[data-skip]")
let inputForVolumeAndSpeed = document.querySelectorAll(".player__slider");
let fullScreenBTN = document.querySelector('.fullScreen__button');


let controlVideoStopPlay = function () {
    if (video.paused) {
        video.play();
        playBTN.textContent = "❚ ❚";
    } else {
        video.pause();
        playBTN.textContent = "►";
    }
}
playBTN.addEventListener('click', controlVideoStopPlay);
video.addEventListener("click", controlVideoStopPlay);

let updateVolumeOrSpeed = function () {
    video[this.name] = this.value;
}
inputForVolumeAndSpeed.forEach((input) => input.addEventListener('change', updateVolumeOrSpeed));


let controlVideoTime = function () {
    video.currentTime += +this.dataset.skip;
}
ctrlTimeBTN.forEach((btn) => btn.addEventListener('click', controlVideoTime));

let controlVideoProgress = function () {
    const progressPrecent = (video.currentTime / video.duration) * 100;
    videoProgress.style.flexBasis = `${progressPrecent}%`;
}

video.addEventListener('timeupdate', controlVideoProgress);

let scrubVideoTime = function (e) {
    const videoScrubTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
    video.currentTime = videoScrubTime;
}

let isMouseDown = false;
progressBar.addEventListener('click', scrubVideoTime);
progressBar.addEventListener('mousemove', (e) => isMouseDown && scrubVideoTime(e));
progressBar.addEventListener('mousedown', () => isMouseDown = true);
progressBar.addEventListener('mouseup', () => isMouseDown = false);

let videoOriginalWidth = video.offsetWidth;
let videoOriginalHeight = video.offsetHeight;
let isFull = false;
let controlVideoScreenSize = function (e) {
    isFull = !isFull;
    if (isFull) {
        video.setAttribute("width", `${window.innerWidth}px`);
        video.setAttribute("height", `${window.innerHeight}px`);
    } else {
        video.setAttribute("width", `${videoOriginalWidth}px`);
        video.setAttribute("height", `${videoOriginalHeight}px`);
    }
}
fullScreenBTN.addEventListener("click", controlVideoScreenSize)