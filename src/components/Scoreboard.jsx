import React, { useState, useEffect } from 'react';
import './Scoreboard.css';

const Scoreboard = () => {
    const [scoreType, setScoreType] = useState('individual');
    const [filterCategory, setFilterCategory] = useState('all');
    const [scores, setScores] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/scoreboard')
            .then(res => res.json())
            .then(data => setScores(data))
            .catch(err => console.error("Error fetching scoreboard:", err));
    }, []);

    const currentScores = scores.filter(s => s.type === scoreType);

    const filteredScores = filterCategory === 'all'
        ? currentScores
        : currentScores.filter(score => score.category === filterCategory);

    // Sort by rank ascending
    filteredScores.sort((a, b) => a.rank - b.rank);

    const topThree = filteredScores.slice(0, 3);
    const restScores = filteredScores.slice(3);

    return (
        <section id="scoreboard" className="section scoreboard-section">
            <div className="container">
                <h2 className="section-title">Scoreboard</h2>

                <div className="scoreboard-controls">
                    <div className="tabs">
                        <button
                            className={`tab ${scoreType === 'individual' ? 'active' : ''}`}
                            onClick={() => setScoreType('individual')}
                        >
                            👤 Individual
                        </button>
                        <button
                            className={`tab ${scoreType === 'group' ? 'active' : ''}`}
                            onClick={() => setScoreType('group')}
                        >
                            👥 Group
                        </button>
                    </div>

                    <div className="tabs">
                        <button
                            className={`tab ${filterCategory === 'all' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('all')}
                        >
                            All
                        </button>
                        <button
                            className={`tab ${filterCategory === 'offstage' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('offstage')}
                        >
                            Offstage
                        </button>
                        <button
                            className={`tab ${filterCategory === 'onstage' ? 'active' : ''}`}
                            onClick={() => setFilterCategory('onstage')}
                        >
                            Onstage
                        </button>
                    </div>
                </div>

                {topThree.length >= 3 && (
                    <div className="podium">
                        <div className="podium-item second">
                            <div className="podium-rank">🥈</div>
                            <h3>{scoreType === 'individual' ? topThree[1].name : topThree[1].teamName}</h3>
                            <p className="podium-college">{topThree[1].college}</p>
                            <p className="podium-program">{topThree[1].program}</p>
                            <div className="podium-score">{topThree[1].score}</div>
                        </div>

                        <div className="podium-item first">
                            <div className="podium-rank">🥇</div>
                            <h3>{scoreType === 'individual' ? topThree[0].name : topThree[0].teamName}</h3>
                            <p className="podium-college">{topThree[0].college}</p>
                            <p className="podium-program">{topThree[0].program}</p>
                            <div className="podium-score">{topThree[0].score}</div>
                        </div>

                        <div className="podium-item third">
                            <div className="podium-rank">🥉</div>
                            <h3>{scoreType === 'individual' ? topThree[2].name : topThree[2].teamName}</h3>
                            <p className="podium-college">{topThree[2].college}</p>
                            <p className="podium-program">{topThree[2].program}</p>
                            <div className="podium-score">{topThree[2].score}</div>
                        </div>
                    </div>
                )}

                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>{scoreType === 'individual' ? 'Name' : 'Team Name'}</th>
                                <th>College</th>
                                <th>Program</th>
                                <th>Grade</th>
                                {scoreType === 'group' && <th>Members</th>}
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredScores.map((score, index) => (
                                <tr key={index} className="score-row">
                                    <td>
                                        <span className="rank-badge">{score.rank}</span>
                                    </td>
                                    <td className="name-cell">
                                        {score.medal && <span className="medal">{score.medal}</span>}
                                        {scoreType === 'individual' ? score.name : score.teamName}
                                    </td>
                                    <td>{score.college}</td>
                                    <td>
                                        <span className={`badge ${score.category === 'offstage' ? 'badge-primary' : 'badge-secondary'}`}>
                                            {score.program}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`grade-badge grade-${score.grade}`}>{score.grade}</span>
                                    </td>
                                    {scoreType === 'group' && <td>{score.members}</td>}
                                    <td>
                                        <span className="score-value">{score.score}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Scoreboard;
