let isAudioActivated = false;
let lastPlayedDate = ""; // Mencegah audio diputar berulang-ulang di menit yang sama

// Fungsi untuk membuka blokir Auto-Play browser
function activateAudio() {
    isAudioActivated = true;
    document.getElementById('status-text').innerHTML = "Status: 🟢 Audio AKTIF & Terjadwal";
    document.getElementById('activate-btn').style.display = "none";
    
    // Trik agar browser mengizinkan audio diputar otomatis nanti
    let dummyAudio = document.getElementById('audio-doa');
    dummyAudio.play().then(() => {
        dummyAudio.pause();
        dummyAudio.currentTime = 0;
    }).catch(e => console.log("Izin audio belum diberikan", e));
}

// Fungsi memperbarui jam dan mengecek jadwal
function updateClock() {
    const now = new Date();
    
    // Format Jam (HH:MM:SS)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds}`;

    // Format Hari & Tanggal
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[now.getDay()];
    document.getElementById('date').innerText = `${dayName}, ${now.toLocaleDateString('id-ID')}`;

    checkSchedule(now, dayName, hours, minutes);
}

// Logika Penjadwalan
function checkSchedule(now, dayName, hours, minutes) {
    if (!isAudioActivated) return;

    // Kunci waktu saat ini (Tahun-Bulan-Tanggal-Jam-Menit)
    const currentTimeKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${hours}:${minutes}`;
    
    // Jika di menit ini audio sudah diputar, jangan putar lagi
    if (lastPlayedDate === currentTimeKey) return;

    let audioToPlay = null;

    // 1. Senin - Jumat jam 08:00 (Doa)
    if (hours === '08' && minutes === '00' && now.getDay() >= 1 && now.getDay() <= 5) {
        audioToPlay = document.getElementById('audio-doa');
    }
    }
    // 2. Cek Jadwal jam 10:00
    else if (hours === '10' && minutes === '00') {
        if (dayName === 'Senin' || dayName === 'Kamis') {
            audioToPlay = document.getElementById('audio-indonesia-raya');
        } else if (dayName === 'Selasa' || dayName === 'Rabu') {
            audioToPlay = document.getElementById('audio-pancasila');
        } else if (dayName === 'Jumat') {
            audioToPlay = document.getElementById('audio-korpri');
        }
    }

    // Jika ada jadwal yang cocok, putar audionya
    if (audioToPlay) {
        audioToPlay.play();
        lastPlayedDate = currentTimeKey; // Simpan memori bahwa audio sudah diputar di menit ini
    }
}

// Jalankan jam setiap 1 detik
setInterval(updateClock, 1000);
updateClock();