// Neon Defense - 메타 업그레이드 패널
// 8종 영구 업그레이드 카드 그리드 + 구매 UI

const MetaUpgradePanel = ({
  metaProgress,
  neonCrystals,
  onPurchaseUpgrade
}) => {
  const upgradeIds = Object.keys(META_UPGRADES);
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 text-lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\uD83D\uDC8E"), /*#__PURE__*/React.createElement("span", {
    className: "text-cyan-300 font-bold",
    style: {
      fontFamily: 'Orbitron, sans-serif'
    }
  }, neonCrystals.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-400 text-sm"
  }, "\uB124\uC628 \uD06C\uB9AC\uC2A4\uD0C8")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 md:grid-cols-4 gap-3"
  }, upgradeIds.map(id => {
    const upgrade = META_UPGRADES[id];
    const currentLevel = metaProgress.upgrades[id] || 0;
    const isMaxed = currentLevel >= upgrade.maxLevel;
    const cost = isMaxed ? null : upgrade.cost(currentLevel);
    const canAfford = !isMaxed && neonCrystals >= cost;
    const currentEffect = currentLevel > 0 ? upgrade.formatEffect(currentLevel) : '-';
    const nextEffect = !isMaxed ? upgrade.formatEffect(currentLevel + 1) : '-';
    return /*#__PURE__*/React.createElement("div", {
      key: id,
      className: `relative bg-gray-800/80 border rounded-lg p-3 transition-all ${isMaxed ? 'border-yellow-500/50 shadow-lg shadow-yellow-500/20' : canAfford ? 'border-cyan-500/50 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30 cursor-pointer' : 'border-gray-600/50 opacity-70'}`,
      onClick: () => canAfford && onPurchaseUpgrade(id)
    }, isMaxed && /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full"
    }, "MAX"), /*#__PURE__*/React.createElement("div", {
      className: "text-center mb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-2xl mb-1"
    }, upgrade.icon), /*#__PURE__*/React.createElement("div", {
      className: "text-xs font-bold text-gray-200 truncate"
    }, upgrade.name)), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-0.5 mb-2 justify-center"
    }, Array.from({
      length: upgrade.maxLevel
    }, (_, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: `h-1.5 rounded-full transition-all ${i < currentLevel ? isMaxed ? 'bg-yellow-400' : 'bg-cyan-400' : 'bg-gray-600'}`,
      style: {
        width: `${Math.max(4, 100 / upgrade.maxLevel - 2)}%`
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "text-center text-xs"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-gray-400"
    }, "\uD604\uC7AC: "), /*#__PURE__*/React.createElement("span", {
      className: "text-cyan-300 font-bold"
    }, currentEffect)), !isMaxed && /*#__PURE__*/React.createElement("div", {
      className: "mt-2 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-400"
    }, "\uB2E4\uC74C: ", /*#__PURE__*/React.createElement("span", {
      className: "text-green-300"
    }, nextEffect)), /*#__PURE__*/React.createElement("div", {
      className: `text-xs font-bold mt-1 ${canAfford ? 'text-cyan-300' : 'text-gray-500'}`
    }, "\uD83D\uDC8E ", cost)), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-500 text-center mt-1 truncate",
      title: upgrade.desc
    }, upgrade.desc));
  })));
};

// 전역 등록
window.MetaUpgradePanel = MetaUpgradePanel;