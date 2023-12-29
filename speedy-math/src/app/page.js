'use client';
import { useState } from 'react';
import Game from '../../components/Game';
import LandingPage from '../../components/LandingPage';

const Home = () => {
    const [gameSettings, setGameSettings] = useState(null);

    const handleStartGame = (operations, time) => {
        setGameSettings({ operations, time });
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {gameSettings ? (
                <Game gameSettings={gameSettings} suppressHydrationWarning={true}/>
            ) : (
                <LandingPage onStartGame={handleStartGame} />
            )}
        </main>
    );
};

export default Home;
