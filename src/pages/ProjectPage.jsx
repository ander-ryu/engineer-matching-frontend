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

const deleteButtonStyle = {
    padding: "3px 10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#c0392b",
    color: "white",
    cursor: "pointer",
};

const searchBoxStyle = {
    width: "80%",
    margin: "20px auto",
    display: "flex",
    justifyContent: "left",
};



function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");

    const [project_name, setProjectName] = useState("");
    const [required_skill, setRequiredSkill] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");

    async function fetchProjects() {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.error("读取失败:", error);
        } else {
            setProjects(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    async function handleAddProject() {
        if (!project_name || !required_skill || !location || !status || !description) {
            alert("请填写完整信息");
            return;
        }

        const { error } = await supabase.from("projects").insert([
            {
                project_name: project_name,
                required_skill: required_skill,
                location: location,
                status: status,
                description: description,
            },
        ]);

        if (error) {
            alert("新增失败：" + error.message);
            return;
        }

        alert("新增成功");

        setProjectName("");
        setRequiredSkill("");
        setLocation("");
        setStatus("");
        setDescription("");

        setShowForm(false);

        fetchProjects();
    }

    async function handleDeleteProject(id) {
        const confirmed = window.confirm("确定要删除这个案件吗？");

        if (!confirmed) {
            return;
        }

        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", id);

        if (error) {
            alert("删除失败：" + error.message);
            return;
        }

        alert("删除成功");

        fetchProjects();
    }

    function handleEditClick(project) {
        setEditingId(project.id);
        setProjectName(project.project_name);
        setRequiredSkill(project.required_skill);
        setLocation(project.location);
        setStatus(project.status);
        setDescription(project.description);
        setShowForm(true);
    }

    async function handleUpdateProject() {
        if (!project_name || !required_skill || !location || !status || !description) {
            alert("请填写完整信息");
            return;
        }

        const { error } = await supabase
            .from("projects")
            .update({
                project_name,
                required_skill,
                location,
                status,
                description,
            })
            .eq("id", editingId);

        if (error) {
            alert("修改失败：" + error.message);
            return;
        }

        alert("修改成功");

        setProjectName("");
        setRequiredSkill("");
        setLocation("");
        setStatus("");
        setDescription("");
        setShowForm(false);
        setEditMode(false);
        setEditingId(null);

        fetchProjects();
    }

    if (loading) {
        return <h2>加载中...</h2>;
    }

    const filteredProjects = projects.filter((project) => {
        const keyword = searchKeyword.trim().toLowerCase();

        if (!keyword) {
            return true;
        }

        return (
            project.project_name.toLowerCase().includes(keyword) ||
            project.required_skill.toLowerCase().includes(keyword) ||
            project.location.toLowerCase().includes(keyword) ||
            project.status.toLowerCase().includes(keyword) ||
            project.description.toLowerCase().includes(keyword)
        );
    });

    return (
        <div>
            <h2>案件管理页面（数据库数据）</h2>
            {!showForm && (
                <button style={addButtonStyle} onClick={() => setShowForm(true)}>
                    新增案件
                </button>
            )}

            {!deleteMode ? (
                <button style={addButtonStyle} onClick={() => setDeleteMode(true)}>
                    删除案件
                </button>
            ) : (
                <button style={addButtonStyle} onClick={() => setDeleteMode(false)}>
                    取消删除
                </button>
            )}

            {!editMode ? (
                <button
                    style={addButtonStyle}
                    onClick={() => {
                        setEditMode(true);
                        setDeleteMode(false);
                        setShowForm(false);
                    }}
                >
                    修改案件
                </button>
            ) : (
                <button
                    style={addButtonStyle}
                    onClick={() => {
                        setEditMode(false);
                        setEditingId(null);
                        setShowForm(false);
                        setProjectName("");
                        setRequiredSkill("");
                        setLocation("");
                        setStatus("");
                        setDescription("");
                        setEditMode(false);
                    }}
                >
                    取消修改
                </button>
            )}

            {showForm && (
                <div style={formBoxStyle}>
                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="案件名"
                        value={project_name}
                        onChange={(e) => setProjectName(e.target.value)}
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="所需技能"
                        value={required_skill}
                        onChange={(e) => setRequiredSkill(e.target.value)}
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="地点"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="状态"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />

                    <input
                        style={inputStyle}
                        type="text"
                        placeholder="说明"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                        style={addButtonStyle}
                        onClick={editingId ? handleUpdateProject : handleAddProject}
                    >
                        {editingId ? "保存修改" : "提交"}
                    </button>

                    <button style={addButtonStyle} onClick={() => setShowForm(false)}>
                        取消
                    </button>
                </div>
            )}

            <div style={searchBoxStyle}>
                <input
                    style={inputStyle}
                    type="text"
                    placeholder="输入案件名 / 所需技能 / 地点 / 状态查询"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
            </div>

            < table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>编号</th>
                        <th style={thStyle}>案件名</th>
                        <th style={thStyle}>要求技能</th>
                        <th style={thStyle}>地点</th>
                        <th style={thStyle}>状态</th>
                        <th style={thStyle}>说明</th>
                        <th style={thStyle}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map((project) => (
                        <tr key={project.id}>
                            <td style={tdStyle}>{project.id}</td>
                            <td style={tdStyle}>{project.project_name}</td>
                            <td style={tdStyle}>{project.required_skill}</td>
                            <td style={tdStyle}>{project.location}</td>
                            <td style={tdStyle}>{project.status}</td>
                            <td style={tdStyle}>{project.description}</td>
                            <td style={tdStyle}>
                                {deleteMode && (
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        删除
                                    </button>
                                )}

                                {editMode && (
                                    <button
                                        style={deleteButtonStyle}
                                        onClick={() => handleEditClick(project)}
                                    >
                                        修改
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

export default ProjectsPage;