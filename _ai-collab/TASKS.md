# TASKS.md — 작업 목록 및 검증 체크리스트

> ⚠️ **컨텍스트 공유 불가**: Claude와 ChatGPT는 대화를 공유할 수 없다. 이 문서가 작업 판단의 유일한 기준이다.  
> ✏️ **변경 권한**: Claude만 이 문서를 수정한다.

---

## 작업 상태 범례

| 기호 | 의미 |
|------|------|
| ⬜ | 대기 (Backlog) |
| 🔨 | 진행 중 (In Progress) |
| 🔍 | 검수 중 (Review) |
| ✅ | 완료 (Done) |
| 🚫 | 제외/취소 (Dropped) |

---

## 작업 목록

<!-- Claude가 프로젝트 시작 시 구체적으로 작성 -->

### M1: 프로젝트 초기화

| # | 작업 | 우선순위 | 상태 | 담당 |
|---|------|----------|------|------|
| T-001 | `Next.js 프로젝트 설정 및 폰트/Tailwind 구성` | P0 | ⬜ | ChatGPT |
| T-002 | `기본 레이아웃 및 Framer Motion 설정` | P0 | ⬜ | ChatGPT |

### M3: 데이터 구조화 & 섹션 구현

| # | 작업 | 우선순위 | 상태 | 담당 |
|---|------|----------|------|------|
| T-006 | `이력서 및 강의 이력 데이터 (JSON) 구조화` | P0 | ⬜ | ChatGPT |
| T-007 | `PROFILE 섹션 (Timeline & Skill Cloud)` | P1 | ⬜ | ChatGPT |
| T-008 | `PROJECTS 섹션 (Interactive Grid & Modal)` | P1 | ⬜ | ChatGPT |
| T-009 | `EDUCATION 섹션 (GSAP Uniform Grid)` | P1 | ⬜ | ChatGPT |
| T-010 | `CONTACT 섹션 (3D Tilt Business Card)` | P1 | ⬜ | ChatGPT |

### M4: 통합·배포

| # | 작업 | 우선순위 | 상태 | 담당 |
|---|------|----------|------|------|
| T-011 | `모바일 반응형 (Swipe & Stacked Layout)` | P1 | ⬜ | ChatGPT |
| T-012 | `애니메이션 & 마이크로 인터랙션 폴리싱` | P1 | ⬜ | ChatGPT |
| T-013 | `메타데이터 및 SEO 최적화` | P2 | ⬜ | ChatGPT |
| T-014 | `최종 디자인 QA 및 디버깅` | P0 | ⬜ | ChatGPT |
| T-015 | `Vercel 배포 및 최종 점검` | P0 | ⬜ | ChatGPT |

---

## 작업 상세 템플릿

<!-- 각 작업에 대해 아래 형식으로 별도 섹션 작성 -->

### T-001: Next.js 프로젝트 설정

**마일스톤**: M1  
**우선순위**: P0  
**상태**: ⬜

#### 요구사항
- `npx create-next-app@latest` (App Router, Tailwind, TS)
- 필수 라이브러리 설치: `framer-motion`, `gsap`, `@gsap/react`, `lucide-react`, `clsx`, `tailwind-merge`
- 기본 폴더 구조 생성 (`src/components/ui`, `src/hooks`, `src/data`)
- 폰트 설정: `src/app/layout.tsx`에 `Cinzel`, `Inter` 적용 (next/font/google)

#### DoD
- [ ] `npm run dev` 실행 시 에러 없이 기본 페이지 노출
- [ ] Tailwind 클래스 적용 확인
- [ ] 폰트 적용 확인 (Serif 타이틀)

---

### T-003: `Navigation Indicator 컴포넌트`

**마일스톤**: M2  
**우선순위**: P0  
**상태**: ⬜

#### 요구사항
- `components/ui/NavIndicator.tsx` 구현
- Props: `direction` ('up' | 'down' | 'left' | 'right'), `label` (string)
- UI_SPEC.md 3.1 참조 (알약 모양 + 화살표)
- 상하(vertical) 배치와 좌우(horizontal) 배치 스타일 구분

#### DoD
- [ ] Storybook 또는 임시 페이지에서 4방향 렌더링 확인
- [ ] 호버 시 미세한 움직임(화살표 이동) 애니메이션 적용

---

### T-004: `메인 화면 UI 구현`

**마일스톤**: M2  
**우선순위**: P0  
**상태**: ⬜

