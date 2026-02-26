// ControlPanel - 사이드 패널 컴포넌트
const ControlPanel = ({
  // 뽑기/시작
  gold,
  isPlaying,
  drawRandomNeon,
  drawRandomSupport,
  startWave,
  isInventoryFull,
  isSupportInventoryFull,
  // 인벤토리
  inventory,
  selectedInventory,
  selectedTowerForPlacement,
  handleInventoryClick,
  toggleInventorySelect,
  getElementInfo,
  // 조합
  combineNeons,
  combineAllNeons,
  combineTowers,
  sellSelectedTowers,
  selectedTowers,
  totalSellPrice,
  canCombineTowers,
  // 서포트
  supportInventory,
  selectedSupportInventory,
  toggleSupportInventorySelect,
  combineSupports,
  combineAllSupports,
  combineSupportTowers,
  sellSelectedSupportTowers,
  selectedSupportTowers,
  totalSupportSellPrice,
  canCombineSupportTowers,
  effectiveDrawCost = ECONOMY.drawCost
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex-1 min-w-0 space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: drawRandomNeon,
    disabled: gold < effectiveDrawCost || isInventoryFull,
    className: "flex-1 btn-neon px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-pink-400/30 text-sm"
  }, isInventoryFull ? '📦 가득 참' : '🎲 뽑기 (' + effectiveDrawCost + 'G)'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: drawRandomSupport,
    disabled: gold < ECONOMY.supportDrawCost || isSupportInventoryFull,
    className: "flex-1 btn-neon px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-orange-400/30 text-sm"
  }, isSupportInventoryFull ? '📦 가득 참' : '🛡️ 서포트 (' + ECONOMY.supportDrawCost + 'G)'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: startWave,
    disabled: isPlaying,
    className: "flex-1 btn-neon px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-cyan-400/30 text-sm"
  }, isPlaying ? '전투 중...' : '▶ 시작')), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineNeons,
    disabled: selectedInventory.length !== 3 || selectedInventory[0]?.tier >= 4,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-400/30 text-sm"
  }, selectedInventory.length === 3 && selectedInventory[0]?.tier >= 4 ? '⚡ 조합 (최대 티어)' : '⚡ 선택 조합'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineAllNeons,
    disabled: TowerSystem.getCombinableCount(inventory) === 0,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/30 text-sm"
  }, "\uD83D\uDD04 \uC804\uCCB4 \uC870\uD569 (", TowerSystem.getCombinableCount(inventory), ")")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineTowers,
    disabled: !canCombineTowers,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/30 text-sm"
  }, selectedTowers.length > 0 && selectedTowers[0]?.tier >= 4 ? '🔮 조합 (최대 티어)' : `🔮 타워 조합 (${selectedTowers.length + selectedInventory.length}/3)`), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: sellSelectedTowers,
    disabled: selectedTowers.length === 0,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-red-400/30 text-sm"
  }, "\uD83D\uDCB0 \uD310\uB9E4 (+", totalSellPrice, "G)")), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/80 rounded-lg p-3 border border-gray-700"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold mb-2 text-gray-400"
  }, "\uD83D\uDCE6 \uC778\uBCA4\uD1A0\uB9AC (", inventory.length, "/", ECONOMY.maxInventory, ") - \uD074\uB9AD: \uC120\uD0DD / \uB4DC\uB798\uADF8: \uBC30\uCE58"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-1.5"
  }, Array.from({
    length: ECONOMY.maxInventory
  }, (_, i) => {
    const neon = inventory[i];
    if (neon) {
      const isSelected = selectedInventory.some(n => n.id === neon.id);
      const isInPlacementMode = selectedTowerForPlacement && selectedTowerForPlacement.id === neon.id;
      const elementInfo = getElementInfo(neon.element);
      let borderClass = 'border-transparent hover:border-gray-500';
      let boxShadow = 'none';
      if (isInPlacementMode) {
        borderClass = 'border-yellow-400';
        boxShadow = '0 0 15px #facc15';
      } else if (isSelected) {
        borderClass = 'border-white selected';
        boxShadow = '0 0 15px ' + neon.color;
      }
      return /*#__PURE__*/React.createElement("div", {
        key: neon.id,
        onClick: e => {
          e.stopPropagation();
          handleInventoryClick(neon);
        },
        className: 'inventory-item w-10 h-10 rounded-lg flex flex-col items-center justify-center border-2 cursor-pointer ' + borderClass,
        style: {
          background: 'radial-gradient(circle, ' + neon.color + '80 0%, ' + neon.color + '40 70%)',
          color: neon.color,
          boxShadow
        },
        title: neon.name + '\nTier ' + neon.tier + '\n' + elementInfo.icon + ' ' + elementInfo.name + ': ' + elementInfo.desc
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-sm"
      }, elementInfo.icon), /*#__PURE__*/React.createElement("span", {
        className: "text-xs font-black text-white drop-shadow"
      }, "T", neon.tier));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: 'empty-' + i,
      className: "w-10 h-10 rounded-lg border border-gray-700/50 bg-gray-800/30"
    });
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/80 rounded-lg p-3 border border-orange-500/30"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold mb-2 text-orange-400"
  }, "\uD83D\uDEE1\uFE0F \uC11C\uD3EC\uD2B8 (", supportInventory.length, "/", ECONOMY.maxSupportInventory, ")"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-1.5"
  }, Array.from({
    length: ECONOMY.maxSupportInventory
  }, (_, i) => {
    const support = supportInventory[i];
    if (support) {
      const isSelected = selectedSupportInventory.some(s => s.id === support.id);
      const isInPlacementMode = selectedTowerForPlacement && selectedTowerForPlacement.id === support.id;
      const supportInfo = SUPPORT_UI[support.supportType];
      let borderClass = 'border-transparent hover:border-gray-500';
      let boxShadow = 'none';
      if (isInPlacementMode) {
        borderClass = 'border-yellow-400';
        boxShadow = '0 0 15px #facc15';
      } else if (isSelected) {
        borderClass = 'border-white selected';
        boxShadow = '0 0 15px ' + support.color;
      }
      return /*#__PURE__*/React.createElement("div", {
        key: support.id,
        onClick: e => {
          e.stopPropagation();
          handleInventoryClick(support);
        },
        className: 'inventory-item w-10 h-10 flex flex-col items-center justify-center border-2 cursor-pointer ' + borderClass,
        style: {
          background: 'linear-gradient(135deg, ' + support.color + '80 0%, ' + support.color + '40 100%)',
          color: support.color,
          boxShadow,
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        },
        title: support.name + '\nS' + support.tier + '\n' + supportInfo.icon + ' ' + supportInfo.name
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-sm"
      }, supportInfo.icon), /*#__PURE__*/React.createElement("span", {
        className: "text-xs font-black text-white drop-shadow"
      }, "S", support.tier));
    }
    return /*#__PURE__*/React.createElement("div", {
      key: 'support-empty-' + i,
      className: "w-10 h-10 border border-gray-700/50 bg-gray-800/30",
      style: {
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      }
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineSupports,
    disabled: selectedSupportInventory.length !== 3 || selectedSupportInventory[0]?.tier >= 3,
    className: "flex-1 btn-neon px-2 py-1 bg-gradient-to-r from-orange-600 to-amber-600 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-orange-400/30 text-xs"
  }, selectedSupportInventory.length === 3 && selectedSupportInventory[0]?.tier >= 3 ? '⚡ 조합 (최대)' : '⚡ 조합'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineAllSupports,
    disabled: TowerSystem.getSupportCombinableCount(supportInventory) === 0,
    className: "flex-1 btn-neon px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-amber-400/30 text-xs"
  }, "\uD83D\uDD04 \uC804\uCCB4 (", TowerSystem.getSupportCombinableCount(supportInventory), ")"))), selectedSupportTowers.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: combineSupportTowers,
    disabled: !canCombineSupportTowers,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-orange-400/30 text-sm"
  }, selectedSupportTowers.length === 3 && selectedSupportTowers[0]?.tier >= 3 ? '🔮 조합 (최대 티어)' : `🔮 서포트 조합 (${selectedSupportTowers.length}/3)`), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: sellSelectedSupportTowers,
    className: "flex-1 btn-neon px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed border border-red-400/30 text-sm"
  }, "\uD83D\uDCB0 \uD310\uB9E4 (+", totalSupportSellPrice, "G)")), selectedTowers.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/80 rounded-lg p-3 border border-emerald-500/50"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold mb-2 text-emerald-400"
  }, "\uD83C\uDFD7\uFE0F \uC120\uD0DD\uB41C \uD0C0\uC6CC (", selectedTowers.length, "\uAC1C)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 rounded-full flex items-center justify-center",
    style: {
      background: 'radial-gradient(circle, ' + selectedTowers[0].color + ' 0%, ' + selectedTowers[0].color + '80 50%, transparent 70%)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, getElementInfo(selectedTowers[0].element).icon)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, selectedTowers[0].name), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "T", selectedTowers[0].tier)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-1"
  }, getElementInfo(selectedTowers[0].element).icon, " ", getElementInfo(selectedTowers[0].element).name, ": ", getElementInfo(selectedTowers[0].element).desc), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-1"
  }, "\uD310\uB9E4 \uC2DC ", totalSellPrice, "G \uD658\uAE09")), selectedSupportTowers.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900/80 rounded-lg p-3 border border-orange-500/50"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold mb-2 text-orange-400"
  }, "\uD83D\uDEE1\uFE0F \uC120\uD0DD\uB41C \uC11C\uD3EC\uD2B8 (", selectedSupportTowers.length, "\uAC1C)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-6 h-6 flex items-center justify-center",
    style: {
      background: 'linear-gradient(135deg, ' + selectedSupportTowers[0].color + ' 0%, ' + selectedSupportTowers[0].color + '80 100%)',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs"
  }, SUPPORT_UI[selectedSupportTowers[0].supportType].icon)), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-300"
  }, selectedSupportTowers[0].name), /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "S", selectedSupportTowers[0].tier)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-1"
  }, SUPPORT_UI[selectedSupportTowers[0].supportType].icon, " ", SUPPORT_UI[selectedSupportTowers[0].supportType].name, " \uBC84\uD504 +", Math.round(selectedSupportTowers[0].buffValue * 100), "%"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-500 mt-1"
  }, "\uD310\uB9E4 \uC2DC ", totalSupportSellPrice, "G \uD658\uAE09")));
};
window.ControlPanel = ControlPanel;