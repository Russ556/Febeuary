# UI_SPEC.md — UI 규격서

> ⚠️ **컨텍스트 공유 불가**: Claude와 ChatGPT는 대화를 공유할 수 없다. 이 문서가 UI 구현의 유일한 기준이다.  
> ✏️ **변경 권한**: Claude만 이 문서를 수정한다.  
> ⛔ **디자인 임의 변경 금지**: ChatGPT는 이 문서에 명시되지 않은 색상·간격·폰트·레이아웃을 임의로 적용하지 않는다.

---

## 1. 디자인 토큰

### 1.1 색상 팔레트

<!-- Claude가 프로젝트 시작 시 확정 -->

#### Primary (Blue Gradient Accent)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--color-accent-start` | `#3B82F6` (예시) | 그라디언트 시작 (블루) |
| `--color-accent-end` | `#60A5FA` (예시) | 그라디언트 끝 (라이트 블루) |
| `--bg-gradient-center` | `radial-gradient` | 메인 중앙 구체 배경 |

#### Neutral (Clean White Theme)

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--color-bg` | `#FFFFFF` | 전체 배경 |
| `--color-text-primary` | `#0F172A` | 메인 타이틀 (거의 검정) |
| `--color-text-secondary` | `#64748B` | 서브 타이틀, 직함 |
| `--color-pill-bg` | `#F1F5F9` | 네비게이션 알약 배경 (연한 회색) |
| `--color-pill-text` | `#475569` | 네비게이션 텍스트 |

#### Semantic

| 토큰 | HEX | 용도 |
|------|-----|------|
| `--color-success` | `#[값]` | 성공 |
| `--color-warning` | `#[값]` | 경고 |
| `--color-error` | `#[값]` | 에러 |
| `--color-info` | `#[값]` | 정보 |

### 1.2 타이포그래피

| 토큰 | Font Family | Size | Weight | 용도 |
|------|-------------|------|--------|------|
| `--font-serif` | `Cinzel` (Google Fonts) | — | — | 메인 이름 (KIM HAK JONG) |
| `--font-sans` | `Inter` (Google Fonts) | — | — | 본문 및 직함 |
| `--text-h1` | `Serif` | `64px+` | `700` | 메인 이름 (Classic & Elegant) |
| `--text-h2` | `Sans` | `24px` | `500` | 직함 (Modern & Clean) |
| `--text-nav` | `Sans` | `14px` | `600` | 네비게이션 버튼 텍스트 |

### 1.3 간격 (Spacing Scale)

| 토큰 | 값 | 용도 예시 |
|------|-----|-----------|
| `--space-1` | `4px` | 아이콘-텍스트 간격 |
| `--space-2` | `8px` | 인라인 요소 간격 |
| `--space-3` | `12px` | 폼 요소 간격 |
| `--space-4` | `16px` | 카드 내부 패딩 |
| `--space-5` | `20px` | 섹션 간격(소) |
| `--space-6` | `24px` | 카드 패딩 |
| `--space-8` | `32px` | 섹션 간격(중) |
| `--space-10` | `40px` | 섹션 간격(대) |
| `--space-12` | `48px` | 페이지 패딩 |
| `--space-16` | `64px` | 페이지 간격 |

### 1.4 그림자 (Elevation)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | 버튼, 인풋 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | 카드 |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | 드롭다운, 모달 |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | 플로팅 요소 |

### 1.5 Border Radius

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--radius-sm` | `4px` | 인풋, 작은 요소 |
| `--radius-md` | `8px` | 카드, 버튼 |
| `--radius-lg` | `12px` | 모달, 대형 카드 |
| `--radius-xl` | `16px` | 히어로 섹션 |
| `--radius-full` | `9999px` | 뱃지, 아바타 |

### 1.6 트랜지션

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--transition-fast` | `150ms ease` | 호버, 포커스 |
| `--transition-normal` | `250ms ease` | 드롭다운, 토글 |
| `--transition-slow` | `400ms ease` | 모달, 페이지 |

