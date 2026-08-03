let isAudioActivated = false;
let lastPlayedDate = ""; 

function activateAudio() {
    isAudioActivated = true;
    document.getElementById('status-text').innerHTML = "Status: 🟢 Audio AKTIF & Terjadwal";
    document.getElementById('activate-btn').style.display = "none";
    
    let dummyAudio = document.getElementById('audio-doa');
    if (dummyAudio) {
        dummyAudio.play().then(() => {
            dummyAudio.pause();
            dummyAudio.currentTime = 0;
        }).catch(e => console.log("Izin audio belum diberikan", e));
    }
}

function updateClock() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.innerText = `${hours}:${minutes}:${seconds}`;

    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[now.getDay()];
    
    const dateEl = document.getElementById('date');
    if (dateEl) dateEl.innerText = `${dayName}, ${now.toLocaleDateString('id-ID')}`;

    checkSchedule(now, dayName, hours, minutes);
}

function checkSchedule(now, dayName, hours, minutes) {
    if (!isAudioActivated) return;

    const currentTimeKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${hours}:${minutes}`;
    
    if (lastPlayedDate === currentTimeKey) return;

    let audioToPlay = null;

    if (hours === '09' && minutes === '28' && now.getDay() >= 1 && now.getDay() <= 5) {
        audioToPlay = document.getElementById('audio-doa');
    } 
    else if (hours === '10' && minutes === '00') {
        if (dayName === 'Senin' || dayName === 'Kamis') {
            audioToPlay = document.getElementById('audio-indonesia-raya');
        } else if (dayName === 'Selasa' || dayName === 'Jumat') {
            audioToPlay = document.getElementById('audio-pancasila'); // Pancasila Selasa & Jumat
        } else if (dayName === 'Rabu') {
            audioToPlay = document.getElementById('audio-korpri'); // KORPRI Rabu
        }
    }

    if (audioToPlay) {
        audioToPlay.play().catch(e => console.log("Gagal memutar audio", e));
        lastPlayedDate = currentTimeKey; 
    }
}

setInterval(updateClock, 1000);
updateClock();
