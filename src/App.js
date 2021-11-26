
import './App.css';
import './components/mainStyles.scss';
import { useState, useEffect } from "react";
import Form from './components/Form.component';

function App() {
  const [data1, setData1] = useState({
    assessment_name:'',
    additional_info:'',
    target_MRL:'',
    level_switiching:false,
    date_target:'',
    deskbook:'',
    locationM:''
  });
  const [dataArray,setDataArray] = useState({team_members:[], choose_threads:[]});


  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    // getLocalTodos();
},[])

useEffect(()=> {
    // saveLocalTodos();
    // filterHandler();
}, [todos, status]);

const {deskbook} = data1;
  return (
    <div className="containerll">
      <Form 
        dataM={data1}
        setDataFunction={setData1}
        dataArray={dataArray}
        setDataArrayFunction={setDataArray}

        />
    </div>
  );
}

export default App;
