
import React, { useState, useEffect, useMemo } from 'react';
import { cities, City } from '../constants/cities';
import AdBanner from './AdBanner';

interface WorldClockPageProps {
    onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold mb-4 transition hover:bg-slate-700 active:translate-x-[-2px]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Home
    </button>
);

const ClockCard: React.FC<{ city: City; onRemove: (city: City) => void }> = ({ city, onRemove }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const update = () => {
            const newTime = new Date().toLocaleTimeString('en-US', {
                timeZone: city.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setTime(newTime);
        };
        update();
        const intervalId = setInterval(update, 1000);
        return () => clearInterval(intervalId);
    }, [city.timezone]);
    
    return (
        <div className="bg-slate-800 rounded-lg p-3 flex justify-between items-center border-l-4 border-sky-500 shadow-md">
            <div>
                <p className="font-semibold text-sm sm:text-base text-yellow-400 flex items-center">
                    <span className={`flag-icon flag-icon-${city.countryCode.toLowerCase()} mr-3 shadow-sm`}></span>
                    {city.name}
                </p>
                <p className="text-xs text-slate-400 pl-8">{city.countryCode}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                 <p className="text-lg sm:text-xl font-mono font-bold text-sky-400">{time}</p>
                 <button onClick={() => onRemove(city)} className="text-slate-500 hover:text-red-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    )
};


const WorldClockPage: React.FC<WorldClockPageProps> = ({ onBack }) => {
    const [selectedCities, setSelectedCities] = useState<City[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        try {
            const savedCities = localStorage.getItem('worldClockCities');
            if (savedCities) {
                setSelectedCities(JSON.parse(savedCities));
            } else {
                 // Default cities on first load
                const defaultCityNames = ["New York", "London", "Tokyo", "Sydney"];
                const defaultCities = cities.filter(c => defaultCityNames.includes(c.name));
                setSelectedCities(defaultCities);
            }
        } catch (error) {
            console.error("Failed to load cities from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('worldClockCities', JSON.stringify(selectedCities));
        } catch (error) {
            console.error("Failed to save cities to localStorage", error);
        }
    }, [selectedCities]);

    const searchResults = useMemo(() => {
        if (!searchTerm) return [];
        return cities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            city.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 50);
    }, [searchTerm]);

    const addCity = (city: City) => {
        if (!selectedCities.some(sc => sc.name === city.name)) {
            setSelectedCities([...selectedCities, city]);
        }
        setSearchTerm('');
    };

    const removeCity = (cityToRemove: City) => {
        setSelectedCities(selectedCities.filter(city => city.name !== cityToRemove.name));
    };

    return (
        <>
            <BackButton onClick={onBack} />
            <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 text-center mb-6">World Clock</h2>
            <AdBanner />
            <div className="bg-slate-800 p-4 sm:p-6 rounded-xl shadow-2xl space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a city..."
                        className="w-full bg-slate-700 text-white placeholder-slate-400 p-3 rounded-lg border-2 border-slate-600 focus:border-sky-500 focus:outline-none"
                    />
                    {searchTerm && searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-slate-700 border border-slate-600 rounded-lg max-h-60 overflow-y-auto scrollbar-hide shadow-lg">
                            {searchResults.map(city => (
                                <button
                                    key={city.name}
                                    onClick={() => addCity(city)}
                                    className="w-full text-left p-3 hover:bg-slate-600 transition-colors flex items-center"
                                >
                                    <span className={`flag-icon flag-icon-${city.countryCode.toLowerCase()} mr-3`}></span>
                                    {city.name}, {city.countryCode}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    {selectedCities.map(city => (
                        <ClockCard key={city.name} city={city} onRemove={removeCity} />
                    ))}
                </div>
            </div>
            <div className="mt-6"><AdBanner /></div>
        </>
    );
};

export default WorldClockPage;
