---
description: Prisma DB 모델, 관계, 스키마 구조
---

# DB 모델 (prisma/schema.prisma)

## 모델 목록

| 모델 | 용도 | 주요 필드 |
|------|------|-----------|
| **Game** | 게임 | title, description, thumbnail, gameUrl, genreId, aiToolId, averageRating, totalPlayers |
| **Genre** | 장르 | name (unique), slug (unique) |
| **AiTool** | AI 도구 | name (unique), slug (unique), icon? |
| **Rating** | 별점 | score, gameId, sessionId, @@unique([gameId, sessionId]) |
| **DailyGameStats** | 일별 통계 | gameId, date, playerCount, @@unique([gameId, date]) |
| **TodaySelection** | 오늘의 추천 | gameId, date, order, @@unique([gameId, date]) |
| **Ad** | 광고 배너 | title, imageUrl, linkUrl, position, isActive |
| **User** | 사용자 | email (unique), username (unique), password, role ("user"\|"admin") |
| **Session** | 로그인 세션 | userId, expiresAt, onDelete: Cascade |
| **Favorite** | 즐겨찾기 | userId, gameId, @@unique([userId, gameId]), onDelete: Cascade |
| **GameSubmission** | 게임 등록 신청 | title, gameUrl, genreName, aiToolName, submitterName, submitterEmail, status, adminNote? |

## 관계

```
User ──┬── Session (1:N, Cascade)
       └── Favorite (1:N, Cascade) ──── Game (N:1, Cascade)

Game ──┬── Genre (N:1)
       ├── AiTool (N:1)
       ├── Rating (1:N)
       ├── DailyGameStats (1:N)
       ├── TodaySelection (1:N)
       └── Favorite (1:N)
```

## Prisma 명령어

```bash
npm run db:push      # 스키마 → DB 동기화 (개발용, 마이그레이션 없이)
npm run db:generate  # 클라이언트 재생성
npm run db:studio    # Prisma Studio GUI (포트 5555)
```

## 시드 데이터 (`POST /api/seed`)

- 장르 8개: 퍼즐, 아케이드, 전략, RPG, 시뮬레이션, 레이싱, 슈팅, 캐주얼
- AI 도구 5개: Claude, ChatGPT, Cursor, v0, Bolt
- 게임 29개, 일별 통계 232개, 광고 4개
- 관리자: admin@neugamehub.com / admin123
