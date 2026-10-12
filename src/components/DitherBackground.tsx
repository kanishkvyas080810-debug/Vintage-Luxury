import React, { useEffect, useRef } from 'react';

interface DitherBackgroundProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
  className?: string;
}

const vertexShaderSource = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `
precision highp float;
varying vec2 vUv;
uniform vec2 resolution;
uniform float time;
uniform float waveSpeed;
uniform float waveFrequency;
uniform float waveAmplitude;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
uniform vec2 mousePos;
uniform int enableMouseInteraction;
uniform float mouseRadius;
uniform float colorNum;
uniform float pixelSize;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

const int OCTAVES = 4;
float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  float freq = waveFrequency;
  for (int i = 0; i < OCTAVES; i++) {
    value += amp * abs(cnoise(p));
    p *= freq;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2)); 
}

float getBayerValue(int x, int y) {
  if (y == 0) {
    if (x == 0) return 0.0/64.0; if (x == 1) return 48.0/64.0; if (x == 2) return 12.0/64.0; if (x == 3) return 60.0/64.0;
    if (x == 4) return 3.0/64.0; if (x == 5) return 51.0/64.0; if (x == 6) return 15.0/64.0; return 63.0/64.0;
  } else if (y == 1) {
    if (x == 0) return 32.0/64.0; if (x == 1) return 16.0/64.0; if (x == 2) return 44.0/64.0; if (x == 3) return 28.0/64.0;
    if (x == 4) return 35.0/64.0; if (x == 5) return 19.0/64.0; if (x == 6) return 47.0/64.0; return 31.0/64.0;
  } else if (y == 2) {
    if (x == 0) return 8.0/64.0; if (x == 1) return 56.0/64.0; if (x == 2) return 4.0/64.0; if (x == 3) return 52.0/64.0;
    if (x == 4) return 11.0/64.0; if (x == 5) return 59.0/64.0; if (x == 6) return 7.0/64.0; return 55.0/64.0;
  } else if (y == 3) {
    if (x == 0) return 40.0/64.0; if (x == 1) return 24.0/64.0; if (x == 2) return 36.0/64.0; if (x == 3) return 20.0/64.0;
    if (x == 4) return 43.0/64.0; if (x == 5) return 27.0/64.0; if (x == 6) return 39.0/64.0; return 23.0/64.0;
  } else if (y == 4) {
    if (x == 0) return 2.0/64.0; if (x == 1) return 50.0/64.0; if (x == 2) return 14.0/64.0; if (x == 3) return 62.0/64.0;
    if (x == 4) return 1.0/64.0; if (x == 5) return 49.0/64.0; if (x == 6) return 13.0/64.0; return 61.0/64.0;
  } else if (y == 5) {
    if (x == 0) return 34.0/64.0; if (x == 1) return 18.0/64.0; if (x == 2) return 46.0/64.0; if (x == 3) return 30.0/64.0;
    if (x == 4) return 33.0/64.0; if (x == 5) return 17.0/64.0; if (x == 6) return 45.0/64.0; return 29.0/64.0;
  } else if (y == 6) {
    if (x == 0) return 10.0/64.0; if (x == 1) return 58.0/64.0; if (x == 2) return 6.0/64.0; if (x == 3) return 54.0/64.0;
    if (x == 4) return 9.0/64.0; if (x == 5) return 57.0/64.0; if (x == 6) return 5.0/64.0; return 53.0/64.0;
  } else {
    if (x == 0) return 42.0/64.0; if (x == 1) return 26.0/64.0; if (x == 2) return 38.0/64.0; if (x == 3) return 22.0/64.0;
    if (x == 4) return 41.0/64.0; if (x == 5) return 25.0/64.0; if (x == 6) return 37.0/64.0; return 21.0/64.0;
  }
}

vec3 ditherColor(vec2 uv, vec3 color) {
  vec2 scaledCoord = floor(uv * resolution / pixelSize);
  int x = int(mod(scaledCoord.x, 8.0));
  int y = int(mod(scaledCoord.y, 8.0));
  float threshold = getBayerValue(x, y) - 0.25;
  float stepVal = 1.0 / max(colorNum - 1.0, 1.0);
  vec3 c = color + threshold * stepVal;
  float luminance = dot(c, vec3(0.2126, 0.7152, 0.0722));
  float bias = mix(0.2, 0.0, smoothstep(0.45, 0.8, luminance));
  c = clamp(c - bias, 0.0, 1.0);
  return floor(c * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
}

void main() {
  vec2 normPixel = pixelSize / resolution;
  vec2 ditherUv = normPixel * floor(gl_FragCoord.xy / pixelSize);
  vec2 uv = ditherUv - 0.5;
  uv.x *= resolution.x / resolution.y;
  
  float f = pattern(uv);
  if (enableMouseInteraction == 1) {
    vec2 mouseNDC = (mousePos / resolution - 0.5) * vec2(1.0, -1.0);
    mouseNDC.x *= resolution.x / resolution.y;
    float dist = length(uv - mouseNDC);
    float effect = 1.0 - smoothstep(0.0, mouseRadius, dist);
    f -= 0.5 * effect;
  }
  
  vec3 rawCol = mix(backgroundColor, waveColor, clamp(f, 0.0, 1.0));
  vec3 finalCol = ditherColor(vUv, rawCol);
  gl_FragColor = vec4(finalCol, 1.0);
}
`;