---

## 2. 레이아웃 규칙

### 2.1 메인 레이아웃 (Full Screen)

- **Container**: `100vw`, `100vh` 고정
- **Center Alignment**: `flex`, `justify-center`, `items-center`
- **Navigation Positioning**: 절대 위치(`absolute`)로 상하좌우 배치
  - Top: `top-8`, `left-1/2`, `-translate-x-1/2`
  - Bottom: `bottom-8`, `left-1/2`, `-translate-x-1/2`
  - Left: `left-8`, `top-1/2`, `-translate-y-1/2`
  - Right: `right-8`, `top-1/2`, `-translate-y-1/2`

### 2.2 메인 오라 (Aura) 효과 — "Subtle Breathing"

- **Visual**: 중앙 텍스트 뒤에 은은한 블루 그라디언트 원형 배치 (`radial-gradient`)
- **Animation**: 과하지 않게, 아주 천천히 호흡하는 느낌.
  - Scale: `0.95` ↔ `1.05` (Cycle: 6s, Ease-in-out)
  - Opacity: `0.3` ↔ `0.5`
- **Goal**: 정적인 화면에 생동감을 주되, 텍스트 가독성을 해치지 않음.

### 2.3 화면 전환 (Transition) — "Parallax Scrolling"

- **Concept**: 패럴랙스(Parallax) 스크롤링 느낌의 깊이감 있는 전환.
- **Action**:
  - `↑ (Education)`: 메인 화면이 아래로 살짝 느리게 밀려나고(`y: 20%`), 교육 섹션이 위에서 빠르게 덮으며 들어옴(`y: -100% → 0%`).
  - `↓ (Projects)`: 메인 화면이 위로 살짝 느리게 밀려나고(`y: -20%`), 프로젝트 섹션이 아래에서 빠르게 올라옴(`y: 100% → 0%`).
  - 좌우 이동도 동일한 로직 적용 (메인 `x: ±20%` 이동).
- **Effect**: 공간이 이어져 있는 듯한 입체감 제공.

## 3. 컴포넌트 규격

### 3.1 Navigation Indicator (Pill + Arrow)

> **디자인 참조**: 첨부 이미지 (회색 알약 배경 텍스트 + 외부 화살표)

- **구조**: `[Arrow] [Pill Badge] [Arrow]` (방향에 따라 배치 다름)
- **Top (Education)**: `[↑ Arrow]` (상단) + `[Pill: EDUCATION]` (하단) — 수직 배치
- **Bottom (Projects)**: `[Pill: PROJECTS]` (상단) + `[↓ Arrow]` (하단) — 수직 배치
- **Left (Profile)**: `[← Arrow]` (좌측) + `[Pill: PROFILE]` (우측) — 수평 배치
- **Right (Contact)**: `[Pill: CONTACT]` (좌측) + `[→ Arrow]` (우측) — 수평 배치

#### 스타일 상세
- **Pill Badge**:
  - Bg: `#F3F4F6` (Gray-100)
  - Text: `#4B5563` (Gray-600), `Uppercase`, `text-xs`, `font-bold`, `tracking-widest`
  - Padding: `py-1`, `px-3`
  - Radius: `rounded-full`
- **Arrow Icon**:
  - Color: `#4B5563`
  - Size: `w-5 h-5`
  - Stroke: `Thin` (1.5px)

### 3.4 Card

- 배경: `--color-neutral-0`
- 보더: `1px solid --color-neutral-100`
- 그림자: `--shadow-md`
- Radius: `--radius-md`
- 패딩: `--space-6`

### 3.5 Modal

- 배경: `--color-neutral-0`
- Backdrop: `rgba(0,0,0,0.5)`
- Radius: `--radius-lg`
- 패딩: `--space-8`
- 최대 너비: `480px` (sm) / `640px` (md) / `800px` (lg)
- 닫기: ESC 키 + 오버레이 클릭 + X 버튼

### 3.6 Toast / Alert

