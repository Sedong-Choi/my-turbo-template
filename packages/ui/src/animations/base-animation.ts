export type Ctx = CanvasRenderingContext2D | null;
export type Canvas = HTMLCanvasElement | null;

export interface BaseAnimationOptions {
  [key: string]: any;
}


export abstract class BaseAnimation<T> {
  // 공통적으로 상속될 속성들 중 캔버스 관련 속성들
  protected canvas: Canvas = null;
  protected ctx: Ctx = null;

  // 공통적으로 상속될 속성들 중 애니메이션 관련 속성들
  protected isDestroyed: boolean = false;
  protected isAnimating: boolean = false;
  protected animationId: number | null = null;
  protected animationStartTime: number = -1;
  protected avgFps = 60; // default
  protected lastFpsUpdateTime = 0;

  // 공통적으로 상속될 속성들 중 애니메이션 items 관련 속성들
  protected items: T[] = [];

  // 각 클래스에서 설정 가능한 Options
  protected options: BaseAnimationOptions = {};

  constructor(canvas: Canvas, options?: BaseAnimationOptions) {
    if (!canvas) throw new Error("Canvas is not defined");
    this.setCanvas(canvas);
    if (options) {
      this.setOptions(options);
    }
  }

  /**
   * Option을 설정할 수 있는 애니메이션 객체의 메서드
   */
  protected abstract setOptions(options: any): void;

  /**
   * 애니메이션을 시작하는 메서드
   */
  protected abstract animate(): void;

  /**
   * Clear canvas rectangle
   * @returns void
   */
  protected clear() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // 공통적으로 상속될 메서드들

  /**
   * 대상이 되는 canvas를 설정하는 메서드
   * @param canvas
   */
  protected setCanvas(canvas: Canvas) {
    if (!canvas) throw new Error("Canvas is not defined");
    this.canvas = canvas;
    if (this.canvas.getContext("2d") !== null) {
      this.ctx = this.canvas.getContext("2d");
    }
  }

  /**
   * Canvas에 표시되는 FPS를 계산하는 메서드
   */
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

  /**
   * 애니메이션을 정지하는 메서드
   */
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      this.isAnimating = false;
    }
  }
  /**
   * 애니메이션을 종료하고, 캔버스를 초기화하는 메서드
   */
  destroy() {
    this.isDestroyed = true;
    this.stop();
    this.clear();
    this.items = [];
    this.canvas = null;
    this.ctx = null;
  }

  drawFps() {
    if (!this.ctx) return;
    this.ctx.fillStyle = "black"; // 텍스트 색상 설정
    this.ctx.font = "16px Arial"; // 텍스트 폰트 설정
    this.ctx.fillRect(10, 10, 100, 30); // 검은색 배경 사각형 그리기
    this.ctx.fillStyle = "white"; // 텍스트 색상을 변경
    this.ctx.fillText(`FPS: ${this.avgFps.toFixed()}`, 15, 30); // FPS 값 표시
  }
}