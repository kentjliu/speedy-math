'use client';
import {useState} from 'react';
import Game from '../../components/Game';
import LandingPage from '../../components/LandingPage';
import Scoreboard from "../../components/ScoreBoard";

const Home = () => {
    const [gameSettings, setGameSettings] = useState(null);
    const [view, setView] = useState('landing');
    const [scores, setScores] = useState([]);


    const handleStartGame = (operations, time) => {
        setGameSettings({ operations, time });
        setView('game');
    };

    const handleGoHome = () => {
        setGameSettings(null);
        setView('landing');
    };

    const handleGameFinish = (finalScore) => {
        // Add the final score to the scores array
        setScores((prevScores) => [...prevScores, finalScore]);
        handleGoHome(); // Navigate back to the landing page
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {view === 'game' && (
                <Game gameSettings={gameSettings} onGoHome={handleGameFinish} suppressHydrationWarning={true}/>
            )}
            {view === 'landing' && (
                <div>
                    <LandingPage onStartGame={handleStartGame} />
                    {/* Render the Scoreboard component with the scores */}
                    <Scoreboard scores={scores} />
                </div>
            )}
        </main>
    );
};

export default Home;
