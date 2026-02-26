// GameClearModal - 게임 클리어 축하 모달 (캠페인 크리스탈 보상 포함)
const GameClearModal = ({
  isOpen,
  stats,
  lives,
  gold,
  permanentBuffs,
  onRestart,
  onMainMenu,
  onClose,
  crystalResult,
  newAchievements,
  leaderboardRank
}) => {
  if (!isOpen || !stats) return null;
  const summary = GameStats.getSummary(stats, lives, gold);
  const activeBuffs = typeof PermanentBuffManager !== 'undefined' ? PermanentBuffManager.getActiveBuffsList(permanentBuffs || {}) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-gray-900 via-purple-900/50 to-gray-900 rounded-2xl p-6 max-w-2xl w-full border-2 border-yellow-500/50 shadow-2xl my-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl mb-4 animate-bounce"
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("h1", {
    className: "text-3xl sm:text-4xl font-black mb-2",
    style: {
      background: 'linear-gradient(90deg, #FFD700, #FFA500, #FF6B6B, #FFD700)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'glow 2s ease-in-out infinite alternate'
    }
  }, "VICTORY!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-300"
  }, "\uB124\uC628 \uB514\uD39C\uC2A4 \uD074\uB9AC\uC5B4\uB97C \uCD95\uD558\uD569\uB2C8\uB2E4!")), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6 p-4 bg-black/30 rounded-xl border border-gray-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl font-black mb-2",
    style: {
      color: summary.grade.color
    }
  }, summary.grade.grade), /*#__PURE__*/React.createElement("p", {
    className: "text-lg",
    style: {
      color: summary.grade.color
    }
  }, summary.grade.description)), leaderboardRank != null && leaderboardRank >= 0 && /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-block bg-gradient-to-r from-yellow-900/50 to-orange-900/50 border border-yellow-500/50 rounded-xl px-6 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400 mb-1",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "CAMPAIGN LEADERBOARD"), /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-black text-yellow-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, leaderboardRank === 0 ? '🥇' : leaderboardRank === 1 ? '🥈' : leaderboardRank === 2 ? '🥉' : '', ' ', leaderboardRank + 1, "\uC704!"))), crystalResult && crystalResult.crystals > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border border-cyan-500/40 rounded-xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-cyan-300 mb-3 flex items-center gap-2",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83D\uDC8E CRYSTAL REWARDS"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-sm"
  }, crystalResult.breakdown.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, item.label), /*#__PURE__*/React.createElement("span", {
    className: item.color
  }, "\uD83D\uDC8E ", item.amount))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-600 my-2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between font-bold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, "\uCD1D \uD68D\uB4DD"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300 text-lg",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83D\uDC8E ", crystalResult.crystals))), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-xs text-gray-400 text-center"
  }, "\uB7F0 \uBAA8\uB4DC \uBA54\uD0C0 \uC5C5\uADF8\uB808\uC774\uB4DC\uC5D0 \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4!")), newAchievements && newAchievements.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/40 rounded-xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-yellow-300 mb-3 flex items-center gap-2"
  }, "\uD83C\uDFC6 \uC5C5\uC801 \uD574\uAE08!"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, newAchievements.map(ach => /*#__PURE__*/React.createElement("div", {
    key: ach.id,
    className: "flex items-center gap-3 bg-black/30 rounded-lg p-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, ach.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-sm font-bold text-yellow-200"
  }, ach.name), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, ach.desc)))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
  }, summary.highlights.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "bg-black/30 rounded-lg p-3 text-center border border-gray-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, item.icon), /*#__PURE__*/React.createElement("div", {
    className: "text-lg font-bold text-white"
  }, item.value), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, item.label)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-black/30 rounded-lg p-4 border border-purple-500/30"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-purple-400 mb-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFF0"), " \uD0C0\uC6CC \uD1B5\uACC4"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, summary.towers.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, item.icon, " ", item.label), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, item.value))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-black/30 rounded-lg p-4 border border-yellow-500/30"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-yellow-400 mb-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCB0"), " \uACBD\uC81C \uD1B5\uACC4"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, summary.economy.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, item.icon, " ", item.label), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, item.value))))), /*#__PURE__*/React.createElement("div", {
    className: "bg-black/30 rounded-lg p-4 border border-red-500/30"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-red-400 mb-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u2694\uFE0F"), " \uC804\uD22C \uD1B5\uACC4"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, summary.combat.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex justify-between text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400"
  }, item.icon, " ", item.label), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-bold"
  }, item.value)))))), activeBuffs.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-6 p-4 bg-black/30 rounded-lg border border-emerald-500/30"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "\u2728"), " \uD68D\uB4DD\uD55C \uBC84\uD504"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2"
  }, activeBuffs.map(buff => /*#__PURE__*/React.createElement("div", {
    key: buff.id,
    className: "px-3 py-1 rounded-full text-sm flex items-center gap-1",
    style: {
      backgroundColor: `${buff.color}20`,
      border: `1px solid ${buff.color}`,
      color: buff.color
    }
  }, /*#__PURE__*/React.createElement("span", null, buff.icon), /*#__PURE__*/React.createElement("span", null, buff.name), buff.stacks > 1 && /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "\xD7", buff.stacks))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRestart,
    className: "px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-xl font-bold text-lg hover:scale-105 transition-transform border border-emerald-400/30"
  }, "\uD83D\uDD04 \uB2E4\uC2DC \uB3C4\uC804"), onMainMenu && /*#__PURE__*/React.createElement("button", {
    onClick: onMainMenu,
    className: "px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-bold text-gray-300 transition-all"
  }, "\u2190 \uBA54\uC778 \uBA54\uB274")), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 text-center text-xs text-gray-400"
  }, "\uD83D\uDC8E \uD06C\uB9AC\uC2A4\uD0C8\uB85C \uB7F0 \uBAA8\uB4DC \uBA54\uD0C0 \uC5C5\uADF8\uB808\uC774\uB4DC\uB97C \uAD6C\uB9E4\uD558\uC138\uC694!")));
};
window.GameClearModal = GameClearModal;