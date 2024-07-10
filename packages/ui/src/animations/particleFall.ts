import { Canvas, Ctx } from "./index";

// all of apticles
type Particles = SnowParticle | RainParticle;

export type ParticleType = "snow" | "rain";

type Particle = {
  x: number;
  y: number;
  speed: number;
};

interface SnowParticle extends Particle {
  radius?: number;
}

interface RainParticle extends Particle {
  length?: number;
}

export class ParticleFall {
  // initialize parameters
  private widthScale: number = 2;
  ctx?: Ctx;
  canvas?: Canvas;

  type: ParticleType = "snow";

  avgFps = 60; //default
  lastFpsUpdateTime = 0;
  // to cancel animation frame
  destroied: boolean = false;
  animationStartTime: number = -1;
  animationFrame: number = 0;
  // items item
  items: Particles[] = [];

  // mouse pointer
  mousePoint: { x: number; y: number } = { x: 0, y: 0 };

  // control part start
  animateSpeed: number = 1000 / 60; // default 60fps
  maxParticle: number = 300;

  // TODO
  // for 1 frame
  maxSpeedX: number = 3;
  maxSpeedY: number = 3;
  // control part end

  constructor(canvas: Canvas, particleType?: ParticleType, options?: any) {
    if (canvas) {
      this.setCanvas(canvas);
      this.setCtx(canvas.getContext("2d"));
    }
    this.type = particleType ?? "snow";

    if (options) {
      this.setOptions(options);
    }

    console.debug("ParticleFall class created!");
  }

  setOptions(options: any) {
    if (options) {
      const { fps, maxSpeedX, maxSpeedY, maxParticle } = options;
      if (fps) {
        this.setAnimationSpeed(fps);
      }
      if (maxSpeedX) {
        this.setMaxSpeedX(maxSpeedX);
      }
      if (maxSpeedY) {
        this.setMaxSpeedY(maxSpeedY);
      }
      if (maxParticle) {
        this.setMaxParticle(maxParticle);
      }
    }
  }

  //
  setAnimationSpeed(fps: number) {
    this.animateSpeed = 1000 / fps;
  }
  setMaxSpeedY(maxSpeedY: number) {
    this.maxSpeedY = maxSpeedY;
  }
  setMaxSpeedX(maxSpeedX: number) {
    this.maxSpeedX = maxSpeedX;
  }
  setMaxParticle(maxParticle: number) {
    this.maxParticle = maxParticle;
  }

  setCanvas(canvas: Canvas) {
    if (!canvas) return;
    this.canvas = canvas;
    this.setCtx(this.canvas.getContext("2d"));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  setCtx(ctx: Ctx) {
    this.ctx = ctx;
  }

  setParticles(items: Particles[]) {
    this.items = items;
  }

  create() {
    if (this.items.length > this.maxParticle) return;
    if (!this.canvas) return;
    this.items.push({
      x:
        (Math.random() > 0.5 ? -1 : 1) *
        Math.random() *
        this.canvas.width *
        this.widthScale,
      y: 0,
      speed: Math.random() * 2 + 1,
      radius: Math.random() * 2 + 1 ?? 1,
    });
  }

  update() {
    if (!this.ctx || !this.canvas) return;
    const canvas = this.canvas;
    this.create();
    this.setParticles(
      this.items
        .map((particle, i) => {
          if (!particle) return null;
          // fps 보정 값 this.avgFps
          let windSpeedY =
            (100 *
              this.calcMousePointerRatioFromCenter(
                this.mousePoint.y,
                canvas.height
              )) /
            this.avgFps;
          let windSpeedX =
            (100 *
              this.calcMousePointerRatioFromCenter(
                this.mousePoint.x,
                canvas.width
              )) /
            this.avgFps;

          particle.y +=
            particle.speed + (windSpeedY < 0 ? Math.random() : windSpeedY);
          particle.x += windSpeedX;
          // 캔버스를 벗어난 눈송이는 null로 설정
          if (particle.y > canvas.height) {
            return null;
          }
          return particle;
        })
        .filter((particle) => particle !== null) // null이 아닌 눈송이만 필터링
    );
  }

  draw() {
    this.items.forEach((particle: Particles) => {
      if (!this.ctx) {
        throw new Error("ctx is null");
      }
      if (!this.ctx || !particle) return;
      switch (this.type) {
        case "snow":
          this.drawSnow(particle as SnowParticle);
          break;
        case "rain":
          this.drawRain();
          break;
      }
    });
  }

  private drawSnow(particle: SnowParticle) {
    if (!this.ctx) {
      throw new Error("ctx is null");
    }
    if (!particle.radius) return;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = "white";
    this.ctx.fill();
  }

  private drawRain() {}

  animate() {
    if (this.destroied) {
      console.debug("animation canceled", this.animationFrame);
      return;
    }
    this.setFps();
    this.clear();
    this.update();
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  setMousePoint(x: number, y: number) {
    this.mousePoint = { x, y };
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  destroy() {
    this.destroied = true;
    this.items = [];
    if (this.ctx && this.canvas) {
      // 캔버스 클리어
      this.canvas.removeEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
      this.ctx = null;
      this.canvas = null;
    }
    console.debug("ParticleFall class destroyed!");
  }

  handleMouseMove(event: MouseEvent) {
    // canvas위에서의 mouse pointer 위치를 업데이트 할꺼야
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.setMousePoint(event.clientX - rect.left, event.clientY - rect.top);
  }

  // canvas의 중심으로 부터 가장자리까지의 비율을 1로 설정했을대 pointer의 비율
  calcMousePointerRatioFromCenter(point: number, range: number) {
    return (point - range / 2) / (range / 2);
  }

  setFps() {
    const now = performance.now();
    if (this.animationStartTime < 0) {
      this.animationStartTime = now;
      this.lastFpsUpdateTime = now;
    }
    const diffTime = now - this.animationStartTime;
    if (now - this.lastFpsUpdateTime > 1000) {
      this.avgFps = 1000 / diffTime;
    }
    this.animationStartTime = now;
  }
}
