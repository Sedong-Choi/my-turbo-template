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
export class CloudFlow {
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;

  clouds: Cloud[] = [];
  maxCloud: number = 10;
  createDuration: number = 1000;
  color?: string = "#fff";

  lastCloudCreationTime: number = performance.now();

  constructor(
    canvas: HTMLCanvasElement | null,
    duration?: number,
    maxCloud?: number,
    color?: Cloud["color"]
  ) {
    if (!canvas) {
      console.error("Canvas is not defined");
      return;
    }
    this.setCanvas(canvas);

    if (color) {
      this.color = color;
    }
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.setCtx(canvas.getContext("2d"));
  }
  setCtx(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  createCloud() {
    if (!this.ctx || !this.canvas) return;
    if (this.clouds.length >= this.maxCloud) return;

    // duration 마다 구름 생성
    const now = performance.now();
    if (
      this.clouds.length < this.maxCloud &&
      now - this.lastCloudCreationTime >= this.createDuration
    ) {
      this.lastCloudCreationTime = now;

      const canvas = this.canvas;
      const width = Math.random() * 100 + 200;
      const direction = Math.random() > 0.5 ? "right" : "left";
      this.clouds.push({
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
  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const canvas = this.canvas;

    this.createCloud();
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 클리어

    this.clouds.forEach((cloud) => {
      // 그라데이션 설정
      var gradient = ctx.createLinearGradient(0, 0, 0, cloud.height);
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

      ctx.save();
      // 메인 그림자 설정
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 8;

      // 메인 구름 형태
      ctx.beginPath();
      ctx.fillStyle = gradient;

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
    requestAnimationFrame(this.draw.bind(this));
  }

  destroy() {
    this.clouds = [];
    this.ctx = null;
    this.canvas = null;
  }
}
