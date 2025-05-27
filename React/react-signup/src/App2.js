import { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const match = useRef();
  let [show, setShow] = useState(false);
  let [userInfo,setUserInfo] = useState({
    userId: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: ""
  });
  // 객체를 JSON 문자로 변환
  // JSON.stringify(userInfo)
  
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // userInfo 스테이트 <- 렌더링 후에 값이 결정
    const new객체 = {...userInfo, [name]: value};
    setUserInfo(new객체);
  
  const pw = new객체.password;
  const cpw = new객체.confirmPassword;

  if(pw == cpw){
    console.log("맞음");
    //클래스 삭제
    match.current.classList.remove('pw-match');
  } else {
    console.log("틀렸음");
    //클래스 추가
    match.current.classList.add('pw-match')
    
  }}

  return (
    <div className="container">
      <h2>회원 가입</h2>
      <form>
        <div className="form-group">
          <input
            type="checkbox"
            id="agree"
            onChange={() => {
              setShow(show => !show)
            }}
          />
          <label className='agree' htmlFor="agree">이용약관에 모두 동의합니다</label>
        </div>
        {show ?
        <div>
          <div className="form-group">
            <label htmlFor="userId">사용자 아이디</label>
            <input
              type="text"
              id="userId"
              name="userId"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">비밀번호 확인</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
            <label id="pw-match"
            ref={match}
            className="pw-match">비밀번호가 일치해야 됩니다.</label>
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">전화번호</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              required
              onChange={(e) => {
                handleChange(e)
              }}
            />
          </div>

          <button type="submit">제출</button>
        </div>
         : null }
      </form>
    </div>
  );
};

export default App;
