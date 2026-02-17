"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Bebas_Neue, Inter } from 'next/font/google';
import { EducationSection } from '@/src/components/sections/EducationSection';

// 1. FONTS
const titleFont = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-title',
});
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

// 2. TYPES & MAP
type Section = "MAIN" | "PROFILE" | "PROJECTS" | "EDUCATION" | "CONTACT";

const NAV_MAP: Record<Section, { up?: Section; down?: Section; left?: Section; right?: Section }> = {
  MAIN: { up: "PROFILE", down: "PROJECTS", left: "EDUCATION", right: "CONTACT" },
  PROFILE: { down: "MAIN", left: "EDUCATION", right: "CONTACT" },
  PROJECTS: { up: "MAIN", left: "EDUCATION", right: "CONTACT" },
  EDUCATION: { right: "MAIN", up: "PROFILE", down: "PROJECTS" },
  CONTACT: { left: "MAIN", up: "PROFILE", down: "PROJECTS" },
};

const SECTION_LABELS: Record<Section, string> = {
  MAIN: "메인 화면",
  PROFILE: "프로필",
  PROJECTS: "프로젝트",
  EDUCATION: "에듀케이션",
  CONTACT: "컨텍트",
};

export default function Home() {
  const [currentSection, setCurrentSection] = useState<Section>("MAIN");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number>(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  // 3. ANIMATION LOGIC
  const handleNavigate = (direction: "up" | "down" | "left" | "right") => {
    if (isAnimating) return;
    const nextSection = NAV_MAP[currentSection][direction];
    if (!nextSection) return;

    setIsAnimating(true);
    const currentEl = sectionRefs.current[currentSection];
    const nextEl = sectionRefs.current[nextSection];

    if (currentEl && nextEl) {
      let xMove = 0;
      let yMove = 0;

      switch (direction) {
        case "up": yMove = 100; break;
        case "down": yMove = -100; break;
        case "left": xMove = 100; break;
        case "right": xMove = -100; break;
      }

      gsap.set(nextEl, { xPercent: -xMove, yPercent: -yMove, autoAlpha: 1, zIndex: 20 });
      gsap.to(currentEl, {
        xPercent: xMove,
        yPercent: yMove,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(currentEl, { autoAlpha: 0, zIndex: 10 });
        }
      });
      gsap.to(nextEl, {
        xPercent: 0,
        yPercent: 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          setIsAnimating(false);
          setCurrentSection(nextSection);
        }
      });
    }
  };

  // 4. KEYBOARD NAV
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;
      if (e.key === "ArrowUp") handleNavigate("up");
      else if (e.key === "ArrowDown") handleNavigate("down");
      else if (e.key === "ArrowLeft") handleNavigate("left");
      else if (e.key === "ArrowRight") handleNavigate("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, isAnimating]);

  // 5. MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 5. RENDER ARROWS
  const renderArrows = () => {
    const targets = NAV_MAP[currentSection];
    const baseStyle = "absolute z-50 flex items-center gap-2 text-[#86868b] transition-all duration-300 hover:scale-110 hover:text-[#1d1d1f]";

    return (
      <>
        {targets.up && (
          <button
            onClick={() => handleNavigate("up")}
            className={`fixed left-1/2 top-8 -translate-x-1/2 flex-row ${baseStyle} hover:-translate-y-1`}
          >
            <ChevronUp className="h-5 w-5" />
            <span>{SECTION_LABELS[targets.up]}</span>
          </button>
        )}
        {targets.down && (
          <button
            onClick={() => handleNavigate("down")}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex-row-reverse ${baseStyle} hover:translate-y-1`}
          >
            <ChevronDown className="h-5 w-5" />
            <span>{SECTION_LABELS[targets.down]}</span>
          </button>
        )}
        {targets.left && (
          <button
            onClick={() => handleNavigate("left")}
            className={`fixed left-8 top-1/2 -translate-y-1/2 flex-row ${baseStyle} hover:-translate-x-1`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>{SECTION_LABELS[targets.left]}</span>
          </button>
        )}
        {targets.right && (
          <button
            onClick={() => handleNavigate("right")}
            className={`fixed right-8 top-1/2 -translate-y-1/2 flex-row-reverse ${baseStyle} hover:translate-x-1`}
          >
            <ChevronRight className="h-5 w-5" />
            <span>{SECTION_LABELS[targets.right]}</span>
          </button>
        )}
      </>
    );
  };

  return (
    <main className={`${titleFont.variable} ${bodyFont.variable} relative h-screen w-screen overflow-hidden bg-slate-50 text-slate-900`}>

      {/* Static Background Orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 opacity-30 blur-3xl filter" />

      {/* Interactive Mouse-Following Orb */}
      <div
        className="pointer-events-none fixed h-[400px] w-[400px] rounded-full bg-gradient-to-r from-blue-200 to-purple-200 opacity-60 blur-3xl filter transition-all duration-300 ease-out"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      {/* Navigation UI */}
      {renderArrows()}

      {/* Center Indicator */}
      <div className="fixed left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-[10vw] font-bold text-slate-200 opacity-20">
        {currentSection}
      </div>

      {/* 1. MAIN SECTION */}
      <section
        ref={(el) => { sectionRefs.current["MAIN"] = el; }}
        className={`fixed inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${currentSection === "MAIN" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="text-center">
          <h1 className="font-title text-7xl font-black tracking-tighter text-[#1d1d1f] md:text-8xl lg:text-9xl">
            KIM HAK JONG
          </h1>
          <p className="mt-6 font-body text-xl font-medium text-blue-600 md:text-2xl">
            Generative AI Specialist | Educator | Consultant
          </p>
          <p className="mt-10 font-body text-base text-[#86868b]/60">
            Use Arrow Keys to Navigate
          </p>
        </div>
      </section>

      {/* 2. EDUCATION SECTION */}
      <section
        ref={(el) => { sectionRefs.current["EDUCATION"] = el; }}
        className={`fixed inset-0 z-10 transition-opacity duration-300 ${currentSection === "EDUCATION" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <EducationSection />
      </section>

      {/* 3. PROFILE SECTION */}
      <section
        ref={(el) => { sectionRefs.current["PROFILE"] = el; }}
        className={`fixed inset-0 z-10 flex bg-[#F5F5F7] transition-opacity duration-300 ${currentSection === "PROFILE" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="flex h-full w-full max-w-4xl mx-auto flex-col md:flex-row items-center justify-center gap-12 md:gap-20">

          {/* LEFT: Intro & Contact (Padding increased) */}
          <div className="flex h-[40%] w-full flex-col justify-center px-12 md:h-full md:w-5/12 md:px-16 lg:px-20">
            <div className="flex h-full flex-col justify-center mx-auto max-w-md">
              <span className="mb-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:mb-6">
                Profile
              </span>

              {/* Name & Role */}
              <h2 className="font-title text-4xl font-black leading-none tracking-tighter text-[#1d1d1f] md:text-5xl lg:text-6xl xl:text-7xl">
                KIM<br />
                HAK JONG
              </h2>
              <p className="mt-4 font-body text-lg font-medium text-[#1d1d1f] md:text-xl">
                Manager / AI Planner
              </p>

              {/* Bio */}
              <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#86868b] md:mt-8 md:text-base">
                "AI 트렌드를 가장 빠르게 읽고, 조직에 필요한 형태로 가공하여 전달합니다.<br /><br />
                이제는 교육을 넘어 기획부터 실행까지 전 과정을 주도하는 기획자로 성장하고 있습니다."
              </p>

              {/* Contact Info (Integrated) */}
              <div className="mt-10 flex flex-col gap-3">
                <a href="mailto:studybell@naver.com" className="group flex items-center gap-3 text-[#86868b] transition-colors hover:text-blue-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-blue-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="font-body text-sm font-medium">studybell@naver.com</span>
                </a>
                <div className="group flex items-center gap-3 text-[#86868b] transition-colors hover:text-blue-600">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-blue-200">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="font-body text-sm font-medium">010-4752-6164</span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: Timeline (Padding increased) */}
          <div className="flex h-[60%] w-full flex-col justify-center px-12 py-8 md:h-full md:w-7/12 md:pl-20 md:pr-32">

            <div className="flex h-full max-h-[600px] flex-col justify-center mx-auto max-w-lg">
              <h3 className="mb-6 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#86868b] md:mb-10 text-center">
                Career History
              </h3>

              <div className="relative border-l-2 border-[#d2d2d7]/50 ml-3 space-y-10 md:space-y-12">

                {/* Visual Indicator (Moving Line & Dot) */}
                <div
                  className="absolute left-[-2px] w-[2px] bg-blue-500 transition-all duration-300 ease-out"
                  style={{
                    top: 0,
                    height: `${indicatorStyle.height}px`
                  }}
                />
                <div
                  className="absolute left-[-9px] h-4 w-4 rounded-full border-4 border-[#F5F5F7] bg-blue-500 shadow-lg shadow-blue-500/50 transition-all duration-300 ease-out"
                  style={{
                    top: `${indicatorStyle.top}px`
                  }}
                />

                {[
                  {
                    period: "現",
                    role: "매니저",
                    company: "(주)지피티코리아",
                    desc: "AI 기획 및 실행 총괄"
                  },
                  {
                    period: "2024",
                    role: "교육컨설턴트(인턴), 연구원",
                    company: "(주)오픈놀",
                    desc: "교육 프로그램 기획 및 운영 지원"
                  },
                  {
                    period: "2023",
                    role: "기획자(사원)",
                    company: "이앤씨커뮤니케이션",
                    desc: "콘텐츠 기획 및 마케팅 전략 수립"
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    ref={(el) => { timelineItemRefs.current[i] = el; }}
                    className="relative pl-8 md:pl-10 cursor-pointer transition-all"
                    onMouseEnter={() => {
                      setHoveredTimelineIndex(i);
                      const el = timelineItemRefs.current[i];
                      const firstEl = timelineItemRefs.current[0];
                      if (el && firstEl) {
                        const top = el.offsetTop + 6;
                        const startTop = firstEl.offsetTop + 6;
                        setIndicatorStyle({ top: top, height: top - startTop });
                      }
                    }}
                    onMouseLeave={() => {
                      // Reset to first item
                      const firstEl = timelineItemRefs.current[0];
                      if (firstEl) {
                        const top = firstEl.offsetTop + 6;
                        setIndicatorStyle({ top: top, height: 0 });
                      }
                      setHoveredTimelineIndex(0);
                    }}
                  >
                    {/* Placeholder Dot (Gray) */}
                    <span className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-[#F5F5F7] bg-[#d2d2d7] transition-opacity duration-300 ${hoveredTimelineIndex === i ? 'opacity-0' : 'opacity-100'
                      }`}></span>

                    <span className={`font-title text-sm font-bold transition-all duration-300 ${hoveredTimelineIndex === i ? 'text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'text-[#86868b]'
                      } md:text-base`}>
                      {item.period}
                    </span>
                    <h4 className="mt-1 font-body text-xl font-bold text-[#1d1d1f] md:text-2xl">
                      {item.company}
                    </h4>
                    <p className="font-body text-base font-medium text-[#1d1d1f]/80 md:text-lg">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. PROJECTS SECTION (Placeholder) */}
      <section
        ref={(el) => { sectionRefs.current["PROJECTS"] = el; }}
        className={`fixed inset-0 z-10 flex items-center justify-center bg-white p-8 transition-opacity duration-300 ${currentSection === "PROJECTS" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="text-center">
          <h2 className="font-title text-5xl font-bold text-slate-900">PROJECTS</h2>
          <p className="mt-4 text-xl text-gray-500">Coming Soon</p>
        </div>
      </section>

      {/* 5. CONTACT SECTION (Placeholder) */}
      <section
        ref={(el) => { sectionRefs.current["CONTACT"] = el; }}
        className={`fixed inset-0 z-10 flex items-center justify-center bg-white p-8 transition-opacity duration-300 ${currentSection === "CONTACT" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="text-center">
          <h2 className="font-title text-5xl font-bold text-slate-900">CONTACT</h2>
          <p className="mt-4 text-xl text-gray-500">Coming Soon</p>
        </div>
      </section>

    </main>
  );
}
