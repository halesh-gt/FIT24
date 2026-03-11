import React, { useState } from 'react';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = (e) => {
        e.preventDefault();
        if (height && weight) {
            const h = parseFloat(height) / 100;
            const w = parseFloat(weight);
            const bmiValue = (w / (h * h)).toFixed(1);
            setBmi(bmiValue);

            if (bmiValue < 18.5) setCategory('Underweight');
            else if (bmiValue < 25) setCategory('Normal');
            else if (bmiValue < 30) setCategory('Overweight');
            else setCategory('Obese');
        }
    };

    return (
        <section id="bmi" className="bmi-section">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-label">Fitness Tools</span>
                    <h2 className="section-title">BMI <span className="text-stroke">CALCULATOR</span></h2>
                    <p className="section-sub">Quickly calculate your Body Mass Index to see where you stand in your fitness journey.</p>
                </div>

                <div className="bmi-grid reveal">
                    <div className="bmi-form-card">
                        <form onSubmit={calculateBMI}>
                            <div className="input-group">
                                <label>Height (cm)</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 175" 
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Weight (kg)</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 70" 
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary">Calculate BMI</button>
                        </form>
                    </div>

                    <div className="bmi-result-card">
                        {bmi ? (
                            <div className="result-content">
                                <div className="bmi-number">{bmi}</div>
                                <div className="bmi-category">Category: <span>{category}</span></div>
                                <div className="bmi-meter">
                                    <div 
                                        className="bmi-pointer" 
                                        style={{ 
                                            left: `${Math.min(Math.max((bmi - 15) * (100 / 25), 0), 100)}%` 
                                        }}
                                    ></div>
                                </div>
                                <p className="bmi-info">A healthy BMI range is between 18.5 and 24.9.</p>
                            </div>
                        ) : (
                            <div className="result-placeholder">
                                <i className="fa-solid fa-calculator"></i>
                                <p>Enter your details to see your result</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BMICalculator;
