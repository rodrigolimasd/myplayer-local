const dateSelect = document.getElementById('date-select');
const timeInput = document.getElementById('time-input');
const loadBtn = document.getElementById('load-btn');
const speedSelect = document.getElementById('speed-select');
const player = document.getElementById('player');

let currentList = [];
let currentIndex = 0;

function fetchDays() {
  fetch('/api/days')
    .then(res => res.json())
    .then(data => {
      dateSelect.innerHTML = '';
      data.days.forEach(day => {
        const opt = document.createElement('option');
        opt.value = day;
        opt.textContent = day;
        dateSelect.appendChild(opt);
      });
    });
}

function loadVideo(index) {
  if (!currentList.length || index >= currentList.length) return;
  currentIndex = index;
  player.src = currentList[currentIndex];
  player.playbackRate = parseFloat(speedSelect.value);
  player.play();
}

player.addEventListener('ended', () => {
  loadVideo(currentIndex + 1);
});

speedSelect.addEventListener('change', () => {
  player.playbackRate = parseFloat(speedSelect.value);
});

loadBtn.addEventListener('click', () => {
  const day = dateSelect.value;
  if (!day) return;
  fetch(`/api/day/${day}`)
    .then(res => res.json())
    .then(data => {
      currentList = data.segments;
      const time = timeInput.value || '00:00';
      const [h, m] = time.split(':').map(Number);
      const index = h * 60 + m;
      loadVideo(index);
    });
});

fetchDays();
