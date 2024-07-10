import { ParticleFall, ParticleType } from "./particleFall";
import { CloudFlow, CloudFlowType } from "./cloudFlow";
import { ThunderProps } from "../components/canvas-container";

export * from "./particleFall";
export * from "./cloudFlow";
export type Ctx = CanvasRenderingContext2D | null | undefined;
export type Canvas = HTMLCanvasElement | null;

export type AnimationInstance = ParticleFall | CloudFlow;
export type AnimationType = ParticleType | CloudFlowType | "thunder";
export class Animation {
  ctx?: Ctx;
  canvas?: Canvas;
  animationList: AnimationInstance[] = [];
  destroied: boolean = false;
  animationFrame: number = 0;
  animationStartTime: number = -1;
  animateSpeed = 1000 / 60; // default 60fps

  avgFps = 0;
  lastFpsUpdateTime = 0;
  constructor(canvas: Canvas) {
    this.setCanvas(canvas);
  }

  setCanvas(canvas: Canvas, options?: any) {
    if (!canvas) return;
    this.canvas = canvas;
    this.setCtx(this.canvas.getContext("2d", { alpha: false }));
    if (options) {
      this.setOptions(options);
    }
  }
  setCtx(ctx: Ctx) {
    this.ctx = ctx;
  }
  setOptions(options: any) {
    const { fps } = options;
    if (fps) {
      this.animateSpeed = 1000 / fps;
    }
  }
  add(animationType: AnimationType, options?: any) {
    if (!this.canvas) throw new Error("Canvas is not defined");
    switch (animationType) {
      case "snow":
      case "rain":
        this.animationList.push(
          new ParticleFall(this.canvas, animationType, options ?? {})
        );
        break;
      case "cloud":
        this.animationList.push(new CloudFlow(this.canvas, options ?? {}));
        break;
    }
  }

  remove(animationType: AnimationType) {
    this.animationList = this.animationList.filter(
      (instance) => instance.type !== animationType
    );
  }

  clear() {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  animate() {
    if (this.destroied) {
      console.debug("animation canceled", this.animationFrame);
      return;
    }
    this.setFps();
    this.clear();
    this.animationList.forEach((instance: AnimationInstance) => {
      instance.setFps();
      instance.update();
      instance.draw();
    });

    // FPS 표시
    if (this.ctx) {
      this.ctx.fillStyle = "black"; // 텍스트 색상 설정
      this.ctx.font = "16px Arial"; // 텍스트 폰트 설정
      this.ctx.fillRect(10, 10, 100, 30); // 검은색 배경 사각형 그리기
      this.ctx.fillStyle = "white"; // 텍스트 색상을 변경
      this.ctx.fillText(`FPS: ${this.avgFps.toFixed()}`, 15, 30); // FPS 값 표시
    }
    this.animationFrame = requestAnimationFrame(() => this.animate());
  }

  async destroy() {
    this.destroied = true;
    this.canvas = null;
    this.ctx = null;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.animationList.forEach((instance: AnimationInstance) => {
      instance.destroy();
    });
  }

  private setFps() {
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
