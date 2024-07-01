"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGame } from "@/app/server-actions/fetchGame";
import { updateGame } from "@/app/server-actions/updateGame";
import {
    initializeGame,
    selectBowler,
    bowlBall,
} from "@/lib/features/cricketGame/gameSlice";
import { generateRandomNumber } from "@/utils/generateRandomNumber";

const scoreTypes = [0, 1, 2, 3, 4, 6, -1];

const CricketGame = ({ params }) => {
    const { id } = params;
    const dispatch = useDispatch();

    const [currentScore, setCurrentScore] = useState("");

    const gameState = useSelector((state) => state.game);
    const currentInning = gameState.currentInning;
    const inningData = gameState[currentInning];

    const handleSelectBowler = (e) => {
        dispatch(selectBowler(e.target.value));
        setCurrentScore("Bowler selected");
    };

    const handlePlay = () => {
        const random = generateRandomNumber(7);
        const score = scoreTypes[random];

        setCurrentScore(score);
        dispatch(bowlBall({ score }));
    };

    useEffect(() => {
        const fetchMatchData = async () => {
            const data = await fetchGame(id);
            dispatch(initializeGame(data));
        };

        fetchMatchData();
    }, [id]);

    useEffect(() => {
        if (typeof gameState.firstInning.strikeBatsman === "object") {
            updateGame({ id, gameState });
        }
    }, [currentScore]);

    if (gameState.firstInning.isCompleted && gameState.secondInning.isCompleted) {
        return (
            <div>
                <p>Game Completed</p>
                <p>Winner : {gameState.winner}</p>
            </div>
        );
    }

    return <>
        <div>
            <h1>{ } VS { }</h1>
            <h3>{ }</h3>
        </div>
    </>
};

export default CricketGame;
