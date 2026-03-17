import React, { useState } from 'react';

const BMICalculator = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('30');
    const [heightUnit, setHeightUnit] = useState('imperial');
    const [weightUnit, setWeightUnit] = useState('imperial');
    
    // Metric fields
    const [heightCm, setHeightCm] = useState('175');
    const [weightKg, setWeightKg] = useState('70');
    
    // Imperial fields
    const [heightFt, setHeightFt] = useState('5');
    const [heightIn, setHeightIn] = useState('11.65');
    const [weightLbs, setWeightLbs] = useState('176.4');

    const [results, setResults] = useState({
        bmi: '24.2',
        category: 'Healthy weight',
        healthyRange: '18.5 kg/m² - 25 kg/m²',
        healthyWeight: '135.1 lbs - 182.6 lbs',
        gain: '-',
        lose: '-',
        ponderalIndex: '13.27 kg/m³'
    });

    const calculateBMI = (e) => {
        if (e) e.preventDefault();
        
        let hMeters, wKgs;

        if (heightUnit === 'metric') {
            hMeters = parseFloat(heightCm) / 100;
        } else {
            const totalInches = (parseFloat(heightFt) * 12) + parseFloat(heightIn);
            hMeters = totalInches * 0.0254;
        }

        if (weightUnit === 'metric') {
            wKgs = parseFloat(weightKg);
        } else {
            wKgs = parseFloat(weightLbs) * 0.453592;
        }

        if (hMeters > 0 && wKgs > 0) {
            const bmiValue = (wKgs / (hMeters * hMeters)).toFixed(1);
            const ponderalIndex = (wKgs / Math.pow(hMeters, 3)).toFixed(2);
            
            let category = '';
            if (bmiValue < 18.5) category = 'Underweight';
            else if (bmiValue < 25) category = 'Healthy weight';
            else if (bmiValue < 30) category = 'Overweight';
            else category = 'Obesity';

            const minHealthyWeight = (18.5 * hMeters * hMeters).toFixed(1);
            const maxHealthyWeight = (25 * hMeters * hMeters).toFixed(1);
            
            const displayMinW = weightUnit === 'metric' ? `${minHealthyWeight} kg` : `${(minHealthyWeight * 2.20462).toFixed(1)} lbs`;
            const displayMaxW = weightUnit === 'metric' ? `${maxHealthyWeight} kg` : `${(maxHealthyWeight * 2.20462).toFixed(1)} lbs`;

            let gain = '-';
            let lose = '-';
            
            if (bmiValue < 18.5) {
                const diff = (parseFloat(minHealthyWeight) - wKgs).toFixed(1);
                gain = weightUnit === 'metric' ? `${diff} kg` : `${(diff * 2.20462).toFixed(1)} lbs`;
            } else if (bmiValue > 25) {
                const diff = (wKgs - parseFloat(maxHealthyWeight)).toFixed(1);
                lose = weightUnit === 'metric' ? `${diff} kg` : `${(diff * 2.20462).toFixed(1)} lbs`;
            }

            setResults({
                bmi: bmiValue,
                category,
                healthyRange: "18.5 kg/m² - 25 kg/m²",
                healthyWeight: `${displayMinW} - ${displayMaxW}`,
                gain,
                lose,
                ponderalIndex: `${ponderalIndex} kg/m³`
            });

            // Package recommendation logic
            const weightToChange = bmiValue < 18.5 ? (parseFloat(minHealthyWeight) - wKgs) : (bmiValue > 25 ? (wKgs - parseFloat(maxHealthyWeight)) : 0);
            const requiredMonths = Math.abs(weightToChange) / 2;

            let recPackage = '';
            if (requiredMonths > 0) {
                if (requiredMonths <= 1) recPackage = 'package-1';
                else if (requiredMonths <= 3) recPackage = 'package-3';
                else if (requiredMonths <= 6) recPackage = 'package-6';
                else recPackage = 'package-12';
            } else if (bmiValue >= 18.5 && bmiValue <= 25) {
                recPackage = 'package-3'; // Recommend 3-month package for healthy weight
            }

            // Clear previous highlights
            document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('recommended-plan'));

            // Highlight recommended package
            if (recPackage) {
                const recCard = document.getElementById(recPackage);
                if (recCard) {
                    recCard.classList.add('recommended-plan');
                    setTimeout(() => {
                        recCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            }
        }
    };

    return (
        <section id="bmi" className="bmi-section">
            <div className="container">
                <div className="bmi-header-group">
                    <div className="bmi-icon-badge">
                        <i className="fa-solid fa-gauge-high"></i>
                        <span>BMI</span>
                    </div>
                    <h2 className="bmi-title">BMI Calculator</h2>
                </div>

                <div className="bmi-card-wrapper">
                    <div className="bmi-form-side">
                        <form onSubmit={calculateBMI}>
                            <div className="field-group">
                                <label className="field-label">Gender</label>
                                <div className="gender-selector">
                                    <button 
                                        type="button" 
                                        className={`gender-btn ${gender === 'male' ? 'active' : ''}`} 
                                        onClick={() => setGender('male')}
                                    >
                                        <i className="fa-solid fa-mars"></i> Male
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`gender-btn ${gender === 'female' ? 'active' : ''}`} 
                                        onClick={() => setGender('female')}
                                    >
                                        <i className="fa-solid fa-venus"></i> Female
                                    </button>
                                </div>
                            </div>

                            <div className="field-group">
                                <label className="field-label">Age</label>
                                <div className="input-box">
                                    <input 
                                        type="number" 
                                        value={age} 
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                    <span className="box-unit">years</span>
                                </div>
                            </div>

                            <div className="field-row">
                                <div className="field-group">
                                    <label className="field-label">Height</label>
                                    {heightUnit === 'metric' ? (
                                        <div className="input-box combined">
                                            <input 
                                                className="small-in"
                                                type="number" 
                                                value={heightCm} 
                                                onChange={(e) => setHeightCm(e.target.value)}
                                                style={{width: '100%'}}
                                            />
                                            <span 
                                                className="inner-unit toggle-unit" 
                                                onClick={() => {
                                                    setHeightUnit('imperial');
                                                    const totalInches = parseFloat(heightCm) / 2.54;
                                                    setHeightFt(Math.floor(totalInches / 12).toString());
                                                    setHeightIn((totalInches % 12).toFixed(2));
                                                }}
                                                style={{cursor: 'pointer', userSelect: 'none'}}
                                            >
                                                cm
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="input-box combined">
                                            <input className="small-in" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
                                            <span 
                                                className="inner-unit toggle-unit" 
                                                onClick={() => {
                                                    setHeightUnit('metric');
                                                    const totalInches = (parseFloat(heightFt || 0) * 12) + parseFloat(heightIn || 0);
                                                    setHeightCm((totalInches * 2.54).toFixed(1));
                                                }}
                                                style={{cursor: 'pointer', userSelect: 'none'}}
                                            >
                                                ft
                                            </span>
                                            <input className="small-in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
                                            <span className="inner-unit" style={{display:'inline'}}>in</span>
                                        </div>
                                    )}
                                </div>
                                <div className="field-group">
                                    <label className="field-label">Weight</label>
                                    {weightUnit === 'metric' ? (
                                        <div className="input-box">
                                            <input 
                                                type="number" 
                                                value={weightKg} 
                                                onChange={(e) => setWeightKg(e.target.value)}
                                            />
                                            <span 
                                                className="box-unit toggle-unit" 
                                                onClick={() => {
                                                    setWeightUnit('imperial');
                                                    setWeightLbs((parseFloat(weightKg) * 2.20462).toFixed(1));
                                                }}
                                                style={{cursor: 'pointer', userSelect: 'none'}}
                                            >
                                                kg
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="input-box">
                                            <input 
                                                type="number"
                                                value={weightLbs} 
                                                onChange={(e) => setWeightLbs(e.target.value)}
                                            />
                                            <span 
                                                className="box-unit toggle-unit" 
                                                onClick={() => {
                                                    setWeightUnit('metric');
                                                    setWeightKg((parseFloat(weightLbs) / 2.20462).toFixed(1));
                                                }}
                                                style={{cursor: 'pointer', userSelect: 'none'}}
                                            >
                                                pounds
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bmi-form-footer" style={{justifyContent: 'flex-end'}}>
                                <button type="submit" className="action-calculate">Calculate</button>
                            </div>
                        </form>
                    </div>

                    <div className="bmi-result-side">
                        <div className="result-tag">BODY MASS INDEX</div>
                        <div className="result-main">
                            <div className="meter-scale-labels">
                                <span>Underweight</span>
                                <span>Normal</span>
                                <span>Overweight</span>
                                <span>Obesity</span>
                            </div>
                            <div className="meter-line-container">
                                <div 
                                    className="scale-pointer" 
                                    style={{ 
                                        left: `${Math.min(Math.max((results.bmi - 15) * (100 / 25), 0), 100)}%` 
                                    }}
                                ></div>
                            </div>

                            <table className="analysis-table">
                                <tbody>
                                    <tr>
                                        <td>Body Mass Index (BMI)</td>
                                        <td><strong>{results.bmi} kg/m²</strong></td>
                                    </tr>
                                    <tr>
                                        <td>BMI Category</td>
                                        <td>{results.category}</td>
                                    </tr>
                                    <tr>
                                        <td>Healthy BMI range</td>
                                        <td>{results.healthyRange}</td>
                                    </tr>
                                    <tr>
                                        <td>Healthy weight for the height</td>
                                        <td>{results.healthyWeight}</td>
                                    </tr>
                                    <tr>
                                        <td>Gain to reach a BMI of 18.5 kg/m²</td>
                                        <td>{results.gain}</td>
                                    </tr>
                                    <tr>
                                        <td>Lose to reach a BMI of 25 kg/m²</td>
                                        <td>{results.lose}</td>
                                    </tr>
                                    <tr>
                                        <td>Ponderal Index</td>
                                        <td>{results.ponderalIndex}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BMICalculator;
