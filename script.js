/* Utility Functions */
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

/* Navigation */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isOpen);
    navLinks.classList.toggle('active');
    if (isOpen) {
        navLinks.querySelector('a').focus();
    }
});

/* Particles Animation */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* Intersection Observer for Scroll Animations */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.tool-card').forEach(card => {
    observer.observe(card);
});

/* AI Content Tools */
const API_KEY = 'AIzaSyC_E_nMjCfoC-9re5XUeQHpTugbYsXVcjo';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function callGemini(prompt, tool) {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(`Error in ${tool}:`, error);
        return `Fallback response for ${tool}: Sample output based on your input.`;
    }
}

/* Instagram Caption Generator */
document.querySelector('#content-suite .tool-card:nth-child(1) .tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('insta-prompt').value;
    const tone = document.getElementById('insta-tone').value;
    const length = document.getElementById('insta-length').value;
    const emojis = document.getElementById('insta-emojis').checked;
    const output = document.querySelector('#content-suite .tool-card:nth-child(1) .output');
    output.textContent = 'Generating...';
    const response = await callGemini(`Generate an Instagram caption with ${tone} tone, approximately ${length} characters, ${emojis ? 'with emojis' : 'without emojis'}: ${prompt}`, 'Instagram Caption');
    output.textContent = response;
    enableButtons(output.parentElement);
});

/* YouTube Title Generator */
document.querySelector('#content-suite .tool-card:nth-child(2) .tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('yt-prompt').value;
    const keywords = document.getElementById('yt-keywords').value;
    const creativity = document.getElementById('yt-creativity').value;
    const output = document.querySelector('#content-suite .tool-card:nth-child(2) .output');
    output.textContent = 'Generating...';
    const response = await callGemini(`Generate a YouTube video title with creativity level ${creativity}/5, including keywords "${keywords}": ${prompt}`, 'YouTube Title');
    output.textContent = response;
    enableButtons(output.parentElement);
});

/* Blog Outline Generator */
document.querySelector('#content-suite .tool-card:nth-child(3) .tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const topic = document.getElementById('blog-topic').value;
    const audience = document.getElementById('blog-audience').value;
    const output = document.querySelector('#content-suite .tool-card:nth-child(3) .output');
    output.textContent = 'Generating...';
    const response = await callGemini(`Generate a blog post outline for ${audience} audience: ${topic}`, 'Blog Outline');
    output.textContent = response;
    enableButtons(output.parentElement);
});

/* Tweet/X Generator */
document.querySelector('#content-suite .tool-card:nth-child(4) .tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = document.getElementById('tweet-prompt').value;
    const hashtags = document.getElementById('tweet-hashtags').checked;
    const cta = document.getElementById('tweet-cta').checked;
    const output = document.querySelector('#content-suite .tool-card:nth-child(4) .output');
    output.textContent = 'Generating...';
    const response = await callGemini(`Generate a tweet with ${hashtags ? 'hashtags' : 'no hashtags'}, ${cta ? 'with a call-to-action' : 'without a call-to-action'}: ${prompt}`, 'Tweet');
    output.textContent = response;
    enableButtons(output.parentElement);
});

/* YouTube Thumbnail Downloader */
document.querySelector('#content-suite .tool-card:nth-child(5) .tool-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('yt-url').value;
    const output = document.querySelector('.thumbnail-output');
    output.innerHTML = 'Fetching...';
    const videoId = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)?.[1];
    if (!videoId) {
        output.innerHTML = 'Invalid YouTube URL';
        return;
    }
    const qualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'];
    output.innerHTML = '';
    qualities.forEach(quality => {
        const img = document.createElement('img');
        img.src = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
        img.alt = `${quality} thumbnail`;
        const card = document.createElement('div');
        card.className = 'thumbnail-card';
        card.innerHTML = `<p>${quality}</p>`;
        card.appendChild(img);
        const downloadBtn = document.createElement('a');
        downloadBtn.href = img.src;
        downloadBtn.download = `${videoId}-${quality}.jpg`;
        downloadBtn.className = 'btn';
        downloadBtn.textContent = 'Download';
        card.appendChild(downloadBtn);
        output.appendChild(card);
    });
    document.querySelector('.download-all').disabled = false;
});

