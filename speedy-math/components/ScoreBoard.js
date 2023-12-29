import React from 'react';

const Scoreboard = ({ scores }) => {
    return (
        <div>
            <h2>Stats</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>Game {index + 1}: {score}</li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;
