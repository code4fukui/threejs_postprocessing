import { VERTEX_SHADER } from "./ShaderUtil.js";

// language=GLSL
const FRAGMENT_SHADER = `
// forked from iq's "TV CRT Pixels" : https://www.shadertoy.com/view/XsfGDl
precision mediump float;
//uniform sampler2D texture; // -> tDiffuse
//uniform vec2 resolution; // -> vUv
uniform sampler2D tDiffuse;
varying vec2 vUv;

//uniform float time;
//uniform vec2 mouse;
varying vec2 vTextureCoord;

// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

//#define PIXELSIZE 3.0
#define PIXELSIZE 6.0

void main(void)
{
    vec2 cor;

    cor.x = gl_FragCoord.x / PIXELSIZE;
    cor.y = (gl_FragCoord.y + PIXELSIZE * 1.5 * mod(floor(cor.x), 2.0)) / (PIXELSIZE * 3.0);
    cor.y = - cor.y;  // TODO: Investigate where to reverse

    vec2 ico = floor(cor);
    vec2 fco = fract(cor);

    vec3 pix = step(1.5, mod(vec3(0.0, 1.0, 2.0) + ico.x, 3.0));
    //vec3 ima = texture2D(tDiffuse, PIXELSIZE * ico * vec2(1.0, 3.0) / vUv.xy).xyz;
    //float nw = 1.0; // PIXELSIZE;
    //float x = floor(320.0 * vUv.x / nw) * nw / 320.0;
    //float y = floor(180.0 * vUv.y / nw) * nw / 180.0;
    //vec3 ima = texture2D(tDiffuse, vec2(x, y)).xyz;
    vec3 ima = texture2D(tDiffuse, vUv).xyz;

    vec3 col = pix * dot(pix, ima);

    col *= step(abs(fco.x - 0.5), 0.4);
    col *= step(abs(fco.y - 0.5), 0.4);

    col *= 1.2;
    gl_FragColor = vec4(col, 1.0);
}
`;

export class TVShader {
  constructor() {
    this.uniforms = {
      tDiffuse: { type: "t", value: null },
    };
    this.vertexShader = VERTEX_SHADER;
    this.fragmentShader = FRAGMENT_SHADER;
  }
}
