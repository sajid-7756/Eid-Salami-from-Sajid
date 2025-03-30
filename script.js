document.addEventListener("DOMContentLoaded", function () {
    generateSalami();
});

function generateSalami() {
    const amounts = [100, 200, 500, 1000];  
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    document.getElementById("salami-amount").textContent = `তোমার সালামি: ৳${randomAmount}! 🎉`;
    document.getElementById("money-note").src = `img/${randomAmount}.jpg`;
    startConfetti();
}
