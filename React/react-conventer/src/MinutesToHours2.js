import { useState } from 'react';
import './App.css';
const MinutesToHours = () => {

    const [value,setValue] = useState(0);
    const [flip,setFlip] = useState(false);
    return (
        <div>
            <h3>Minutes To Hours</h3>
            <div>
                <label htmlFor="minutes">Minutes</label>
                <input type="number" id="minutes" placeholder="Minutes"
                    disabled={flip}
                    value={flip ? value : value * 60}
                    onChange={(e) => {
                        const 입력값 = e.target.value;
                        setValue(입력값);
                    }}/>
            </div>
            <div>
                <label htmlFor="hours">Hours</label>
                <input type="number" id="hours" placeholder="Hours"
                    disabled={!flip}
                    value={!flip ? value / 60 : value}
                     onChange={(e) => {
                        const 입력값 = e.target.value;
                        setValue(입력값);
                    }}/>
            </div>
            <button onClick={() => {
                setValue(0);
            }}>Reset</button>
            <button onClick={() => {
                setFlip(!flip)
            }}>Flip</button>
        </div>
    )
};