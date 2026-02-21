---
description: 프로젝트 파일 구조, 페이지, 컴포넌트, API 라우트 전체 맵
---

# 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # 홈 (오늘의 추천, 장르별 게임)
│   ├── layout.tsx                # 루트 레이아웃 (Header, Footer)
│   ├── games/
│   │   ├── page.tsx              # 전체 게임 목록
│   │   └── [id]/page.tsx         # 게임 상세 (iframe 플레이)
│   ├── category/[slug]/page.tsx  # 장르별 게임
│   ├── ai-tool/[slug]/page.tsx   # AI 도구별 게임
│   ├── search/page.tsx           # 검색 결과
│   ├── leaderboard/page.tsx      # 리더보드
│   ├── submit/page.tsx           # 게임 등록 신청 (공개)
│   ├── login/page.tsx            # 로그인
│   ├── register/page.tsx         # 회원가입
│   ├── mypage/page.tsx           # 마이페이지 (즐겨찾기, 비밀번호 변경)
│   ├── admin/submissions/
│   │   ├── page.tsx              # 관리자 래퍼 (서버 컴포넌트, 인증 체크)
│   │   └── AdminSubmissionsClient.tsx  # 관리자 UI (클라이언트 컴포넌트)
│   └── api/
│       ├── auth/
│       │   ├── register/route.ts # POST: 회원가입
│       │   ├── login/route.ts    # POST: 로그인
│       │   ├── logout/route.ts   # POST: 로그아웃
│       │   ├── me/route.ts       # GET: 현재 사용자
│       │   └── password/route.ts # PATCH: 비밀번호 변경
│       ├── games/[id]/
│       │   ├── play/route.ts     # POST: 플레이 카운트 증가
│       │   └── favorite/route.ts # POST: 즐겨찾기 토글
│       ├── ratings/route.ts      # POST: 별점 등록/수정
│       ├── submissions/route.ts  # POST: 게임 신청(공개), GET: 신청 목록(관리자 전용)
│       ├── admin/submissions/[id]/route.ts  # PATCH: 승인/거절 (관리자)
│       ├── seed/route.ts         # POST: 시드 데이터 (개발용)
│       ├── today/route.ts        # GET: 오늘의 추천
│       └── leaderboard/route.ts  # GET: 리더보드
├── components/
│   ├── game/
│   │   ├── GameCard.tsx          # 게임 카드 (썸네일, 제목, 하트)
│   │   ├── GameGrid.tsx          # 게임 그리드 레이아웃
│   │   ├── GenreRow.tsx          # 장르별 가로 스크롤 행
│   │   ├── GamePlaySection.tsx   # iframe 게임 플레이 + 평점 (클라이언트)
│   │   ├── FavoriteButton.tsx    # 즐겨찾기 하트 버튼 (클라이언트)
│   │   └── RatingStars.tsx       # 별점 UI (클라이언트)
│   ├── layout/
│   │   ├── Header.tsx            # 헤더 (서버 컴포넌트, 인증 체크)
│   │   ├── Footer.tsx            # 푸터
│   │   ├── UserMenu.tsx          # 사용자 드롭다운 메뉴 (클라이언트)
│   │   └── ThreeColumnLayout.tsx # 3단 레이아웃 (메인 + 사이드바)
│   ├── home/TodaysBanner.tsx     # 오늘의 추천 캐러셀
│   ├── ad/AdBanner.tsx           # 광고 배너
│   ├── mypage/PasswordChangeForm.tsx  # 비밀번호 변경 폼 (클라이언트)
│   └── Logo.tsx                  # 로고 SVG
├── lib/
│   ├── auth.ts                   # 인증 유틸리티
│   │   ├── hashPassword()        # bcrypt 해싱
│   │   ├── verifyPassword()      # bcrypt 검증
│   │   ├── createSession()       # 세션 생성 + 쿠키 설정
│   │   ├── deleteSession()       # 세션 삭제 + 쿠키 제거
│   │   ├── getCurrentUser()      # 현재 로그인 사용자 (null 가능)
│   │   ├── getFavoriteGameIds()  # 즐겨찾기 게임 ID 목록
│   │   └── requireAdmin()        # 관리자 체크 (throw 패턴)
│   ├── prisma.ts                 # Prisma 클라이언트 싱글턴
│   └── utils.ts
│       ├── cn()                  # className 합치기
│       ├── formatPlayerCount()   # 숫자 포맷 (1.2K, 3.4M)
│       ├── isValidGameUrl()      # URL 검증 (https:// only)
│       └── getSessionId()        # 익명 sessionId (localStorage)
└── generated/prisma/             # Prisma 자동 생성 (수정 금지)
```
