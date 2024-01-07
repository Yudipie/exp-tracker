import { useState } from "react"

const Addexp = ({ onAdd }) => {

    const [type,setType] = useState('')
    const [amount,setAmount] = useState('')
    const [startdate,setStartdate] = useState('');
    const [enddate,setEnddate] = useState('');
    
     const onSubmit = (e) => {
        e.preventDefault()

        if(!type)
        {
            alert("please add type");
            return;
        }

        onAdd({ type,amount,startdate,enddate })

        setType('')
        setAmount('')
        setStartdate('')
        setEnddate('')
     }


    return(
        <form onSubmit={onSubmit}>
            <div className="form-div" >
                <label className="form-label">Expense Type</label>
                {/* <input type="text" placeholder="daily/weekly/monthly/one-time" value={type}  onChange={(e) => setType(e.target.value)}/> */}
                <div className="radio-type">
  <div><input
    className="choice-div"
    type="radio"
    id="daily"
    name="type"
    value="daily"
    checked={type === "daily"}
    onChange={() => setType("daily")}
  />
  <label htmlFor="daily" className="radio-label">Daily</label></div>

  <div><input
    className="choice-div"
    type="radio"
    id="weekly"
    name="type"
    value="weekly"
    checked={type === "weekly"}
    onChange={() => setType("weekly")}
  />
  <label htmlFor="weekly" className="radio-label">Weekly</label></div>

  <div><input
    className="choice-div"
    type="radio"
    id="monthly"
    name="type"
    value="monthly"
    checked={type === "monthly"}
    onChange={() => setType("monthly")}
  />
  <label htmlFor="monthly" className="radio-label">Monthly</label></div>

  <div><input
    className="choice-div"
    type="radio"
    id="one-time"
    name="type"
    value="one-time"
    checked={type === "one-time"}
    onChange={() => setType("one-time")}
  />
  <label htmlFor="one-time" className="radio-label">One-time</label></div>
</div>

            </div>

            <div className="form-div">
                <label className="form-label">Expense Amount</label>
                <input className="form-input" type="number" placeholder="enter amount" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}/>
            </div>
            
            <div className="form-div">
                <label className="form-label">Start date</label>
                <input className="form-input" type="date" value={startdate} onChange={(e) => setStartdate(e.target.value)}/>
            </div>
            
            <div className="form-div">
                <label className="form-label">End Date</label>
                <input className="form-input" type="date" value={enddate} onChange={(e) => setEnddate(e.target.value)}/>
            </div>

            <input type="submit" value="Add expense" className="submit-exp"/>
        </form>
    )
}

export default Addexp;