
import React, { useState, useRef, useEffect } from 'react';
import AdBanner from './AdBanner';

// Base64 encoded simple alarm sound to avoid external files
const alarmSound = "data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU9vT19AAAAA//8=/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v//v/v-/";

interface TimerPageProps {
    onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold mb-4 transition hover:bg-slate-700 active:translate-x-[-2px]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Home
    </button>
);

const TimerInput: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }> = ({ value, onChange, placeholder }) => (
    <input
        type="number"
        min="0"
        max={placeholder === 'HH' ? "99" : "59"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-16 h-16 sm:w-20 sm:h-20 text-center text-3xl sm:text-4xl font-semibold bg-slate-700 text-yellow-400 border-2 border-slate-600 rounded-lg focus:border-sky-500 focus:outline-none"
    />
);

const TimerPage: React.FC<TimerPageProps> = ({ onBack }) => {
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('05');
    const [seconds, setSeconds] = useState('00');
    const [remaining, setRemaining] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (isRunning) {
            timerRef.current = setInterval(() => {
                setRemaining(prev => {
                    if (prev <= 1) {
                        handleStop();
                        playAlarm();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isRunning]);

    const playAlarm = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(alarmSound);
        }
        audioRef.current.play();
    };

    const handleStart = () => {
        const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        if (totalSeconds > 0) {
            setRemaining(totalSeconds);
            setIsRunning(true);
        }
    };

    const handleStop = () => {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const handleReset = () => {
        handleStop();
        setRemaining(0);
        setHours('00');
        setMinutes('05');
        setSeconds('00');
    };
    
    const formatTime = (totalSeconds: number) => {
        const h = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const s = String(totalSeconds % 60).padStart(2, '0');
        return { h, m, s };
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        if (/^\d{0,2}$/.test(value)) {
            setter(value.padStart(2, '0'));
        }
    }

    const displayTime = formatTime(remaining);
    const isEditing = !isRunning && remaining === 0;

    return (
        <>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">Timer</h2>
            <AdBanner />
            <div className="bg-slate-800 p-4 sm:p-8 rounded-xl shadow-2xl space-y-8 text-center">
                <div className="flex justify-center items-center space-x-1 sm:space-x-2 font-mono font-bold text-yellow-400 bg-slate-900 p-4 rounded-lg shadow-inner border border-slate-700">
                    {isEditing ? (
                        <>
                            <TimerInput value={hours} onChange={e => handleInputChange(setHours, e.target.value)} placeholder="HH"/>
                            <span className="text-3xl sm:text-4xl">:</span>
                            <TimerInput value={minutes} onChange={e => handleInputChange(setMinutes, e.target.value)} placeholder="MM"/>
                            <span className="text-3xl sm:text-4xl">:</span>
                            <TimerInput value={seconds} onChange={e => handleInputChange(setSeconds, e.target.value)} placeholder="SS"/>
                        </>
                    ) : (
                        <span className="text-4xl sm:text-5xl">{displayTime.h}:{displayTime.m}:{displayTime.s}</span>
                    )}
                </div>
                <div className="flex justify-center space-x-2 sm:space-x-4">
                     {!isRunning ? (
                        <button onClick={handleStart} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95">Start</button>
                    ) : (
                        <button onClick={handleStop} className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95">Pause</button>
                    )}
                    <button onClick={handleReset} className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 px-4 sm:px-6 rounded-lg font-semibold transition-all active:scale-95">Reset</button>
                </div>
            </div>
            <div className="mt-6"><AdBanner /></div>
        </>
    );
};

export default TimerPage;
