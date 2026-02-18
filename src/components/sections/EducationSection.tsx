"use client";

import { lectureData } from "@/src/data/resume";

// Image mapping — tone-mixed so adjacent cards (↔ and ↕) have contrasting colors.
// Map l001 -> 1.png, l002 -> 2.png, etc.
const cardImages = lectureData.map(l => {
  const num = parseInt(l.id.replace('l', ''));
  return `/images/lectures/${num}.png`;
});

export function EducationSection() {
  return (
    <section className="relative flex h-screen w-full flex-col justify-center bg-[#F5F5F7]">
      {/* Section Title */}
      <div className="mx-auto w-full px-12 md:px-24 mb-8">
        <h2 className="font-title text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
          주요 출강 이력
        </h2>
        <p className="mt-2 text-lg text-[#86868b]">
          주요 기업 및 기관을 대상으로 출강 교육 및 보조를 진행하였습니다.
        </p>
      </div>

      {/* Auto-Scroll Container - Only this area pauses on hover */}
      <div className="relative w-full max-w-[1240px] mx-auto flex items-center overflow-hidden px-12 md:px-24">


        {/* Scrolling Track */}
        <div
          data-scroll-track-education
          className="flex gap-6 px-4"
          style={{
            animation: 'scroll-education 60s linear infinite',
            willChange: 'transform'
          }}
          onMouseEnter={(e) => {
            const track = e.currentTarget;
            track.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            const track = e.currentTarget;
            track.style.animationPlayState = 'running';
          }}
        >
          {/* First Set - Row 1 */}
          <div className="flex gap-4">
            {lectureData.filter((_, idx) => idx % 2 === 0).map((lecture, index) => {
              const originalIndex = index * 2;
              const imageSrc = cardImages[originalIndex] ?? null;

              return (
                <article
                  key={`row1-original-${lecture.id}`}
                  className="group relative flex h-[280px] w-[240px] flex-shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  {/* Image Area */}
                  <div className={`relative h-[140px] w-full overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${getGradient(originalIndex)}` : 'bg-gray-50'}`}>
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

          {/* First Set - Row 2 */}
          <div className="flex gap-4">
            {lectureData.filter((_, idx) => idx % 2 === 1).map((lecture, index) => {
              const originalIndex = index * 2 + 1;
              const imageSrc = cardImages[originalIndex] ?? null;

              return (
                <article
                  key={`row2-original-${lecture.id}`}
                  className="group relative flex h-[280px] w-[240px] flex-shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className={`relative h-[140px] w-full overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${getGradient(originalIndex)}` : 'bg-gray-50'}`}>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                          <span className="text-2xl">{getIcon(lecture.client)}</span>
                        </div>
                      </div>
                    )}
                  </div>
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

          {/* Duplicate Set - Row 1 */}
          <div className="flex gap-4">
            {lectureData.filter((_, idx) => idx % 2 === 0).map((lecture, index) => {
              const originalIndex = index * 2;
              const imageSrc = cardImages[originalIndex] ?? null;

              return (
                <article
                  key={`row1-duplicate-${lecture.id}`}
                  className="group relative flex h-[280px] w-[240px] flex-shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className={`relative h-[140px] w-full overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${getGradient(originalIndex)}` : 'bg-gray-50'}`}>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                          <span className="text-2xl">{getIcon(lecture.client)}</span>
                        </div>
                      </div>
                    )}
                  </div>
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

          {/* Duplicate Set - Row 2 */}
          <div className="flex gap-4">
            {lectureData.filter((_, idx) => idx % 2 === 1).map((lecture, index) => {
              const originalIndex = index * 2 + 1;
              const imageSrc = cardImages[originalIndex] ?? null;

              return (
                <article
                  key={`row2-duplicate-${lecture.id}`}
                  className="group relative flex h-[280px] w-[240px] flex-shrink-0 flex-col overflow-hidden rounded-[16px] bg-white shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className={`relative h-[140px] w-full overflow-hidden ${!imageSrc ? `bg-gradient-to-br ${getGradient(originalIndex)}` : 'bg-gray-50'}`}>
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
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                          <span className="text-2xl">{getIcon(lecture.client)}</span>
                        </div>
                      </div>
                    )}
                  </div>
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
