function generateSalami() {
    const amounts = [100, 200, 500, 1000];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];
    
    document.getElementById("salami-amount").textContent = `তোমার সালামি: ৳${randomAmount}! 🎉`;
    document.getElementById("money-note").src = `img/${randomAmount}.jpg`;
    startConfetti();
}

const button = document.querySelector('button');
button.addEventListener('click', (event) => {
    window.location.href = 'index.html';
});

function generateRandomColor() {
    return `hsl(${Math.random() * 360}, 70%, 60%)`;
}

function createClickParticles(event) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        particle.style.background = generateRandomColor();
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

// Initialize first salami
generateSalami();
