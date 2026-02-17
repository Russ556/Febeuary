# SPEC.md — 기술 규격서

> ⚠️ **컨텍스트 공유 불가**: Claude와 ChatGPT는 대화를 공유할 수 없다. 이 문서가 기술 결정의 유일한 기준이다.  
> ✏️ **변경 권한**: Claude만 이 문서를 수정한다. ChatGPT는 이 문서를 구현의 절대 기준으로 삼는다.

---

## 1. 데이터 모델

### 1.1 데이터 구조 (JSON Based)

이 프로젝트는 별도의 백엔드 DB 없이 `data/` 디렉토리 내의 JSON/TS 파일로 데이터를 관리한다.

```typescript
// types/resume.ts

interface ResumeData {
  profile: {
    name: string;      // "Kim Hak Jong"
    role: string;      // "Generative AI Specialist | Educator | Consultant"
    email: string;     // "studybell@naver.com"
    phone: string;     // "010-4752-6164"
    address: string;   // "Gwangmyeong-si, Gyeonggi-do"
    birthYear: number; // 1996
  };
  career: {
    id: string;
    company: string;
    role: string;
    period: string;
    description: string[];
  }[];
  education: {
    id: string;
    school: string;
    major: string;
    period: string;
    status: string; // "Graduated"
  }[];
  projects: {
    id: string;
    title: string;
    company?: string;
    period: string;
    description: string[];
    skills: string[];
    links?: { label: string; url: string }[];
  }[];
  lectures: {
    id: string;
    date: string;       // "2026.01" or "2025.12"
    client: string;     // "삼성전자", "국회" 등
    topic: string;      // "ChatGPT 활용 데이터 시각화"
    target?: string;    // "임원진", "신입사원", "마케터"
    description?: string[];
  }[];
  skills: string[]; // ["Generative AI", "ChatGPT", "Python", ...]
}
```

---

## 2. API 명세

### 2.1 라우팅 및 네비게이션 구조

| 경로 | 컴포넌트 | 설명 | 방향키 매핑 |
|------|----------|------|-------------|
| `/` | `MainSection` | 메인 홈 (초기 화면) | Center |
| `/profile` | `ProfileSection` | 프로필/경력 (좌측) | Left (←) |
| `/contact` | `ContactSection` | 연락처 (우측) | Right (→) |
| `/education` | `EducationSection` | 학력/자격/강의이력 (상단) | Up (↑) |
| `/projects` | `ProjectsSection` | 프로젝트/포트폴리오 (하단) | Down (↓) |

> **구현 방식**: 실제 URL 이동보다는 `framer-motion`의 `AnimatePresence`를 활용하여 하나의 페이지(`/`) 내에서 **조건부 렌더링** 또는 **View Transition**을 사용하는 것을 권장한다. URL은 `history.pushState`로 동기화한다.

---

## 3. 인증 및 권한

### 3.1 인증 방식

| 항목 | 내용 |
|------|------|
| 방식 | `[JWT / Session / OAuth 등]` |
| 제공자 | `[Supabase Auth / NextAuth 등]` |
| 토큰 저장 | `[httpOnly cookie / localStorage 등]` |
| 만료 정책 | `[Access: 1h, Refresh: 7d 등]` |

### 3.2 권한 매트릭스

| 리소스 | 비인증 | 일반 사용자 | 관리자 |
|--------|--------|-------------|--------|
| `[리소스1]` | ❌ | 본인 것만 RW | 전체 RW |
| `[리소스2]` | R만 | RW | 전체 RW |

---

## 4. 검증 및 에러 정책

### 4.1 입력 검증

| 규칙 | 적용 |
|------|------|
| 프론트엔드 | 폼 제출 전 클라이언트 검증 (UX용) |
| 백엔드 | **반드시 서버에서 재검증** (보안 기준) |
| 검증 라이브러리 | `[zod / yup / joi 등]` |
| 스키마 공유 | `[프론트-백 스키마 공유 방식]` |

### 4.2 에러 코드 체계

