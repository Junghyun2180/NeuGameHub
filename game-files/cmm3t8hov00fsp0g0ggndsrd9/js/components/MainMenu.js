// Neon Defense - 메인 메뉴 화면
// 게임 시작 전 모드 선택 및 저장 데이터 불러오기

const MainMenu = ({
  saveInfo,
  onNewGame,
  onLoadGame,
  onSelectMode,
  metaProgress
}) => {
  const {
    useState
  } = React;
  const [selectedMode, setSelectedMode] = useState('campaign'); // 'campaign', 'run'
  const [showLeaderboard, setShowLeaderboard] = useState(false);

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
  const formatDate = timestamp => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };
  const handleStartGame = isNewGame => {
    if (isNewGame) {
      onNewGame();
    } else {
      onLoadGame();
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 overflow-hidden opacity-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse",
    style: {
      top: '10%',
      left: '20%'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse",
    style: {
      top: '60%',
      right: '20%',
      animationDelay: '1s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-4xl w-full mx-4 space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center space-y-4 mb-8"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse",
    style: {
      fontFamily: 'Orbitron, sans-serif',
      textShadow: '0 0 40px rgba(168, 85, 247, 0.5)'
    }
  }, "\u26A1 NEON DEFENSE \u26A1"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-lg",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Random Tower Defense \xD7 Roguelike")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleStartGame(true),
    className: "group relative bg-gray-800/80 backdrop-blur-sm border-2 border-purple-500/50 hover:border-purple-400 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce"
  }, "NEW"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl group-hover:scale-110 transition-transform"
  }, "\uD83C\uDD95"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-purple-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uC0C8 \uAC8C\uC784 \uC2DC\uC791"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400 text-sm text-center"
  }, "\uCC98\uC74C\uBD80\uD130 \uB3C4\uC804\uD558\uAE30", /*#__PURE__*/React.createElement("br", null), "Stage 1-1\uBD80\uD130 \uC2DC\uC791"), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-900/50 rounded-lg p-3 space-y-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCCA \uCD1D \uC2A4\uD14C\uC774\uC9C0"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-purple-300"
  }, SPAWN.maxStage, "\uAC1C")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\u23F1\uFE0F \uC608\uC0C1 \uC2DC\uAC04"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-blue-300"
  }, "50~70\uBD84")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC8E \uD06C\uB9AC\uC2A4\uD0C8 \uBCF4\uC0C1"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-cyan-300"
  }, "\uCD5C\uB300 200+")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-gray-300"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCBE \uC790\uB3D9 \uC800\uC7A5"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-green-300"
  }, "30\uCD08\uB9C8\uB2E4"))), /*#__PURE__*/React.createElement("div", {
    className: "text-yellow-400 text-xs mt-2"
  }, "\uD83D\uDCA1 \uC5B8\uC81C\uB4E0\uC9C0 \uC800\uC7A5\uD558\uACE0 \uB098\uAC08 \uC218 \uC788\uC2B5\uB2C8\uB2E4"))), saveInfo ? /*#__PURE__*/React.createElement("button", {
    onClick: () => handleStartGame(false),
    className: "group relative bg-gray-800/80 backdrop-blur-sm border-2 border-blue-500/50 hover:border-blue-400 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
  }, "SAVED"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl group-hover:scale-110 transition-transform"
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-blue-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uC774\uC5B4\uD558\uAE30"), /*#__PURE__*/React.createElement("div", {
    className: "w-full space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-3 border border-blue-500/30"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-3xl font-bold text-blue-300",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "Stage ", saveInfo.stage, " - Wave ", saveInfo.wave), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400 mt-1"
  }, formatDate(saveInfo.timestamp), " (", formatTime(saveInfo.timestamp), ")")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded px-2 py-1 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400"
  }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300 font-bold"
  }, saveInfo.gold, "G")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded px-2 py-1 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-red-400"
  }, "\u2764\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300 font-bold"
  }, saveInfo.lives)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded px-2 py-1 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-blue-400"
  }, "\uD83D\uDDFC"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300 font-bold"
  }, saveInfo.towerCount, "\uAC1C")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/50 rounded px-2 py-1 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400"
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300 font-bold"
  }, saveInfo.supportCount, "\uAC1C")))), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-900/50 rounded-full h-2 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500",
    style: {
      width: `${saveInfo.stage / SPAWN.maxStage * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400 text-center"
  }, "\uC9C4\uD589\uB960: ", Math.round(saveInfo.stage / SPAWN.maxStage * 100), "%")), /*#__PURE__*/React.createElement("div", {
    className: "text-yellow-400 text-xs mt-2"
  }, "\uD83D\uDCA1 \uC800\uC7A5\uB41C \uC704\uCE58\uBD80\uD130 \uACC4\uC18D \uD50C\uB808\uC774"))) : /*#__PURE__*/React.createElement("div", {
    className: "relative bg-gray-800/50 backdrop-blur-sm border-2 border-gray-600/50 rounded-xl p-6 opacity-60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-6xl opacity-50"
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-gray-500",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uC774\uC5B4\uD558\uAE30"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm text-center"
  }, "\uC800\uC7A5\uB41C \uAC8C\uC784\uC774 \uC5C6\uC2B5\uB2C8\uB2E4", /*#__PURE__*/React.createElement("br", null), "\uC0C8 \uAC8C\uC784\uC744 \uC2DC\uC791\uD574\uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-gray-900/50 rounded-lg p-3 space-y-2 text-sm opacity-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center text-gray-500"
  }, /*#__PURE__*/React.createElement("span", null, "\uAC8C\uC784 \uC9C4\uD589 \uD6C4 \uC790\uB3D9 \uC800\uC7A5\uB429\uB2C8\uB2E4")))))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "\uAC8C\uC784 \uBAA8\uB4DC:"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    className: `px-4 py-2 rounded-lg font-bold transition-all ${selectedMode === 'campaign' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`,
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83C\uDFF0 \uCEA0\uD398\uC778"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setSelectedMode('run');
      onSelectMode && onSelectMode('run');
    },
    className: `px-4 py-2 rounded-lg font-bold transition-all relative ${selectedMode === 'run' ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/50' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`,
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83C\uDFB2 \uB7F0 \uBAA8\uB4DC", metaProgress && metaProgress.crystals > 0 && /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-xs text-cyan-300"
  }, "\uD83D\uDC8E ", metaProgress.crystals), /*#__PURE__*/React.createElement("span", {
    className: "absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-cyan-500 text-white text-xs px-2 py-0.5 rounded-full font-bold"
  }, "NEW")))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowLeaderboard(true),
    className: "w-full bg-gray-800/60 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-400 rounded-lg p-3 text-center transition-all hover:bg-gray-700/60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg"
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-yellow-300 font-bold text-sm",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "LEADERBOARD")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-2 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, "\uD83C\uDFAF"), /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uB09C\uC774\uB3C4"), /*#__PURE__*/React.createElement("div", {
    className: "text-purple-300 font-bold"
  }, "\uBCF4\uD1B5")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, "\uD83D\uDDFC"), /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uD0C0\uC6CC \uC885\uB958"), /*#__PURE__*/React.createElement("div", {
    className: "text-blue-300 font-bold"
  }, "24\uAC1C")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, "\uD83D\uDC7E"), /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uC801 \uC885\uB958"), /*#__PURE__*/React.createElement("div", {
    className: "text-red-300 font-bold"
  }, "8\uC885")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("div", {
    className: "text-gray-400"
  }, "\uB85C\uADF8\uB77C\uC774\uD06C"), /*#__PURE__*/React.createElement("div", {
    className: "text-green-300 font-bold"
  }, "\uC601\uAD6C\uBC84\uD504"))), metaProgress && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-6 bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83D\uDC8E"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uBCF4\uC720 \uD06C\uB9AC\uC2A4\uD0C8"), /*#__PURE__*/React.createElement("div", {
    className: "text-cyan-300 font-bold",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, (metaProgress.crystals || 0).toLocaleString()))), /*#__PURE__*/React.createElement("div", {
    className: "w-px h-8 bg-gray-600"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83C\uDFC6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, "\uC5C5\uC801"), /*#__PURE__*/React.createElement("div", {
    className: "text-yellow-300 font-bold text-sm"
  }, AchievementSystem.getProgress().unlocked, "/", AchievementSystem.getProgress().total)))), /*#__PURE__*/React.createElement("div", {
    className: "text-center text-gray-600 text-xs"
  }, /*#__PURE__*/React.createElement("div", null, "Neon Defense v1.1"), /*#__PURE__*/React.createElement("div", {
    className: "mt-1"
  }, "Made with \u2764\uFE0F by Junghyun")))), showLeaderboard && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 border-2 border-yellow-500/40 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, "\uD83C\uDFC6 LEADERBOARD"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowLeaderboard(false),
    className: "text-gray-400 hover:text-white text-2xl leading-none transition-colors"
  }, "\xD7")), /*#__PURE__*/React.createElement(LeaderboardTab, {
    initialMode: "campaign"
  }))));
};

// 글로벌 등록
window.MainMenu = MainMenu;