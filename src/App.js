import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GradeCalculationTable from "./GradeCalculationTable";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook'

function App() {
  const yearRef = useRef();
  const semesterRef = useRef();
  const subjectGroupRef = useRef();
  const subjectRef = useRef();
  const gradeRef = useRef();

  // const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyYearList = [
    { year: 2019 },
    { year: 2020 },
    { year: 2021 }
  ];

   const jsonData = require('./cs-2019.json');
    // console.log(jsonData.curriculum.subjects[0].subjects[0])
  
    var curriculum = jsonData.curriculum;
    const subjectGroup = [];
    const subject = [];
    for(var a=0;a<curriculum.subjects.length;a++){
      subjectGroup.push(curriculum.subjects[a]);
      console.log("vv",subjectGroup)
      for(var b=0;b<curriculum.subjects[a].subjects.length;b++){
        subject.push(curriculum.subjects[a].subjects[b]);
        console.log("vvv",subject)
      }
    }; 

  const dummySemesterList = [
    { semester: 1 },
    { semester: 2 },
    { semester: 3 }
  ];

  const dummyGradeList = [
    { grade: "A", value: 4 },
    { grade: "A-", value: 3.75 },
    { grade: "B+", value: 3.25 },
    { grade: "B", value: 3 },
    { grade: "B-", value: 2.75 },
    { grade: "C+", value: 2.25},
    { grade: "C", value: 2 },
    { grade: "C-", value: 1.75 },
    { grade: "D", value: 1 },
    { grade: "F", value: 0 },
    { grade: "W", value: "-" },
    { grade: "I", value: "-" },
    { grade: "S", value: "-" },
    { grade: "U", value: "-" },
    { grade: "R", value: "-" },
    { grade: "TR", value: "-" }
  ];

  const addItem = () => {
    if (yearRef.current.value == "Choose the year...") {
      alert("Please make sure to choose everything before adding...");
      return;
    }
    else if (semesterRef.current.value == "Choose the semester...") {
      alert("Please make sure to choose everything before adding...");
      return;
    }
    else if (subjectGroupRef.current.value == "Choose the subject group...") {
      alert("Please make sure to choose everything before adding...");
      return;
    }
    else if (subjectRef.current.value == "Choose the subject...") {
      alert("Please make sure to choose everything before adding...");
      return;
    }
    else if (gradeRef.current.value == "Choose the grade...") {
      alert("Please make sure to choose everything before adding...");
      return;
    }

    var itemObj = {
      year: yearRef.current.value,
      semester: semesterRef.current.value,
      groupName: subjectGroupRef.current.value,
      subject: subjectRef.current.value,
      grade: gradeRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);   
  };

  const option1 = dummyYearList.map((v) => {
    return <option key={v.year}>{v.year}</option>;
  });

  const option2 = dummySemesterList.map((v) => {
    return <option key={v.semester}>{v.semester}</option>;
  });

  const option3 = subjectGroup.map((v) => {
    return <option key={v.groupName}>{v.groupName}</option>;
  });

  const option4 = subject.map((v) => {
    return <option key={v.code}>{v.code} - {v.name}</option>;
  });

  const option5 = dummyGradeList.map((v) => {
    return <option key={v.grade}>{v.grade}</option>;
  });

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "pink" }}>
          <Form>
            <Form.Label>SEMESTER</Form.Label>
            <Form.Group className="input-group mb-1" controlId="formYear">
              <label className="input-group-text">Year</label>
              <Form.Select
                aria-label="Default select example"
                ref={yearRef}
              >
                <option defaultValue>Choose the year...</option>
                {option1}
              </Form.Select>
            </Form.Group>
            <Form.Group className="input-group mb-3" controlId="formSemester">
              <label className="input-group-text">Semester</label>
              <Form.Select
                aria-label="Default select example"
                ref={semesterRef}
              >
                <option defaultValue>Choose the semester...</option>
                {option2}
              </Form.Select>
            </Form.Group>
            
            <Form.Label>SUBJECT</Form.Label>
            <Form.Group className="input-group mb-1" controlId="formSubjectGroup">
              <label className="input-group-text">Group name</label>
              <Form.Select
                aria-label="Default select example"
                ref={subjectGroupRef}
              >
                <option defaultValue>Choose the subject group...</option>
                {option3}
              </Form.Select>
            </Form.Group>
            <Form.Group className="input-group mb-3" controlId="formSemester">
              <label className="input-group-text">Subject</label>
              <Form.Select
                aria-label="Default select example"
                ref={subjectRef}
              >
                <option defaultValue>Choose the subject...</option>
                {option4}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGrade">
              <Form.Label>GRADE</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={gradeRef}
              >
                <option defaultValue>Choose the grade...</option>
                {option5}
              </Form.Select>
            </Form.Group>

            <Button variant="dark" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <GradeCalculationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
