"use client";;
import { useEffect, useState } from "react";
import { default as Card, type CardData } from "./interactive-card";

interface InteractiveCardContainerProps {
    cardData: CardData[];
}

const InteractiveCardContainer = ({ cardData }: InteractiveCardContainerProps) => {
    const [activeCard, setActiveCard] = useState<number>(-1);

    useEffect(() => {
        console.log('activeCard changed', activeCard);
    }, [activeCard]);
    console.log( 'rerendering');
    return (
        <div className="card__container">
            {cardData.map((card) => {
                return <Card key={card.id} cardData={card} activeCard={activeCard} setActiveCard={setActiveCard} />
            })}
        </div>
    )
}

export default InteractiveCardContainer;