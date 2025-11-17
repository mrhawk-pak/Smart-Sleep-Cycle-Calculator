import React, { useState, useEffect, useRef } from 'react';
import AdBanner from './AdBanner';

type Mode = 'wake-up' | 'bed-time';

const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

// Helper to format the "HH:mm" state string into a user-friendly AM/PM format
const formatDisplayTime = (time24: string) => {
    if (!time24) return "--:-- --";
    const [hours, minutes] = time24.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};


const HomePage: React.FC = () => {
    const [mode, setMode] = useState<Mode>('wake-up');
    const [time, setTime] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const timeInputRef = useRef<HTMLInputElement>(null);

    // For the date display at the top
    useEffect(() => {
        const timerId = setInterval(() => setCurrentDate(new Date()), 60000); // Update once a minute
        return () => clearInterval(timerId);
    }, []);

    const calculateTimes = () => {
        if (!time) return;
        const [hours, minutes] = time.split(':').map(Number);
        
        const baseTime = new Date();
        baseTime.setHours(hours, minutes, 0, 0);

        const newResults: string[] = [];
        const sleepCycle = 90;
        const fallAsleepTime = 15;

        // Always calculate for 1 to 6 cycles
        for (let i = 1; i <= 6; i++) {
            const targetTime = new Date(baseTime.getTime());
            if (mode === 'wake-up') { // Calculate WAKE UP times from a bed time
                targetTime.setMinutes(targetTime.getMinutes() + fallAsleepTime + (sleepCycle * i));
            } else { // 'bed-time', Calculate BED times from a wake up time
                targetTime.setMinutes(targetTime.getMinutes() - fallAsleepTime - (sleepCycle * i));
            }
            newResults.push(formatTime(targetTime));
        }
        
        // For bed times, it's more useful to see the latest time you can go to sleep first.
        if (mode === 'bed-time') {
            newResults.reverse();
        }
        setResults(newResults);
    };

    const handleSleepNow = () => {
        const newResults: string[] = [];
        const sleepCycle = 90;
        const fallAsleepTime = 15;

        // Calculate wake up times starting from now + fall asleep time
        const bedTime = new Date();
        bedTime.setMinutes(bedTime.getMinutes() + fallAsleepTime);

        for (let i = 1; i <= 6; i++) {
            const wakeUpTime = new Date(bedTime.getTime());
            wakeUpTime.setMinutes(wakeUpTime.getMinutes() + sleepCycle * i);
            newResults.push(formatTime(wakeUpTime));
        }
        setResults(newResults);
        setMode('wake-up'); // We've calculated wake up times, so switch to that view
    };
    
    useEffect(() => {
        // Set default time on mount to current time
        const now = new Date();
        const currentTimeString = now.toTimeString().substring(0, 5);
        setTime(currentTimeString);
    }, []);

    const handleClockClick = () => {
        if (timeInputRef.current) {
            try {
                // Programmatically open the native time picker
                timeInputRef.current.showPicker();
            } catch (error) {
                console.error("Browser does not support showPicker():", error);
            }
        }
    };

    return (
        <>
            <header className="text-center my-6 animate-fade-in-up">
                <h1 className="text-3xl sm:text-4xl line-height-tight font-extrabold text-yellow-400" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.4)' }}>Smart Sleep Cycle Calculator</h1>
                <p className="text-sm sm:text-base font-medium text-slate-400 mt-2">{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-sm sm:text-base font-medium text-zinc-400 mt-2">Wake up refreshed by aligning your sleep with natural cycles.</p>

                <div className="text-xs sm:text-sm text-center text-zinc-400 mt-4 p-2 bg-slate-800 border border-slate-700 rounded-lg flex justify-center items-center gap-4">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span><strong className="text-yellow-400 font-bold">Cycle:</strong> 90 min</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7" /></svg>
                        <span><strong className="text-yellow-400 font-bold">Fall Asleep:</strong> 15 min</span>
                    </div>
                </div>
            </header>

            <div className="my-4"><AdBanner /></div>

            <main className="bg-slate-800 dark:bg-slate-900 p-4 sm:p-6 rounded-xl shadow-2xl space-y-6">
                <div className="bg-slate-700/50 dark:bg-slate-800/50 p-1 rounded-lg flex gap-2">
                    <button onClick={() => setMode('wake-up')} className={`flex-1 py-3 px-2 sm:px-4 text-sm font-semibold rounded-md transition-all ${mode === 'wake-up' ? 'bg-yellow-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>When to Wake Up</button>
                    <button onClick={() => setMode('bed-time')} className={`flex-1 py-3 px-2 sm:px-4 text-sm font-semibold rounded-md transition-all ${mode === 'bed-time' ? 'bg-yellow-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>When to Go to Sleep</button>
                </div>

                <div className="text-center">
                    <label className="block text-slate-400 dark:text-slate-300 mb-4 text-base sm:text-lg font-medium">{mode === 'wake-up' ? 'If I go to bed at...' : 'If I want to wake up at...'}</label>
                    <button 
                        onClick={handleClockClick}
                        className="text-3xl sm:text-4xl font-bold text-sky-400 bg-slate-900 text-center w-52 sm:w-60 py-3 rounded-xl border-2 border-slate-700 focus:border-sky-500 focus:outline-none cursor-pointer hover:border-sky-400 transition-colors"
                        style={{ boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)' }}
                        aria-label={`Selected time: ${formatDisplayTime(time)}. Click to change.`}
                    >
                        {formatDisplayTime(time)}
                    </button>
                    <input 
                        ref={timeInputRef}
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        type="time" 
                        className="w-0 h-0 opacity-0 absolute"
                        aria-hidden="true"
                        tabIndex={-1}
                    />
                </div>

                <div className="flex flex-col gap-4 pt-4">
                    <button onClick={calculateTimes} className="w-full bg-sky-600 hover:bg-sky-500 text-white py-3 px-4 rounded-lg font-semibold text-base sm:text-lg transition-all active:scale-[0.98] shadow-lg shadow-sky-600/30">Calculate</button>
                    <button onClick={handleSleepNow} className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 py-3 px-4 rounded-lg font-semibold transition-all active:scale-[0.98]">... or if I Sleep Now</button>
                </div>

                {results.length > 0 && (
                    <div className="border-t border-slate-700 pt-6 space-y-3">
                        <h3 className="text-center font-bold text-yellow-400 text-base sm:text-lg">{mode === 'wake-up' ? 'Optimal Wake Up Times' : 'Optimal Bed Times'}</h3>
                        {results.map((result, index) => {
                            const cycles = mode === 'bed-time' ? 6 - index : index + 1;
                            const isBest = cycles === 6; // 9 hours
                            const isGood = cycles === 5; // 7.5 hours
                            return (
                                <React.Fragment key={index}>
                                    <div className={`relative rounded-xl p-4 shadow-md flex justify-between items-center transition-all
                                        ${isBest ? 'bg-slate-700 border-2 border-sky-500' : isGood ? 'bg-slate-700 border-2 border-green-500' : 'bg-slate-800 border border-slate-700'}`}>
                                        <span className={`text-2xl sm:text-3xl font-bold ${isBest ? 'text-sky-400' : isGood ? 'text-green-400' : 'text-yellow-400'}`}>{result}</span>
                                        <div className="text-right">
                                            <p className="text-xs sm:text-sm font-semibold text-slate-300">{cycles} cycle{cycles > 1 ? 's' : ''}</p>
                                            <p className="text-[10px] sm:text-xs text-slate-400">({(1.5 * cycles).toFixed(1)} hours of sleep)</p>
                                        </div>
                                        {isBest && <span className="absolute top-2 right-2 bg-sky-500 text-slate-900 px-2 py-1 text-xs font-bold rounded-full">BEST</span>}
                                        {isGood && <span className="absolute top-2 right-2 bg-green-500 text-slate-900 px-2 py-1 text-xs font-bold rounded-full">GOOD</span>}
                                    </div>
                                    {index === 2 && <AdBanner />}
                                </React.Fragment>
                            )
                        })}
                    </div>
                )}
            </main>

            <div className="text-center my-6">
                <a href="mailto:umairyt605@gmail.com" className="text-sm text-slate-400 hover:text-sky-400 transition font-medium">Contact: umairyt605@gmail.com</a>
            </div>
            <div className="my-4"><AdBanner /></div>

            <footer className="text-center mt-4 text-slate-500 text-xs">Copyright © 2025 | Made ❤️ by Umair Mashwani</footer>
        </>
    );
};

export default HomePage;