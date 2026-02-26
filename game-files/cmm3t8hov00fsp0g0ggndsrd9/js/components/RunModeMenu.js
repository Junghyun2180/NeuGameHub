// Neon Defense - 런 모드 메뉴
// 모드 선택 / 메타 업그레이드 / 리더보드 / 업적 탭

const RunModeMenu = ({
  metaProgress,
  neonCrystals,
  onStartRun,
  onPurchaseUpgrade,
  onBack,
  activeRunInfo,
  onLoadRun
}) => {
  const {
    useState
  } = React;
  const [tab, setTab] = useState('modes'); // 'modes' | 'upgrades' | 'leaderboard' | 'achievements'

  // Daily Challenge 정보
  const dailyAttempted = typeof RunSaveSystem !== 'undefined' && RunSaveSystem.hasAttemptedToday();
  const dailyModifiers = typeof DailyChallenge !== 'undefined' ? DailyChallenge.getModifiers(DailyChallenge.getTodaySeed()) : [];

  // 업적 데이터
  const achievementData = typeof AchievementSystem !== 'undefined' ? AchievementSystem.getUnlocked() : {};
  const tabs = [{
    id: 'modes',
    label: '모드 선택',
    icon: '🎮'
  }, {
    id: 'upgrades',
    label: '업그레이드',
    icon: '⚡'
  }, {
    id: 'achievements',
    label: '업적',
    icon: '🎖️'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 overflow-hidden opacity-15"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse",
    style: {
      top: '15%',
      left: '10%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute w-80 h-80 bg-orange-500 rounded-full blur-3xl animate-pulse",
    style: {
      top: '50%',
      right: '15%',
      animationDelay: '1.5s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-4xl w-full mx-4 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    className: "text-gray-400 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800/50"
  }, "\u2190 \uBA54\uC778 \uBA54\uB274"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-cyan-400",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "RUN MODE"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 bg-gray-800/60 px-4 py-2 rounded-lg border border-cyan-500/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83D\uDC8E"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300 font-bold text-lg",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, neonCrystals.toLocaleString()))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 bg-gray-800/40 p-1 rounded-lg"
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    className: `flex-1 px-3 py-2 rounded-md text-sm font-bold transition-all ${tab === t.id ? 'bg-gradient-to-r from-orange-600 to-cyan-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`,
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, t.icon, " ", t.label))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 min-h-[400px]"
  }, tab === 'modes' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, activeRunInfo && /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-cyan-500/40 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-cyan-400 font-bold"
  }, "\uC9C4\uD589 \uC911\uC778 \uB7F0"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg text-white font-bold",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Stage ", activeRunInfo.stage, " - Wave ", activeRunInfo.wave), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400 mt-1"
  }, "\uD83D\uDCB0 ", activeRunInfo.gold, "G | \u2764\uFE0F ", activeRunInfo.lives, " | \uD83D\uDDFC ", activeRunInfo.towerCount, "\uAC1C")), /*#__PURE__*/React.createElement("button", {
    onClick: onLoadRun,
    className: "px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold text-white hover:scale-105 transition-transform shadow-lg shadow-cyan-500/30",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uC774\uC5B4\uD558\uAE30"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onStartRun('standard'),
    className: "group bg-gray-900/60 border-2 border-orange-500/40 hover:border-orange-400 rounded-xl p-5 transition-all hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3 group-hover:scale-110 transition-transform"
  }, "\uD83C\uDFAE"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-orange-300 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Standard Run"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-xs mb-3"
  }, "5 \uC2A4\uD14C\uC774\uC9C0 x 5 \uC6E8\uC774\uBE0C | \u3141 \uB9F5"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uBCF4\uC0C1"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E 50+")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uB09C\uC774\uB3C4"), /*#__PURE__*/React.createElement("span", {
    className: "text-orange-300"
  }, "\u2605\u2605\u2605\u2606\u2606")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uD328\uBC30"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-300"
  }, "\uC801 70\uB9C8\uB9AC \uCD08\uACFC")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => !dailyAttempted && onStartRun('daily', dailyModifiers),
    disabled: dailyAttempted,
    className: `group bg-gray-900/60 border-2 rounded-xl p-5 transition-all text-left ${dailyAttempted ? 'border-gray-600/40 opacity-50 cursor-not-allowed' : 'border-purple-500/40 hover:border-purple-400 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3 group-hover:scale-110 transition-transform"
  }, "\uD83D\uDCC5"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-purple-300 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Daily Challenge"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-xs mb-3"
  }, dailyAttempted ? '오늘 이미 도전함' : '오늘의 특별 규칙'), dailyModifiers.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-xs"
  }, dailyModifiers.slice(0, 2).map(modId => {
    const mod = DAILY_MODIFIERS[modId];
    return mod ? /*#__PURE__*/React.createElement("div", {
      key: modId,
      className: "flex items-center gap-1 text-gray-300"
    }, /*#__PURE__*/React.createElement("span", null, mod.icon), /*#__PURE__*/React.createElement("span", null, mod.name)) : null;
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex justify-between text-xs text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uBCF4\uC0C1"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E 100+"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onStartRun('endless'),
    className: "group bg-gray-900/60 border-2 border-red-500/40 hover:border-red-400 rounded-xl p-5 transition-all hover:scale-105 hover:shadow-xl hover:shadow-red-500/20 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3 group-hover:scale-110 transition-transform"
  }, "\u267E\uFE0F"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-red-300 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Endless Mode"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-xs mb-3"
  }, "\uBB34\uD55C \uB3C4\uC804"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uCD5C\uACE0 \uAE30\uB85D"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-300"
  }, "Stage ", metaProgress.stats.highestEndlessStage || 0)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uBCF4\uC0C1"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E \uC2A4\uD14C\uC774\uC9C0\uB2F9 10")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => onStartRun('bossRush'),
    className: "group bg-gray-900/60 border-2 border-yellow-500/40 hover:border-yellow-400 rounded-xl p-5 transition-all hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/20 text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-4xl mb-3 group-hover:scale-110 transition-transform"
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-yellow-300 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Boss Rush"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-xs mb-3"
  }, "\uBCF4\uC2A4\uB9CC \uCD9C\uD604 | \uD55C\uC815 \uC790\uC6D0"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uBCF4\uC0C1"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E \uBCF4\uC2A4\uB2F9 15")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uBCF4\uC2A4 \uCC98\uCE58"), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-300"
  }, "\uD83C\uDFB0 \uBB34\uB8CC \uBF51\uAE30")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uB09C\uC774\uB3C4"), /*#__PURE__*/React.createElement("span", {
    className: "text-red-300"
  }, "\u2605\u2605\u2605\u2605\u2606"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uCD1D \uB7F0 \uC218"), /*#__PURE__*/React.createElement("div", {
    className: "text-white font-bold"
  }, metaProgress.stats.totalRuns || 0)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uD074\uB9AC\uC5B4 \uC218"), /*#__PURE__*/React.createElement("div", {
    className: "text-green-300 font-bold"
  }, metaProgress.stats.totalClears || 0)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uCD5C\uACE0 \uB4F1\uAE09"), /*#__PURE__*/React.createElement("div", {
    className: "text-yellow-300 font-bold"
  }, metaProgress.stats.bestGrade || '-')), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uCD1D \uD68D\uB4DD \uD06C\uB9AC\uC2A4\uD0C8"), /*#__PURE__*/React.createElement("div", {
    className: "text-cyan-300 font-bold"
  }, (metaProgress.stats.totalCrystalsEarned || 0).toLocaleString())))), tab === 'upgrades' && /*#__PURE__*/React.createElement(MetaUpgradePanel, {
    metaProgress: metaProgress,
    neonCrystals: neonCrystals,
    onPurchaseUpgrade: onPurchaseUpgrade
  }), tab === 'achievements' && /*#__PURE__*/React.createElement(AchievementTab, {
    unlocked: achievementData
  }))));
};

// LeaderboardTab은 js/components/LeaderboardTab.jsx에서 전역 등록됨

// 업적 탭 (인라인, Phase 2용 플레이스홀더)
const AchievementTab = ({
  unlocked
}) => {
  const achievements = typeof ACHIEVEMENTS !== 'undefined' ? ACHIEVEMENTS : {};
  const achievementList = Object.values(achievements);
  if (achievementList.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "text-center text-gray-500 py-8"
    }, "\uC5C5\uC801 \uC2DC\uC2A4\uD15C \uC900\uBE44 \uC911...");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3"
  }, achievementList.map(ach => {
    const isUnlocked = unlocked && unlocked[ach.id];
    return /*#__PURE__*/React.createElement("div", {
      key: ach.id,
      className: `rounded-lg p-3 text-center transition-all ${isUnlocked ? 'bg-gradient-to-b from-yellow-900/40 to-gray-800/40 border border-yellow-500/40' : 'bg-gray-800/50 border border-gray-700/30 opacity-60'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, isUnlocked ? ach.icon : '🔒'), /*#__PURE__*/React.createElement("div", {
      className: "text-xs font-bold text-gray-200"
    }, ach.name), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400 mt-1"
    }, ach.desc));
  }));
};

// 전역 등록
window.RunModeMenu = RunModeMenu;