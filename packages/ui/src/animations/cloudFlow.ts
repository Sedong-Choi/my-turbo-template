import { BaseAnimationInstance, Canvas, Ctx } from "./index";

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
};

export type CloudFlowType = "cloud" | "";

export class CloudFlow extends BaseAnimationInstance<Cloud, CloudFlowType> {
  // cloudFlow options
  maxCloud: number = 10;
  color?: string = "#fff";

  // create duration fileds
  createDuration: number = 1000;
  lastCloudCreationTime: number = performance.now();

  constructor(
    canvas: Canvas,
    particleType: CloudFlowType,
    options?: CloudflowOptions
  ) {
    super(canvas, particleType, options);
    console.log("CloudFlow constructor");
  }

  /**
   * CloudFlow 클래스의 옵션을 설정하는 메서드
   * @implements
   */
  setOptions(options: CloudflowOptions) {
    const { createDuration, maxCloud, color } = options;
    if (createDuration) {
      this.createDuration = createDuration;
    }
    if (maxCloud) {
      this.maxCloud = maxCloud;
    }
    if (color) {
      this.color = color;
    }
  }

  /**
   * item생성하는 method
   * @implements
   */
  create() {
    if (!this.ctx || !this.canvas) return;
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

  /**
   * 구름 생성 및 위치 업데이트
   * @implements
   */
  update() {
    if (!this.ctx || !this.canvas) return;

    // duration 마다 구름 생성
    const now = performance.now();
    if (
      this.items.length < this.maxCloud &&
      now - this.lastCloudCreationTime >= this.createDuration
    ) {
      this.lastCloudCreationTime = now;
      if (this.items.length >= this.maxCloud) return;
      this.create();
    }

    const canvas = this.canvas;
    // 구름 위치 업데이트
    this.items.forEach((cloud) => {
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
    });
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    this.items.forEach((cloud) => {
      // 그라데이션 설정
      const gradient = ctx.createLinearGradient(0, 0, 0, cloud.height);
      gradient.addColorStop(0, "#fff");
      gradient.addColorStop(1, "#f1f1f1");
      ctx.fillStyle = gradient;

      // center 설정
      const centerX = cloud.x + cloud.width / 2;
      const centerY = cloud.y + cloud.height / 2;

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
}
