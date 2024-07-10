import { CloudFlow } from "./cloudFlow";
import { ParticleFall } from "./particleFall";

export type Particle = {
  x: number;
  y: number;
  speed: number;
};

export interface SnowParticle extends Particle {
  radius?: number;
}

export interface RainParticle extends Particle {
  length?: number;
}

// all of apticles
export type Particles = SnowParticle | RainParticle;

export type ParticleType = "snow" | "rain";

export type CloudFlowType = "cloud" | "";

export type AnimationInstance = ParticleFall | CloudFlow;

export type AnimationObjectType = ParticleType | CloudFlowType | "thunder";
