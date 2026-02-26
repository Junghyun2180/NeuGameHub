// GameModals - 게임 모달 컴포넌트들
const GameModals = ({
  gameOver,
  resetGame,
  onMainMenu,
  stage,
  wave,
  killedCount,
  showStageTransition,
  showHelp,
  setShowHelp,
  getElementInfo,
  crystalResult
}) => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, gameOver && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900 p-8 rounded-2xl text-center border border-red-500/50 max-w-md w-full mx-4",
    style: {
      boxShadow: '0 0 50px rgba(255, 0, 0, 0.3)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-4xl font-black text-red-500 mb-4"
  }, "GAME OVER"), /*#__PURE__*/React.createElement("p", {
    className: "text-xl text-gray-300 mb-2"
  }, "Stage ", stage, " - Wave ", wave, "\uAE4C\uC9C0 \uB3C4\uB2EC!"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 mb-4"
  }, "\uCC98\uCE58\uD55C \uC801: ", killedCount + ((stage - 1) * SPAWN.wavesPerStage + wave - 1) * 50), crystalResult && crystalResult.crystals > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mb-4 bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-lg p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-sm text-cyan-300 font-bold mb-2"
  }, "\uD83D\uDC8E \uD68D\uB4DD \uD06C\uB9AC\uC2A4\uD0C8"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-1 text-xs"
  }, crystalResult.breakdown.map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, item.label), /*#__PURE__*/React.createElement("span", {
    className: item.color
  }, "\uD83D\uDC8E ", item.amount))), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-600 my-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between font-bold text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, "\uCD1D \uD68D\uB4DD"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300"
  }, "\uD83D\uDC8E ", crystalResult.crystals)))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 justify-center"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: resetGame,
    className: "px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all"
  }, "\uD83D\uDD04 \uB2E4\uC2DC \uC2DC\uC791"), onMainMenu && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onMainMenu,
    className: "px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-gray-300 transition-all"
  }, "\u2190 \uBA54\uC778 \uBA54\uB274")))), showStageTransition && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/90 flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-5xl font-black mb-4",
    style: {
      background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96e6a1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'neonPulse 1s ease-in-out infinite'
    }
  }, "\uD83C\uDF89 STAGE ", stage, " CLEAR! \uD83C\uDF89"), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl text-cyan-300 mb-2"
  }, "Stage ", stage + 1, " \uC900\uBE44 \uC911..."), /*#__PURE__*/React.createElement("p", {
    className: "text-yellow-400 mb-2"
  }, "\u26A0\uFE0F \uC0C8\uB85C\uC6B4 \uACBD\uB85C\uAC00 \uB79C\uB364 \uC0DD\uC131\uB429\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500"
  }, "\uD0C0\uC6CC\uAC00 \uCD08\uAE30\uD654\uB429\uB2C8\uB2E4"))), /*#__PURE__*/React.createElement(HelpModal, {
    showHelp: showHelp,
    setShowHelp: setShowHelp,
    getElementInfo: getElementInfo
  }));
};
window.GameModals = GameModals;