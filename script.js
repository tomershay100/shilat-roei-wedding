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

const bgA = document.getElementById('bg-a');
const bgB = document.getElementById('bg-b');

if (bgA && bgB) {
    let bgIndex = 0;
    // bgA is the current visible layer, bgB fades in on top then becomes the base
    let current = bgA;
    let next    = bgB;

    setInterval(() => {
        bgIndex = (bgIndex + 1) % BG_IMAGES.length;
        next.style.backgroundImage = `url("${BG_IMAGES[bgIndex]}")`;
        next.style.zIndex  = '1';
        next.style.opacity = '1';
        current.style.zIndex = '0';
        // After fade completes, reset current behind next
        const outgoing = current;
        setTimeout(() => { outgoing.style.opacity = '0'; }, 1500);
        [current, next] = [next, current];
    }, 3000);
}

// =================== BIT ===================

const BIT_LINKS = [
    'https://www.bitpay.co.il/app/me/C4F6D699-548E-1CD6-4EDF-F30C0AE0C43B78D1',
    'https://www.bitpay.co.il/app/me/633851A1-312D-E508-057D-0DE05ED13091B985',
];

function openBit() {
    const link = BIT_LINKS[Math.floor(Math.random() * BIT_LINKS.length)];
    const a = document.createElement('a');
    a.href = link;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// =================== COPY TO CLIPBOARD ===================

function copyValue(btn, text) {
    function onSuccess() {
        btn.textContent = '✓';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '⧉';
            btn.classList.remove('copied');
        }, 1500);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
    } else {
        fallbackCopy(text, onSuccess);
    }
}

function fallbackCopy(text, onSuccess) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
        document.execCommand('copy');
        onSuccess();
    } catch (_) {}
    document.body.removeChild(ta);
}