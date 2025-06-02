import React, { useState, useEffect } from 'react';

// 방해 이벤트 정보
const EVENTS = [
  {
    id: 'tax',
    name: '광업세 징수',
    description: '갑작스런 세금! 소득의 일부를 국가에 납부해야 합니다',
    effect: (level) => ({ money: -Math.floor(10 * level * (level + 1)), exp: -Math.floor(5 * level) })
  },
  {
    id: 'breakdown',
    name: '장비 고장',
    description: '장비가 고장났습니다! 수리비가 발생합니다',
    effect: (level) => ({ money: -Math.floor(20 * level), exp: -Math.floor(5 * level) })
  },
  {
    id: 'theft',
    name: '도둑 출현',
    description: '누군가 당신의 광산에서 금을 훔쳐갔습니다!',
    effect: (level) => ({ money: -Math.floor(15 * level * 1.5), exp: -Math.floor(8 * level) })
  }
];

// 채굴기구 정보 (재미있는 이름과 설명)
const MINERS = [
  { 
    id: 'hamster', 
    name: '햄스터 바퀴', 
    description: '열심히 돌리는 햄스터가 동력을 만들어냅니다', 
    baseCost: 50, 
    baseProduction: 1 
  },
  { 
    id: 'pickaxe', 
    name: '자동 곡괭이', 
    description: '누가 봐도 그냥 쓰다만 곡괭이에 모터 단 거', 
    baseCost: 200, 
    baseProduction: 5 
  },
  { 
    id: 'robot', 
    name: '로봇 광부', 
    description: 'AI 기술로 광물의 위치를 파악해 효율적으로 채굴합니다만... 부품이 자주 고장납니다', 
    baseCost: 1000, 
    baseProduction: 20 
  }
];

