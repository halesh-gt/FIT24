import React from 'react';

const Schedule = () => {
    return (
        <section id="schedule" style={{ padding: '120px 60px' }}>
            <div className="schedule-header reveal">
                <div>
                    <div className="section-label">Weekly Schedule</div>
                    <h2 className="section-title" style={{ marginBottom: 0 }}>TODAY'S<br /><span style={{ color: 'var(--red)' }}>CLASSES</span></h2>
                </div>
                <div className="days-nav">
                    <button className="day-btn">Mon</button>
                    <button className="day-btn active">Tue</button>
                    <button className="day-btn">Wed</button>
                    <button className="day-btn">Thu</button>
                    <button className="day-btn">Fri</button>
                    <button className="day-btn">Sat</button>
                    <button className="day-btn">Sun</button>
                </div>
            </div>
            <table className="schedule-table reveal">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Class</th>
                        <th>Trainer</th>
                        <th>Duration</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div className="schedule-time">6:00</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>AM</div></td>
                        <td><div className="schedule-class">HIIT Blast</div><div className="schedule-trainer">Zone A</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Alex Rivera</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>45 min</div></td>
                        <td><span className="schedule-spots spots-open">6 Spots Left</span></td>
                    </tr>
                    <tr>
                        <td><div className="schedule-time">7:30</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>AM</div></td>
                        <td><div className="schedule-class">Power Yoga</div><div className="schedule-trainer">Studio 2</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Maya Chen</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>60 min</div></td>
                        <td><span className="schedule-spots spots-open">12 Spots Left</span></td>
                    </tr>
                    <tr>
                        <td><div className="schedule-time">9:00</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>AM</div></td>
                        <td><div className="schedule-class">Cycle Studio</div><div className="schedule-trainer">Cycle Room</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Jordan Lee</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>45 min</div></td>
                        <td><span className="schedule-spots spots-few">2 Spots Left</span></td>
                    </tr>
                    <tr>
                        <td><div className="schedule-time">12:00</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>PM</div></td>
                        <td><div className="schedule-class">Boxing</div><div className="schedule-trainer">Ring Room</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Marcus Taylor</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>50 min</div></td>
                        <td><span className="schedule-spots spots-full">Full</span></td>
                    </tr>
                    <tr>
                        <td><div className="schedule-time">5:30</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>PM</div></td>
                        <td><div className="schedule-class">CrossFit</div><div className="schedule-trainer">Zone B</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Sam Ortiz</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>60 min</div></td>
                        <td><span className="schedule-spots spots-open">8 Spots Left</span></td>
                    </tr>
                    <tr>
                        <td><div className="schedule-time">7:00</div><div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>PM</div></td>
                        <td><div className="schedule-class">Powerlifting</div><div className="schedule-trainer">Weight Floor</div></td>
                        <td><div style={{ fontSize: '0.85rem' }}>Chris Nakamura</div></td>
                        <td><div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>75 min</div></td>
                        <td><span className="schedule-spots spots-few">3 Spots Left</span></td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

export default Schedule;
