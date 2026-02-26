// BuffSelectionModal - 스테이지 클리어 시 버프 선택 모달
const BuffSelectionModal = ({
  isOpen,
  buffChoices,
  currentBuffs,
  onSelectBuff,
  rerollsRemaining = 0,
  onReroll = null
}) => {
  if (!isOpen || !buffChoices || buffChoices.length === 0) return null;
  const {
    useState
  } = React;
  const [hoveredBuff, setHoveredBuff] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900 border-2 border-cyan-500 rounded-2xl p-6 max-w-4xl mx-4",
    style: {
      boxShadow: '0 0 50px rgba(0, 255, 255, 0.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-cyan-400 mb-2",
    style: {
      textShadow: '0 0 10px #00ffff'
    }
  }, "\uD83C\uDF89 \uC2A4\uD14C\uC774\uC9C0 \uD074\uB9AC\uC5B4!"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "\uC601\uAD6C \uBC84\uD504\uB97C \uC120\uD0DD\uD558\uC138\uC694"), rerollsRemaining > 0 && onReroll && /*#__PURE__*/React.createElement("button", {
    onClick: onReroll,
    className: "mt-2 px-4 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-bold text-white transition-colors"
  }, "\uD83D\uDD04 \uB9AC\uB864 (", rerollsRemaining, "\uD68C \uB0A8\uC74C)")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-4 justify-center flex-wrap"
  }, buffChoices.map((buff, index) => {
    const currentStacks = currentBuffs[buff.id] || 0;
    const isMaxed = currentStacks >= buff.maxStacks;
    const isHovered = hoveredBuff === buff.id;
    return /*#__PURE__*/React.createElement("div", {
      key: buff.id,
      className: `
                  relative w-48 p-4 rounded-xl cursor-pointer transition-all duration-300
                  ${isMaxed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  ${isHovered ? 'ring-2 ring-white' : ''}
                `,
      style: {
        background: `linear-gradient(135deg, ${buff.color}30 0%, ${buff.color}10 100%)`,
        border: `2px solid ${buff.color}`,
        boxShadow: isHovered ? `0 0 30px ${buff.color}` : `0 0 15px ${buff.color}50`
      },
      onClick: () => !isMaxed && onSelectBuff(buff.id),
      onMouseEnter: () => setHoveredBuff(buff.id),
      onMouseLeave: () => setHoveredBuff(null)
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-5xl text-center mb-3",
      style: {
        filter: `drop-shadow(0 0 10px ${buff.color})`
      }
    }, buff.icon), /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-center text-white mb-2",
      style: {
        textShadow: `0 0 5px ${buff.color}`
      }
    }, buff.name), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-gray-300 text-center mb-3 min-h-[40px]"
    }, buff.description), buff.stackable && /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center gap-1 mb-2"
    }, Array.from({
      length: buff.maxStacks
    }).map((_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `w-3 h-3 rounded-full border ${i < currentStacks ? 'bg-white border-white' : i === currentStacks ? 'bg-transparent border-white animate-pulse' : 'bg-transparent border-gray-600'}`,
      style: i < currentStacks ? {
        boxShadow: `0 0 5px ${buff.color}`
      } : {}
    }))), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-center",
      style: {
        color: buff.color
      }
    }, isMaxed ? '최대 스택!' : `${currentStacks} / ${buff.maxStacks}`), isHovered && !isMaxed && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-white font-bold text-lg"
    }, "\uD074\uB9AD\uD558\uC5EC \uC120\uD0DD")));
  })), Object.keys(currentBuffs).length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-6 pt-4 border-t border-gray-700"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-gray-500 text-center mb-2"
  }, "\uD604\uC7AC \uD65C\uC131 \uBC84\uD504"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center gap-2"
  }, PermanentBuffManager.getActiveBuffsList(currentBuffs).map(buff => /*#__PURE__*/React.createElement("div", {
    key: buff.id,
    className: "px-2 py-1 rounded-full text-xs flex items-center gap-1",
    style: {
      backgroundColor: `${buff.color}30`,
      border: `1px solid ${buff.color}`,
      color: buff.color
    }
  }, /*#__PURE__*/React.createElement("span", null, buff.icon), /*#__PURE__*/React.createElement("span", null, buff.name), buff.stacks > 1 && /*#__PURE__*/React.createElement("span", null, "\xD7", buff.stacks)))))));
};
window.BuffSelectionModal = BuffSelectionModal;