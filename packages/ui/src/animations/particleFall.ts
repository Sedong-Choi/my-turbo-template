import { Canvas } from "./base-animation";
import { BaseAnimationInstance } from "./base-animation-instance";
import { Particles, ParticleType, SnowParticle } from "./types";

export class ParticleFall extends BaseAnimationInstance<
  Particles,
  ParticleType
> {
  // initialize parameters
  private widthScale: number = 2;

  // mouse pointer
  mousePoint: { x: number; y: number } = { x: 0, y: 0 };

  // control part start
  maxParticle: number = 300;

  // TODO
  // for 1 frame
  maxSpeedX: number = 3;
  maxSpeedY: number = 3;
  // control part end

  constructor(canvas: Canvas, particleType: ParticleType, options?: any) {
    super(canvas, particleType, options);
    if (options) {
      this.setOptions(options);
    }

    if (this.canvas) {
      this.canvas.addEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
    }
    console.debug("ParticleFall class created!");
  }

  /**
   *
   * @abstract
   * @param options
   */
  setOptions(options: any) {
    if (options) {
      const { maxSpeedX, maxSpeedY, maxParticle } = options;
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

  /**
   * ParticleFall class의 각 item에 대한 maxSpeedY를 설정하는 메서드
   * @param maxSpeedY
   */
  setMaxSpeedY(maxSpeedY: number) {
    this.maxSpeedY = maxSpeedY;
  }
  /**
   * ParticleFall class의 각 item에 대한 maxSpeedX를 설정하는 메서드
   * @param maxSpeedX
   */
  setMaxSpeedX(maxSpeedX: number) {
    this.maxSpeedX = maxSpeedX;
  }

  /**
   * ParticleFall class의 각 item에 대한 maxParticle를 설정하는 메서드
   * @param maxParticle
   */
  setMaxParticle(maxParticle: number) {
    this.maxParticle = maxParticle;
  }

  setParticles(items: Particles[]) {
    this.items = items;
  }

  /**
   * create falling particles
   * @implements
   */
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

  /**
   * update falling particles position
   * @implements
   */
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

  /**
   * select draw method by particle type
   * @implements
   */
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

  /**
   * draw snow method
   * @param particle
   */
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

  /**
   * TODO make rain particle
   */
  private drawRain() {
    console.debug("drawRain method called");
  }

  /**
   * Canvas 위에서의 mouse 움직일에 따른 pointer 위치를 설정하는 메서드
   * @param x
   * @param y
   */
  setMousePoint(x: number, y: number) {
    this.mousePoint = { x, y };
  }

  /**
   * ParticleFall class has own mouse event listener
   * remove event listener and destroy
   * @override
   */
  destroy() {
    this.isDestroyed = true;
    this.stop();
    if (this.ctx && this.canvas) {
      // 캔버스 클리어
      this.canvas.removeEventListener(
        "mousemove",
        this.handleMouseMove.bind(this)
      );
    }
    this.items = [];
    this.ctx = null;
    this.canvas = null;
    console.debug("ParticleFall class destroyed!");
  }

  /**
   * particle wind speed change by mouse pointer
   * @param event
   * @returns
   */
  handleMouseMove(event: MouseEvent) {
    // canvas위에서의 mouse pointer 위치를 업데이트 할꺼야
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.setMousePoint(event.clientX - rect.left, event.clientY - rect.top);
  }

  /**
   * canvas의 중심으로 부터 가장자리까지의 비율을 1로 설정했을대 pointer의 비율
   * @param point
   * @param range
   * @returns number
   */
  calcMousePointerRatioFromCenter(point: number, range: number): number {
    return (point - range / 2) / (range / 2);
  }
}
