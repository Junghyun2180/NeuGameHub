# NeuGameHub

AI로 만든 게임들을 모아놓은 Steam 스타일 게임 허브 플랫폼.

## 기술 스택

- Next.js 16 (App Router) + TypeScript 5.9 + React 19
- Tailwind CSS 4 (Steam 다크 테마)
- Prisma 6 + SQLite, bcryptjs
- 쿠키 기반 세션 인증 (httpOnly, SameSite=strict)
- Resend (이메일 인증)

## 개발 명령어

```bash
npm run dev          # 개발 서버 (기본 포트 7000)
npm run build        # 프로덕션 빌드
npm run db:push      # Prisma 스키마 → DB 동기화
npm run db:generate  # Prisma 클라이언트 재생성
```

## 핵심 패턴

- 서버 컴포넌트에서 `getCurrentUser()` → 클라이언트 컴포넌트에 props 전달
- `requireAdmin()` throw → catch에서 403 반환
- 게임은 외부 URL을 iframe으로 임베드 (sandbox 속성 필수, allow-top-navigation 제외)
- URL 검증: `isValidGameUrl()` — https:// 만 허용
- 시드: `POST /api/seed` (개발 환경 전용)
- 관리자: admin@neugamehub.com / admin123

## 이메일 인증 시스템

- 회원가입 시 세션 대신 인증 이메일 발송 (`src/lib/email.ts`)
- Resend API 사용, `.env`에 `RESEND_API_KEY` 필수
- 인증 플로우: 가입 → 이메일 발송 → `/verify?token=...` → 인증 완료 → 로그인 가능
- 로그인 시 `emailVerified` 체크, 미인증 시 재발송 버튼 제공
- 관련 API: `/api/auth/verify`, `/api/auth/resend-verification`
- `VerificationToken` 모델: 24시간 만료, 재발송 시 기존 토큰 삭제

## 환경변수 (.env)

```
DATABASE_URL="file:./dev.db"
RESEND_API_KEY=""                              # resend.com에서 발급
NEXT_PUBLIC_APP_URL="http://localhost:7000"     # 인증 이메일 링크용
FROM_EMAIL="NeuGameHub <onboarding@resend.dev>" # 무료 티어 고정
```

## 주의사항

- Windows: `prisma generate` DLL 잠금 → `db push --skip-generate` 후 별도 generate
- 포트 충돌 시 `.next` 삭제 후 다른 포트로 시작
- 한국어 응답 선호

## 상세 문서 (Skill)

프로젝트 구조, DB 모델, 보안 설정, 테마 등 상세 정보는 `.claude/skills/` 참조.
