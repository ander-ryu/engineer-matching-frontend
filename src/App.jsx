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
  const engineers = [
    { id: 1, name: "张三", gender: "男", skill: "Java", status: "在职" },
    { id: 2, name: "李四", gender: "女", skill: "React", status: "待命" },
    { id: 3, name: "王五", gender: "男", skill: "Python", status: "派遣中" },
    { id: 4, name: "赵六", gender: "女", skill: "Aws", status: "在职" },
  ];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>工程师管理页面</h2>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>编号</th>
            <th style={thStyle}>姓名</th>
            <th style={thStyle}>性别</th>
            <th style={thStyle}>技能</th>
            <th style={thStyle}>状态</th>
          </tr>
        </thead>
        <tbody>
          {engineers.map((engineer) => (
            <tr key={engineer.id}>
              <td style={tdStyle}>{engineer.id}</td>
              <td style={tdStyle}>{engineer.name}</td>
              <td style={tdStyle}>{engineer.gender}</td>
              <td style={tdStyle}>{engineer.skill}</td>
              <td style={tdStyle}>{engineer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

const tableStyle = {
  margin: "30px auto",
  borderCollapse: "collapse",
  width: "80%",
  backgroundColor: "white",
};

const thStyle = {
  border: "1px solid #5bbccb",
  padding: "12px",
  backgroundColor: "#757b77",
  fontWeight: "bold",
};

const tdStyle = {
  border: "1px solid #2ec3f1ad",
  padding: "12px",
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

      <h2 style={{ marginTop: "100px" }}>-千里之行，始于足下-</h2>
      <h2 style={{ marginTop: "10px" }}>-Alvers株式会社-</h2>
    </div>
  );
}

export default App;