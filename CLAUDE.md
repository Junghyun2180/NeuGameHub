# NeuGameHub

AI로 만든 게임들을 모아놓은 Steam 스타일 게임 허브 플랫폼.

## 기술 스택

- Next.js 16 (App Router) + TypeScript 5.9 + React 19
- Tailwind CSS 4 (Steam 다크 테마)
- Prisma 6 + SQLite, bcryptjs
- 쿠키 기반 세션 인증 (httpOnly, SameSite=strict)

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

## 주의사항

- Windows: `prisma generate` DLL 잠금 → `db push --skip-generate` 후 별도 generate
- 포트 충돌 시 `.next` 삭제 후 다른 포트로 시작
- 한국어 응답 선호

## 상세 문서 (Skill)

프로젝트 구조, DB 모델, 보안 설정, 테마 등 상세 정보는 `.claude/skills/` 참조.
