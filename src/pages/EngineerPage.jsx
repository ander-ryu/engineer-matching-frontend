import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const tableStyle = {
    margin: "30px auto",
    borderCollapse: "collapse",
    width: "80%",
    backgroundColor: "white",
};

const thStyle = {
    border: "1px solid #5bbccb",
    padding: "12px",
    backgroundColor: "#e8eeea",
    fontWeight: "bold",
};

const tdStyle = {
    border: "1px solid #2ec3f1ad",
    padding: "12px",
};

const formBoxStyle = {
    width: "80%",
    margin: "30px auto",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
};

const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
};

const addButtonStyle = {
    padding: "10px 18px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#333",
    color: "white",
    cursor: "pointer",
};

function EngineerPage() {
    const [engineers, setEngineers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [skill, setSkill] = useState("");
    const [status, setStatus] = useState("");

    async function fetchEngineers() {
        const { data, error } = await supabase
            .from("engineers")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.error("读取失败:", error);
        } else {
            setEngineers(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchEngineers();
    }, []);

    async function handleAddEngineer() {
        if (!name || !gender || !skill || !status) {
            alert("请填写完整信息");
            return;
        }

        const { error } = await supabase.from("engineers").insert([
            {
                name: name,
                gender: gender,
                skill: skill,
                status: status,
            },
        ]);

        if (error) {
            alert("新增失败：" + error.message);
            return;
        }

        alert("新增成功");

        setName("");
        setGender("");
        setSkill("");
        setStatus("");

        fetchEngineers();
    }

    if (loading) {
        return <h2>加载中...</h2>;
    }

    return (
        <div>
            <h2>工程师管理页面（数据库数据）</h2>

            <div style={formBoxStyle}>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="姓名"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    style={inputStyle}
                    type="text"
                    placeholder="性别"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />

                <input
                    style={inputStyle}
                    type="text"
                    placeholder="技能"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />

                <input
                    style={inputStyle}
                    type="text"
                    placeholder="状态"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <button style={addButtonStyle} onClick={handleAddEngineer}>
                    新增工程师
                </button>
            </div>

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

export default EngineerPage;