#### 요구사항
- `app/page.tsx` (또는 MainSection 컴포넌트)
- 정중앙 "KIM HAK JONG": `Cinzel` 폰트, `text-6xl`, `font-bold` (Classic & Elegant)
- 하단 직함: `Inter` 폰트, `text-xl`, `text-gray-500`
- **배경 오라**: `src/components/ui/BreathingOrb.tsx` 별도 컴포넌트 구현
  - `framer-motion` 활용, Scale 0.95~1.05 / Opacity 0.3~0.5 무한 루프
- 상하좌우에 T-003 `NavIndicator` 배치

#### 데이터 (하드코딩 금지)
- 향후 `data/resume.json`에서 불러오겠지만, 이번 단계에서는 상수로 선언해서 쓰되 **변수화**할 것.
- `const mainData = { name: "KIM HAK JONG", role: "...", nav: { up: "EDUCATION", ... } }`

#### DoD
- [ ] 1920x1080 기준(또는 뷰포트 100vh) 중앙 정렬 확인
- [ ] **Breathing Orb**가 부드럽게(거슬리지 않게) 움직이는지 확인

---

### T-005: `키보드 네비게이션 & 패럴랙스 전환`

**마일스톤**: M2  
**우선순위**: P0  
**상태**: ⬜

#### 요구사항
- `useKeyboardNav` 훅 구현: 방향키(ArrowUp, ArrowDown, ArrowLeft, ArrowRight) 감지 및 Throttle(500ms)
- **전환 효과**: `Parallax Transition` (SPEC 2.3 참조)
  - 이동 방향의 섹션은 빠르게(100%), 메인 화면은 느리게(20%) 이동하여 깊이감 연출
  - `framer-motion`의 `Variants` 및 `custom` prop 활용

#### DoD
- [ ] 방향키 입력 시 의도한 방향으로 패럴랙스 효과와 함께 화면 전환
- [ ] 전환 중 중복 입력 방지 (Throttle) 확인

---

### T-007: `PROFILE 섹션 (Timeline & Skill Cloud)`

**마일스톤**: M3  
**우선순위**: P1  
**상태**: ⬜

#### 요구사항
- **Skill Cloud**: `react-tagcloud` 또는 직접 구현한 3D Sphere 효과.
  - 마우스 움직임에 따라 회전하는 인터랙션.
- **Career Timeline**:
  - `framer-motion`의 `useScroll`과 `svg pathLength`를 연동하여 스크롤 시 선이 그려지는 효과 구현.
  - 각 경력 아이템(`motion.li`)은 `viewport={{ once: true }}`로 등장 애니메이션 적용.
- **데이터 바인딩**: `resume.json`의 `career`, `skills` 데이터 매핑.

#### DoD
- [ ] 스킬 태그들이 구(Sphere) 형태 또는 클라우드 형태로 시각적으로 배치됨
- [ ] 스크롤 시 타임라인 선이 끊김 없이 부드럽게 이어짐
- [ ] 모바일에서는 1컬럼(상단 스킬, 하단 타임라인)으로 변경 확인

---

### T-009: EDUCATION 섹션 (GSAP Uniform Grid)

**마일스톤**: M3  
**우선순위**: P1  
**상태**: ⬜

#### 요구사항
- **Layout**: 고정된 크기의 카드 그리드 (Uniform Grid)
- **Animation (GSAP & ScrollTrigger)**:
  - 섹션 진입 시 Staggered Fade-in/Slide-up 효과
  - 카드 리스트 가로 스크롤 브러시(Scrub) 효과 (스크롤량에 따른 이동)
- **UI**: 미니멀한 화이트 카드 + 얇은 테두리 (`border-[#E2E8F0]`)

#### DoD
- [ ] GSAP ScrollTrigger가 스크롤에 맞춰 부드럽게 동작함
- [ ] 미니멀한 디자인 톤앤매너 유지 확인
- [ ] 가로 스크롤 시 카드가 겹치지 않고 자연스럽게 노출됨

---

## 검수 결과 기록

<!-- Claude가 검수 후 기록 -->

### T-XXX 검수 (회차 N)

**일시**: `[날짜]`  
**판정**: Must / Pass

#### Must (반드시 수정)
1. `[문제 설명]` — `[수정 방법]`

#### Should (권장 수정)
1. `[문제 설명]` — `[수정 방법]`

#### Nice (개선 제안)
1. `[제안 내용]`

---

## 백로그 (Nice-to-have / v2)

| # | 항목 | 출처 | 메모 |
|---|------|------|------|
| B-001 | `[항목]` | T-XXX 검수 Nice | `[메모]` |
