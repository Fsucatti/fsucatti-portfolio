/** 3D rotating planet for /about. Loaded on demand, so other pages never download Three.js. */
import {
  AmbientLight,
  BufferGeometry,
  Color,
  DirectionalLight,
  Float32BufferAttribute,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function createStars(count: number): Points {
  const positions: number[] = [];
  for (let i = 0; i < count; i++) {
    const radius = 18 + Math.random() * 40;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    );
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const material = new PointsMaterial({ color: new Color("#ffffff"), size: 0.09, transparent: true, opacity: 0.85 });
  return new Points(geometry, material);
}

/** Starts the scene inside a container and returns a function that frees its resources. */
export function startEarth(container: HTMLElement): () => void {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.z = 6.4;

  scene.add(new AmbientLight(0xffffff, 0.45));
  const sun = new DirectionalLight(0xffffff, 2.2);
  sun.position.set(5, 3, 5);
  scene.add(sun);

  const stars = createStars(2500);
  scene.add(stars);

  const texture = new TextureLoader().load("/planet.jpg", () => {
    if (reducedMotion) renderer.render(scene, camera);
  });
  texture.colorSpace = SRGBColorSpace;
  const planet = new Mesh(new SphereGeometry(2.25, 64, 64), new MeshStandardMaterial({ map: texture }));
  scene.add(planet);

  // Dragging on a phone would block page scrolling, so only mouse users can rotate it.
  const controls = matchMedia("(pointer: fine)").matches ? new OrbitControls(camera, renderer.domElement) : null;
  if (controls) {
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
  }

  const resize = () => {
    const { clientWidth: width, clientHeight: height } = container;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    if (reducedMotion) renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  let visible = true;
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  visibility.observe(container);

  let elapsed = 0;
  let last = performance.now();
  if (!reducedMotion) {
    renderer.setAnimationLoop((now) => {
      const delta = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;
      elapsed += delta;
      planet.rotation.y += delta * 0.12;
      planet.position.y = Math.sin(elapsed * 0.5) * 0.15;
      stars.rotation.y += delta * 0.008;
      controls?.update();
      renderer.render(scene, camera);
    });
  }

  container.dataset.ready = "true";

  return () => {
    renderer.setAnimationLoop(null);
    resizeObserver.disconnect();
    visibility.disconnect();
    controls?.dispose();
    texture.dispose();
    planet.geometry.dispose();
    (planet.material as MeshStandardMaterial).dispose();
    stars.geometry.dispose();
    (stars.material as PointsMaterial).dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
