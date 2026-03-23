// Canvas setup
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Fireworks
function createFirework(x, y) {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 100
    });
  }
}

// Animate
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
    ctx.fillRect(p.x, p.y, 3, 3);

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

// Start surprise
function startSurprise() {
  document.getElementById("music").play();
  document.getElementById("message").classList.add("show");

  // Balloons
  setInterval(() => {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.background = `hsl(${Math.random()*360},70%,60%)`;
    document.body.appendChild(balloon);

    setTimeout(() => balloon.remove(), 6000);
  }, 300);

  // Hearts
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "💖";
    heart.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 5000);
  }, 300);

  // Fireworks auto
  setInterval(() => {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height / 2
    );
  }, 800);
}

// Click fireworks
canvas.addEventListener("click", e => {
  createFirework(e.clientX, e.clientY);
});