| Variant | 아이콘 | 좌측 보더 색상 |
|---------|--------|----------------|
| success | ✓ | `--color-success` |
| warning | ⚠ | `--color-warning` |
| error | ✕ | `--color-error` |
| info | ℹ | `--color-info` |

- 위치: 우상단, `--space-4` 간격
- 자동 닫힘: 5초 (에러는 수동 닫기 필수)

---

## 4. 화면별 컴포넌트 트리

<!-- Claude가 프로젝트 시작 시 구체적으로 작성 -->

### 4.1 컴포넌트 트리

```
RootLayout
├── MainContainer (100vh)
│   ├── AnimatePresence (Screen Transition)
│   │   ├── MainScreen (Center)
│   │   │   ├── BackgroundGlow
│   │   │   ├── TitleParams (Name, Role)
│   │   │   └── NavIndicators (Up, Down, Left, Right)
│   │   ├── ProfileScreen (Left)
│   │   │   ├── SkillCloud (Tags)
│   │   │   └── CareerTimeline (Vertical List)
│   │   ├── EducationScreen (Up)
│   │   │   ├── EducationList
│   │   │   └── CertificationBadges
│   │   ├── ProjectsScreen (Down)
│   │   │   └── ProjectGrid (Cards)
│   │   └── ContactScreen (Right)
│   │       └── BusinessCard (Digital)
```

---

## 5. 섹션별 시각화 전략 (Visual Strategy)

### 5.1 PROFILE (Left)

- **핵심**: "전문성"과 "경력 흐름" 강조
- **레이아웃**: 2컬럼 (좌: 프로필/스킬, 우: 경력 타임라인)
- **Visual Concept**:
  - **Left (Skills)**: 단순 나열이 아닌, **3D Tag Cloud** 또는 **Holographic Card** 형태. 마우스 호버 시 회전하거나 각도 변경.
  - **Right (Experience)**: **Connected Timeline**. 스크롤에 따라 중앙 선이 그려짐(`pathLength` animation).
- **컴포넌트**:
  - `SkillTag`: 둥근 알약 형태, 카테고리별 색상 구분 (AI, Dev, Tool).
  - `TimelineItem`:
    - 연도(`2024`)는 굵은 Serif 폰트.
    - 회사 로고 썸네일 포함.
    - 설명은 아코디언 형태로 접혀있다가 클릭 시 확장.
- **인터랙션**:
  - 타임라인 진입 시 아이템들이 왼쪽에서 오른쪽으로 순차적 슬라이드 인.
  - 스킬 태그 호버 시, 관련 프로젝트가 강조됨(Cross-highlighting).

### 5.2 PROJECTS (Down)

- **핵심**: "결과물" 중심의 비주얼 임팩트
- **레이아웃**: Masonry 또는 Responsive Grid (3컬럼)
- **컴포넌트**:
  - `ProjectCard`: 썸네일 위주. 호버 시 딤드(Dimmed) 처리되면서 제목, 기술 스택, 'View Details' 버튼 등장.
  - `FilterBar`: 'All', 'AI Agent', 'Prompt', 'Consulting' 탭으로 필터링.
- **인터랙션**: 카드 호버 시 `Scale Up (1.05)` 및 `Shadow-xl`. 클릭 시 모달 또는 상세 확장.

### 5.3 EDUCATION & LECTURES (Up)

- **핵심**: "미니멀리즘"과 "신뢰도"
- **레이아웃**: **Uniform Grid (Option 2)**
  - 모든 카드가 동일한 규격의 직사각형/정사각형.
  - 흰색 배경 + 아주 얇은 테두리(`border: 1px solid #E2E8F0`).
- **애니메이션 (GSAP & ScrollTrigger)**:
  - **Grid Reveal**: 섹션 진입 시 카드들이 아래에서 위로 `Fade In + Slide Up` 되며 순차적으로 등장 (`stagger: 0.05`).
  - **Horizontal Scrub**: (카드 양이 많을 경우) 세로 스크롤에 맞춰 카드 리스트가 왼쪽에서 오른쪽으로 흐르는 **Horizontal Scroll Scrubbing** 구현.
