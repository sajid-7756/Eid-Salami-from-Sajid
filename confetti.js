const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
const colors = ['#FF6B6B', '#4ECDC4', '#FFD700', '#45B7D1', '#96CEB4', '#FFEEAD'];
const emojis = ['💰', '💵', '🤑', '🎉', '💎', '🎊'];
const particles = [];
const shapes = ['circle', 'rect', 'emoji'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 6 + 3;
        this.rotation = Math.random() * 360;
        this.alpha = 1;
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.gravity = 0.05 + Math.random() * 0.05;
        this.wind = Math.random() * 0.2 - 0.1;
    }

    update() {
        this.speed *= 0.97;
        this.x += Math.cos(this.angle) * this.speed + this.wind;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.rotation += 2;
        this.alpha -= 0.007;
        return this.alpha > 0 && this.y < canvas.height + 100;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        if (this.shape === 'emoji') {
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.emoji, -this.size / 2, this.size / 2);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
        if (!particles[i].update()) {
            particles.splice(i, 1);
        } else {
            particles[i].draw();
        }
    }

    requestAnimationFrame(animate);
}

function createConfetti(x = canvas.width / 2, y = canvas.height / 2) {
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y));
    }
}

setInterval(() => {
    if (particles.length < 1000) {
        createConfetti();
    }
}, 2000);

animate();