const MiningGame = () => {
  // 게임 상태
  const [gameState, setGameState] = useState('main-menu'); // 'main-menu', 'playing', 'paused', 'game-over'
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // 기본 상태 설정
  const [money, setMoney] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10);
  const [clickUpgradeLevel, setClickUpgradeLevel] = useState(1);
  const [miners, setMiners] = useState({
    hamster: { count: 0, level: 1 },
    pickaxe: { count: 0, level: 1 },
    robot: { count: 0, level: 1 }
  });
  const [autoIncome, setAutoIncome] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [nextLevelExp, setNextLevelExp] = useState(100);
  const [activeEvents, setActiveEvents] = useState([]);
  const [eventCounter, setEventCounter] = useState(0);
  const [eliminatedEvents, setEliminatedEvents] = useState(0);
  const [eventProtection, setEventProtection] = useState(0);
  
  // 게임 시작 함수
  const startGame = () => {
    // 게임 상태 초기화
    setMoney(0);
    setTotalEarned(0);
    setClickValue(1);
    setClickUpgradeCost(10);
    setClickUpgradeLevel(1);
    setMiners({
      hamster: { count: 0, level: 1 },
      pickaxe: { count: 0, level: 1 },
      robot: { count: 0, level: 1 }
    });
    setAutoIncome(0);
    setLevel(1);
    setExperience(0);
    setNextLevelExp(100);
    setActiveEvents([]);
    setEventCounter(0);
    setEliminatedEvents(0);
    setEventProtection(0);
    setTotalClicks(0);
    
    // 게임 시작 시간 기록
    setStartTime(Date.now());
    setElapsedTime(0);
    
    // 게임 상태 변경
    setGameState('playing');
  };
  
  // 게임 일시정지 함수
  const pauseGame = () => {
    if (gameState === 'playing') {
      setGameState('paused');
      // 현재까지의 경과 시간 기록
      setElapsedTime(prevTime => prevTime + (Date.now() - startTime));
    } else if (gameState === 'paused') {
      setGameState('playing');
      // 시작 시간 업데이트
      setStartTime(Date.now());
    }
    
    console.log("현재 게임 상태:", gameState === 'playing' ? 'paused' : 'playing');
  };
  
  // 게임 오버 함수
  const endGame = () => {
    setGameState('game-over');
    setElapsedTime(prevTime => prevTime + (Date.now() - startTime));
  };
  
  // 메인 메뉴로 돌아가기 함수
  const goToMainMenu = () => {
    setGameState('main-menu');
  };
  
  // 클릭 시 돈 증가 함수
  const handleClick = () => {
    if (gameState !== 'playing') return;
    
    const earned = clickValue;
    setMoney(prevMoney => prevMoney + earned);
    setTotalEarned(prev => prev + earned);
    addExperience(earned * 0.1); // 얻은 돈의 10%를 경험치로 획득
    setTotalClicks(prev => prev + 1);
    
    // 효과음 재생 (실제 구현 시 추가)
    if (soundEnabled) {
      // playSound('click');
    }
  };
  
  // 경험치 추가 및 레벨업 처리 함수
  const addExperience = (amount) => {
    setExperience(prevExp => {
      const newExp = prevExp + amount;
      if (newExp >= nextLevelExp) {
        // 레벨업
        const levelUpBonus = level * 100; // 레벨에 비례한 보너스 지급
        setMoney(prevMoney => prevMoney + levelUpBonus);
        setLevel(prevLevel => prevLevel + 1);
        setNextLevelExp(prevNextExp => prevNextExp * 2); // 다음 레벨 요구치 2배로 증가
        
        // 레벨업 메시지 등 추가 가능
        
        return newExp - nextLevelExp; // 초과한 경험치는 이월
      }
      return newExp;
    });
  };
  
  // 클릭 업그레이드 구매 함수
  const upgradeClick = () => {
    if (money >= clickUpgradeCost) {
      setMoney(prevMoney => prevMoney - clickUpgradeCost);
      setClickValue(prevValue => prevValue + 1);
      setClickUpgradeLevel(prevLevel => prevLevel + 1);
      setClickUpgradeCost(prevCost => Math.floor(prevCost * 1.5)); // 비용 증가
    }
  };
  
  // 채굴기 구매 함수
  const buyMiner = (minerId) => {
    const minerInfo = MINERS.find(m => m.id === minerId);
    const currentCount = miners[minerId].count;
    const cost = Math.floor(minerInfo.baseCost * Math.pow(1.15, currentCount));
    
    if (money >= cost) {
      setMoney(prevMoney => prevMoney - cost);
      setMiners(prevMiners => ({
        ...prevMiners,
        [minerId]: {
          ...prevMiners[minerId],
          count: prevMiners[minerId].count + 1
        }
      }));
      
      // 자동 소득 업데이트
      updateAutoIncome();
    }
  };
  
  // 채굴기 업그레이드 함수
  const upgradeMiner = (minerId) => {
    const minerInfo = MINERS.find(m => m.id === minerId);
    const currentLevel = miners[minerId].level;
    const cost = Math.floor(minerInfo.baseCost * 3 * currentLevel);
    
    if (money >= cost && miners[minerId].count > 0) {
      setMoney(prevMoney => prevMoney - cost);
      setMiners(prevMiners => ({
        ...prevMiners,
        [minerId]: {
          ...prevMiners[minerId],
          level: prevMiners[minerId].level + 1
        }
      }));
      
      // 자동 소득 업데이트
      updateAutoIncome();
    }
  };
  
  // 자동 소득 계산 함수
  const updateAutoIncome = () => {
    let income = 0;
    MINERS.forEach(miner => {
      income += miner.baseProduction * miners[miner.id].count * miners[miner.id].level;
    });
    setAutoIncome(income);
  };
  
  // 방해 이벤트 추가 함수
  const addEvent = () => {
    // 이벤트 보호가 활성화되어 있으면 이벤트를 생성하지 않음
    if (eventProtection > 0) {
      setEventProtection(prev => prev - 1);
      return;
    }
    
    const randomEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    const id = `${randomEvent.id}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    
    setActiveEvents(prev => [
      ...prev,
      {
        ...randomEvent,
        uniqueId: id,
        createdAt: Date.now(),
        timeLeft: 10, // 10초 타이머
      }
    ]);
    
    setEventCounter(prev => prev + 1);
  };
  
  // 방해 이벤트 제거 함수
  const eliminateEvent = (eventId) => {
    setActiveEvents(prev => prev.filter(e => e.uniqueId !== eventId));
    setEliminatedEvents(prev => prev + 1);
  };
  
  // 방해 이벤트 효과 적용 함수
  const applyEventEffect = (event) => {
    const { money: moneyEffect, exp: expEffect } = event.effect(level);
    
    setMoney(prev => Math.max(0, prev + moneyEffect)); // 돈은 0 미만으로 내려가지 않음
    setExperience(prev => Math.max(0, prev + expEffect)); // 경험치도 0 미만으로 내려가지 않음
    
    // 메시지 표시 등 추가 기능 가능
  };
  
  // 이벤트 보호 업그레이드 구매 함수
  const buyEventProtection = () => {
    const cost = 500 * (eventProtection + 1);
    
    if (money >= cost) {
      setMoney(prev => prev - cost);
      setEventProtection(prev => prev + 3); // 3번의 이벤트 보호 획득
    }
  };
  
  // 소리 설정 토글 함수
  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };
  
  // 1초마다 자동 소득 적용 및 이벤트 처리
  useEffect(() => {
    let timer;
    
    if (gameState === 'playing') {
      timer = setInterval(() => {
        // 자동 소득 처리
        if (autoIncome > 0) {
          const earned = autoIncome;
          setMoney(prevMoney => prevMoney + earned);
          setTotalEarned(prev => prev + earned);
          addExperience(earned * 0.05); // 자동 소득의 5%를 경험치로 획득
        }
        
        // 이벤트 타이머 처리
        setActiveEvents(prev => 
          prev.map(event => ({
            ...event,
            timeLeft: event.timeLeft - 1
          }))
        );
        
        // 시간이 다 된 이벤트 처리
        const expiredEvents = activeEvents.filter(e => e.timeLeft <= 0);
        if (expiredEvents.length > 0) {
          expiredEvents.forEach(event => {
            applyEventEffect(event);
          });
          
          setActiveEvents(prev => prev.filter(e => e.timeLeft > 0));
          
          // 효과음 재생 (실제 구현 시 추가)
          if (soundEnabled) {
            // playSound('event-effect');
          }
        }
        
        // 랜덤하게 이벤트 생성 (약 30초에 한 번)
        if (Math.random() < 0.033 && level >= 2) {
          addEvent();
          
          // 효과음 재생 (실제 구현 시 추가)
          if (soundEnabled) {
            // playSound('event-spawn');
          }
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, autoIncome, nextLevelExp, level, activeEvents, eventProtection, soundEnabled]);
  
  // 게임 실행 시간 업데이트 (1초마다)
  useEffect(() => {
    let timer;
    if (gameState === 'playing') {
      timer = setInterval(() => {
        const currentTime = Date.now();
        setElapsedTime(prev => prev + 1000);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState]);
  
  // 시간 포맷 함수
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // 메인 메뉴 렌더링
  const renderMainMenu = () => (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">금광 게임</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        클릭하여 돈을 모으고, 채굴기구를 구매하여 자동으로 돈을 벌어보세요!<br />
        하지만 다양한 위험에 주의하세요!
      </p>
      <button
        onClick={startGame}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl shadow-lg mb-4"
      >
        게임 시작
      </button>
    </div>
  );
  
  // 게임 일시정지 화면 렌더링
  const renderPauseMenu = () => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">일시정지</h2>
        <div className="flex flex-col gap-3">
          <button 
            onClick={pauseGame} 
            className="bg-green-600 hover:bg-green-700 p-2 rounded-lg"
          >
            게임 계속하기
          </button>
          <button 
            onClick={startGame} 
            className="bg-yellow-600 hover:bg-yellow-700 p-2 rounded-lg"
          >
            새 게임 시작
          </button>
          <button 
            onClick={goToMainMenu} 
            className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
          >
            메인 메뉴로
          </button>
          <div className="flex items-center justify-between mt-2">
            <span>소리:</span>
            <button 
              onClick={toggleSound} 
              className={`px-3 py-1 rounded-lg ${
                soundEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {soundEnabled ? '켜짐' : '꺼짐'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // 게임 오버 화면 렌더링
  const renderGameOver = () => (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-yellow-400">게임 종료!</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 mb-6">
        <h2 className="text-2xl font-bold mb-4 text-center">결과</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>플레이 시간:</span>
            <span>{formatTime(elapsedTime)}</span>
          </div>
          <div className="flex justify-between">
            <span>클릭 횟수:</span>
            <span>{totalClicks}</span>
          </div>
          <div className="flex justify-between">
            <span>소멸시킨 이벤트:</span>
            <span>{eliminatedEvents}</span>
          </div>
          <div className="border-t border-gray-600 my-2 pt-2"></div>
          <div className="flex justify-between font-bold">
            <span>총 획득한 돈:</span>
            <span>{totalEarned.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span>최종 레벨:</span>
            <span>{level}</span>
          </div>
        </div>
      </div>
      
      <div className="flex gap-4">
        <button
          onClick={startGame}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          다시 하기
        </button>
        <button
          onClick={goToMainMenu}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          메인 메뉴
        </button>
      </div>
    </div>
  );
  
  // 게임 UI 렌더링
  const renderGameUI = () => (
    <div className="relative pt-12"> {/* 상단에 여백 추가 */}
      {/* 상단 메뉴 바 */}
      <div className="fixed top-4 right-4 p-2 flex gap-2 z-20 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
        <button 
          onClick={toggleSound}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <button 
          onClick={pauseGame}
          className="bg-gray-700 hover:bg-gray-600 p-2 rounded"
        >
          {gameState === 'paused' ? '▶️' : '⏸️'}
        </button>
      </div>
      
      {/* 게임 내용 */}
      <div className={gameState === 'paused' ? 'opacity-50 pointer-events-none' : ''}>
        <div className="flex justify-between items-center bg-gray-900 p-4 rounded-lg mb-4 w-full max-w-2xl">
          <div>
            <div className="text-2xl mb-1">
              💰 {money.toLocaleString()} 원
            </div>
            <div className="text-md text-yellow-400">
              초당 수입: {autoIncome.toLocaleString()} 원/초
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xl mb-1">
              레벨 {level}
            </div>
            <div className="w-48 bg-gray-700 rounded-full h-4">
              <div 
                className="bg-blue-500 h-4 rounded-full" 
                style={{ width: `${(experience / nextLevelExp) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs mt-1">
              {experience.toFixed(1)} / {nextLevelExp} XP
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleClick}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition-transform duration-100 active:scale-95 mb-8"
        >
          채굴하기 (+{clickValue})
        </button>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-gray-700 p-4 rounded-lg w-64">
            <h2 className="text-xl font-bold mb-4">업그레이드</h2>
            <div className="mb-2">
              <button
                onClick={upgradeClick}
                disabled={money < clickUpgradeCost}
                className={`w-full p-2 rounded-md ${
                  money >= clickUpgradeCost 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                곡괭이 강화 (레벨 {clickUpgradeLevel})
                <div className="text-sm">비용: {clickUpgradeCost} 원</div>
                <div className="text-sm">클릭당 +1원 증가</div>
              </button>
            </div>
            
            <div className="mt-4">
              <button
                onClick={buyEventProtection}
                disabled={money < 500 * (eventProtection + 1)}
                className={`w-full p-2 rounded-md ${
                  money >= 500 * (eventProtection + 1)
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                이벤트 보호막
                <div className="text-sm">비용: {500 * (eventProtection + 1)} 원</div>
                <div className="text-sm">다음 {eventProtection > 0 ? eventProtection : 3}회 이벤트 방어</div>
              </button>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg w-80">
            <h2 className="text-xl font-bold mb-4">채굴 기구</h2>
            {MINERS.map(miner => {
              const count = miners[miner.id].count;
              const level = miners[miner.id].level;
              const buyCost = Math.floor(miner.baseCost * Math.pow(1.15, count));
              const upgradeCost = Math.floor(miner.baseCost * 3 * level);
              const production = miner.baseProduction * level;
              
              return (
                <div key={miner.id} className="mb-3 p-2 bg-gray-800 rounded">
                  <div className="font-bold">{miner.name} x{count}</div>
                  <div className="text-xs mb-1">{miner.description}</div>
                  <div className="text-xs text-yellow-400 mb-2">생산: {production} 원/초 (레벨 {level})</div>
                  
                  <div className="flex gap-1">
                    <button
                      onClick={() => buyMiner(miner.id)}
                      disabled={money < buyCost}
                      className={`flex-1 p-1 text-xs rounded ${
                        money >= buyCost 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      구매 ({buyCost} 원)
                    </button>
                    
                    <button
                      onClick={() => upgradeMiner(miner.id)}
                      disabled={money < upgradeCost || count === 0}
                      className={`flex-1 p-1 text-xs rounded ${
                        money >= upgradeCost && count > 0
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      강화 ({upgradeCost} 원)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 이벤트 섹션 */}
          {activeEvents.length > 0 && (
            <div className="bg-gray-700 p-4 rounded-lg w-64">
              <h2 className="text-xl font-bold mb-4 text-red-500">위험 발생! ({activeEvents.length})</h2>
              {activeEvents.map(event => (
                <div key={event.uniqueId} className="mb-3 p-2 bg-red-900 rounded">
                  <div className="font-bold">{event.name}</div>
                  <div className="text-xs mb-1">{event.description}</div>
                  <div className="text-xs text-yellow-400 mb-2">
                    영향: {event.effect(level).money}원, {event.effect(level).exp}XP
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs">⏱️ {event.timeLeft}초</div>
                    <button
                      onClick={() => eliminateEvent(event.uniqueId)}
                      className="bg-green-600 hover:bg-green-700 text-xs px-2 py-1 rounded"
                    >
                      제거하기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 간단한 통계 */}
        <div className="mt-6 bg-gray-800 p-3 rounded-lg w-full max-w-md text-sm">
          <div className="flex justify-between mb-1">
            <span>총 획득한 돈:</span>
            <span>{totalEarned.toLocaleString()} 원</span>
          </div>
          <div className="flex justify-between">
            <span>제거한 이벤트:</span>
            <span>{eliminatedEvents}개</span>
          </div>
          <div className="flex justify-between">
            <span>플레이 시간:</span>
            <span>{formatTime(elapsedTime)}</span>
          </div>
        </div>
      </div>
      
      {/* 일시정지 메뉴 */}
      {gameState === 'paused' && renderPauseMenu()}
    </div>
  );
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">금광 게임</h1>
      
      {gameState === 'main-menu' && renderMainMenu()}
      {(gameState === 'playing' || gameState === 'paused') && (
        <>
          {renderGameUI()}
          {gameState === 'paused' && renderPauseMenu()}
        </>
      )}
      {gameState === 'game-over' && renderGameOver()}
    </div>
  );
};

export default MiningGame;