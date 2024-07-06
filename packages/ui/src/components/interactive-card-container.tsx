"use client";;
import { useEffect, useState } from "react";
import { default as Card, type CardData } from "./interactive-card";

interface InteractiveCardContainerProps {
    cardData: CardData[];
    cols?: 3 | 4;
}

const InteractiveCardContainer = ({ cardData, cols }: InteractiveCardContainerProps) => {
    const [activeCard, setActiveCard] = useState<number>(-1);
    const [containerVariables, setContainerVariables] = useState<object>({});

    useEffect(() => {
        const defaultContainerVariables = {
            "--card-cols": cols ?? 3,
            "--card-col-translate-x": cols === 4 ? "50px" : "100px",
            "--card-sm-rotate-x": cols === 4 ? "2.5deg" : "5deg"
        };
        setContainerVariables(defaultContainerVariables);
    }, []);

    return (
        <section className={`card__container card-cols-${cols ?? 3} ${activeCard > 0 ? 'active':''}`} style={containerVariables}>
            {cardData.map((card) => {
                return <Card key={card.id} cardData={card} activeCard={activeCard} setActiveCard={setActiveCard} />
            })}
        </section>
    )
}

export default InteractiveCardContainer;