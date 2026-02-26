// Neon Defense - 저장/불러오기 모달
// 게임 시작 시 불러오기 옵션, 스테이지 클리어 시 저장 옵션 제공

const SaveLoadModal = ({
  show,
  mode,
  onNewGame,
  onLoadGame,
  onSaveAndQuit,
  onContinue,
  saveInfo
}) => {
  if (!show) return null;

  // mode: 'start' (게임 시작), 'stageClear' (스테이지 클리어)

  // 시간 포맷팅
  const formatTime = timestamp => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}일 전`;
    if (hours > 0) return `${hours}시간 전`;
    if (minutes > 0) return `${minutes}분 전`;
    return '방금 전';
  };

  // ===== 게임 시작 모달 =====
  if (mode === 'start') {
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-900 border-2 border-purple-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl font-bold text-center mb-8",
      style: {
        fontFamily: 'Orbitron, sans-serif',
        textShadow: '0 0 20px #a855f7'
      }
    }, "\u26A1 NEON DEFENSE \u26A1"), saveInfo ? /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-800 border border-purple-400 rounded-lg p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-400 mb-1"
    }, "\uC800\uC7A5\uB41C \uAC8C\uC784"), /*#__PURE__*/React.createElement("div", {
      className: "text-2xl font-bold text-purple-300",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "Stage ", saveInfo.stage, " - Wave ", saveInfo.wave)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-2 text-sm"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-yellow-400"
    }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-300"
    }, saveInfo.gold, "G")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-red-400"
    }, "\u2764\uFE0F"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-300"
    }, saveInfo.lives)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-blue-400"
    }, "\uD83D\uDDFC"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-300"
    }, saveInfo.towerCount, "\uAC1C")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-green-400"
    }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("span", {
      className: "text-gray-300"
    }, saveInfo.supportCount, "\uAC1C"))), /*#__PURE__*/React.createElement("div", {
      className: "text-center mt-3 text-xs text-gray-500"
    }, formatTime(saveInfo.timestamp))), /*#__PURE__*/React.createElement("button", {
      onClick: onLoadGame,
      className: "w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all text-lg shadow-lg",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "\u25B6 \uC774\uC5B4\uD558\uAE30"), /*#__PURE__*/React.createElement("button", {
      onClick: onNewGame,
      className: "w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "\uD83C\uDD95 \uC0C8 \uAC8C\uC784 (\uAE30\uC874 \uC800\uC7A5 \uC0AD\uC81C)")) : /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center text-gray-400 mb-6"
    }, "\uC800\uC7A5\uB41C \uAC8C\uC784\uC774 \uC5C6\uC2B5\uB2C8\uB2E4"), /*#__PURE__*/React.createElement("button", {
      onClick: onNewGame,
      className: "w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-lg transition-all text-lg shadow-lg",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "\u25B6 \uC0C8 \uAC8C\uC784 \uC2DC\uC791")), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 text-center text-xs text-gray-500"
    }, /*#__PURE__*/React.createElement("div", null, "\uCD5C\uB300 \uC2A4\uD14C\uC774\uC9C0: ", SPAWN.maxStage), /*#__PURE__*/React.createElement("div", {
      className: "mt-1"
    }, "\uC790\uB3D9 \uC800\uC7A5: 30\uCD08\uB9C8\uB2E4"))));
  }

  // ===== 스테이지 클리어 모달 (저장 옵션) =====
  if (mode === 'stageClear') {
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gray-900 border-2 border-green-500 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-3xl font-bold text-center mb-6 text-green-400",
      style: {
        fontFamily: 'Orbitron, sans-serif',
        textShadow: '0 0 20px #22c55e'
      }
    }, "\uD83C\uDF89 \uC2A4\uD14C\uC774\uC9C0 \uD074\uB9AC\uC5B4!"), /*#__PURE__*/React.createElement("div", {
      className: "text-center mb-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-gray-300 mb-2"
    }, "\uB2E4\uC74C \uC2A4\uD14C\uC774\uC9C0\uB85C \uC9C4\uD589\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?"), /*#__PURE__*/React.createElement("div", {
      className: "text-sm text-gray-500"
    }, "\uC800\uC7A5\uD558\uACE0 \uB098\uAC00\uAE30\uB97C \uC120\uD0DD\uD558\uBA74", /*#__PURE__*/React.createElement("br", null), "\uC5B8\uC81C\uB4E0\uC9C0 \uC774\uC5B4\uC11C \uD50C\uB808\uC774\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4")), /*#__PURE__*/React.createElement("div", {
      className: "space-y-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: onContinue,
      className: "w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold rounded-lg transition-all text-lg shadow-lg",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "\u25B6 \uACC4\uC18D \uD50C\uB808\uC774"), /*#__PURE__*/React.createElement("button", {
      onClick: onSaveAndQuit,
      className: "w-full py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all",
      style: {
        fontFamily: 'Orbitron, sans-serif'
      }
    }, "\uD83D\uDCBE \uC800\uC7A5\uD558\uACE0 \uB098\uAC00\uAE30")), /*#__PURE__*/React.createElement("div", {
      className: "mt-6 text-center text-xs text-gray-500"
    }, "\uC790\uB3D9 \uC800\uC7A5\uC774 \uD65C\uC131\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4")));
  }
  return null;
};

// 글로벌 등록
window.SaveLoadModal = SaveLoadModal;