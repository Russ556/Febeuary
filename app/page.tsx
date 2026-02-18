"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { Bebas_Neue, Inter } from 'next/font/google';
import { EducationSection } from '@/src/components/sections/EducationSection';
import { ImplementationSection } from '@/src/components/sections/ImplementationSection';

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
type Section = "MAIN" | "PROFILE" | "PROJECTS" | "EDUCATION" | "IMPLEMENTATION";

const NAV_MAP: Record<Section, { up?: Section; down?: Section; left?: Section; right?: Section }> = {
  MAIN: { up: "PROFILE", down: "PROJECTS", left: "EDUCATION", right: "IMPLEMENTATION" },
  PROFILE: { down: "MAIN", left: "EDUCATION", right: "IMPLEMENTATION" },
  PROJECTS: { up: "MAIN", left: "EDUCATION", right: "IMPLEMENTATION" },
  EDUCATION: { right: "MAIN", up: "PROFILE", down: "PROJECTS" },
  IMPLEMENTATION: { left: "MAIN", up: "PROFILE", down: "PROJECTS" },
};

const SECTION_LABELS: Record<Section, string> = {
  MAIN: "Main",
  PROFILE: "Profile",
  PROJECTS: "Projects",
  EDUCATION: "Education",
  IMPLEMENTATION: "Implementation",
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
        <div className="flex h-full w-full max-w-6xl mx-auto flex-col md:flex-row items-center justify-center p-6 md:p-8 lg:p-12 gap-8 md:gap-16">

          {/* LEFT: Intro & Contact */}
          <div className="flex w-full flex-col justify-center md:w-5/12 lg:w-4/12 md:pr-4">
            <span className="mb-6 font-body text-[10px] font-bold uppercase tracking-[0.1em] text-blue-600">
              PROFILE
            </span>

            {/* Name & Role */}
            <h2 className="font-title text-5xl font-black leading-[0.9] tracking-tighter text-[#1d1d1f] whitespace-nowrap md:text-6xl lg:text-7xl mb-3">
              KIM<br />
              HAK JONG
            </h2>
            <p className="font-body text-base font-medium text-[#1d1d1f] md:text-lg mb-8">
              Manager / AI Planner
            </p>

            {/* Quote */}
            <div className="mb-10 space-y-3">
              <p className="font-body text-sm leading-relaxed text-[#86868b] font-medium">
                "AI 트렌드를 가장 빠르게 읽고, 조직에 필요한
                형태로 가공하여 전달합니다."
              </p>
              <p className="font-body text-sm leading-relaxed text-[#86868b] font-medium">
                "제 위치에서 조직에 기여할 수 있는 역할을
                주도적으로 찾겠습니다."
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <a href="mailto:studybell@naver.com" className="group flex items-center gap-3 text-[#86868b] transition-colors hover:text-blue-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-blue-200">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span className="font-body text-sm font-medium">studybell@naver.com</span>
              </a>
              <div className="group flex items-center gap-3 text-[#86868b] transition-colors hover:text-blue-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-all group-hover:ring-blue-200">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span className="font-body text-sm font-medium">010-4752-6164</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Visuals & Stats */}
          <div className="flex w-full flex-col md:w-7/12 lg:w-8/12 h-full justify-center">

            <h3 className="mb-4 font-body text-[10px] font-bold uppercase tracking-[0.2em] text-[#86868b]">
              STRATEGIC IMPACT
            </h3>

            {/* Lecture Image */}
            <div className="w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md mb-5 bg-gray-200 relative">
              <img
                src="/images/lectures/한국무역협회 세미나.jpg"
                alt="Lecture Scene"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
                  e.currentTarget.parentElement!.innerHTML = '<span class="text-gray-400 font-body text-xs">이미지를 찾을 수 없습니다</span>';
                }}
              />
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Stat 1 */}
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-200">
                <span className="font-title text-3xl font-black tracking-tight text-blue-600 block mb-1">40회 <span className="font-body text-lg align-top">↑</span></span>
                <h4 className="font-body text-sm font-bold text-[#1d1d1f] mb-1">AI 교육 및 특강</h4>
                <p className="font-body text-[10px] leading-relaxed text-[#86868b] break-keep">
                  주요 기업 및 기관을 대상으로 출강 교육 및 보조 진행하였습니다.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-200">
                <span className="font-title text-3xl font-black tracking-tight text-blue-600 block mb-1">70<span className="text-xl align-top">%</span> <span className="font-body text-lg align-top">↑</span></span>
                <h4 className="font-body text-sm font-bold text-[#1d1d1f] mb-1">업무 생산성 향상</h4>
                <p className="font-body text-[10px] leading-relaxed text-[#86868b] break-keep">
                  맞춤형 업무 도구 제작을 통해 프로세스 효율성을 극대화합니다.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-200">
                <span className="font-title text-3xl font-black tracking-tight text-blue-600 block mb-1">10회 <span className="font-body text-lg align-top">↑</span></span>
                <h4 className="font-body text-sm font-bold text-[#1d1d1f] mb-1">대외활동</h4>
                <p className="font-body text-[10px] leading-relaxed text-[#86868b] break-keep">
                  AI 분야 동아리 및 대외활동 수행
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>



      {/* 4. IMPLEMENTATION SECTION (Static Grid Layout) */}
      <section
        ref={(el) => { sectionRefs.current["PROJECTS"] = el; }}
        className={`fixed inset-0 z-10 flex flex-col items-center justify-center bg-[#F5F5F7] overflow-y-auto transition-opacity duration-300 ${currentSection === "PROJECTS" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <div className="w-full max-w-[1400px] mx-auto pt-48 pb-12 px-20 md:px-40 scale-70 origin-top">
          {/* Section Title */}
          <div className="mb-8 text-left">
            <h2 className="font-title text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
              구현 사례
            </h2>
            <p className="mt-2 text-lg text-[#86868b]">
              실제 비즈니스 현장에 적용된 AI 솔루션 및 프로젝트입니다.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "수출용 무역 비즈니스 프롬프트 제작",
                category: "Prompt Engineering",
                year: "2025-2026",
                description: "수출·무역용 이메일 및 문서 작성 프롬프트 템플릿 제작.",
                image: "/images/lectures/수출.png"
              },
              {
                title: "산업맞춤형 혁신바우처 프로그램",
                category: "AI Consulting",
                year: "2025",
                description: "부서별 맞춤 생성형 AI 교육 및 컨설팅 제공.",
                image: "/images/lectures/혁신바우처.png"
              },
              {
                title: "Agent 제작 커리큘럼 개발",
                category: "Education",
                year: "2024-2025",
                description: "생성형 AI Agent 제작 교육을 위한 커리큘럼 설계 및 교육 자료 개발.",
                image: "/images/lectures/Agent.png"
              },
              {
                title: "커리큘럼 장바구니 시스템",
                category: "Product Development",
                year: "2024",
                description: "다양한 교육 커리큘럼을 효율적으로 보관하고 관리할 수 있는 시스템 개발.",
                image: "/images/lectures/커리큘럼.png"
              },
              {
                title: "광고운영 리포트 자동화",
                category: "Automation",
                year: "2024",
                description: "AI Agent를 활용한 일일 및 주간 광고운영 리포트 자동 생성 도구 개발.",
                image: "/images/lectures/광고리포트 성과 분석.png"
              },
              {
                title: "이메일 작성 자동화 VBA",
                category: "Automation",
                year: "2024",
                description: "Excel VBA를 활용한 템플릿 기반 이메일 자동 생성 도구 개발.",
                image: "/images/lectures/email vba.png"
              },
              {
                title: "검색 광고 운영 (Naver, Google)",
                category: "Digital Marketing",
                year: "2024",
                description: "지피티코리아 검색 광고 담당.",
                image: "/images/lectures/구글네이버 광고 담당.png"
              },
              {
                title: "ASSOCIO DIGITAL SUMMIT 2023",
                category: "Event Management",
                year: "2023",
                description: "국제 행사 기획 및 운영 지원.",
                image: "/images/lectures/ASSOSIO.png"
              },
            ].map((project, i) => (
              <div
                key={i}
                className="group relative flex flex-col rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-xl hover:ring-blue-100"
              >
                {/* Image Area */}
                <div className="relative h-[160px] bg-gray-100 flex items-center justify-center overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-gradient-to-br', 'from-gray-100', 'to-gray-200');
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}

                  {/* Fallback Icon (if image fails or hidden behind image until loaded) */}
                  <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${project.image ? 'opacity-0' : 'opacity-100'}`}>
                    <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Card Content */}
                <div className="flex-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-[10px] font-bold uppercase tracking-wider text-blue-600">
                      {project.category}
                    </span>
                    <span className="font-body text-[10px] font-medium text-[#86868b]">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-title text-base font-black text-[#1d1d1f] mb-1.5 leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-[#86868b] line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* 5. IMPLEMENTATION SECTION */}
      <section
        ref={(el) => { sectionRefs.current["IMPLEMENTATION"] = el; }}
        className={`fixed inset-0 z-10 bg-white transition-opacity duration-300 ${currentSection === "IMPLEMENTATION" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <ImplementationSection />
      </section >

    </main >
  );
}
