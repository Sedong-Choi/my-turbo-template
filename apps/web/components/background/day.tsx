interface DayProps {
    theme: string|undefined;
}
const Day = ({ theme }: DayProps) => {
    return (
        <>
            <div className="sun"></div>
            <div className="mountain"></div>
        </>
    )
}

export default Day;
