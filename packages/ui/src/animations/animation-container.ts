
import { BaseAnimation, Canvas } from "./base-animation";
import { AnimationInstance, AnimationObjectType } from "./types";

import { ParticleFall } from "./particleFall";
import { CloudFlow } from "./cloudFlow";

/**
 * 하나의 캔버스에서 재생될 애니메이션 객체를 관리하는 클래스
 * @extends {BaseAnimation}
 */
export class Animation extends BaseAnimation<AnimationInstance> {
    constructor(canvas: Canvas, options?: any) {
      super(canvas);
      if (options) {
        this.setOptions(options);
      }
    }
  
    /**
     * 캔버스 애니메이션에 대한 옵션을 설정하는 메서드
     * @param options
     */
    setOptions(options: any) {
      // TODO define options in this 'Animation' class
    }
  
    /**
     * 애니메이션에 표현될 인스턴스들을 추가하는 메서드
     * @param animationType
     * @param options
     */
    add(animationType: AnimationObjectType, options?: any) {
      if (!this.canvas) throw new Error("Canvas is not defined");
      switch (animationType) {
        case "snow":
        case "rain":
          this.items.push(
            new ParticleFall(this.canvas, animationType, options ?? {})
          );
          break;
        case "cloud":
          this.items.push(new CloudFlow(this.canvas, options ?? {}));
          break;
      }
    }
  
    /**
     * 인스턴스 객체를 제거하는 메서드
     * @param animationType
     */
    remove(animationType: AnimationObjectType) {
      this.items = this.items.filter(
        (instance) => instance.type !== animationType && instance.destroy()
      );
    }
    /**
     * 애니메이션을 시작하는 메서드
     */
    animate() {
      if (this.isDestroyed) {
        console.debug("animation canceled", this.animationId);
        return;
      }
      this.setFps();
      this.clear();
      this.items.forEach((instance: AnimationInstance) => {
        instance.update();
        instance.draw();
      });
  
      this.drawFps();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  
    /**
     * 컴포넌트 소멸 시 호출되는 메서드
     * 여러개의 객체를 관리하는 경우, 각 객체의 destroy 메서드를 호출해야 함
     * 혹시모를 메모리 누수를 방지하기 위함
     * @override
     */
    destroy() {
      this.stop();
      this.items.forEach((instance: AnimationInstance) => {
        instance.destroy();
      });
    }
  }