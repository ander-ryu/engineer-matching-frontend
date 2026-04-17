import { useEffect, useState } from "react";


const buttonStyle = {
  width: "100%",
  fontSize: "20px",
  padding: "6px 5px",
  borderRadius: "15px",
  cursor: "pointer",
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#333",
  color: "white",
  fontWeight: "bold",
};

const buttonGroupStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 130px)",
  gap: "30px",
  justifyContent: "center",
};


function MenuPanel({ onMenuClick, currentPage }) {
  const menus = [
    { id: 0, name: "系统主页" },
    { id: 1, name: "工程师管理" },
    { id: 2, name: "案件管理" },
    { id: 3, name: "派遣分配" },
    { id: 4, name: "工程师分析" },
    { id: 5, name: "案件分析" },
    { id: 6, name: "派遣分析" },
  ];

  return (
    <div style={buttonGroupStyle}>
      {menus.map((item) => (
        <button
          key={item.id}
          style={currentPage === item.name ? activeButtonStyle : buttonStyle}
          onClick={() => onMenuClick(item.name)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}






export default MenuPanel;