export const DitherBackground: React.FC<DitherBackgroundProps> = ({
  waveSpeed = 0.04,
  waveFrequency = 3.2,
  waveAmplitude = 0.42,
  waveColor = [0.78, 0.35, 0.20], // warm heritage rust
  backgroundColor = [0.15, 0.10, 0.10], // rich espresso base
  colorNum = 4.5,
  pixelSize = 2.5,
  enableMouseInteraction = true,
  mouseRadius = 0.65,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'low-power' });
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes = gl.getUniformLocation(program, 'resolution');
    const uTime = gl.getUniformLocation(program, 'time');
    const uWaveSpeed = gl.getUniformLocation(program, 'waveSpeed');
    const uWaveFreq = gl.getUniformLocation(program, 'waveFrequency');
    const uWaveAmp = gl.getUniformLocation(program, 'waveAmplitude');
    const uWaveColor = gl.getUniformLocation(program, 'waveColor');
    const uBgColor = gl.getUniformLocation(program, 'backgroundColor');
    const uMousePos = gl.getUniformLocation(program, 'mousePos');
    const uEnableMouse = gl.getUniformLocation(program, 'enableMouseInteraction');
    const uMouseRadius = gl.getUniformLocation(program, 'mouseRadius');
    const uColorNum = gl.getUniformLocation(program, 'colorNum');
    const uPixelSize = gl.getUniformLocation(program, 'pixelSize');

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent ? parent.clientWidth : window.innerWidth;
      const height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      targetMouseX = (e.clientX - rect.left) * dpr;
      targetMouseY = (e.clientY - rect.top) * dpr;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    let animationId: number;
    const startTime = performance.now();

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      gl.useProgram(program);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uWaveSpeed, waveSpeed);
      gl.uniform1f(uWaveFreq, waveFrequency);
      gl.uniform1f(uWaveAmp, waveAmplitude);
      gl.uniform3f(uWaveColor, waveColor[0], waveColor[1], waveColor[2]);
      gl.uniform3f(uBgColor, backgroundColor[0], backgroundColor[1], backgroundColor[2]);
      gl.uniform2f(uMousePos, mouseX, mouseY);
      gl.uniform1i(uEnableMouse, enableMouseInteraction ? 1 : 0);
      gl.uniform1f(uMouseRadius, mouseRadius);
      gl.uniform1f(uColorNum, colorNum);
      gl.uniform1f(uPixelSize, pixelSize);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener('mousemove', handlePointerMove);
      gl.deleteBuffer(positionBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [waveSpeed, waveFrequency, waveAmplitude, waveColor, backgroundColor, colorNum, pixelSize, enableMouseInteraction, mouseRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};
