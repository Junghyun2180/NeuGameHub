// Neon Defense - 리더보드 탭 컴포넌트
// 모든 게임 모드의 리더보드를 표시하는 재사용 가능한 컴포넌트

const LeaderboardTab = ({
  initialMode = 'campaign',
  modes
}) => {
  const {
    useState
  } = React;
  const defaultModes = [{
    id: 'campaign',
    label: 'Campaign',
    icon: '🏰'
  }, {
    id: 'standard',
    label: 'Standard',
    icon: '🎮'
  }, {
    id: 'daily',
    label: 'Daily',
    icon: '📅'
  }, {
    id: 'endless',
    label: 'Endless',
    icon: '♾️'
  }];
  const activeModes = modes || defaultModes;
  const [mode, setMode] = useState(initialMode);
  const entries = typeof Leaderboard !== 'undefined' ? Leaderboard.getEntries(mode) : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 flex-wrap"
  }, activeModes.map(m => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    onClick: () => setMode(m.id),
    className: `px-3 py-1 rounded text-sm font-bold transition-all ${mode === m.id ? 'bg-cyan-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'}`
  }, m.icon, " ", m.label))), entries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center text-gray-500 py-8"
  }, "\uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. \uD50C\uB808\uC774\uD558\uC5EC \uAE30\uB85D\uC744 \uB0A8\uAE30\uC138\uC694!") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-1"
  }, entries.map((entry, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: `flex items-center justify-between px-3 py-2 rounded ${idx === 0 ? 'bg-yellow-900/30 border border-yellow-500/30' : idx === 1 ? 'bg-gray-700/30 border border-gray-500/20' : idx === 2 ? 'bg-orange-900/20 border border-orange-500/20' : 'bg-gray-800/30'}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-bold w-8 text-center",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-white text-sm font-bold"
  }, "Stage ", entry.stage), entry.grade && /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-xs text-yellow-300"
  }, entry.grade), mode === 'campaign' && entry.lives != null && /*#__PURE__*/React.createElement("span", {
    className: "ml-2 text-xs text-red-300"
  }, "\u2764\uFE0F ", entry.lives))), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-gray-400"
  }, entry.time ? `${Math.floor(entry.time / 60000)}분` : '', " |", ' ', entry.date ? new Date(entry.date).toLocaleDateString() : '')))));
};
window.LeaderboardTab = LeaderboardTab;