"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface HeroProps {
  onOpenReservations: () => void;
}

export default function Hero({ onOpenReservations }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // WebGL Background compilation & rendering logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 a0 = x - floor(x + 0.5);
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = v_texCoord;
        vec2 center = uv - 0.5;
        center.x *= u_resolution.x / u_resolution.y;

        vec3 color = vec3(0.047, 0.051, 0.051);
        float n1 = snoise(uv * 1.5 + u_time * 0.05);
        float n2 = snoise(uv * 2.5 - u_time * 0.07);
        float vignette = 1.0 - smoothstep(0.3, 1.2, length(center));

        vec3 gold = vec3(0.831, 0.686, 0.216);
        vec3 ember = vec3(0.5, 0.2, 0.05);
        float glow = smoothstep(0.4, 0.7, n1 * n2);
        color = mix(color, color + ember * 0.2, glow * vignette);

        float smoke = snoise(uv * 3.0 + vec2(0.0, u_time * 0.2));
        color += smoke * 0.01;

        gl_FragColor = vec4(color * vignette, 1.0);
      }
    `;

    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vertexShader);
    gl.attachShader(prog, fragmentShader);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    syncSize();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }

    let animId: number;
    const render = (t: number) => {
      if (!resizeObserver) syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  // GSAP Entrance & Scroll-Driven ScrollTrigger Actions
  useGSAP(() => {
    // Check prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set("#hero-title, #hero-desc, #hero-ctas, #burger-hero-container img", {
        opacity: 1,
        y: 0,
        scale: 1,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // 1. Cinematic entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      "#hero-title",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.6, delay: 0.2 }
    );
    tl.fromTo(
      "#hero-desc",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4 },
      "-=1.2"
    );
    tl.fromTo(
      "#hero-ctas",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2 },
      "-=1.0"
    );
    tl.fromTo(
      "#burger-hero-container img",
      { opacity: 0, scale: 0.82, y: 100 },
      { opacity: 1, scale: 1, y: 0, duration: 2.0, ease: "power3.out" },
      "-=1.4"
    );

    // 2. Responsive Scroll-Driven Parallax mapping via media queries
    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 768px)", () => {
      gsap.to("#hero-title", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        y: -120,
        opacity: 0,
        ease: "none",
      });

      gsap.to("#hero-desc", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        y: -80,
        opacity: 0,
        ease: "none",
      });

      gsap.to("#hero-ctas", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        y: -50,
        opacity: 0,
        ease: "none",
      });

      // Signature burger responsive scroll (scaling, subtle rotation, vertical shift)
      gsap.to("#burger-hero-container img", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.0,
        },
        scale: 0.75,
        rotation: -6,
        y: 160,
        transformOrigin: "center center",
        ease: "power1.inOut",
      });
    });

    // Mobile
    mm.add("(max-width: 767px)", () => {
      gsap.to("#hero-title, #hero-desc, #hero-ctas", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom center",
          scrub: true,
        },
        opacity: 0,
        y: -40,
        ease: "none",
      });

      gsap.to("#burger-hero-container img", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.88,
        y: 60,
        ease: "power1.inOut",
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32 pb-0" id="hero">
      {/* WebGL Canvas Background */}
      <div className="absolute inset-0 w-full h-full -z-20 bg-background">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background -z-10 pointer-events-none" />

      {/* Hero Typography Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-12 flex flex-col items-center">
        <h1 id="hero-title" className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-background uppercase mb-6 drop-shadow-2xl tracking-tighter">
          THE ART OF THE<br />
          <span className="text-primary italic font-light font-headline-md md:font-display-lg">BURGER</span>
        </h1>
        <p id="hero-desc" className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          A redefinition of the classic, crafted for the discerning palate. Where provenance meets precision.
        </p>
        <div id="hero-ctas" className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
          <button
            className="bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 uppercase tracking-widest hover:bg-[#ffe088] transition-colors duration-300 cursor-pointer btn-sharp"
            onClick={onOpenReservations}
          >
            Book an Experience
          </button>
          <a
            className="border border-outline text-on-background font-label-caps text-label-caps px-10 py-4 uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300 cursor-pointer btn-sharp"
            href="#menu"
          >
            View Menu
          </a>
        </div>
      </div>

      {/* Floating Burger Image */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 mt-auto animate-float flex justify-center translate-y-12" id="burger-hero-container">
        <Image
          src="/assets/wagyu-burger.png"
          alt="Gourmet signature wagyu beef burger"
          width={800}
          height={800}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)]"
        />
      </div>
    </section>
  );
}
