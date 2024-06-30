import Snow from "./snow"

interface NightProps {
    theme: string |undefined;
}
const Night = ({ theme }: NightProps) => {
    return (
        <>
            {
                theme === "dark" && (
                    <Snow maxParticle={500} animationSpeed={30}/>
                )
            }
            <div className="moon"></div>
        </>
    )
}

export default Night;
