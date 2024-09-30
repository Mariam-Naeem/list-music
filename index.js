let audio = document.getElementById('audio');
let text = document.getElementById('pragraph');
let img = document.getElementById('img');
let progress = document.getElementById('nn');
let currentTimeDisplay = document.querySelector('.currant');
let durationDisplay = document.querySelector('.song');
let count = 0;

let array =[
    './music/Alone_-_Color_Out.mp3',
    './music/Color_Out_-_Host.mp3',
    './music/lazy-day-stylish-futuristic-chill-239287.mp3',
    './music/nightfall-future-bass-music-228100.mp3',
    './music/creative-technology-showreel-241274.mp3' 
];

let images = [
    './image/1.jpg',
    './image/Captivating .jpg',
    './image/Disc Jockey Images Design on white background.jpg',
    './image/DJ Headphones.jpg',
    './image/Download premium png of PNG Headphones listening laughing headset_  by Saveshitz about kid headphones png, kids music, recording studio equipment, african child, and headphone png 12091854.jpg' 
];

let numbers = ['first', 'second', 'third', 'fourth', 'five'];

// Initial setup
function setup() {
    audio.src = array[count];
    img.src = images[count];
    text.textContent = `the ${numbers[count]} song`;
}

// When metadata is loaded (for the progress bar)
audio.addEventListener('loadedmetadata', () => {
    progress.max = audio.duration;
    durationDisplay.textContent = formatTime(audio.duration);
});

// Update progress bar and time display as the song plays
audio.addEventListener('timeupdate', () => {
    progress.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Change song time based on slider
progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

// Toggle play/pause
function stop1() {
    if (audio.paused) {
        audio.play().catch(error => {
            console.log('Playback prevented:', error);
        });
    } else {
        audio.pause();
    }
}

// Go to the next song
function next() {
    if (count < array.length - 1) {
        count++;
        run();
      }
}
// Go to the previous song
function back() {
    if (count > 0) {
        count--;
        run();
    }
}

// Play the current song with proper handling
function run() {
    // Set the new audio source
    audio.src = array[count];
    img.src = images[count];
    text.textContent = `the ${numbers[count]} song`;

    // Wait for the audio to be ready to play before calling play()
    audio.addEventListener('canplay', () => {
        audio.play().catch(error => {
            console.log('Playback prevented:', error);
        });
    }, { once: true }); // Ensures the event listener is called only once
}

// Format time in mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Auto-play next song when current one ends
audio.addEventListener('ended', () => {
    next();
});

// Run the initial song setup
setup();
