import { useState } from "react"

function FeatureList() {
  return (
    <div>
      <h2>Main Features</h2>
      <ul>
        <li>Engineer </li>
        <li>Project </li>
        <li>Matching </li>
      </ul>
    </div>
  );
}

function App() {
  const name = "LIU"
  const [showText, setShouText] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () =>{
    alert("点我干鸡毛！😒")
  }
  return (
    <div style={{textAlign:"center",marginTop:"50px"}}>
      <h1>我的第一个 React 项目</h1>
      <h1>Hello,{name}</h1>
      <h1>点击次数：{count}</h1>
      <button 
      onClick={()=> setCount(count+1)}
      style={{
        fontSize:"16px",
        padding:"10px 20px",
        marginTop:"55px",
        marginBottom:"55px",
        marginRight:"20px",
        borderRadius:"20px",
        cursor:"pointer"
      }}>点我一下试试</button>

      <button
      onClick={() => setCount(0)}
      style={{
        fontSize:"16px",
        padding:"10px 20px",
        marginTop:"55px",
        marginBottom:"55px",
        marginLeft:"20px",
        borderRadius:"20px",
        cursor:"pointer"
      }}>次数清零</button>

      <button
      onClick={()=> setShouText(!showText)}
      style={{
          fontSize: "24px",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "10px"
        }}>显示/隐藏文字</button>

        {showText && <p>这段文字出来了！</p>}
      <p>React learning starts here.</p>
      <FeatureList />
    </div>
  );
}

export default App;