/* Copy and Export Functions */
function enableButtons(container) {
    const copyBtn = container.querySelector('.copy');
    const exportBtn = container.querySelector('.export');
    copyBtn.disabled = false;
    exportBtn.disabled = false;
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(container.querySelector('.output').textContent);
    });
    exportBtn.addEventListener('click', () => {
        const blob = new Blob([container.querySelector('.output').textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'output.txt';
        a.click();
        URL.revokeObjectURL(url);
    });
}

/* Decision Hub Calculators */
document.querySelector('#decision-hub .tool-card:nth-child(1) .tool-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const savingsMonths = parseInt(document.getElementById('savings-months').value);
    const expenses = parseInt(document.getElementById('monthly-expenses').value);
    const satisfaction = parseInt(document.getElementById('job-satisfaction').value);
    const score = Math.min(100, (savingsMonths * 10 + (10 - satisfaction) * 5) / (expenses / 10000));
    const output = document.querySelector('#decision-hub .tool-card:nth-child(1) .output');
    output.innerHTML = `Risk Score: ${score.toFixed(1)}<br>Readiness: ${score > 70 ? 'High' : score > 40 ? 'Moderate' : 'Low'}`;
});

document.querySelector('#decision-hub .tool-card:nth-child(2) .tool-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const income = parseInt(document.getElementById('desired-income').value);
    const billable = parseInt(document.getElementById('billable-hours').value) / 100;
    const hourlyRate = (income / (2000 * billable)) * 1.3; // 30% buffer
    const output = document.querySelector('#decision-hub .tool-card:nth-child(2) .output');
    output.innerHTML = `Hourly Rate: ₹${hourlyRate.toFixed(2)}<br>Daily Rate: ₹${(hourlyRate * 8).toFixed(2)}`;
});

document.querySelector('#decision-hub .tool-card:nth-child(3) .tool-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const city1 = document.getElementById('city1').value;
    const city2 = document.getElementById('city2').value;
    const cities = {
        mumbai: { rent: 40000, utilities: 5000, groceries: 10000, transport: 3000 },
        delhi: { rent: 25000, utilities: 4000, groceries: 8000, transport: 2500 },
        'new-york': { rent: 3000 * 83, utilities: 200 * 83, groceries: 400 * 83, transport: 150 * 83 }
    };
    const output = document.querySelector('#decision-hub .tool-card:nth-child(3) .output');
    const total1 = Object.values(cities[city1]).reduce((a, b) => a + b, 0);
    const total2 = Object.values(cities[city2]).reduce((a, b) => a + b, 0);
    output.innerHTML = `${city1}: ₹${total1}<br>${city2}: ₹${total2}<br>Difference: ${(100 * (total2 - total1) / total1).toFixed(1)}%`;
});

/* Theme Customizer */
document.getElementById('theme-selector').addEventListener('change', (e) => {
    const themes = {
        'dark-neon': { '--primary-color': '#22d3ee', '--secondary-color': '#a855f7' },
        'dark-blue': { '--primary-color': '#3b82f6', '--secondary-color': '#60a5fa' },
        'light': { '--primary-color': '#2563eb', '--secondary-color': '#4f46e5', '--bg-dark': '#f3f4f6', '--card-bg': 'rgba(0, 0, 0, 0.05)', '--text-color': '#1f2937' }
    };
    Object.entries(themes[e.target.value]).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
});

document.getElementById('accent-color').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
});

/* Skeleton Loader Removal */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelectorAll('.skeleton').forEach(el => el.classList.remove('skeleton'));
    }, 1000);
});