const canvas = document.getElementById("gradient-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

const colors = [
  { x: 0.2, y: 0.3, r: 0.9, color: "#0d1741" },
  { x: 0.8, y: 0.2, r: 0.8, color: "#5eead4" },
  { x: 0.6, y: 0.8, r: 0.9, color: "#7c3aed" },
  { x: 0.1, y: 0.9, r: 0.7, color: "#1b3a5b" }
];

function draw(time) {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  colors.forEach((c, i) => {
    const offsetX =
      Math.sin(time * 0.0012 + i * 1.7) * 0.16 +
      Math.cos(time * 0.00055 + i) * 0.05;
    const offsetY =
      Math.cos(time * 0.001 + i * 1.3) * 0.14 +
      Math.sin(time * 0.00065 + i * 0.9) * 0.05;
    const radiusScale = 1 + Math.sin(time * 0.0009 + i * 2.1) * 0.14;

    const grad = ctx.createRadialGradient(
      (c.x + offsetX) * w,
      (c.y + offsetY) * h,
      0,
      (c.x + offsetX) * w,
      (c.y + offsetY) * h,
      Math.max(w, h) * c.r * radiusScale
    );
    grad.addColorStop(0, c.color);
    grad.addColorStop(1, "transparent");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  requestAnimationFrame(draw);
}

function drawStatic() {
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  colors.forEach((c) => {
    const grad = ctx.createRadialGradient(
      c.x * w,
      c.y * h,
      0,
      c.x * w,
      c.y * h,
      Math.max(w, h) * c.r
    );
    grad.addColorStop(0, c.color);
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

resizeCanvas();

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  drawStatic();
  window.addEventListener("resize", () => {
    resizeCanvas();
    drawStatic();
  });
} else {
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(draw);
}
