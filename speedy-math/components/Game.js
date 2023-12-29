import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

const Game = ({gameSettings}) => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(gameSettings.time); // Reduced time for testing
    const [inputValue, setInputValue] = useState('');
    const [gameOver, setGameOver] = useState(false);

    const operations = gameSettings.operations;
    const generateProblem = () => {
        const allowedOperations = Object.entries(operations)
            .filter(([_, isSelected]) => isSelected)
            .map(([operation]) => operation);

        const selectedOperation =
            allowedOperations[
                Math.floor(Math.random() * allowedOperations.length)
                ];

        console.log("selectedOperation");

        console.log('Selected Operation:', selectedOperation);

        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);

        let answer;

        switch (selectedOperation) {
            case 'addition':
                answer = num1 + num2;
                break;
            case 'subtraction':
                const maxNum = Math.max(num1, num2);
                const minNum = Math.min(num1, num2);
                num1 = maxNum;
                num2 = minNum;
                answer = num1 - num2;
                break;
            case 'multiplication':
                answer = num1 * num2;
                break;
            case 'division':
                // Ensure non-zero denominator for division
                const nonZeroNum2 = num2 !== 0 ? num2 : 1;
                answer = num1 / nonZeroNum2;
                break;
            default:
                answer = num1 + num2; // Default to addition
        }

        const id = nanoid();
        return { id, num1, num2, answer, operation: selectedOperation };
    };


    const [currentProblem, setCurrentProblem] = useState(() => generateProblem());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        if (time === 0) {
            clearInterval(timer);
            setGameOver(true);
        }

        return () => clearInterval(timer);
    }, [time]);

    useEffect(() => {
        setInputValue('');
    }, [currentProblem]);

    const handleAnswerSubmit = (userAnswer) => {
        if (parseInt(userAnswer) === currentProblem.answer) {
            setScore((prevScore) => prevScore + 1);
            setCurrentProblem(generateProblem());
            setInputValue('');
        }
    };

    const handleAnswerChange = (e) => {
        const userAnswer = e.target.value;
        setInputValue(userAnswer);

        if (parseInt(userAnswer) === currentProblem.answer) {
            setScore((prevScore) => prevScore + 1);
            setCurrentProblem(generateProblem());
            setInputValue('');
        }
    };

    const handlePlayAgain = () => {
        setScore(0);
        setTime(gameSettings.time); // Reset time to the initial value
        setCurrentProblem(generateProblem());
        setGameOver(false);
    };

    if (gameOver) {
        // Render a different component or navigate to a different page
        return (
            <div>
                <h1>Game Over</h1>
                <p>Your Score: {score}</p>
                <button onClick={handlePlayAgain}>Play Again</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Math Game</h1>
            <p>Score: {score}</p>
            <p>Time: {time} seconds</p>
            <p>
                {`${currentProblem.num1} ${
                    currentProblem.operation === 'addition'
                        ? '+'
                        : currentProblem.operation === 'subtraction' 
                            ? '-'
                            : currentProblem.operation === 'multiplication'
                                ? 'x'
                                : currentProblem.operation === 'division'
                                    ? '÷'
                                    : '+'
                } ${currentProblem.num2} = ?`}
            </p>
            <input type="text" value={inputValue} onChange={handleAnswerChange} />
        </div>
    );
};

export default Game;
