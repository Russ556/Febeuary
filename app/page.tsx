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

  // Initialize timeline indicator position
  useEffect(() => {
    if (currentSection === "PROFILE") {
      const timer = setTimeout(() => {
        const firstEl = timelineItemRefs.current[0];
        if (firstEl) {
          const top = firstEl.offsetTop + 6;
          setIndicatorStyle({ top, height: 0 });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

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
        <div className="flex h-full w-full max-w-5xl mx-auto flex-col md:flex-row items-start justify-center pt-[12vh] gap-12 md:gap-20">

          {/* LEFT: Intro & Contact (Padding increased) */}
          <div className="flex w-full flex-col px-8 md:w-5/12 md:px-10 lg:px-12">
            <div className="flex flex-col">
              <span className="mb-4 font-body text-xs font-bold uppercase tracking-[0.2em] text-blue-600 md:mb-6">
                Profile
              </span>

              {/* Name & Role */}
              <h2 className="font-title text-5xl font-black leading-none tracking-tighter text-[#1d1d1f] whitespace-nowrap md:text-6xl lg:text-7xl xl:text-8xl">
                KIM<br />
                HAK JONG
              </h2>
              <p className="mt-4 font-body text-lg font-medium text-[#1d1d1f] md:text-xl">
                Manager / AI Planner
              </p>

              {/* Bio */}
              <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-[#86868b] md:mt-8 md:text-base">
                "AI 트렌드를 가장 빠르게 읽고, 조직에 필요한<br /> 형태로 가공하여 전달합니다."<br /><br />
                "제 위치에서 조직에 기여할 수 있는 역할을<br /> 주도적으로 찾겠습니다."
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

          <div className="flex h-[60%] w-full flex-col justify-start px-8 py-8 md:h-auto md:w-7/12 md:px-10 lg:px-12">

            <div className="flex flex-col">
              <h3 className="mb-6 font-body text-xs font-bold uppercase tracking-[0.2em] text-[#86868b] md:mb-10">
                Strategic Impact
              </h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {/* Stat 1: AI Training */}
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-100">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-[0.03] transition-all group-hover:scale-150 group-hover:opacity-[0.08]" />
                  <div className="relative">
                    <span className="font-title text-4xl font-black tracking-tight text-blue-600 lg:text-5xl">40<span className="text-2xl ml-1 font-bold">회</span><svg className="w-6 h-6 ml-1 text-blue-600 inline-block align-middle mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg></span>
                    <h4 className="mt-2 font-body text-lg font-bold text-[#1d1d1f]">AI 교육 및 특강</h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-[#86868b]">
                      생성형 AI 활용 출강 교육 진행 및 보조 전문가로서 현장의 AI 도입을 지원합니다.
                    </p>
                  </div>
                </div>

                {/* Stat 2: Productivity */}
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-100 md:col-span-1">
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 opacity-[0.03] transition-all group-hover:scale-150 group-hover:opacity-[0.08]" />
                  <div className="relative">
                    <span className="font-title text-4xl font-black tracking-tight text-blue-600 lg:text-5xl">70<span className="text-2xl ml-1 font-bold">%</span><svg className="w-6 h-6 ml-1 text-blue-600 inline-block align-middle mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg></span>
                    <h4 className="mt-2 font-body text-lg font-bold text-[#1d1d1f]">업무 생산성 향상</h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-[#86868b]">
                      맞춤형 업무 도구 제작을 통해 팀 전체의 프로세스 효율성을 극대화합니다.
                    </p>
                  </div>
                </div>

                {/* Stat 3: External Activities (Full width on larger screens or just card) */}
                <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-md hover:ring-blue-100 md:col-span-2">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-50 opacity-[0.03] transition-all group-hover:scale-150 group-hover:opacity-[0.08]" />
                  <div className="relative flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <span className="font-title text-4xl font-black tracking-tight text-blue-600 lg:text-5xl">10<span className="text-2xl ml-1 font-bold">회</span><svg className="w-6 h-6 ml-1 text-blue-600 inline-block align-middle mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" /></svg></span>
                      <h4 className="mt-2 font-body text-lg font-bold text-[#1d1d1f]">네트워킹 및 대외 활동</h4>
                      <p className="mt-1 font-body text-sm leading-relaxed text-[#86868b]">
                        다양한 AI 커뮤니티 및 컨퍼런스 참여를 통해 최신 트렌드를 지속적으로 학습하고 공유합니다.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 shadow-sm" />
                        ))}
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-50 text-[10px] font-bold text-blue-600">+6</div>
                      </div>
                    </div>
                  </div>
                </div>
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
