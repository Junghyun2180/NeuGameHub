// CheatConsole - 치트 콘솔 UI 컴포넌트
const CheatConsole = ({
  cheatOpen,
  setCheatOpen,
  cheatInput,
  setCheatInput,
  cheatLog,
  cheatInputRef,
  handleCheatSubmit,
  handleKeyDown
}) => {
  if (!cheatOpen) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-0 left-0 right-0 z-50",
    style: {
      fontFamily: 'monospace'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-black/95 border-t border-green-500/50 max-h-60 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center px-3 py-1 border-b border-green-500/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 text-xs font-bold"
  }, "CHEAT CONSOLE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCheatOpen(false),
    className: "text-gray-500 hover:text-white text-xs"
  }, "ESC / `")), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto px-3 py-1 text-xs"
  }, cheatLog.map((line, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: line.startsWith('>') ? 'text-cyan-400' : line.startsWith('❌') ? 'text-red-400' : 'text-green-300',
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, line))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleCheatSubmit,
    className: "flex border-t border-green-500/30"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-green-400 px-2 py-2 text-sm"
  }, '>'), /*#__PURE__*/React.createElement("input", {
    ref: cheatInputRef,
    value: cheatInput,
    onChange: e => setCheatInput(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Escape') setCheatOpen(false);else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') handleKeyDown(e);
    },
    className: "flex-1 bg-transparent text-green-300 text-sm py-2 outline-none",
    placeholder: "help \uC785\uB825\uC73C\uB85C \uBA85\uB839\uC5B4 \uD655\uC778",
    autoFocus: true
  }))));
};
window.CheatConsole = CheatConsole;