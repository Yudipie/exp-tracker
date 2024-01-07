import { useState } from "react";

const Budget = ({ mbd }) => {
    const [bud,setBud] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        mbd(bud)
        setBud('');
    }

    return(
        <form className="form-div" onSubmit={onSubmit}>
            <input className="form-input" type="numeric" placeholder="monthly budget" value={bud} onChange={(e) => setBud(parseFloat(e.target.value))}/>
            <input type="submit" value="Submit" className="submit-bud submit-exp"/>
        </form>
    )
}

export default Budget;