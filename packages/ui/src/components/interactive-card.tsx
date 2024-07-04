"use client";

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import '../style/interactive-card.css';
import { card } from "@nextui-org/react";
import { isCompositeComponent } from "react-dom/test-utils";
export type CardData = {
    id: number;
    image: string;
    title?: string;
    description?: string;
    width?: number;
    height?: number;
    href?: string;
    tags?: string;
}
interface InteractiveCardProps {
    // TODO 카드의 data를 가지고 rendering
    cardData: CardData;
    activeCard: number;
    setActiveCard: (activeCard: number) => void;
}

const InteractiveCard = ({ cardData, activeCard, setActiveCard }: InteractiveCardProps) => {

    const cardRef = useRef<HTMLDivElement>(null);
    const translaterRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<boolean>(false);
    const isInterActingRef = useRef<boolean>(false);
    const defaultWrapperVariables = {
        "--pointer-x": "50%",
        "--pointer-y": "50%",
        "--pointer-from-center": "0",
        "--pointer-from-top": "0.5",
        "--pointer-from-left": "0.5",
        "--card-opacity": "0",
        "--rotate-x": "0deg",
        "--rotate-y": "0deg",
        "--background-x": "50%",
        "--background-y": "50%",
        "--card-scale": "1",
        "--translate-x": "0px",
        "--translate-y": "0px",
    };
    const [wrapperVariables, setWrapperVariables] = useState<object>(defaultWrapperVariables)
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isInterActing, setIsInterActing] = useState<boolean>(false);
    useEffect(() => {
        activeRef.current = isActive;
        isInterActingRef.current = isInterActing;

        if (!isInterActing) {
            setWrapperVariables({
                ...wrapperVariables,
                "--rotate-x": "0deg",
                "--rotate-y": "0deg",
            })
        }
    }, [isActive, isInterActing]);

    useEffect(() => {
        const currentCardRef = cardRef.current;
        const currentTranslaterRef = translaterRef.current;
        if (currentCardRef && currentTranslaterRef) {
            window.addEventListener('click', handleClickOuterCard);
        }
        return () => {
            if (currentCardRef && currentTranslaterRef) {
                window.removeEventListener('click', handleClickOuterCard);
            }
        }
    }, []);

    const handleMousemove = (e: MouseEvent) => {
        if (cardRef.current && (activeCard == -1 || activeCard == cardData.id)) {
            interActionPosition(e);
        }
    };
    const interActionPosition = (e?: MouseEvent) => {
        if (cardRef.current === null || translaterRef.current === null) return;
        // card 위에서 mouse pointer의 위치에 따른 card transform 설정
        const cardRect = cardRef.current.getBoundingClientRect();
        const cardTranslaterRect = translaterRef.current.getBoundingClientRect();

        const pointerX = e ? e.clientX - cardTranslaterRect.left : cardTranslaterRect.width / 2;
        const pointerY = e ? e.clientY - cardTranslaterRect.top : cardTranslaterRect.height / 2;
        // 0~ 1로 normalize
        const pointerFromCenter = Math.sqrt(((pointerX - cardTranslaterRect.width) / 2) ** 2 + ((pointerY - cardTranslaterRect.height) / 2) ** 2) / Math.sqrt((cardTranslaterRect.width / 2) ** 2 + (cardTranslaterRect.height / 2) ** 2);
        const pointerFromTop = pointerY / cardTranslaterRect.height;
        const pointerFromLeft = pointerX / cardTranslaterRect.width;

        const rotateX = - 25 * (pointerX - (cardTranslaterRect.width / 2)) / (cardTranslaterRect.width / 2);
        const rotateY = 25 * (pointerY - (cardTranslaterRect.height / 2)) / (cardTranslaterRect.height / 2);
        const cardScale = activeRef.current ? 1.3 : 1 + 0.1 * (1 - pointerFromCenter / Math.sqrt(cardTranslaterRect.width ** 2 + cardTranslaterRect.height ** 2));
        const translateX = activeRef.current ? -(cardRect.left - (window.innerWidth / 2) + (cardRect.width / 2)) : 0;
        const translateY = activeRef.current ? -(cardRect.top - (window.innerHeight / 2) + (cardRect.height / 2)) : 0;
        let newVariables: Object = {
            "--pointer-x": pointerX / cardRect.width * 100 + "%",
            "--pointer-y": pointerY / cardRect.height * 100 + "%",
            "--pointer-from-center": pointerFromCenter,
            "--pointer-from-top": pointerFromTop,
            "--pointer-from-left": pointerFromLeft,
            "--rotate-x": rotateX + "deg",
            "--rotate-y": rotateY + "deg",
            "--background-x": "var(--pointer-x)",
            "--background-y": "var(--pointer-y)",
            "--card-scale": cardScale,
            "--translate-x": translateX + "px",
            "--translate-y": translateY + "px",
        }
        setWrapperVariables(newVariables);
        setIsInterActing(true);
    };

    // 카드 클릭시 card active 변경
    const handleCardClick = (e: any) => {
        setIsActive(!activeRef.current);
        if (activeCard === cardData.id) {
            setActiveCard(-1);
        } else {
            setActiveCard(cardData.id);
        }
        if (!cardRef.current) return;

        if (!activeRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            const translateX = -(cardRect.left - (window.innerWidth / 2) + (cardRect.width / 2));
            const translateY = -(cardRect.top - (window.innerHeight / 2) + (cardRect.height / 2));
            setWrapperVariables({
                ...wrapperVariables,
                "--card-scale": "1.3",
                "--rotate-x": "360deg",
                "--translate-x": translateX + "px",
                "--translate-y": translateY + "px",
            });
        } else {
            setWrapperVariables(defaultWrapperVariables);
        }
    }


    // 바깥 클릭시 card active 변경
    const handleClickOuterCard = (e: Event) => {
        if (e.target === null) return;

        const target = e.target as HTMLElement;

        if (translaterRef.current && translaterRef.current.contains(e.target as Node)) return;

        if (activeRef.current) {
            setIsActive(false);
            setWrapperVariables(defaultWrapperVariables);
        }
        // 다른 카드 선택하지 않았을때 active카드 초기화
        if (
            target.className !== "card__rotator"
        ) {
            setActiveCard(-1);
        }
    }
    const handleMouseLeave = (e: Event) => {
        setIsInterActing(false);
        if (!activeRef.current) {
            setWrapperVariables(defaultWrapperVariables);
            setIsInterActing(false);
            // window.removeEventListener('mousemove', handleMousemove);
        }
    }

    return (
        <div
            className={`card ${isActive ? "card__active" : ""} ${isInterActing ? "card__interacting" : ""}`}
            ref={cardRef}
            style={
                wrapperVariables
            }
        >
            <div className="card__translater" ref={translaterRef}
            >
                <div
                    className="card__rotator"
                    onMouseMove={(e: any) => handleMousemove(e)}
                    onMouseLeave={(e: any) => handleMouseLeave(e)}
                    onClick={(e) => handleCardClick(e)}
                >
                    <img
                        className="card__back"
                        src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                        alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
                        loading="lazy"
                        width="660px"
                        height="921px"
                    />
                    <div
                        className="card__front"
                    >
                        <img
                            src="https://images.pokemontcg.io/swsh12pt5/160_hires.png"
                            alt="Front design of the Pikachu Pokemon Card, with the stats and info around the edge"
                            loading="lazy"
                            width="660px"
                            height="921px"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InteractiveCard;