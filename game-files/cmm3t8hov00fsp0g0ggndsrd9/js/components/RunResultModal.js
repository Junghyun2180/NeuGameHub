// Neon Defense - 런 결과 모달
// 런 종료 시 등급, 통계, 크리스탈 보상 표시

const RunResultModal = ({
  isOpen,
  runResult,
  gameStats,
  lives,
  gold,
  permanentBuffs,
  onRestart,
  onMainMenu,
  onUpgrades
}) => {
  if (!isOpen || !runResult) return null;
  const {
    useState
  } = React;
  const [showDetails, setShowDetails] = useState(false);
  const gradeInfo = GameStats.calculateRunGrade(gameStats, runResult.mode);
  const playTimeSeconds = runResult.playTimeMs ? Math.floor(runResult.playTimeMs / 1000) : 0;
  const minutes = Math.floor(playTimeSeconds / 60);
  const seconds = playTimeSeconds % 60;
  const gradeColors = {
    S: 'from-yellow-400 to-orange-400',
    A: 'from-gray-300 to-gray-100',
    B: 'from-orange-400 to-yellow-600',
    C: 'from-blue-400 to-cyan-400',
    D: 'from-green-400 to-emerald-400'
  };
  const modeLabels = {
    standard: 'STANDARD RUN',
    daily: 'DAILY CHALLENGE',
    endless: 'ENDLESS MODE'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-500/50 rounded-2xl max-w-md w-full mx-4 overflow-hidden shadow-2xl shadow-cyan-500/20"
  }, /*#__PURE__*/React.createElement("div", {
    className: `p-6 text-center ${runResult.cleared ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50' : 'bg-gradient-to-r from-red-900/40 to-gray-900/40'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-400 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, modeLabels[runResult.mode] || 'RUN'), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-black mb-2",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, runResult.cleared ? /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400"
  }, "RUN COMPLETE!") : /*#__PURE__*/React.createElement("span", {
    className: "text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400"
  }, "RUN FAILED")), /*#__PURE__*/React.createElement("div", {
    className: `inline-block text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${gradeColors[gradeInfo.grade] || gradeColors.D}`,
    style: {
      fontFamily: 'Orbitron, sans-serif',
      textShadow: '0 0 30px rgba(255,215,0,0.3)'
    }
  }, gradeInfo.grade), /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-gray-300 mt-1"
  }, gradeInfo.description), runResult.leaderboardRank != null && runResult.leaderboardRank >= 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/40 rounded-lg px-4 py-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-gray-400",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "LEADERBOARD", ' '), /*#__PURE__*/React.createElement("span", {
    className: "text-xl font-black text-cyan-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, runResult.leaderboardRank === 0 ? '🥇' : runResult.leaderboardRank === 1 ? '🥈' : runResult.leaderboardRank === 2 ? '🥉' : '', ' ', runResult.leaderboardRank + 1, "\uC704!")))), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-4 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uC2A4\uD14C\uC774\uC9C0"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-bold text-white",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, runResult.stagesCleared, "/", runResult.mode === 'endless' ? '∞' : '5')), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uC2DC\uAC04"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-bold text-white",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, minutes, ":", String(seconds).padStart(2, '0'))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uCC98\uCE58"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-bold text-white",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, runResult.totalKills)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded-lg p-2 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uD37C\uD399\uD2B8 \uC6E8\uC774\uBE0C"), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-bold text-white",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, runResult.perfectWaves, "/", runResult.wavesCleared))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/30 rounded-lg p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-cyan-300 font-bold mb-2",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "REWARDS"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-sm"
  }, runResult.cleared && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, runResult.mode === 'daily' ? '일일 챌린지 클리어' : '런 클리어'), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E ", runResult.mode === 'daily' ? CRYSTAL_REWARDS.dailyClear : CRYSTAL_REWARDS.standardClear)), !runResult.cleared && runResult.stagesCleared > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "\uC2A4\uD14C\uC774\uC9C0 \uBCF4\uC0C1 (", runResult.stagesCleared, "\uB2E8\uACC4)"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E ", runResult.stagesCleared * CRYSTAL_REWARDS.perStageBonus)), runResult.isPerfect && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "\uD37C\uD399\uD2B8 \uBCF4\uB108\uC2A4"), /*#__PURE__*/React.createElement("span", {
    className: "text-green-300"
  }, "\uD83D\uDC8E ", CRYSTAL_REWARDS.perfectBonus)), runResult.isSpeedRun && runResult.cleared && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "\uC2A4\uD53C\uB4DC \uBCF4\uB108\uC2A4"), /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-300"
  }, "\uD83D\uDC8E ", CRYSTAL_REWARDS.speedBonus)), (CRYSTAL_REWARDS.gradeBonus[gradeInfo.grade] || 0) > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, "\uB4F1\uAE09 \uBCF4\uB108\uC2A4 (", gradeInfo.grade, ")"), /*#__PURE__*/React.createElement("span", {
    className: "text-purple-300"
  }, "\uD83D\uDC8E ", CRYSTAL_REWARDS.gradeBonus[gradeInfo.grade])), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-600 my-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between font-bold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, "\uCD1D \uD68D\uB4DD"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300 text-lg",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83D\uDC8E ", runResult.crystalsEarned)))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowDetails(!showDetails),
    className: "w-full text-xs text-gray-400 hover:text-gray-200 transition-colors py-1"
  }, showDetails ? '▲ 상세 통계 접기' : '▼ 상세 통계 보기'), showDetails && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/30 rounded p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "\uBCF4\uC2A4 \uCC98\uCE58: "), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, runResult.bossKills)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/30 rounded p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "T4 \uD0C0\uC6CC: "), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, runResult.t4TowersCreated)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/30 rounded p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "\uC783\uC740 \uBAA9\uC228: "), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, runResult.livesLost)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/30 rounded p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, "\uB0A8\uC740 \uBAA9\uC228: "), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, runResult.livesRemaining)))), /*#__PURE__*/React.createElement("div", {
    className: "px-6 pb-6 space-y-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRestart,
    className: "w-full py-3 bg-gradient-to-r from-orange-600 to-cyan-600 rounded-lg font-bold text-white hover:scale-105 transition-transform shadow-lg",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uC0C8 \uB7F0 \uC2DC\uC791"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onUpgrades,
    className: "flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold text-gray-200 transition-colors"
  }, "\u26A1 \uC5C5\uADF8\uB808\uC774\uB4DC"), /*#__PURE__*/React.createElement("button", {
    onClick: onMainMenu,
    className: "flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-bold text-gray-200 transition-colors"
  }, "\u2190 \uBA54\uC778 \uBA54\uB274")))));
};

// 전역 등록
window.RunResultModal = RunResultModal;