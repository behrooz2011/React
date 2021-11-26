import React, { useState,useEffect }  from "react";

const Form = ({dataArray, setDataArrayFunction,   dataM, setDataFunction}) =>{
    //char counter
    const [counter,setCounter]= useState(0);
    const [counter2,setCounter2]= useState(0);


    //Team Members:
    const [teamMem, setTeamMem] =useState({member_name:"", member_role:"", member_email:""});
    useEffect(()=>{
        console.log("useEffect of teamMem triggered...");
        console.log("teamMem: ",teamMem);
        console.log("teamMem length: ",Object.keys(teamMem).length);
        const d = Object.values(teamMem);
        if(d.every(x=> x!='')){
            console.log("TeamMem has 3 elements now, teamMem: ",teamMem)
        }
    },[teamMem]);

    const teamMemHandler = (e) =>{
        console.log("teamMemHandler activated...");
        setTeamMem({...teamMem, [e.target.name]:e.target.value})
    }

    //To add list items to the Team members trio
    const [listItemCreator,addToListItemCreator] = useState([]);
    useEffect(()=>{
        console.log("useEffect triggered from listItemCreator changes");
        console.log("listItemCreator: ",listItemCreator);
        console.log("teamMem so far after clicking on the button:",teamMem);

    },[listItemCreator])
    //Add Button Function:
    const clickOnAddButton =()=>{
        console.log("Add button triggered");
        //adding to an array created in advance
        addToListItemCreator([...listItemCreator])
    }



    //Assessment Name:
    const inputHandlerAssessment = function(e) {
        setDataFunction({...dataM, "assessment_name":e.target.value });
        console.log("typed value: ",e.target.value);
        setCounter(e.target.value.length);
        // console.log("dataArray: ",dataArray)
    };
    useEffect(()=>{
        console.log("useEffect for assessment triggered...");
        console.log("DataM",dataM);
        
    },[dataM.assessment_name]);

    //Additional Information:
    const inputHandlerAdditional = function(e) {
        setDataFunction({...dataM, "additional_info":e.target.value });
        console.log("typed value: ",e.target.value);
        setCounter2(e.target.value.length);
    };
    useEffect(()=>{
        console.log("useEffect for additional_info triggered...");
        console.log("DataM",dataM)
    },[dataM.additional_info]);

    //Location:
    const inputHandlerLocation = function(e) {
        setDataFunction({...dataM, "locationM":e.target.value });
        console.log("typed value: ",e.target.value);
    };
    useEffect(()=>{
        console.log("useEffect for Location triggered...");
        console.log("DataM",dataM)
    },[dataM.locationM]);

    //Target MRL:
    const inputHandlerTarget = function(e) {
        setDataFunction({...dataM, "target_MRL":e.target.value });
        console.log("typed value: ",e.target.value);
    };
    useEffect(()=>{
        console.log("useEffect for Target_MRL triggered...");
        console.log("DataM",dataM)
    },[dataM.target_MRL]);

    //Level Switching:
    const inputHandlerLevel = function(e) {
        setDataFunction({...dataM, "level_switching":e.target.value });
        console.log("typed value: ",e.target.value);
    };
    useEffect(()=>{
        console.log("useEffect for level_switching triggered...");
        console.log("DataM",dataM)
    },[dataM.level_switching]);

    //Data Target:
    const inputHandlerDate = function(e) {
        setDataFunction({...dataM, "date_target":e.target.value });
        console.log("typed value: ",e.target.value);
    };
    useEffect(()=>{
        console.log("useEffect for date_target triggered...");
        console.log("DataM",dataM)
    },[dataM.date_target]); 
    
    //Deskbook:
    const inputHandlerDeskbook = function(e) {
        setDataFunction({...dataM, "deskbook":e.target.value });
        console.log("typed value: ",e.target.value);
    };
    useEffect(()=>{
        console.log("useEffect for deskbook triggered...");
        console.log("DataM",dataM)
    },[dataM.deskbook]);

    //Choose Threads
    const [chooseThreads,setChooseThreads] = useState([]);
    useEffect(()=>{
        console.log("useEffect for choose_threads triggered,here's chooseThreads: ",chooseThreads); 

    },[chooseThreads])
    const addChooseThread = (e) =>{
        console.log("addChooseThread function activated...");
        console.log("value after checking off: ",e.target.value);
        if(!chooseThreads.includes(e.target.value)){
            console.log("value doesn't exist in the chooseThreads...");
            setChooseThreads([...chooseThreads,e.target.value]);
        }else{
            console.log("e.target value already exits in the array so,delete it from the array");
            setChooseThreads(chooseThreads.filter(item => item !== e.target.value));

        }
    }
    // const [listItemCreator,setFinalTeamMem]=useState("");

    //On Submit Button: 
    // const func =()=>{
    //     console.log("hi guyes!, this is funk!!")
    // }
    useEffect(()=>{
        console.log("useEffect from submitHander: last step");
        const team_membersss={team_members: listItemCreator};
        const threads = {chosen_threads: chooseThreads};
        //let's merge all the states and make one BIG object to send to back-end
        const finalObject = {...team_membersss, ...dataM, ...threads};
        console.log("finalObject: \t",finalObject);

        //fetching:
        fetch('http://localhost:5001/api/users/register', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(finalObject)
            })
            .then((response) => response.json())
            .then((result) => {
            console.log("fetch worked!",result)
            }).catch(err=>console.log("ERROR dude!",err));
            // //empty the residue
            // if(listItemCreator.length >1){
            //     addToListItemCreator([]);
            // }
            

    },[listItemCreator])
    const SubmitHandler = (e) =>{
        e.preventDefault();
        console.log("submit button clicked...");
        console.log("teamMem: ",teamMem);
        addToListItemCreator([...listItemCreator,teamMem]);

    }


    return(
        <div className="container"> 
            <h1 className="hh">Start new assessment</h1>
            <p className="para1">Please fill in the required fields denoted by the * (astrisk)</p>
                <form onSubmit={SubmitHandler}>
                    <div className="div1">
                    <label className="label1"for="team">Assessment Name*</label><br/><br/>
                    <input value={dataM.assessment_name} onChange={inputHandlerAssessment} id ="team1" type="text" maxlength="50" placeholder="Assessment Name" name='assessment_name' required/><br/>
                    <span className="counter" > {counter}/50</span>
                    </div>
                    <h2 className="hh2">Team Members</h2>
                    <div className="teamMembers">
                        <ul >
                            {<li style={{display:"flex"}}>
                                <input type="text" onChange={teamMemHandler} name="member_name" placeholder="member name"/><br/>
                                <input type="text" onChange={teamMemHandler} name="member_email" placeholder="member Email"/><br/>
                                <input type="text" onChange={teamMemHandler} name="member_role" placeholder="member role"/><br/>
                                <button className="todo-button" type="submit" onClick={clickOnAddButton}>
                                    <span>&#43;</span>
                                </button>
                            </li>}
                            {listItemCreator.map((x,index)=>(
                                <li style={{display:"flex"}} key={index}> 
                                <input type="text" onChange={teamMemHandler} name="member_name" placeholder="member name"/><br/>
                                <input type="text" onChange={teamMemHandler} name="member_email" placeholder="member Email"/><br/>
                                <input type="text" onChange={teamMemHandler} name="member_role" placeholder="member role"/><br/>                                   
                                </li>
                            ))}
                        </ul> 
                    {/* <input type="text" onChange={teamMemHandler} name="member_name" placeholder="member name"/><br/>
                    <input type="text" onChange={teamMemHandler} name="member_email" placeholder="member Email"/><br/>
                    <input type="text" onChange={teamMemHandler} name="member_role" placeholder="member role"/><br/> */}
                    </div>

                    <div className="middle">
                    <div className="left">
                        <label id="sharp1"for="additional">Additional Information:</label><br/><br/>
                        <textarea id="additional" onChange={inputHandlerAdditional} name="additional" placeholder="Enter text here..." maxlength="200"rows="4" cols="80" value={dataM.additional_info} />
                        <span className="counter2" > {counter2}/200</span>
                        <label id="sharp2" for="location">Location:</label><br/><br/>
                        <input id ="sharp3" onChange={inputHandlerLocation} type="text" placeholder="Enter Location..."/><br/>
                    </div>
                    <div className="right">
                        <div className="selects">
                        <label for="mrl" required>Target MRL*</label>
                        <select onChange={inputHandlerTarget} id="mrl" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        </select>

                        <label for="level">Level Switching</label>
                        <select onChange={inputHandlerLevel} id="level" name="cars">
                        <option value="false">off</option>
                        <option value="true">on</option>
                        </select>
                        </div>
                        <div className='calendar'>
                            <label for="birthday">Birthday:</label>
                            <input onChange={inputHandlerDate} type="date" id="birthday" name="birthday"/>
                        </div>
                        <div className="version">
                            <label for="desktop">Desktop Version</label>
                            <select onChange={inputHandlerDeskbook} id="desktop" name="cars">
                            <option value="2020">2020</option>
                            <option value="2018">2018</option>
                            <option value="2016">2016</option>
                            </select>
                        </div>

                    </div>
                    </div>
                    
                    <div id="thread">
                    <br />
                    <h3>Choose Threads</h3>
                    <h4>Unselecting a thread will remove it from the MRA. Typically all threads are selected.</h4>

                    <div className="threadMain">
                        <div className="ff">
                            <input className="cloud1" onChange={addChooseThread} type="checkbox" id="vehicle1" name="vehicle1" value="Technology Maturity" />
                            <label className ="water1" for="vehicle1"> Technology Maturity</label><br/>
                            <input className="cloud2" onChange={addChooseThread} type="checkbox" id="vehicle2" name="vehicle2" value="A.Technology and Industrial Base" />
                            <label className ="water2" for="vehicle2"> A. Technology and Industrial Base</label><br/>
                            <input className="cloud3" onChange={addChooseThread} type="checkbox" id="vehicle3" name="vehicle3" value="B. Design" />
                            <label className ="water3" for="vehicle3"> B. Design</label><br/>
                            <input className="cloud4"  onChange={addChooseThread} type="checkbox" id="vehicle4" name="vehicle4" value="C. Cost and Funding" />
                            <label className ="water4" for="vehicle4"> C. Cost and Funding</label><br/>
                            <input className="cloud5" onChange={addChooseThread} type="checkbox" id="vehicle5" name="vehicle5" value="D. Materials" />
                            <label className ="water5" for="vehicle5"> D. Materials</label><br/>
                        </div>

                        <div className="rr">
                            <input className="garden1" onChange={addChooseThread} type="checkbox" id="vehicle6" name="vehicle6" value="E. Process Capability and Control" />
                            <label className="cat1"for="vehicle6"> E. Process Capability and Control</label><br/>
                            <input className="garden2" onChange={addChooseThread}type="checkbox" id="vehicle7" name="vehicle7" value="F. Quality Management " />
                            <label className="cat2" for="vehicle7"> F. Quality Management </label><br/>
                            <input  className="garden3" onChange={addChooseThread}type="checkbox" id="vehicle8" name="vehicle8" value="G. Mfg Personnel" />
                            <label className="cat3"for="vehicle8"> G. Mfg Personnel</label><br/>
                            <input className="garden4" onChange={addChooseThread}type="checkbox" id="vehicle9" name="vehicle9" value="H. Facilities" />
                            <label className="cat4" for="vehicle9"> H. Facilities</label><br/>
                            <input className="garden5"  onChange={addChooseThread}type="checkbox" id="vehicle10" name="vehicle10" value="I. Mfg Management" />
                            <label className="cat5"for="vehicle10">I. Mfg Management</label><br/>
                        </div>
                    </div>


                    </div>
                    <div className="but">
                    <input type="submit" value="Submit now"/><br/>
                    </div>
                </form>
        </div>
        
    )
}

export default Form;