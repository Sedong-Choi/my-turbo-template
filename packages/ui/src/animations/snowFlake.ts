interface Snowflake {
  x: number;
  y: number;
  speed: number;
  radius: number;
}
type SnowFlakeCtx = CanvasRenderingContext2D | null | undefined;
type SnowFlakeCanvas = HTMLCanvasElement | null;
export class SnowFlake {
  // initialize parameters
  private widthScale: number = 2;
  ctx?: SnowFlakeCtx;
  canvas?: SnowFlakeCanvas;

  // to cancel animation frame
  animationFrame: number = 0;

  // snowflakes item
  snowflakes: (Snowflake | null)[] = [];

  // mouse pointer
  mousePoint: { x: number; y: number } = { x: 0, y: 0 };

  // control part start
  
  animationSpeed: number = 1000 / 60; // default 60fps
  maxParticle: number = 300;
  
  // TODO
  // for 1 frame
  maxSpeedX: number = 3;
  maxSpeedY: number = 3;
  // control part end

  constructor(canvas: SnowFlakeCanvas) {
    if (canvas) {
      this.setCanvas(canvas);
      this.setCtx(canvas.getContext("2d"));
    }
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    console.debug("SnowFlake class created!");
  }

  // 
  setAnimationSpeed(animationSpeed: number) {
    this.animationSpeed = 1000/animationSpeed;
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

  setCanvas(canvas: SnowFlakeCanvas) {
    if (!canvas) return;
    this.canvas = canvas;
    this.setCtx(this.canvas.getContext("2d"));
  }

  setCtx(ctx: SnowFlakeCtx) {
    this.ctx = ctx;
  }

  setSnowFlakes(snowflakes: (Snowflake | null)[]) {
    this.snowflakes = snowflakes;
  }

  createSnow(width?: number) {
    if (this.snowflakes.length > this.maxParticle) return;
    this.snowflakes.push({
      x: Math.random() * (width || window.innerWidth * 2),
      y: 0,
      speed: Math.random() * 2 + 1,
      radius: Math.random() * 2 + 1,
    });
  }

  updateSnowFlakes() {
    if (!this.ctx || !this.canvas) return;
    const canvas = this.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 눈송이 배열을 업데이트하는 로직을 수정
    this.setSnowFlakes(
      this.snowflakes
        .map((snowflake, i) => {
          if (!snowflake) return null;
          let windSpeedY = (this.mousePoint.y - (canvas.height / 2)) / 200;
          let windSpeedX =
            (this.mousePoint.x - (canvas.width / (2 * this.widthScale))) / 200;
          snowflake.y +=
            snowflake.speed + (windSpeedY < 0 ? Math.random() : windSpeedY);
          snowflake.x += windSpeedX;

          // 캔버스를 벗어난 눈송이는 null로 설정
          if (snowflake.y > canvas.height) {
            return null;
          }
          return snowflake;
        })
        .filter((snowflake) => snowflake !== null) // null이 아닌 눈송이만 필터링
    );
  }

  draw() {
    this.updateSnowFlakes();
    this.createSnow();
    this.snowflakes.forEach((snowflake) => {
      if (!this.ctx) {
        throw new Error("ctx is null");
      }
      if (!this.ctx || !snowflake) return;
      this.ctx.beginPath();
      this.ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = "white";
      this.ctx.fill();
    });
    setTimeout(() => {
      this.animationFrame = requestAnimationFrame(this.draw.bind(this));
    }, this.animationSpeed);
  }

  setMousePoint(x: number, y: number) {
    this.mousePoint = { x, y };
  }

  destroy() {
    cancelAnimationFrame(this.animationFrame);
    if (this.ctx && this.canvas) {
      // 캔버스 클리어
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    window.removeEventListener("mousemove", this.handleMouseMove.bind(this));
    console.debug("SnowFlake class destroyed!");
  }

  // 이벤트 리스너 함수 내부에서 this는 window 객체를 가리키므로 this 바인딩이 필요합니다.
  handleMouseMove(event: MouseEvent) {
    this.setMousePoint(event.clientX, event.clientY);
  }
}
