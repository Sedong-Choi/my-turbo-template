import { Canvas, Ctx } from "./index";

// cloud instance for canvas
type Cloud = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  direction: "right" | "left";
  opacity: number;
  color: string;
};

type CloudflowOptions = {
  createDuration?: number;
  maxCloud?: number;
  color?: string;
  fps?: number;
};

export type CloudFlowType = "cloud";

export class CloudFlow {
  canvas: Canvas = null;
  ctx: Ctx = null;
  items: Cloud[] = [];
  maxCloud: number = 10;
  createDuration: number = 1000;
  color?: string = "#fff";

  destroied: boolean = false;
  animationStartTime: number = -1;
  animationFrame: number = 0;
  animateSpeed: number = 1000 / 60; // default 60fps

  lastCloudCreationTime: number = performance.now();
  type = "cloud";

  avgFps = 0;
  lastFpsUpdateTime = 0;
  constructor(canvas: Canvas, options?: CloudflowOptions) {
    if (!canvas) {
      console.error("Canvas is not defined");
      return;
    }
    this.setCanvas(canvas);

    if (options) {
      this.setOptions(options);
    }
  }

  setOptions(options: CloudflowOptions) {
    const { createDuration, maxCloud, color, fps } = options;
    if (createDuration) {
      this.createDuration = createDuration;
    }
    if (maxCloud) {
      this.maxCloud = maxCloud;
    }
    if (color) {
      this.color = color;
    }
    if (fps) {
      this.animateSpeed = 1000 / fps;
    }
  }
  setCanvas(canvas: Canvas) {
    if (!canvas) return;
    this.canvas = canvas;
    this.setCtx(canvas.getContext("2d"));
  }
  setCtx(ctx: Ctx) {
    this.ctx = ctx;
  }

  update() {
    if (!this.ctx || !this.canvas) return;
    if (this.items.length >= this.maxCloud) return;

    // duration 마다 구름 생성
    const now = performance.now();
    if (
      this.items.length < this.maxCloud &&
      now - this.lastCloudCreationTime >= this.createDuration
    ) {
      this.lastCloudCreationTime = now;

      const canvas = this.canvas;
      const width = Math.random() * 100 + 200;
      const direction = Math.random() > 0.5 ? "right" : "left";

      this.items.push({
        x: direction === "right" ? -width : canvas.width + width,
        y: Math.random() * canvas.height,
        width: width,
        height: width * 0.4,
        speed: Math.random() * 0.5 + 0.5,
        direction: direction,
        opacity: Math.random() * 0.5 + 0.5,
        color: this.color || "#fff",
      });
    }
  }
  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const canvas = this.canvas;
    this.items.forEach((cloud) => {
      // 그라데이션 설정
      const gradient = ctx.createLinearGradient(0, 0, 0, cloud.height);
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(1, "#f1f1f1");

      // center 설정
      const centerX = cloud.x + cloud.width / 2;
      const centerY = cloud.y + cloud.height / 2;

      // 구름 위치 업데이트
      if (cloud.direction === "right") {
        cloud.x += cloud.speed;
        if (cloud.x - cloud.width > canvas.width) {
          cloud.x = -cloud.width;
          // setting new y position
          cloud.y = Math.random() * canvas.height;
        }
      } else if (cloud.direction === "left") {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < 0) {
          cloud.x = canvas.width;
          // setting new y position
          cloud.y = Math.random() * canvas.height;
        }
      }
      ctx.fillStyle = gradient;
      // 구름 세부 형태: before
      ctx.beginPath();
      ctx.arc(
        centerX - cloud.width / 8,
        centerY - cloud.height / 3,
        cloud.height / 3,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // 구름 세부 형태: after
      ctx.beginPath();
      ctx.arc(
        centerX + cloud.width / 10,
        centerY - cloud.height * 0.4,
        cloud.height * 0.5,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // 메인 그림자 설정
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 8;

      // 메인 구름 형태
      ctx.beginPath();

      ctx.arc(
        centerX - cloud.width / 4,
        centerY,
        cloud.height / 3,
        Math.PI * 0.5,
        Math.PI * 1.5
      );
      ctx.arc(
        centerX + cloud.width / 4,
        centerY,
        cloud.height / 3,
        Math.PI * 1.5,
        Math.PI * 0.5
      );
      ctx.fill();
    });
  }

  animate() {
    if (this.destroied) {
      console.debug("animation canceled", this.animationFrame);
      return;
    }
    this.setFps();
    this.clear();
    this.update();
    this.draw();
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.destroied = true;
    console.debug("CloudFlow class destroyed!");
    this.items = [];
    if( this.ctx || this.canvas){
      this.ctx = null;
      this.canvas = null;
    }
  }

  setFps() {
    const now = performance.now();
    if (this.animationStartTime < 0) {
      this.animationStartTime = now;
      this.lastFpsUpdateTime = now;
    }
    const diffTime = now - this.animationStartTime;
    if( now - this.lastFpsUpdateTime > 1000){
      this.avgFps = 1000 / diffTime;
    }
    this.animationStartTime = now;
  }
}
