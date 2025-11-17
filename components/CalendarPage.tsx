import React, { useState, useMemo } from 'react';
import AdBanner from './AdBanner';

interface CalendarPageProps {
    onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold mb-4 transition hover:bg-slate-700 active:translate-x-[-2px]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Home
    </button>
);

const CalendarPage: React.FC<CalendarPageProps> = ({ onBack }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const daysInMonth = useMemo(() => {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const days = [];
        while (date.getMonth() === currentDate.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [currentDate]);

    const firstDayOfMonth = useMemo(() => {
        return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    }, [currentDate]);

    const changeMonth = (amount: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + amount);
            return newDate;
        });
    };

    const today = new Date();

    const hijriDateString = useMemo(() => {
        try {
            // Using browser's built-in Intl API for robust Hijri date conversion.
            const hijriFormatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            return hijriFormatter.format(selectedDate);
        } catch (error) {
            console.error("Error creating Hijri date:", error);
            // Return null if Intl API fails (e.g., unsupported browser)
            return null;
        }
    }, [selectedDate]);


    return (
        <>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">Calendar</h2>
            <AdBanner />
            
            <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
                <div className="bg-slate-700 p-4 rounded-lg text-center shadow-inner">
                    <p className="text-lg sm:text-xl font-bold text-yellow-400">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {hijriDateString && (
                        <p className="text-md sm:text-lg text-sky-300 mt-1">
                            {hijriDateString}
                        </p>
                    )}
                </div>

                <div className="bg-slate-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-slate-700">&lt;</button>
                        <h3 className="font-bold text-base sm:text-lg text-yellow-400">
                            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-slate-700">&gt;</button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm font-semibold text-slate-400 mb-2">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <div key={day}>{day}</div>)}
                    </div>

                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-sm">
                        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`}></div>)}
                        {daysInMonth.map(day => {
                            const isToday = day.toDateString() === today.toDateString();
                            const isSelected = day.toDateString() === selectedDate.toDateString();
                            return (
                                <span
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={`p-2 rounded-full cursor-pointer transition-colors flex justify-center items-center h-8 w-8 sm:h-10 sm:w-10
                                        ${isSelected ? 'bg-yellow-500 text-slate-900 font-bold' : ''}
                                        ${!isSelected && isToday ? 'bg-sky-500 text-slate-900 font-bold' : ''}
                                        ${!isSelected && !isToday ? 'hover:bg-slate-700' : ''}
                                    `}
                                >
                                    {day.getDate()}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <button onClick={() => { setCurrentDate(new Date()); setSelectedDate(new Date()); }} className="w-full bg-sky-600 hover:bg-sky-500 text-white py-2 rounded-lg font-semibold transition-all active:scale-95">Go to Today</button>
            </div>
        </>
    );
};

export default CalendarPage;