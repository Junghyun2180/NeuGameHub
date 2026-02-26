// PlacementUI - 모바일 배치 UI 컴포넌트
const PlacementUI = ({
  placementMode,
  setPlacementMode,
  mapRef,
  mapScale = 1,
  getAvailableElements,
  getInventoryByElement,
  handleElementSelect,
  handleTierSelect,
  getElementInfo
}) => {
  if (!placementMode) return null;
  const mapRect = mapRef.current?.getBoundingClientRect();
  if (!mapRect) return null;
  const centerX = mapRect.left + (placementMode.gridX * TILE_SIZE + TILE_SIZE / 2) * mapScale;
  const centerY = mapRect.top + (placementMode.gridY * TILE_SIZE + TILE_SIZE / 2) * mapScale;
  if (placementMode.step === 'element') {
    const availableElements = getAvailableElements();
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-40",
      onClick: e => {
        if (e.target === e.currentTarget) setPlacementMode(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute",
      style: {
        left: centerX,
        top: centerY
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all",
      style: {
        left: -24,
        top: -24
      },
      onClick: () => setPlacementMode(null)
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xl"
    }, "\u2715")), ELEMENT_UI.map((elem, index) => {
      const angle = (index * 60 - 90) * (Math.PI / 180);
      const radius = 65;
      const x = Math.cos(angle) * radius - 22;
      const y = Math.sin(angle) * radius - 22;
      const hasElement = availableElements[elem.id];
      return /*#__PURE__*/React.createElement("div", {
        key: elem.id,
        className: 'absolute w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all ' + (hasElement ? 'hover:scale-110' : 'opacity-30 cursor-not-allowed'),
        style: {
          left: x,
          top: y,
          background: hasElement ? `radial-gradient(circle, ${elem.color} 0%, ${elem.color}80 70%)` : '#333',
          boxShadow: hasElement ? `0 0 15px ${elem.color}80` : 'none',
          border: `2px solid ${hasElement ? elem.color : '#555'}`
        },
        onClick: () => hasElement && handleElementSelect(elem.id)
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-lg"
      }, elem.icon));
    })));
  }
  if (placementMode.step === 'tier') {
    const byTier = getInventoryByElement(placementMode.element);
    const tiers = Object.keys(byTier).map(Number).sort((a, b) => a - b);
    const elementInfo = getElementInfo(placementMode.element);
    const elemColor = NEON_TYPES[1].colors[placementMode.element];
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-40",
      onClick: e => {
        if (e.target === e.currentTarget) setPlacementMode(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute",
      style: {
        left: centerX,
        top: centerY
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute w-12 h-12 rounded-full bg-gray-800 border-2 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all",
      style: {
        left: -24,
        top: -24,
        borderColor: elemColor
      },
      onClick: () => setPlacementMode(prev => ({
        ...prev,
        step: 'element',
        element: null
      }))
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xl"
    }, elementInfo.icon)), tiers.map((tier, index) => {
      const count = byTier[tier].length;
      const angle = (index * (360 / tiers.length) - 90) * (Math.PI / 180);
      const radius = 65;
      const x = Math.cos(angle) * radius - 22;
      const y = Math.sin(angle) * radius - 22;
      const tierColor = NEON_TYPES[tier].colors[placementMode.element];
      return /*#__PURE__*/React.createElement("div", {
        key: tier,
        className: "absolute w-11 h-11 rounded-full flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-all",
        style: {
          left: x,
          top: y,
          background: `radial-gradient(circle, ${tierColor} 0%, ${tierColor}80 70%)`,
          boxShadow: `0 0 15px ${tierColor}80`,
          border: `2px solid ${tierColor}`
        },
        onClick: () => handleTierSelect(tier)
      }, /*#__PURE__*/React.createElement("span", {
        className: "text-xs font-black text-white drop-shadow"
      }, "T", tier), /*#__PURE__*/React.createElement("span", {
        className: "text-xs text-white/80"
      }, "x", count));
    })));
  }
  return null;
};
window.PlacementUI = PlacementUI;