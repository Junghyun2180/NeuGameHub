import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.todaySelection.deleteMany();
  await prisma.dailyGameStats.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.game.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.aiTool.deleteMany();
  await prisma.ad.deleteMany();

  // Create genres
  const genres = await Promise.all([
    prisma.genre.create({ data: { name: "액션", slug: "action" } }),
    prisma.genre.create({ data: { name: "퍼즐", slug: "puzzle" } }),
    prisma.genre.create({ data: { name: "RPG", slug: "rpg" } }),
    prisma.genre.create({ data: { name: "시뮬레이션", slug: "simulation" } }),
    prisma.genre.create({ data: { name: "전략", slug: "strategy" } }),
    prisma.genre.create({ data: { name: "캐주얼", slug: "casual" } }),
    prisma.genre.create({ data: { name: "아케이드", slug: "arcade" } }),
    prisma.genre.create({ data: { name: "스포츠", slug: "sports" } }),
  ]);

  const [action, puzzle, rpg, simulation, strategy, casual, arcade, sports] =
    genres;

  // Create AI Tools
  const aiTools = await Promise.all([
    prisma.aiTool.create({ data: { name: "Claude", slug: "claude" } }),
    prisma.aiTool.create({ data: { name: "ChatGPT", slug: "chatgpt" } }),
    prisma.aiTool.create({ data: { name: "Cursor", slug: "cursor" } }),
    prisma.aiTool.create({ data: { name: "Gemini", slug: "gemini" } }),
    prisma.aiTool.create({ data: { name: "Copilot", slug: "copilot" } }),
  ]);

  const [claude, chatgpt, cursor, gemini, copilot] = aiTools;

  // Create games
  const gamesData = [
    // Action games
    {
      title: "Neon Blaster",
      description:
        "네온 빛으로 가득한 미래 도시에서 벌어지는 슈팅 게임. 화려한 이펙트와 빠른 액션을 경험하세요.",
      thumbnail: "/images/games/neon-blaster.jpg",
      gameUrl: "https://example.com/games/neon-blaster",
      genreId: action.id,
      aiToolId: claude.id,
      averageRating: 4.5,
      totalPlayers: 12500,
    },
    {
      title: "Shadow Runner",
      description:
        "그림자 속을 달리는 닌자가 되어 적들을 물리치세요. 정확한 타이밍과 빠른 반사신경이 필요합니다.",
      thumbnail: "/images/games/shadow-runner.jpg",
      gameUrl: "https://example.com/games/shadow-runner",
      genreId: action.id,
      aiToolId: chatgpt.id,
      averageRating: 4.2,
      totalPlayers: 8900,
    },
    {
      title: "Cyber Slash",
      description:
        "사이버펑크 세계에서 검을 휘둘러 해커들을 처치하는 액션 게임.",
      thumbnail: "/images/games/cyber-slash.jpg",
      gameUrl: "https://example.com/games/cyber-slash",
      genreId: action.id,
      aiToolId: cursor.id,
      averageRating: 3.8,
      totalPlayers: 5400,
    },
    {
      title: "Pixel Warriors",
      description: "레트로 스타일의 픽셀 아트 격투 게임. 다양한 캐릭터로 대전하세요.",
      thumbnail: "/images/games/pixel-warriors.jpg",
      gameUrl: "https://example.com/games/pixel-warriors",
      genreId: action.id,
      aiToolId: gemini.id,
      averageRating: 4.0,
      totalPlayers: 7200,
    },

    // Puzzle games
    {
      title: "Mind Maze",
      description:
        "복잡한 미로를 풀며 탈출하세요. 갈수록 어려워지는 100개 이상의 스테이지.",
      thumbnail: "/images/games/mind-maze.jpg",
      gameUrl: "https://example.com/games/mind-maze",
      genreId: puzzle.id,
      aiToolId: claude.id,
      averageRating: 4.7,
      totalPlayers: 15600,
    },
    {
      title: "Color Match",
      description:
        "같은 색상의 블록을 맞추는 중독성 강한 퍼즐 게임. 시간 제한 모드와 무한 모드 제공.",
      thumbnail: "/images/games/color-match.jpg",
      gameUrl: "https://example.com/games/color-match",
      genreId: puzzle.id,
      aiToolId: chatgpt.id,
      averageRating: 4.3,
      totalPlayers: 22000,
    },
    {
      title: "Logic Blocks",
      description: "논리적 사고력을 키우는 블록 배치 퍼즐. 매일 새로운 도전 과제!",
      thumbnail: "/images/games/logic-blocks.jpg",
      gameUrl: "https://example.com/games/logic-blocks",
      genreId: puzzle.id,
      aiToolId: cursor.id,
      averageRating: 4.1,
      totalPlayers: 11200,
    },
    {
      title: "Number Crunch",
      description: "숫자를 조합해서 목표 숫자를 만드는 수학 퍼즐 게임.",
      thumbnail: "/images/games/number-crunch.jpg",
      gameUrl: "https://example.com/games/number-crunch",
      genreId: puzzle.id,
      aiToolId: gemini.id,
      averageRating: 3.9,
      totalPlayers: 6800,
    },

    // RPG games
    {
      title: "Dragon's Quest AI",
      description:
        "AI가 생성한 무한한 던전을 탐험하는 RPG. 매번 새로운 모험이 기다립니다.",
      thumbnail: "/images/games/dragons-quest.jpg",
      gameUrl: "https://example.com/games/dragons-quest",
      genreId: rpg.id,
      aiToolId: claude.id,
      averageRating: 4.8,
      totalPlayers: 28000,
    },
    {
      title: "Pixel Kingdom",
      description:
        "픽셀 아트 스타일의 왕국 건설 RPG. 영웅을 육성하고 왕국을 지키세요.",
      thumbnail: "/images/games/pixel-kingdom.jpg",
      gameUrl: "https://example.com/games/pixel-kingdom",
      genreId: rpg.id,
      aiToolId: chatgpt.id,
      averageRating: 4.4,
      totalPlayers: 18500,
    },
    {
      title: "Starbound Tales",
      description: "우주를 여행하며 외계 문명을 탐험하는 SF RPG.",
      thumbnail: "/images/games/starbound-tales.jpg",
      gameUrl: "https://example.com/games/starbound-tales",
      genreId: rpg.id,
      aiToolId: copilot.id,
      averageRating: 4.1,
      totalPlayers: 9800,
    },
    {
      title: "Rune Master",
      description:
        "고대 룬 마법을 배우고 마스터하는 판타지 RPG. 300가지 이상의 스킬 조합.",
      thumbnail: "/images/games/rune-master.jpg",
      gameUrl: "https://example.com/games/rune-master",
      genreId: rpg.id,
      aiToolId: cursor.id,
      averageRating: 4.6,
      totalPlayers: 21000,
    },

    // Simulation games
    {
      title: "City Builder AI",
      description:
        "AI 시민들이 살아 숨쉬는 도시를 건설하세요. 실시간 경제 시뮬레이션.",
      thumbnail: "/images/games/city-builder.jpg",
      gameUrl: "https://example.com/games/city-builder",
      genreId: simulation.id,
      aiToolId: claude.id,
      averageRating: 4.3,
      totalPlayers: 14200,
    },
    {
      title: "Farm Life",
      description: "평화로운 농장을 가꾸며 힐링하세요. 사계절 농사 시뮬레이션.",
      thumbnail: "/images/games/farm-life.jpg",
      gameUrl: "https://example.com/games/farm-life",
      genreId: simulation.id,
      aiToolId: chatgpt.id,
      averageRating: 4.5,
      totalPlayers: 19800,
    },
    {
      title: "Space Station",
      description: "우주 정거장을 운영하며 승무원을 관리하는 시뮬레이션.",
      thumbnail: "/images/games/space-station.jpg",
      gameUrl: "https://example.com/games/space-station",
      genreId: simulation.id,
      aiToolId: gemini.id,
      averageRating: 3.7,
      totalPlayers: 4500,
    },

    // Strategy games
    {
      title: "Chess Master AI",
      description:
        "AI와 대결하는 체스 게임. 초보부터 고수까지 맞춤 난이도 제공.",
      thumbnail: "/images/games/chess-master.jpg",
      gameUrl: "https://example.com/games/chess-master",
      genreId: strategy.id,
      aiToolId: claude.id,
      averageRating: 4.6,
      totalPlayers: 25000,
    },
    {
      title: "Tower Defense Pro",
      description:
        "타워를 배치해 몬스터 웨이브를 막아내세요. 50개 이상의 타워 종류.",
      thumbnail: "/images/games/tower-defense.jpg",
      gameUrl: "https://example.com/games/tower-defense",
      genreId: strategy.id,
      aiToolId: chatgpt.id,
      averageRating: 4.4,
      totalPlayers: 16700,
    },
    {
      title: "War Tactics",
      description: "실시간 전략 전투 게임. 부대를 지휘하여 적 기지를 점령하세요.",
      thumbnail: "/images/games/war-tactics.jpg",
      gameUrl: "https://example.com/games/war-tactics",
      genreId: strategy.id,
      aiToolId: copilot.id,
      averageRating: 4.0,
      totalPlayers: 8300,
    },
    {
      title: "Hex Empire",
      description: "헥사곤 기반 턴제 전략 게임. 영토를 확장하고 제국을 건설하세요.",
      thumbnail: "/images/games/hex-empire.jpg",
      gameUrl: "https://example.com/games/hex-empire",
      genreId: strategy.id,
      aiToolId: cursor.id,
      averageRating: 4.2,
      totalPlayers: 11500,
    },

    // Casual games
    {
      title: "Bubble Pop",
      description: "알록달록한 버블을 터뜨리는 캐주얼 게임. 간단하지만 중독성 최고!",
      thumbnail: "/images/games/bubble-pop.jpg",
      gameUrl: "https://example.com/games/bubble-pop",
      genreId: casual.id,
      aiToolId: chatgpt.id,
      averageRating: 4.1,
      totalPlayers: 31000,
    },
    {
      title: "Cat Collector",
      description: "귀여운 고양이를 모으는 수집형 캐주얼 게임. 100종 이상의 고양이!",
      thumbnail: "/images/games/cat-collector.jpg",
      gameUrl: "https://example.com/games/cat-collector",
      genreId: casual.id,
      aiToolId: claude.id,
      averageRating: 4.4,
      totalPlayers: 27500,
    },
    {
      title: "Doodle Jump AI",
      description: "끝없이 올라가는 점프 게임. AI가 생성하는 랜덤 플랫폼.",
      thumbnail: "/images/games/doodle-jump.jpg",
      gameUrl: "https://example.com/games/doodle-jump",
      genreId: casual.id,
      aiToolId: gemini.id,
      averageRating: 3.8,
      totalPlayers: 14300,
    },

    // Arcade games
    {
      title: "Space Invaders Neo",
      description: "클래식 스페이스 인베이더의 현대적 리메이크. 파워업과 보스전 추가!",
      thumbnail: "/images/games/space-invaders.jpg",
      gameUrl: "https://example.com/games/space-invaders",
      genreId: arcade.id,
      aiToolId: claude.id,
      averageRating: 4.3,
      totalPlayers: 19200,
    },
    {
      title: "Pac-Run",
      description: "팩맨에서 영감을 받은 러닝 게임. 고스트를 피하며 코인을 모으세요.",
      thumbnail: "/images/games/pac-run.jpg",
      gameUrl: "https://example.com/games/pac-run",
      genreId: arcade.id,
      aiToolId: chatgpt.id,
      averageRating: 4.0,
      totalPlayers: 13400,
    },
    {
      title: "Retro Racer",
      description: "레트로 감성의 탑다운 레이싱 게임. 12개의 트랙과 8대의 차량.",
      thumbnail: "/images/games/retro-racer.jpg",
      gameUrl: "https://example.com/games/retro-racer",
      genreId: arcade.id,
      aiToolId: copilot.id,
      averageRating: 3.9,
      totalPlayers: 7600,
    },
    {
      title: "Snake Evolution",
      description:
        "스네이크 게임의 진화! 다양한 능력과 스킨으로 커스터마이징하세요.",
      thumbnail: "/images/games/snake-evolution.jpg",
      gameUrl: "https://example.com/games/snake-evolution",
      genreId: arcade.id,
      aiToolId: cursor.id,
      averageRating: 4.2,
      totalPlayers: 16100,
    },

    // Sports games
    {
      title: "Pixel Soccer",
      description: "픽셀 아트 스타일의 축구 게임. 빠르고 재미있는 경기를 즐기세요.",
      thumbnail: "/images/games/pixel-soccer.jpg",
      gameUrl: "https://example.com/games/pixel-soccer",
      genreId: sports.id,
      aiToolId: claude.id,
      averageRating: 4.1,
      totalPlayers: 10500,
    },
    {
      title: "Hoop Shot",
      description: "정확한 각도로 농구공을 던지는 캐주얼 스포츠 게임.",
      thumbnail: "/images/games/hoop-shot.jpg",
      gameUrl: "https://example.com/games/hoop-shot",
      genreId: sports.id,
      aiToolId: gemini.id,
      averageRating: 3.6,
      totalPlayers: 5800,
    },
    {
      title: "Tennis Ace",
      description: "실감나는 테니스 게임. 스와이프로 컨트롤하는 직관적 조작.",
      thumbnail: "/images/games/tennis-ace.jpg",
      gameUrl: "https://example.com/games/tennis-ace",
      genreId: sports.id,
      aiToolId: chatgpt.id,
      averageRating: 4.0,
      totalPlayers: 8700,
    },
  ];

  for (const game of gamesData) {
    await prisma.game.create({ data: game });
  }

  // Create sample daily stats for leaderboard
  const allGames = await prisma.game.findMany();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const game of allGames) {
    // Today's stats
    await prisma.dailyGameStats.create({
      data: {
        gameId: game.id,
        date: today,
        playerCount: Math.floor(Math.random() * 500) + 50,
      },
    });

    // Past 7 days stats
    for (let i = 1; i <= 7; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(pastDate.getDate() - i);
      await prisma.dailyGameStats.create({
        data: {
          gameId: game.id,
          date: pastDate,
          playerCount: Math.floor(Math.random() * 400) + 30,
        },
      });
    }
  }

  // Create sample ads
  await prisma.ad.createMany({
    data: [
      {
        title: "AI 개발 도구 할인",
        imageUrl: "/images/ads/ad-left-1.jpg",
        linkUrl: "#",
        position: "left",
        isActive: true,
      },
      {
        title: "게임 개발 강좌",
        imageUrl: "/images/ads/ad-left-2.jpg",
        linkUrl: "#",
        position: "left",
        isActive: true,
      },
      {
        title: "클라우드 호스팅",
        imageUrl: "/images/ads/ad-right-1.jpg",
        linkUrl: "#",
        position: "right",
        isActive: true,
      },
      {
        title: "AI 게임잼 대회",
        imageUrl: "/images/ads/ad-right-2.jpg",
        linkUrl: "#",
        position: "right",
        isActive: true,
      },
    ],
  });

  console.log("Seed data created successfully!");
  console.log(`  - ${genres.length} genres`);
  console.log(`  - ${aiTools.length} AI tools`);
  console.log(`  - ${gamesData.length} games`);
  console.log(`  - ${allGames.length * 8} daily stats entries`);
  console.log(`  - 4 ads`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