| HTTP | 코드 | 의미 | 예시 |
|------|------|------|------|
| 400 | `VALIDATION_ERROR` | 입력값 오류 | 필수 필드 누락 |
| 401 | `UNAUTHORIZED` | 인증 필요 | 토큰 만료 |
| 403 | `FORBIDDEN` | 권한 없음 | 타인 리소스 접근 |
| 404 | `NOT_FOUND` | 리소스 없음 | 존재하지 않는 ID |
| 409 | `CONFLICT` | 충돌 | 중복 이메일 |
| 500 | `INTERNAL_ERROR` | 서버 오류 | 예상치 못한 예외 |

### 4.3 에러 응답 형식

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [
      { "field": "email", "issue": "required" }
    ]
  }
}
```

---

## 5. 로깅

| 환경 | 레벨 | 대상 |
|------|------|------|
| development | `debug` | 콘솔 출력 |
| production | `info` 이상 | `[로그 서비스 또는 stdout]` |

### 5.1 로그 포맷

```
[LEVEL] [TIMESTAMP] [REQUEST_ID] [MODULE] message
```

### 5.2 필수 로그 지점

- 인증 성공/실패
- API 요청/응답 (body 제외, 상태코드만)
- DB 마이그레이션 실행
- 예외/에러 발생

---

## 6. 폴더 구조

<!-- Claude가 프로젝트 시작 시 확정 -->

```
root/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # 메인 페이지 (Layout Orchestrator)
│   │   ├── layout.tsx    # Root Layout (폰트, 메타데이터)
│   │   └── globals.css   # Tailwind Directives
│   ├── components/
│   │   ├── layout/       # Navigation, Layout Wrappers
│   │   ├── sections/     # Main, Profile, Education, Projects, Contact
│   │   └── ui/           # Button, Card, Pill, ArrowIcon
│   ├── data/             # 정적 데이터 (resume.json 등)
│   ├── hooks/            # useKeyboardNavigation, useSwipe
│   ├── lib/              # utils, constants
│   └── types/            # TypeScript type definitions
├── public/               # 이미지, 아이콘
└── [설정 파일들]         # tailwind.config.ts, next.config.js 등
```

### 6.1 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 파일명 (컴포넌트) | PascalCase | `UserProfile.tsx` |
| 파일명 (유틸) | camelCase | `formatDate.ts` |
| 파일명 (스타일) | kebab-case | `user-profile.module.css` |
| 디렉토리 | kebab-case | `user-profile/` |
| 컴포넌트명 | PascalCase | `UserProfile` |
| 함수명 | camelCase | `formatDate()` |
| 상수 | UPPER_SNAKE_CASE | `MAX_PAGE_SIZE` |
| DB 테이블/컬럼 | snake_case | `user_profiles.display_name` |

---

## 7. 테스트 전략

### 7.1 테스트 레벨

| 레벨 | 도구 | 대상 | 최소 기준 |
|------|------|------|-----------|
| 단위 테스트 | `[Vitest/Jest]` | 유틸 함수, 헬퍼 | 핵심 함수 커버 |
| 통합 테스트 | `[Vitest/Jest]` | API 핸들러 | 주요 엔드포인트 |
| E2E 테스트 | `[Playwright/Cypress]` | 핵심 사용자 시나리오 | 크리티컬 경로만 |

### 7.2 테스트 실행 명령어

```bash
# 단위/통합 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 커버리지
npm run test:coverage
```

---

## 8. 배포 전략

### 8.1 환경

| 환경 | URL | 용도 |
|------|-----|------|
| local | `http://localhost:3000` | 개발 |
| preview | `[Vercel Preview URL]` | PR 리뷰 |
| production | `[프로덕션 URL]` | 운영 |

### 8.2 환경변수

| 변수명 | 환경 | 설명 | 비밀 여부 |
|--------|------|------|-----------|
| `DATABASE_URL` | all | DB 연결 문자열 | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | all | Supabase URL | ❌ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | all | Supabase 익명 키 | ❌ |
| `SUPABASE_SERVICE_ROLE_KEY` | server only | 서비스 역할 키 | ✅ |

### 8.3 배포 체크리스트

```markdown
- [ ] 환경변수 모두 설정
- [ ] DB 마이그레이션 실행 확인
- [ ] 빌드 성공 (`npm run build`)
- [ ] 주요 페이지 접근 확인
- [ ] API 엔드포인트 정상 응답 확인
- [ ] 인증 플로우 동작 확인
```
