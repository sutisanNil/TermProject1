import React, { useState } from 'react';
function NameList(){
    const names = ["Boof", "Baaf", "Jido", "Kaku"];
    // var listOfNames = ""
    const [listOfNames,setListofNames] = useState("")
    var currentName = ""
    const optionList = [
        (<option>John</option>),
        (<option>Jack</option>),
        (<option>Jennie</option>),

    ];
    const optionLIst2 = names.map((e) => {
        return <option>{e}</option>;
    });

    const addName = () => {
        alert("Hello"+currentName)
        setListofNames(listOfNames+" "+ currentName)
    }

    const handleNameChange = (e) => {
        console.log(e.target.value)
        currentName = e.target.value
    }
    return (
    // <p>Hello from NameList Component!!!</p>
        <>
            <select>{optionLIst2}</select>
            <input type="text" onChange={handleNameChange}/>

            <button onClick={addName}>Add</button>
            <p>{listOfNames}</p>
        </>
    );
}

export default NameList;