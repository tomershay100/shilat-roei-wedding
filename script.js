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

// =================== BIT ===================

function openBit() {
    // Replace with your actual Bit payment link
    window.open('https://bit.ly/your-bit-link', '_blank');
}