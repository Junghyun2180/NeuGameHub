// GameHeader - 상단 정보 바 컴포넌트
const GameHeader = ({
  stage,
  wave,
  gold,
  lives,
  pathCount,
  isPlaying,
  killedCount,
  permanentBuffs = {},
  gameMode = null,
  spawnConfig = null,
  onMainMenu = null
}) => {
  const {
    useState
  } = React;
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // 활성 버프 목록
  const activeBuffs = typeof PermanentBuffManager !== 'undefined' ? PermanentBuffManager.getActiveBuffsList(permanentBuffs) : [];
  const activeSPAWN = spawnConfig || SPAWN;
  const isRunMode = !!gameMode;
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto mb-2 sm:mb-4"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl sm:text-4xl font-black text-center mb-2 sm:mb-4 tracking-wider",
    style: {
      background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96e6a1, #dda0dd, #ffd93d)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 0 30px rgba(78, 205, 196, 0.5)'
    }
  }, "\u26A1 NEON DEFENSE \u26A1"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 sm:gap-3 mb-2 sm:mb-4 text-xs sm:text-base"
  }, onMainMenu && /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExitConfirm(true),
    className: "text-xs sm:text-sm text-gray-400 hover:text-white transition-all whitespace-nowrap shrink-0"
  }, "\u2190 \uBA54\uC778 \uBA54\uB274"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1 sm:gap-3 flex-1"
  }, isRunMode && /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-orange-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-orange-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, gameMode === 'endless' ? '♾️ ENDLESS' : gameMode === 'daily' ? '📅 DAILY' : '🎲 RUN')), /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-emerald-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400"
  }, "\uD83C\uDFF0"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-emerald-300"
  }, stage, "/", gameMode === 'endless' ? '∞' : activeSPAWN.maxStage)), /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-cyan-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-400"
  }, "\uD83C\uDF0A"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-cyan-300"
  }, wave, "/", activeSPAWN.wavesPerStage)), /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-yellow-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400"
  }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-yellow-300"
  }, gold)), /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-red-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "\u2764\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-red-300"
  }, lives)), /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-orange-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-orange-400"
  }, "\uD83D\uDEE4\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-orange-300"
  }, pathCount)), isPlaying && /*#__PURE__*/React.createElement("div", {
    className: "px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 rounded-lg border border-purple-500/50 flex items-center gap-1 sm:gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-purple-400"
  }, "\uD83D\uDC7E"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-purple-300"
  }, killedCount, "/", activeSPAWN.enemiesPerWave(stage, wave))))), activeBuffs.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-1 mb-2"
  }, activeBuffs.map(buff => /*#__PURE__*/React.createElement("div", {
    key: buff.id,
    className: "px-2 py-1 rounded-full text-xs flex items-center gap-1",
    style: {
      backgroundColor: `${buff.color}20`,
      border: `1px solid ${buff.color}`,
      color: buff.color
    },
    title: `${buff.name}: ${buff.description}`
  }, /*#__PURE__*/React.createElement("span", null, buff.icon), buff.stacks > 1 && /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "\xD7", buff.stacks)))), showExitConfirm && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900 p-6 rounded-xl border border-gray-600 text-center max-w-sm mx-4",
    style: {
      boxShadow: '0 0 30px rgba(0,0,0,0.5)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg text-white font-bold mb-2"
  }, "\uBA54\uC778 \uBA54\uB274\uB85C \uB3CC\uC544\uAC00\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-400 mb-5"
  }, "\uD604\uC7AC \uC9C4\uD589 \uC0C1\uD669\uC774 \uC800\uC7A5\uB418\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExitConfirm(false),
    className: "px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-gray-300 transition-all"
  }, "\uCDE8\uC18C"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowExitConfirm(false);
      onMainMenu();
    },
    className: "px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 rounded-lg font-bold text-white transition-all"
  }, "\uB098\uAC00\uAE30")))));
};
window.GameHeader = GameHeader;