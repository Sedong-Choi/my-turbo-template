interface NightProps {
    theme: string |undefined;
}
const Night = ({ theme }: NightProps) => {
    return (
        <>
            <div className="moon"></div>
        </>
    )
}

export default Night;
