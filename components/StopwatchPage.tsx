
import React, { useState, useRef, useEffect } from 'react';
import AdBanner from './AdBanner';

interface StopwatchPageProps {
    onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
     <button onClick={onClick} className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold mb-4 transition hover:bg-slate-700 active:translate-x-[-2px]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Home
    </button>
);

const StopwatchPage: React.FC<StopwatchPageProps> = ({ onBack }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState<number[]>([]);
    const timerRef = useRef<number | null>(null);
    const lastLapTime = useRef(0);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const formatTime = (timeMs: number) => {
        const minutes = String(Math.floor((timeMs / 60000) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeMs / 1000) % 60)).padStart(2, '0');
        const milliseconds = String(Math.floor((timeMs / 10) % 100)).padStart(2, '0');
        return { minutes, seconds, milliseconds };
    };

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
        lastLapTime.current = 0;
    };
    
    const handleLap = () => {
        if (!isRunning) return;
        const currentLapTime = time - lastLapTime.current;
        setLaps(prevLaps => [currentLapTime, ...prevLaps]);
        lastLapTime.current = time;
    };

    const { minutes, seconds, milliseconds } = formatTime(time);
    const totalLapsTime = laps.reduce((acc, curr) => acc + curr, 0);

    return (
        <>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">Stopwatch</h2>
            <AdBanner />
            <div className="bg-slate-800 p-4 sm:p-8 rounded-xl shadow-2xl space-y-8 text-center">
                <div className="text-4xl sm:text-5xl font-mono font-bold text-yellow-400 bg-slate-900 p-4 rounded-lg shadow-inner border border-slate-700">
                    {minutes}:{seconds}.<span className="text-2xl sm:text-3xl text-sky-400">{milliseconds}</span>
                </div>
                
                <div className="flex justify-center space-x-2 sm:space-x-4">
                    {!isRunning ? (
                        <button onClick={handleStart} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95">Start</button>
                    ) : (
                        <button onClick={handleStop} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95">Stop</button>
                    )}
                    <button onClick={handleReset} className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95" disabled={isRunning && time === 0}>Reset</button>
                    <button onClick={handleLap} className="flex-1 bg-sky-600 hover:bg-sky-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95" disabled={!isRunning}>Lap</button>
                </div>
            </div>

            {laps.length > 0 && (
                 <div className="mt-6 bg-slate-800 p-4 rounded-xl shadow-lg max-h-60 overflow-y-auto scrollbar-hide">
                    <h3 className="font-bold text-lg text-yellow-400 mb-2 text-center">Laps</h3>
                    <ul className="space-y-2 text-sm">
                        {laps.map((lap, index) => {
                            const fLap = formatTime(lap);
                            const fTotal = formatTime(totalLapsTime - laps.slice(index + 1).reduce((a,b) => a+b, 0));
                            return (
                                <li key={index} className="flex justify-between items-center bg-slate-700 p-2 rounded-md font-mono">
                                    <span className="font-semibold text-slate-300">Lap {laps.length - index}</span>
                                    <span className="text-sky-400">{fLap.minutes}:{fLap.seconds}.{fLap.milliseconds}</span>
                                    <span className="text-yellow-400">{fTotal.minutes}:{fTotal.seconds}.{fTotal.milliseconds}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
            <div className="mt-6"><AdBanner /></div>
        </>
    );
};

export default StopwatchPage;
