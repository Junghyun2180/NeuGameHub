// CarryoverModal - 스테이지 클리어 시 타워 캐리오버 선택 모달
const CarryoverModal = ({
  isOpen,
  candidates,
  // { towers: [], supports: [] }
  selectedIds,
  // { towers: [], supports: [] }
  onToggleTower,
  // (towerId) => void
  onToggleSupport,
  // (supportId) => void
  onConfirm,
  // () => void
  allTowers,
  // 맵 + 인벤토리 전체 타워 (환급 계산용)
  allSupports // 맵 + 인벤토리 전체 서포트 (환급 계산용)
}) => {
  if (!isOpen) return null;
  const {
    useMemo
  } = React;
  const selectedTowerCount = selectedIds.towers.length;
  const selectedSupportCount = selectedIds.supports.length;

  // 예상 환급 계산
  const refundAmount = useMemo(() => {
    return calculateCarryoverRefund(allTowers.towers || [], allTowers.supports || [], allTowers.inventory || [], allTowers.supportInventory || [], selectedIds);
  }, [allTowers, selectedIds]);

  // 속성 정보 헬퍼
  const getElementInfo = element => {
    const info = ELEMENT_EFFECTS[element];
    return info || {
      name: '???',
      icon: '❓'
    };
  };

  // 서포트 타입 정보
  const getSupportInfo = supportType => {
    const icons = ['⚔️', '⏱️', '💔', '🎯'];
    const names = ['공격력', '공속', '방감', '사거리'];
    return {
      icon: icons[supportType] || '❓',
      name: names[supportType] || '???'
    };
  };

  // 티어별 색상
  const tierColors = {
    2: '#45B7D1',
    3: '#FFD700',
    4: '#FF6B6B'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-900 border-2 border-purple-500 rounded-2xl p-6 max-w-4xl mx-4",
    style: {
      boxShadow: '0 0 50px rgba(168, 85, 247, 0.3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-6"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-bold text-purple-400 mb-2",
    style: {
      textShadow: '0 0 10px #a855f7'
    }
  }, "\uD83D\uDCE6 \uD0C0\uC6CC \uCE90\uB9AC\uC624\uBC84"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-400"
  }, "\uB2E4\uC74C \uC2A4\uD14C\uC774\uC9C0\uB85C \uAC00\uC838\uAC08 \uD0C0\uC6CC\uB97C \uC120\uD0DD\uD558\uC138\uC694")), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-cyan-400"
  }, "\uACF5\uACA9 \uD0C0\uC6CC"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm px-2 py-1 rounded-full",
    style: {
      background: selectedTowerCount >= CARRYOVER.maxTowers ? '#22c55e30' : '#6b728030',
      color: selectedTowerCount >= CARRYOVER.maxTowers ? '#22c55e' : '#9ca3af'
    }
  }, selectedTowerCount, " / ", CARRYOVER.maxTowers)), candidates.towers.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 justify-center"
  }, candidates.towers.map(tower => {
    const isSelected = selectedIds.towers.includes(tower.id);
    const elementInfo = getElementInfo(tower.element);
    const canSelect = isSelected || selectedTowerCount < CARRYOVER.maxTowers;
    return /*#__PURE__*/React.createElement("div", {
      key: tower.id,
      onClick: () => canSelect && onToggleTower(tower.id),
      className: `
                      relative w-16 h-20 rounded-lg transition-all duration-200
                      ${canSelect ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
                      ${isSelected ? 'scale-105 ring-2 ring-cyan-400' : 'hover:scale-102'}
                    `,
      style: {
        background: `linear-gradient(135deg, ${tower.color}40, ${tower.color}20)`,
        border: `2px solid ${isSelected ? '#22d3ee' : tierColors[tower.tier]}`,
        boxShadow: isSelected ? `0 0 15px ${tower.color}` : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-black",
      style: {
        background: tierColors[tower.tier]
      }
    }, "T", tower.tier), /*#__PURE__*/React.createElement("div", {
      className: "text-2xl text-center pt-2"
    }, elementInfo.icon), tower.roleIcon && /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-center"
    }, tower.roleIcon), isSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-cyan-400/20 rounded-lg flex items-end justify-center pb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-cyan-400 text-lg"
    }, "\u2713")));
  })) : /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-center py-4"
  }, "T2 \uC774\uC0C1 \uD0C0\uC6CC \uC5C6\uC74C")), /*#__PURE__*/React.createElement("div", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-pink-400"
  }, "\uC11C\uD3EC\uD2B8 \uD0C0\uC6CC"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm px-2 py-1 rounded-full",
    style: {
      background: selectedSupportCount >= CARRYOVER.maxSupports ? '#22c55e30' : '#6b728030',
      color: selectedSupportCount >= CARRYOVER.maxSupports ? '#22c55e' : '#9ca3af'
    }
  }, selectedSupportCount, " / ", CARRYOVER.maxSupports)), candidates.supports.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-3 justify-center"
  }, candidates.supports.map(support => {
    const isSelected = selectedIds.supports.includes(support.id);
    const supportInfo = getSupportInfo(support.supportType);
    const canSelect = isSelected || selectedSupportCount < CARRYOVER.maxSupports;
    return /*#__PURE__*/React.createElement("div", {
      key: support.id,
      onClick: () => canSelect && onToggleSupport(support.id),
      className: `
                      relative w-16 h-20 rounded-lg transition-all duration-200
                      ${canSelect ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
                      ${isSelected ? 'scale-105 ring-2 ring-pink-400' : 'hover:scale-102'}
                    `,
      style: {
        background: `linear-gradient(135deg, ${support.color}40, ${support.color}20)`,
        border: `2px solid ${isSelected ? '#f472b6' : tierColors[support.tier]}`,
        boxShadow: isSelected ? `0 0 15px ${support.color}` : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-black",
      style: {
        background: tierColors[support.tier]
      }
    }, "S", support.tier), /*#__PURE__*/React.createElement("div", {
      className: "text-2xl text-center pt-3"
    }, supportInfo.icon), isSelected && /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-pink-400/20 rounded-lg flex items-end justify-center pb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-pink-400 text-lg"
    }, "\u2713")));
  })) : /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-center py-4"
  }, "S2 \uC774\uC0C1 \uC11C\uD3EC\uD2B8 \uC5C6\uC74C")), /*#__PURE__*/React.createElement("div", {
    className: "border-t border-gray-700 pt-4 mb-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-center text-gray-400 text-sm"
  }, "\uC120\uD0DD\uD558\uC9C0 \uC54A\uC740 \uD0C0\uC6CC\uB294 ", /*#__PURE__*/React.createElement("span", {
    className: "text-yellow-400 font-bold"
  }, "50%"), " \uD658\uAE09"), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-yellow-400 text-lg font-bold mt-1"
  }, "\uD83D\uDCB0 \uC608\uC0C1 \uD658\uAE09: ", refundAmount, "G")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onConfirm,
    className: "px-8 py-3 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105",
    style: {
      background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
      boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
    }
  }, "\uD655\uC778 (", selectedTowerCount + selectedSupportCount, "\uAC1C \uC120\uD0DD\uB428)"))));
};
window.CarryoverModal = CarryoverModal;