import Daily from "./daily";
import Monthly from "./monthly";
import Weekly from "./weekly";
import Onetime from "./one-time";

const Expense = ({ exp }) => {
    const dailyExpenses = exp.filter((value) => value.type === 'daily')
    const weeklyExpenses = exp.filter((value) => value.type === 'weekly')
    const monthlyExpenses = exp.filter((value) => value.type === 'monthly')
    const singleExpenses = exp.filter((value) => value.type === 'one-time')


    return (
        <div className="exp-div">
            <ul className="div-div">Daily
            {   dailyExpenses.map((value) => (
                    <Daily exp={value} />
                ))   
            }</ul>
            <ul className="div-div">Weekly
            {
                weeklyExpenses.map((value) => (
                    <Weekly exp={value} />
                ))
            }</ul>
            <ul className="div-div">Monthly
            {
               monthlyExpenses.map((value) => (
                    <Monthly exp={value} />
                ))
            }</ul>

            <ul className="div-div">One time
            {
               singleExpenses.map((value) => (
                    <Onetime exp={value} />
                ))
            }
               </ul>
        </div>
    )
}

export default Expense;