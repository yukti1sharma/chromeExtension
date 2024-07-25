let timer;
let isRunning = false;
let time = 1500; // 25 minutes in seconds

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (time > 0) {
                time--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                isRunning = false;
                alert("Time's up!");
            }
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    time = 1500;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const widgets = {
    'toggle-google-slides': 'google-slides-widget',
    'toggle-pomodoro-timer': 'pomodoro-timer-widget',
    'toggle-google-spreadsheet': 'google-spreadsheet-widget',
    'toggle-music': 'music-widget',
    'toggle-book-quote': 'book-quote-widget',
    'toggle-daily-growth': 'daily-growth-widget',
    'toggle-announcements': 'announcements-widget',
    'toggle-scribble-notes': 'scribble-notes-widget',
    'toggle-google-form': 'google-form-widget'
};

document.addEventListener('DOMContentLoaded', () => {
    Object.keys(widgets).forEach(toggleId => {
        const checkbox = document.getElementById(toggleId);
        checkbox.addEventListener('change', () => {
            const widgetId = widgets[toggleId];
            const widget = document.getElementById(widgetId);

            if (checkbox.checked) {
                if (!document.body.contains(widget)) {
                    const widgetContainer = document.createElement('div');
                    widgetContainer.classList.add('widget');
                    widgetContainer.id = widgetId;
                    widgetContainer.innerHTML = getWidgetContent(widgetId);
                    document.querySelector('.widgets').appendChild(widgetContainer);
                }
            } else {
                if (widget) {
                    widget.remove();
                }
            }
        });
    });
});

function getWidgetContent(widgetId) {
    switch (widgetId) {
        case 'google-slides-widget':
            return `<h2>Google Slides</h2>
                    <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vT0Aq3w4R5YVIRedM8TQ5Ul1VZOi6J1Psz_C6FZ3Rm3QVV8jJy/view?embedded=true"></iframe>`;
        case 'pomodoro-timer-widget':
            return `<h2>Pomodoro Timer</h2>
                    <div id="timer">25:00</div>
                    <button onclick="startTimer()">Start</button>
                    <button onclick="stopTimer()">Stop</button>
                    <button onclick="resetTimer()">Reset</button>`;
        case 'google-spreadsheet-widget':
            return `<h2>Google Spreadsheet</h2>
                    <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQhx9wVcAk_wWZ8tG0FjITeE69KvcZzE5GQ8/view?embedded=true"></iframe>`;
        case 'music-widget':
            return `<h2>Music</h2>
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" allow="encrypted-media"></iframe>`;
        case 'book-quote-widget':
            return `<h2>Book + Quote</h2>
                    <p>“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt</p>`;
        case 'daily-growth-widget':
            return `<h2>Daily Growth Checker</h2>
                    <input type="text" id="growth-input" placeholder="Enter your growth target for today">
                    <div id="growth-display"></div>`;
        case 'announcements-widget':
            return `<h2>Announcements</h2>
                    <marquee>Stay tuned for exciting updates!</marquee>`;
        case 'scribble-notes-widget':
            return `<h2>Scribble Notes</h2>
                    <textarea placeholder="Write your notes here..."></textarea>`;
        case 'google-form-widget':
            return `<h2>Google Form</h2>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfDd0C5i/viewform?embedded=true" width="100%" height="600" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`;
        default:
            return '';
    }
}
