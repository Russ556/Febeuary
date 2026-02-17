"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { lectureData } from "@/src/data/resume";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Image mapping — tone-mixed so adjacent cards (↔ and ↕) have contrasting colors.
// Grid layout: grid-rows-2, grid-flow-col
//   Top row:    idx0  idx2  idx4  idx6  idx8  idx10  idx12  idx14  idx16  idx18  idx20
//   Bottom row: idx1  idx3  idx5  idx7  idx9  idx11  idx13  idx15  idx17  idx19  idx21
// TONES: B=blue, G=green, P=purple/pink, W=warm/orange, L=light/white
const cardImages: (string | null)[] = [
  "/images/lectures/7.png",   // idx0  top — lavender/white (P) (Was 1.png) - HIT Motive
  "/images/lectures/10.png",  // idx1  bot — blue dark (B)
  "/images/lectures/4.png",   // idx2  top — teal-green (G)
  "/images/lectures/17.png",  // idx3  bot — purple-pink (P)
  "/images/lectures/6.png",   // idx4  top — strong blue (B)
  "/images/lectures/12.png",  // idx5  bot — green/enterprise (G)
  "/images/lectures/9.png",   // idx6  top — pink-lavender (P)
  "/images/lectures/8.png",   // idx7  bot — light blue (L)
  "/images/lectures/15.png",  // idx8  top — green-teal (G)
  "/images/lectures/3.png",   // idx9  bot — warm pink/grey (W)
  "/images/lectures/18.png",  // idx10 top — strong blue class (B)
  "/images/lectures/11.png",  // idx11 bot — light grey-green (L)
  "/images/lectures/5.png",   // idx12 top — purple/white pres (P)
  "/images/lectures/2.png",   // idx13 bot — dark navy (B)
  "/images/lectures/16.png",  // idx14 top — white/lavender duo (L)
  "/images/lectures/1.png",   // idx15 bot — teal/orange (W) (Was 7.png) - Neuromeka
  "/images/lectures/13.png",  // idx16 top — lavender/red tie (P)
  "/images/lectures/14.png",  // idx17 bot — light white/min (L)
  "/images/lectures/19.png",  // idx18 top — lavender AI Training (P)
  "/images/lectures/22.png",  // idx19 bot — warm grey meeting (W)
  "/images/lectures/20.png",  // idx20 top — blue analytics (B)
  "/images/lectures/21.png",  // idx21 bot — white/blue round table (L)
];

export function EducationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentX, setCurrentX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Initialize layout and max scroll
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current || !wrapperRef.current) return;
      const totalWidth = containerRef.current.scrollWidth;
      // Use the actual visible container width (accounts for padding)
      const containerEl = wrapperRef.current.querySelector('.card-scroll-area');
      const visibleWidth = containerEl ? containerEl.clientWidth : window.innerWidth - 192;
      const max = -(totalWidth - visibleWidth);
      setMaxScroll(Math.min(max, 0));
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Update animation when currentX changes
  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, {
      x: currentX,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    });
  }, [currentX]);

  // Wheel handler
  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY * 2.5;
    let newX = currentX - delta;
    newX = Math.max(maxScroll, Math.min(0, newX));
    setCurrentX(newX);
  };

  // Button handlers
  const moveBy = (amount: number) => {
    let newX = currentX + amount;
    newX = Math.max(maxScroll, Math.min(0, newX));
    setCurrentX(newX);
  };

  return (
    <section
      ref={wrapperRef}
      className="relative flex h-screen w-full flex-col justify-center bg-[#F5F5F7]"
      onWheel={handleWheel}
    >
      {/* Left Arrow — on gray background, far left */}
      <button
        onClick={() => moveBy(600)}
        disabled={currentX >= 0}
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 p-1 text-[#86868b] transition-all hover:text-[#1d1d1f] disabled:opacity-0 md:left-4"
      >
        <ChevronLeft className="h-10 w-10" strokeWidth={1.5} />
      </button>



      <div className="mx-auto w-full px-12 md:px-24">
        <div className="mb-6">
          <h2 className="font-title text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
            강의 이력
          </h2>
          <p className="mt-2 text-lg text-[#86868b]">
            주요 기업 및 기관 대상 {lectureData.length}회 이상의 강연을 진행했습니다.
          </p>
        </div>

        {/* 2-Row Grid Container */}
        <div className="card-scroll-area relative w-full overflow-hidden py-2">
          <div
            ref={containerRef}
            className="grid w-max grid-flow-col grid-rows-2 gap-4"
          >
            {lectureData.map((lecture, index) => {
              const imageSrc = cardImages[index] ?? null;

              return (
                <article
                  key={lecture.id}
                  className="group relative flex h-[220px] w-[190px] flex-shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  {/* Image Area */}
                  <div className={`relative h-[100px] w-full overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${getGradient(index)}` : 'bg-gray-50'}`}>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={lecture.client}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      /* Fallback: show icon on gradient */
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                          <span className="text-2xl">{getIcon(lecture.client)}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4 text-center">
                    <h3 className="line-clamp-1 font-body text-[15px] font-bold tracking-tight text-[#1d1d1f]">
                      {lecture.client}
                    </h3>

                    <p className="mt-1 line-clamp-2 text-[12px] font-medium leading-relaxed text-[#86868b]">
                      {lecture.topic}
                    </p>

                    <div className="mt-auto flex items-center justify-center gap-2 pt-2">
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                        {lecture.date}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper icons (fallback when no image is assigned)
function getIcon(name: string) {
  if (name.includes("삼성") || name.includes("LG") || name.includes("SK")) return "🏢";
  if (name.includes("국회") || name.includes("공단") || name.includes("기금")) return "🏛️";
  if (name.includes("대학") || name.includes("학교")) return "🎓";
  if (name.includes("협회") || name.includes("조합")) return "🤝";
  if (name.includes("연구원")) return "🔬";
  if (name.includes("AI") || name.includes("테크")) return "🤖";
  return "💼";
}

// Gradient fallbacks for cards without images
function getGradient(index: number) {
  const gradients = [
    "from-blue-100 to-indigo-100",
    "from-emerald-100 to-teal-100",
    "from-orange-100 to-amber-100",
    "from-purple-100 to-pink-100",
    "from-cyan-100 to-sky-100",
    "from-rose-100 to-red-100",
  ];
  return gradients[index % gradients.length];
}
