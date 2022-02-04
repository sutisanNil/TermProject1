import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const styles = {
  textLeft: { textAlign: "left" },
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};

let line = [];

const state = {
  labels: ['Year1(2019)', 'Year2(2020)', 'Year3(2021)'],
  datasets: [
    {
      label: 'Grade',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'green',
      borderColor: 'blue',
      borderWidth: 2,
      data: line
    }
  ]
}

function GradeCalculationTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalGPAX, setTotalGPAX] = useState(0);
  const [totalGPA1, setTotalGPA1] = useState(0);
  const [totalGPA2, setTotalGPA2] = useState(0);
  const [totalGPA3, setTotalGPA3] = useState(0);
  
  const GradeList = [
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
  
  //for (let i=0; i<GradeList.length; i++) {
    //  console.log(GradeList[i])
   // }

  function findValue(grade) {
    for(var x of GradeList){
      console.log("vvvv",x.value)
      var getValue = x.value
      if (grade === x.grade) {
        return getValue;
      }
    }
  }

  useEffect(() => {
    data.sort((x,y) => {
      return x.semester-y.semester;
    });
    data.sort((x,y) => {
      return x.year-y.year;
    });
    let GPAX = 0;
    let GPA1 = 0;
    let GPA2 = 0;
    let GPA3 = 0;
    let sumValue1 = 0;
    let sumValue2 = 0;
    let sumValue3 = 0;
    let sumCredit1 = 0;
    let sumCredit2 = 0;
    let sumCredit3 = 0;
    let credit = 3;
    // console.log(sumValue)
    const z = data.map((v, i) => {
      if (v.year == "2019") {
        var value = findValue(v.grade);
        if (value == "-") {
        }
        else {
          let amount = value * 3;
          sumCredit1 += credit
          sumValue1 += amount;
          //console.log(sumValue1)
        }
        GPA1= sumValue1 / sumCredit1;

        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textCenter}>{v.year}</td>
            <td style={styles.textCenter}>{v.semester}</td>
            <td style={styles.textLeft}>{v.groupName}</td>
            <td style={styles.textLeft}>{v.subject}</td>
            <td style={styles.textCenter}>{v.grade}</td>
            <td style={styles.textCenter}>{value}</td>
          </tr>
        );
      }
      else if (v.year == "2020") {
        var value = findValue(v.grade);
        if (value == "-") {
        }
        else {
          let amount = value * 3;
          sumCredit2 += credit
          sumValue2 += amount;
          console.log(sumValue2)
        }
        GPA2= sumValue2 / sumCredit2;

        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textCenter}>{v.year}</td>
            <td style={styles.textCenter}>{v.semester}</td>
            <td style={styles.textLeft}>{v.groupName}</td>
            <td style={styles.textLeft}>{v.subject}</td>
            <td style={styles.textCenter}>{v.grade}</td>
            <td style={styles.textCenter}>{value}</td>
          </tr>
        );
      }
      if (v.year == "2021") {
        var value = findValue(v.grade);
        if (value == "-") {
        }
        else {
          let amount = value * 3;
          sumCredit3 += credit
          sumValue3 += amount;
          //console.log(sumValue3)
        }
        GPA3 = sumValue3 / sumCredit3;

        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textCenter}>{v.year}</td>
            <td style={styles.textCenter}>{v.semester}</td>
            <td style={styles.textLeft}>{v.groupName}</td>
            <td style={styles.textLeft}>{v.subject}</td>
            <td style={styles.textCenter}>{v.grade}</td>
            <td style={styles.textCenter}>{value}</td>
          </tr>
        );
      }
    });

    GPAX = sumValue1 + sumValue2 + sumValue3
    GPAX = GPAX / (sumCredit1 + sumCredit2 + sumCredit3);
    GPAX = GPAX.toFixed(2);
    GPA1 = GPA1.toFixed(2);
    line.push(GPA1);
    GPA2 = GPA2.toFixed(2);
    line.push(GPA2);
    GPA3 = GPA3.toFixed(2);
    line.push(GPA3);
    setDataRows(z);
    if (GPAX === "NaN"){
      GPAX = 0
    }
    else{
      GPAX = GPAX
    }
    setTotalGPA1(GPA1);
    setTotalGPA2(GPA2);
    setTotalGPA3(GPA3);
    setTotalGPAX(GPAX);
    //console.log(sumValue)
    // console.log("credit",sumCredit)
    // console.log("value",sumValue)
  }, [data]);

  // <td style={styles.textCenter}>{v.qty}</td>
  // <td>{v.item}</td>

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }

  // const numberWithCommas = (x) => {
    // return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  console.log(line)
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>Grade Table</h1>
          <h2>GPAX: {totalGPAX}</h2>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="danger">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>Year</th>
            <th>Semester</th>
            <th>Group Name</th>
            <th>Subject</th>
            <th>Grade</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={5}></th>
            <th style={styles.textCenter}>Total GPA Y1(2019)</th>
            <th style={styles.textRight}>{totalGPA1}</th>
          </tr>
          <tr>
            <th colSpan={5}></th>
            <th style={styles.textCenter}>Total GPA Y2(2020)</th>
            <th style={styles.textRight}>{totalGPA2}</th>
          </tr>
          <tr>
            <th colSpan={5}></th>
            <th style={styles.textCenter}>Total GPA Y3(2021)</th>
            <th style={styles.textRight}>{totalGPA3}</th>
          </tr>
        </tfoot>
      </Table>
      <div>
        <Line
          data = {state}
          options={{
            title:{
              display:true,
              text:'Average Grade per year',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </Container>
  );
}

export default GradeCalculationTable;
