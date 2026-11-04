/** Floating glowing particles for the home hero. They drift and move away from the pointer. */
const COLORS = ["#22c55e", "#a3e635", "#06b6d4"];
const REPEL_RADIUS = 130;

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  phase: number;
  speed: number;
  offsetX: number;
  offsetY: number;
}

/** Starts the animation on a canvas and returns a function that stops it. */
export function startParticles(canvas: HTMLCanvasElement, count = 80): () => void {
  const context = canvas.getContext("2d");
  if (!context) return () => {};

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: -9999, y: -9999 };
  let width = 0;
  let height = 0;
  let frame = 0;

  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: 1 + Math.random() * 2.2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    phase: Math.random() * Math.PI * 2,
    speed: 0.25 + Math.random() * 0.5,
    offsetX: 0,
    offsetY: 0,
  }));

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (reducedMotion) draw(0);
  };

  function draw(time: number) {
    context!.clearRect(0, 0, width, height);
    const seconds = time / 1000;

    for (const p of particles) {
      const baseX = p.x * width;
      const baseY = p.y * height + Math.sin(seconds * p.speed + p.phase) * 18;
      const dx = baseX - pointer.x;
      const dy = baseY - pointer.y;
      const distance = Math.hypot(dx, dy);
      const force = distance < REPEL_RADIUS ? (REPEL_RADIUS - distance) / REPEL_RADIUS : 0;

      p.offsetX += (dx * force * 0.45 - p.offsetX) * 0.1;
      p.offsetY += (dy * force * 0.45 - p.offsetY) * 0.1;

      context!.globalAlpha = 0.65 + Math.sin(seconds * p.speed * 2 + p.phase) * 0.3;
      context!.shadowBlur = 14;
      context!.shadowColor = p.color;
      context!.fillStyle = p.color;
      context!.beginPath();
      context!.arc(baseX + p.offsetX, baseY + p.offsetY, p.size, 0, Math.PI * 2);
      context!.fill();
    }
  }

  const loop = (time: number) => {
    draw(time);
    frame = requestAnimationFrame(loop);
  };

  const onPointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  if (!reducedMotion) {
    addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(loop);
  }

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    removeEventListener("pointermove", onPointerMove);
  };
}
