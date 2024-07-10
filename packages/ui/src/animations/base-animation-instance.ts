import { BaseAnimation, Canvas } from "./base-animation";

/**
 * 각각 독립적인 애니메이션 객체에 기본이 되는 클래스
 * @extends {BaseAnimation}
 */
export abstract class BaseAnimationInstance<T, U> extends BaseAnimation<T> {
    type: U;
    constructor(canvas: Canvas, type: U, options?: any) {
      super(canvas);
      this.type = type;
      if (options) {
        this.setOptions(options);
      }
    }
  
    /**
     * @abstract
     * 애니메이션 items를 생성하는 메서드 선언
     */
    protected abstract create(): void;
  
    /**
     * @abstract
     * 애니메이션 items의 상태를 업데이트하는 메서드 선언
     */
    protected abstract update(): void;
  
    /**
     * @abstract
     * 캔버스에 그려주는 메서드 선언
     */
    protected abstract draw(): void;
  
    /**
     * 애니매이션을 시작하는 method
     * @override
     */
    protected animate() {
      if (this.isDestroyed) {
        console.debug("animation canceled", this.animationId);
        return;
      }
      this.setFps();
      this.clear();
      this.update();
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }