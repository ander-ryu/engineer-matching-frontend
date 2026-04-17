//npm.cmd run dev
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import EngineerPage from "./pages/EngineerPage";
import MenuPanel from "./components/MenuPanel";



function HomePage() {
  return <h2>欢迎使用派遣管理系统</h2>;
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
  if (currentPage === "系统主页") return <HomePage />;
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
  const [currentPage, setCurrentPage] = useState("HomePage");

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

      <h2 style={{ marginTop: "100px" }}>―夢に繋がる一歩へ―</h2>
      <h2 style={{ marginTop: "10px" }}>・Alvers株式会社・</h2>
    </div>
  );
}

export default App;