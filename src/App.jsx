//npm.cmd run dev
import { useState } from "react";

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

function HomePage() {
  return <h2>欢迎使用派遣管理系统</h2>;
}

function EngineerPage() {
  return <h2>这里是工程师管理页面</h2>;
}

function ProjectPage() {
  return <h2>这里是案件管理页面</h2>;
}

function DispatchPage() {
  return <h2>这里是派遣分配页面</h2>;
}

function EngineerAnalysisPage() {
  return <h2>这里是工程师分析页面</h2>;
}

function ProjectAnalysisPage() {
  return <h2>这里是案件分析页面</h2>;
}

function DispatchAnalysisPage() {
  return <h2>这里是派遣分析页面</h2>;
}

function PageContent({ currentPage }) {
  if (currentPage === "工程师管理") return <EngineerPage />;
  if (currentPage === "案件管理") return <ProjectPage />;
  if (currentPage === "派遣分配") return <DispatchPage />;
  if (currentPage === "工程师分析") return <EngineerAnalysisPage />;
  if (currentPage === "案件分析") return <ProjectAnalysisPage />;
  if (currentPage === "派遣分析") return <DispatchAnalysisPage />;

  return <HomePage />;
}

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

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleMenuClick = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ marginBottom: "50px" }}>派遣管理システム</h1>

      <MenuPanel onMenuClick={handleMenuClick} currentPage={currentPage} />

      <div style={{ marginTop: "80px" }}>
        <PageContent currentPage={currentPage} />
      </div>

      <h2 style={{ marginTop: "100px" }}>-千里之行，始于足下-</h2>
      <h2 style={{ marginTop: "10px" }}>-Alvers株式会社-</h2>
    </div>
  );
}

export default App;