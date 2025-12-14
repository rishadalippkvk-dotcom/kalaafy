import React, { useState, useEffect, useMemo } from 'react';
import { individualScores, groupScores } from '../data/mockData';
import './Scoreboard.css';

const Scoreboard = () => {
    const [scoreType, setScoreType] = useState('individual');
    const [filterCategory, setFilterCategory] = useState('all');
    // Initialize with mock data as fallback/default
    const [scores, setScores] = useState([
        ...individualScores.map(s => ({ ...s, type: 'individual' })),
        ...groupScores.map(s => ({ ...s, type: 'group' }))
    ]);

    // Calculate Group Standings (ASTRA, LOKHA, EAKHA)
    const groupStandings = useMemo(() => {
        const standings = { ASTRA: 0, LOKHA: 0, EAKHA: 0 };

        scores.forEach(score => {
            const rank = parseInt(score.rank);
            let points = 0;

            // Scoring Rules:
            // Individual: 1st=5, 2nd=3, 3rd=1
            // Group: 1st=10, 2nd=7, 3rd=4
            if (score.type === 'individual') {
                if (rank === 1) points = 5;
                else if (rank === 2) points = 3;
                else if (rank === 3) points = 1;
            } else if (score.type === 'group') {
                if (rank === 1) points = 10;
                else if (rank === 2) points = 7;
                else if (rank === 3) points = 4;
            }

            // Accumulate points if the college/group matches
            if (points > 0 && standings[score.college] !== undefined) {
                standings[score.college] += points;
            }
        });

        return Object.entries(standings)
            .map(([group, score]) => ({ group, score }))
            .sort((a, b) => b.score - a.score);
    }, [scores]);

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

                {/* Main Group Standings */}
                <div className="group-standings-card" style={{
                    background: 'var(--card-bg, #1a1a1a)',
                    padding: '20px',
                    borderRadius: '12px',
                    marginBottom: '30px',
                    border: '1px solid var(--border-color, #333)'
                }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--primary-color, #ffd700)' }}>🏆 Championship Standings</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
                        {groupStandings.map((group, index) => (
                            <div key={group.group} style={{
                                textAlign: 'center',
                                padding: '15px',
                                minWidth: '150px',
                                background: index === 0 ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                                borderRadius: '8px',
                                border: index === 0 ? '1px solid #ffd700' : '1px solid #444'
                            }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                                    {index === 0 ? '🥇 ' : index === 1 ? '🥈 ' : index === 2 ? '🥉 ' : ''}
                                    {group.group}
                                </div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: index === 0 ? '#ffd700' : '#fff' }}>
                                    {group.score}
                                </div>
                                <div style={{ fontSize: '0.9rem', opacity: 0.7 }}>Points</div>
                            </div>
                        ))}
                    </div>
                </div>

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
