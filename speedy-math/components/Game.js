import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';

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

        let num1, num2, answer;

        switch (selectedOperation) {
            case 'addition':
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 90) + 10;
                answer = num1 + num2;
                break;
            case 'subtraction':
                num1 = Math.floor(Math.random() * 90) + 10;
                num2 = Math.floor(Math.random() * 90) + 10;
                const maxNum = Math.max(num1, num2);
                const minNum = Math.min(num1, num2);
                num1 = maxNum;
                num2 = minNum;
                answer = num1 - num2;
                break;
            case 'multiplication':
                num1 = Math.floor(Math.random() * 90) + 10; // Two-digit number
                num2 = Math.floor(Math.random() * 12) + 1; // Random number from 1 to 12
                answer = num1 * num2;
                break;
            case 'division':
                num1 = Math.floor(Math.random() * 90) + 10; // Two-digit number
                num2 = Math.floor(Math.random() * 12) + 1; // Random number from 1 to 12
                answer = num1;
                num1 = num1 * num2; // Inverse of multiplication
                break;
            default:
                num1 = Math.floor(Math.random() * 90) + 10; // Two-digit number
                num2 = Math.floor(Math.random() * 90) + 10;
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