- **컴포넌트**:
  - `MinimalCard`: 중앙에 기업 로고(Grayscale), 하단에 강의명 및 날짜 (Inter 폰트).
- **인터랙션**:
  - 호버 시 테두리 색상이 블루(`blue-500`)로 변하며 아주 미세하게 섀도우(`shadow-sm`) 발생.

### 5.4 CONTACT (Right)

- **핵심**: "연결"과 "간결함"
- **레이아웃**: 화면 중앙에 위치한 디지털 명함 하나.
- **컴포넌트**:
  - `DigitalCard`: 실물 명함 비율(1.58:1). 앞면(정보), 뒷면(QR코드 또는 로고) 플립(Flip) 효과 가능.
  - `CopyButton`: 이메일/전화번호 클릭 시 'Copied!' 토스트 메시지 출력.
  - `SocialLinks`: GitHub, LinkedIn 등 아이콘 링크.
- **인터랙션**: 마우스 움직임에 따라 카드가 3D로 미세하게 기울어지는(Tilt) 효과.

### 5.5 Motion & Micro-interactions (Premium Polish)

> **디자인 품질 기준**: "정적이지 않고 살아있는 듯한 느낌"을 주어야 한다.

1.  **Staggered Entry**:
    - 리스트나 그리드 진입 시, **순차적으로** 등장해야 한다 (`staggerChildren: 0.1`).
    - *예: Education 항목들이 위에서 아래로 하나씩 차례로 나타남.*

2.  **Scale & Lift**:
    - 모든 클릭 가능한 요소(카드, 버튼, 링크)는 호버 시 **미세한 크기 증가(Scale 1.02~1.05)**와 **그림자 강화(Shadow-lg)**가 필수다.
    - *예: 프로젝트 카드 호버 시 살짝 떠오르는 느낌.*

3.  **Page Transition**:
    - 섹션 이동 시 뚝 끊기지 않고, **이전 화면이 서서히 사라지고(Fade Out & Scale Down) 새 화면이 들어오는(Fade In & Slide)** 트랜지션 적용.
    - `AnimatePresence`의 `mode="wait"` 사용.

4.  **Ambient Motion**:
    - 메인 배경의 Blue Orb는 가만히 있지 않고 **서서히 호흡하듯(Scale & Opacity) 움직여야** 한다.
    - *예: 5초 주기로 0.9 ~ 1.1 배율 반복.*

5.  **Scroll Interaction**:
    - 긴 콘텐츠(Timeline 등)는 본문이 **스크롤 위치에 도달했을 때** 비로소 애니메이션(Draw Line, Fade In)이 실행되어야 한다.
    - `framer-motion`의 `whileInView` 활용.

---

## 5. 애니메이션 가이드

### 5.1 원칙

- 의미 있는 움직임만 사용 (장식용 애니메이션 최소화)
- `prefers-reduced-motion` 반드시 존중
- 300ms 이하 유지 (모달 제외)

### 5.2 표준 애니메이션

| 이름 | 용도 | 속성 |
|------|------|------|
| `fadeIn` | 요소 등장 | `opacity: 0→1, 200ms ease` |
| `slideUp` | 모달, 카드 등장 | `translateY(8px)→0, 250ms ease` |
| `scaleIn` | 팝오버 등장 | `scale(0.95)→1, 150ms ease` |

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition-duration: 0.01ms !important; }
}
```

---

## 6. 접근성 (A11y) 최소 기준

| 항목 | 기준 |
|------|------|
| 색상 대비 | WCAG AA (4.5:1 본문, 3:1 대형 텍스트) |
| 키보드 내비게이션 | 모든 인터랙티브 요소 Tab 접근 가능 |
| ARIA | 시맨틱 HTML 우선, 불가능 시 ARIA 레이블 |
| 포커스 표시 | `focus-visible` outline 항상 표시 |
| 이미지 | 의미 있는 이미지 `alt` 필수 |
