import { VERTEX_SHADER } from "./ShaderUtil.js";

// language=GLSL
const FRAGMENT_SHADER = `
precision mediump float;
uniform sampler2D tDiffuse;
varying vec2 vUv;

varying vec2 vTextureCoord;

#define REDUCTION_STEP 4.0

void main(void) {
  vec3 c = texture2D(tDiffuse, vUv).xyz;
  c = floor(c * REDUCTION_STEP + 0.5) / REDUCTION_STEP;
  gl_FragColor = vec4(c, 1.0);
}
`;

export class ColorReductionShader {
  constructor() {
    this.uniforms = {
      tDiffuse: { type: "t", value: null },
    };
    this.vertexShader = VERTEX_SHADER;
    this.fragmentShader = FRAGMENT_SHADER;
  }
}
