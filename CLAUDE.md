# NeuGameHub

AI로 만든 게임들을 모아놓은 Steam 스타일 게임 허브 플랫폼.

## 기술 스택

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript 5.9
- **UI**: React 19 + Tailwind CSS 4 (Steam 다크 테마)
- **DB**: Prisma 6 + SQLite
- **Auth**: bcryptjs, 쿠키 기반 세션 (httpOnly, SameSite=strict)
- **Carousel**: Embla Carousel

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── page.tsx            # 홈 (오늘의 추천, 장르별 게임)
│   ├── games/
│   │   ├── page.tsx        # 전체 게임 목록
│   │   └── [id]/page.tsx   # 게임 상세 (iframe 플레이)
│   ├── category/[slug]/    # 장르별 게임
│   ├── ai-tool/[slug]/     # AI 도구별 게임
│   ├── search/             # 검색 결과
│   ├── leaderboard/        # 리더보드
│   ├── submit/             # 게임 등록 신청
│   ├── login/              # 로그인
│   ├── register/           # 회원가입
│   ├── mypage/             # 마이페이지 (즐겨찾기, 비밀번호 변경)
│   ├── admin/submissions/  # 관리자 - 게임 신청 관리
│   └── api/                # API 라우트
│       ├── auth/           # 로그인/회원가입/로그아웃/비밀번호변경
│       ├── games/[id]/     # 플레이 기록, 즐겨찾기 토글
│       ├── ratings/        # 별점
│       ├── submissions/    # 게임 신청 (POST: 공개, GET: 관리자 전용)
│       ├── admin/          # 관리자 API (신청 승인/거절)
│       ├── seed/           # 시드 데이터 (개발용)
│       ├── today/          # 오늘의 추천
│       └── leaderboard/    # 리더보드
├── components/
│   ├── game/               # GameCard, GameGrid, GenreRow, FavoriteButton, RatingStars, GamePlaySection
│   ├── layout/             # Header, Footer, UserMenu, ThreeColumnLayout
│   ├── home/               # TodaysBanner
│   ├── ad/                 # AdBanner
│   ├── mypage/             # PasswordChangeForm
│   └── Logo.tsx
├── lib/
│   ├── auth.ts             # 인증 유틸 (세션, 비밀번호, getCurrentUser, requireAdmin, getFavoriteGameIds)
│   ├── prisma.ts           # Prisma 클라이언트
│   └── utils.ts            # cn, formatPlayerCount, isValidGameUrl, getSessionId
└── generated/prisma/       # Prisma 자동 생성
```

## DB 모델 (prisma/schema.prisma)

- **Game** — 게임 (title, description, thumbnail, gameUrl, genre, aiTool, ratings, favorites)
- **Genre** — 장르 (name, slug)
- **AiTool** — AI 도구 (name, slug)
- **Rating** — 별점 (gameId + sessionId 유니크)
- **DailyGameStats** — 일별 플레이 통계
- **TodaySelection** — 오늘의 추천
- **Ad** — 광고 배너
- **User** — 사용자 (email, username, password, role: "user"|"admin")
- **Session** — 로그인 세션 (userId, expiresAt, onDelete: Cascade)
- **Favorite** — 즐겨찾기 (userId + gameId 유니크, onDelete: Cascade)
- **GameSubmission** — 게임 등록 신청 (status: pending/approved/rejected)

## 인증 시스템

- 쿠키: `ngh_session` (httpOnly, SameSite=strict, 7일 만료)
- `getCurrentUser()` — 현재 로그인 사용자 반환 (null이면 비로그인)
- `requireAdmin()` — 관리자 아니면 에러 throw (catch에서 403 반환 패턴)
- `getFavoriteGameIds()` — 현재 사용자의 즐겨찾기 게임 ID 목록
- 관리자 계정: `admin@neugamehub.com` / `admin123` (시드 데이터)

## 보안

- **iframe sandbox**: `allow-scripts allow-same-origin allow-popups allow-forms allow-popups-to-escape-sandbox` (allow-top-navigation 의도적 제외 → 부모 페이지 리다이렉트 차단)
- **CSP**: `frame-src https:` (javascript:/data: 차단), `frame-ancestors 'none'`
- **보안 헤더**: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy
- **URL 검증**: `isValidGameUrl()` — https:// 프로토콜만 허용 (신청 시 + 승인 시 이중 검증)
- **API 보호**: GET /api/submissions는 관리자 전용, 관리자 API는 requireAdmin() 체크

## 개발 명령어

```bash
npm run dev          # 개발 서버 (기본 포트 7000, 충돌 시 7003 등 사용)
npm run build        # 프로덕션 빌드
npm run db:push      # Prisma 스키마 → DB 동기화
npm run db:generate  # Prisma 클라이언트 재생성
npm run db:studio    # Prisma Studio (DB GUI)
```

## 시드 데이터

`POST /api/seed` — 개발 환경에서만 동작. 장르 8개, AI 도구 5개, 게임 29개, 일별 통계, 광고 4개, 관리자 계정 생성.

## 테마 (Tailwind)

Steam 다크 테마 커스텀 색상:
- `steam-bg`: #1b2838 (배경)
- `steam-card`: #16202d (카드)
- `steam-blue`: #66c0f4 (액센트)
- `steam-text`: #c7d5e0 (텍스트)
- `steam-text-muted`: #8f98a0 (보조 텍스트)

## 주의사항

- Windows 환경에서 `prisma generate` 시 DLL 잠금 에러 발생 가능 → `prisma db push --skip-generate` 후 별도 `prisma generate` 실행
- 포트 충돌 시 `.next` 폴더 삭제 후 다른 포트로 시작
- 게임은 외부 URL을 iframe으로 임베드 (sandbox 속성 필수)
- 서버 컴포넌트에서 인증 체크 → 클라이언트 컴포넌트에 데이터 전달 패턴
