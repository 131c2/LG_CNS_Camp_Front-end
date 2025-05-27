import { useState } from 'react';
import './App.css';

const App = () => {
  const [oncheck, setOncheck] = useState(false);
  const [pwcheck,setPwcheck] = useState("");
  const [formdata,setFormdata] = useState({
    id: '',
    pw: '',
    email: '',
    call: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
     [name]: value
    })
  }

  const onButton = (e) => {
    alert(`아이디: ${formdata.id}
비밀번호: ${formdata.pw}
이메일: ${formdata.email}
전화번호: ${formdata.call}
주소: ${formdata.address}`)
  }

  return (
    <div className="container">
      <h2>회원 가입</h2>
      <form>
        <div className="form-group">
          <input
            type="checkbox"
            id="agree"
            checked={!oncheck}
            onChange={onCheckBox}
          />
          <label className='agree' htmlFor="agree">이용약관에 모두 동의합니다</label>
        </div>

        {!oncheck ?
          <div>
            <div className="form-group">
              <label htmlFor="userId">사용자 아이디</label>
              <input
                type="text"
                id="userId"
                name="id"
                onChange={() => {
                  // setOncheck(!oncheck);
                  setOncheck(oncheck => !oncheck)
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                name="pw"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">비밀번호 확인</label>
              <input
                onChange={(e) => {
                  const pwValue = e.target.value;
                  setPwcheck(pwValue);
                }}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
              />
              {formdata.pw === pwcheck ? "" : 
              <label id="pw-match" className="pw-match">비밀번호가 일치해야 됩니다.</label>
              }
            </div>

            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input
                type="tel"
                placeholder='010-1234-1234'
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                id="phoneNumber"
                name="call"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                name="address"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" onClick={onButton}>제출</button>
          </div> : null}
      </form>
    </div>
  );
};

export default App;
