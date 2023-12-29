import {useState} from 'react';

const LandingPage = ({ onStartGame }) => {
    const [selectedOperations, setSelectedOperations] = useState({
        addition: true,
        subtraction: true,
        multiplication: true,
        division: true,
    });

    const [selectedTime, setSelectedTime] = useState(30);

    const handleStartGame = () => {
        onStartGame(selectedOperations, selectedTime);
    };

    return (
        <div>
            <h1>Math Game Settings</h1>

            <div>
                <p>Select Operations:</p>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOperations.addition}
                        onChange={() =>
                            setSelectedOperations((prev) => ({
                                ...prev,
                                addition: !prev.addition,
                            }))
                        }
                    />
                    Addition
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOperations.subtraction}
                        onChange={() =>
                            setSelectedOperations((prev) => ({
                                ...prev,
                                subtraction: !prev.subtraction,
                            }))
                        }
                    />
                    Subtraction
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOperations.multiplication}
                        onChange={() =>
                            setSelectedOperations((prev) => ({
                                ...prev,
                                multiplication: !prev.multiplication,
                            }))
                        }
                    />
                    Multiplication
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={selectedOperations.division}
                        onChange={() =>
                            setSelectedOperations((prev) => ({
                                ...prev,
                                division: !prev.division,
                            }))
                        }
                    />
                    Division
                </label>
            </div>

            <div>
                <p>Select Time:</p>
                <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(parseInt(e.target.value))}
                >
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                    <option value={120}>2 minutes</option>
                    <option value={300}>5 minutes</option>
                </select>
            </div>

            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

export default LandingPage;
