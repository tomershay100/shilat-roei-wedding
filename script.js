// ============================================================
//  SHILAT & ROEI — Wedding Invitation Script
// ============================================================

// =================== COUNTDOWN ===================

const WEDDING_DATE = new Date('2026-06-23T19:00:00').getTime();

function pad(n) {
    return String(n).padStart(2, '0');
}

function updateCountdown() {
    let diff = WEDDING_DATE - Date.now();
    if (diff < 0) diff = 0;

    const days    = Math.floor(diff / 86400000);
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    setCountdownValue('cd-d', String(days));
    setCountdownValue('cd-h', pad(hours));
    setCountdownValue('cd-m', pad(minutes));
    setCountdownValue('cd-s', pad(seconds));
}

function setCountdownValue(id, newVal) {
    const el = document.getElementById(id);
    if (!el || el.textContent === newVal) return;

    // Subtle flip animation
    el.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    el.style.opacity = '0.2';
    el.style.transform = 'translateY(-6px)';

    setTimeout(() => {
        el.textContent = newVal;
        el.style.transform = 'translateY(5px)';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            });
        });
    }, 150);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// =================== BANK MODAL ===================

function openBank() {
    const modal = document.getElementById('bankModal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeBank() {
    const modal = document.getElementById('bankModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// Close on Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBank();
});

// =================== BACKGROUND ROTATION ===================

const BG_IMAGES = [
    'background-image-1.jpeg',
    'background-image-2.jpeg',
    'background-image-3.jpeg',
    'background-image-4.jpeg',
];

const bgMain = document.getElementById('bg-main');

if (bgMain) {
    let bgIndex = 0;

    setInterval(() => {
        bgIndex = (bgIndex + 1) % BG_IMAGES.length;
        bgMain.style.opacity = '0';
        setTimeout(() => {
            bgMain.style.backgroundImage = `url("${BG_IMAGES[bgIndex]}")`;
            bgMain.style.opacity = '1';
        }, 1500);
    }, 8000);
}

// =================== BIT ===================

const BIT_LINKS = [
    'https://bit.ly/bit-link-1',
    'https://bit.ly/bit-link-2',
];

function openBit() {
    const link = BIT_LINKS[Date.now() % 2];
    window.open(link, '_blank');
}