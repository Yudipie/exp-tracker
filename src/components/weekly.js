const Weekly = ({ exp }) => {
    // const start1 = new Date(exp.startdate)
    // const end1 = new Date(exp.enddate)

    // const timeDifference = end1 - start1;
    // const weeksDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    return(
        <li>
            <p>{exp.amount} ({exp.startdate} to {exp.enddate})</p>
        </li>
    )
}

export default Weekly;