'use client';
import {useState} from 'react';
import Game from '../../components/Game';
import LandingPage from '../../components/LandingPage';

const Home = () => {
    const [gameSettings, setGameSettings] = useState(null);
    const [view, setView] = useState('landing');

    const handleStartGame = (operations, time) => {
        setGameSettings({ operations, time });
        setView('game');
    };

    const handleGoHome = () => {
        setGameSettings(null);
        setView('landing');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {view === 'game' && (
                <Game gameSettings={gameSettings} onGoHome={handleGoHome} suppressHydrationWarning={true}/>
            )}
            {view === 'landing' && <LandingPage onStartGame={handleStartGame} />}
        </main>
    );
};

export default Home;
