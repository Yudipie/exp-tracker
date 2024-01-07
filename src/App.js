import { useState,useEffect } from "react";
import Header from "./components/header";
import Expense from "./components/expense";
import Total from "./components/total";
import Addexp from "./components/addexp";
import Budget from "./components/budget";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Barchart from "./components/barchart";
import Piechart from "./components/piechart";

function App() {

  let total=0 , dt = 0 , wt = 0 , mt = 0 , ot = 0;

  const adding = (value) => {
    //alert("added");
    const newexp = {...value}
    setExp([...exp,newexp])
  }

  const mbd = (value) => {
    //alert("budget " + value);
    setBud(value);
  }

  const [exp,setExp] = useState([  ]);
  const [bud,setBud] = useState(0);
  const [userdata, setUserdata] = useState({
    labels: ['daily', 'weekly', 'monthly', 'one time'],
    datasets: [
      {
        label: 'amount',
        data: [0, 0, 0, 0], // Initialize with zeros for each type
      },
    ],
  });

  const pdfref = useRef();

  const downloadPdf = () => {
    const input =  pdfref.current;
    html2canvas(input).then((canvas) =>{
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p','mm','a4',true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth/imgWidth , pdfHeight/imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio)/2;
      const imgY = 30;
      pdf.addImage(imgData , 'PNG' , imgX , imgY , imgWidth * ratio , imgHeight * ratio);
      pdf.save('expense.pdf');
    })
  }

  const dailyExpenses = exp.filter((value) => value.type === 'daily')
  const weeklyExpenses = exp.filter((value) => value.type === 'weekly')
  const monthlyExpenses = exp.filter((value) => value.type === 'monthly')
  const singleExpenses = exp.filter((value) => value.type === 'one-time')

  dailyExpenses.map((value) => {
      var start1 = new Date(value.startdate);
      var end1 = new Date(value.enddate);
      var timeDifference = end1 - start1;
      let daysDifference = timeDifference / (1000 * 60 * 60 * 24);
      total += ((value.amount)*daysDifference);
      dt += ((value.amount)*daysDifference);
  });

  weeklyExpenses.map((value) => {
      var start1 = new Date(value.startdate);
      var end1 = new Date(value.enddate);
      var timeDifference = end1 - start1;
      let weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));
      total += ((value.amount)*weeksDifference)
      wt += ((value.amount)*weeksDifference)
  });
  
  monthlyExpenses.map((value) => {
      var start1 = new Date(value.startdate);
      var end1 = new Date(value.enddate);
      var timeDifference = end1 - start1;
      let monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
      total += ((value.amount)*monthsDifference)
      mt += ((value.amount)*monthsDifference)
  });

  singleExpenses.map((value) => {
      total += (value.amount)
      ot += (value.amount)
  });

  const updateChartData = () => {
    setUserdata({
      labels: ['daily', 'weekly', 'monthly', 'one time'],
      datasets: [
        {
          label: 'amount',
          data: [dt, wt, mt, ot], // Update with the latest values
        },
      ],
    });
  };

  useEffect(() => {
    updateChartData(); // Update chart data when dt, wt, mt, or ot changes
  }, [dt, wt, mt, ot]);
  
  
  useEffect(() => {
    if (total > bud) {
      alert("Expense exceeds budget");
    }
  }, [total, bud]);

  return (
    <>
    <div className="container" ref={pdfref}>
      <Header />
      <Budget mbd={mbd}/>
      <Addexp onAdd = {adding}/>
      <Expense exp = {exp} />
      <Total total={total} />
      <div className={`div-div div-bud ${total > bud ? 'exceeds-budget' : ''}`}> budget = {bud}</div>
      <div className="graphs">
      <Barchart chartData={userdata} />
      <Piechart chartData={userdata} />
      </div>
    </div>
    <div className="pdf-div"><button className="pdf-btn" onClick={downloadPdf}>Download Pdf</button></div>
    </>
  );
}

export default App;
