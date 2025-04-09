//분/시간 변환 계산식 넣을때 min/hour값을 넣었더니 한 박자늦게 데이터가 입력되어 원하는 값이 안나왔다.
//min/hour값 말고 e.target.value를 직접 넣어 해결했다.
import { use, useState } from 'react';
import './App.css';


const MinutesToHours = () => {
    const [min, setMin] = useState("");
    const [hour, setHour] = useState("");
    const [flip, setFlip] = useState(false);

    const reset = () => {
        setMin("");
        setHour("");
    }

    const onFlip = () => {
        reset("");
        setFlip(!flip);
    }

    const onChangeMin = (e) => {
        const timeValue = e.target.value;
        setMin(timeValue);
        setHour(flip ? ""
             : (parseFloat(timeValue / 60)))
    }

    const onChangeHour = (e) => {
        const timeValue = e.target.value;
        setHour(timeValue);
        setMin(!flip ? "" : parseFloat(timeValue * 60))
    }

    return (
        <div>
            <h3>Minutes To Hours</h3>
            <div>
                <label htmlFor="minutes">Minutes</label>
                <input type="number" id="minutes" placeholder="Minutes"
                    disabled={flip} onChange={onChangeMin}
                    
                    value={min}/>
            </div>
            <div>
                <label htmlFor="hours">Hours</label>
                <input type="number" id="hours" placeholder="Hours"
                    disabled={!flip} onChange={onChangeHour}
                    value={hour}
                    />
            </div>
            <button onClick={reset}>Reset</button>
            <button onClick={onFlip}>Flip</button>
        </div>
    )
};

export default MinutesToHours;