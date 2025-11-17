
import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import HadeesPage from './components/HadeesPage';
import StopwatchPage from './components/StopwatchPage';
import TimerPage from './components/TimerPage';
import WorldClockPage from './components/WorldClockPage';
import CalendarPage from './components/CalendarPage';

type Page = 'home' | 'hadees' | 'stopwatch' | 'timer' | 'world-clock' | 'calendar';

const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const clickCount = useRef(0);
    const popunderTriggered = useRef(false);

    const handleGlobalClick = () => {
        if (popunderTriggered.current) return;

        clickCount.current += 1;

        if (clickCount.current >= 4) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//hypothesisgarden.com/47/0c/a3/470ca313241d00de8f13abbe111e58bb.js';
            document.body.appendChild(script);
            popunderTriggered.current = true;
        }
    };

    const navigateTo = (targetPage: Page) => {
        setPage(targetPage);
        setIsMenuOpen(false);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage />;
            case 'hadees':
                return <HadeesPage onBack={() => navigateTo('home')} />;
            case 'stopwatch':
                return <StopwatchPage onBack={() => navigateTo('home')} />;
            case 'timer':
                return <TimerPage onBack={() => navigateTo('home')} />;
            case 'world-clock':
                return <WorldClockPage onBack={() => navigateTo('home')} />;
            case 'calendar':
                return <CalendarPage onBack={() => navigateTo('home')} />;
            default:
                return <HomePage />;
        }
    };

    return (
        <div onClick={handleGlobalClick} className="p-4">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl mx-auto relative">
                <div className="absolute top-0 right-0 z-50">
                    <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigateTo={navigateTo} />
                </div>
                {renderPage()}
            </div>
        </div>
    );
};

interface MenuProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
    navigateTo: (page: Page) => void;
}

export const MenuButton: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen, navigateTo }) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsMenuOpen]);

    const menuItems = [
        { label: 'Home', page: 'home', className: '' },
        { label: 'Hadees (100+)', page: 'hadees', className: 'text-yellow-400' },
        { label: 'Stopwatch', page: 'stopwatch', className: '' },
        { label: 'Timer', page: 'timer', className: '' },
        { label: 'World Clock', page: 'world-clock', className: '' },
        { label: 'Calendar', page: 'calendar', className: '' },
    ];

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 transition-all">
                <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 dark:bg-slate-900 rounded-lg shadow-xl border border-slate-700 overflow-hidden animate-menu-open">
                    {menuItems.map((item, index) => (
                         <MenuItem 
                            key={item.page}
                            onClick={() => navigateTo(item.page as Page)} 
                            className={item.className}
                            style={{ animationDelay: `${index * 40}ms` }}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </div>
            )}
        </div>
    );
};

const MenuItem: React.FC<{ onClick: () => void, className?: string, children: React.ReactNode, style?: React.CSSProperties }> = ({ onClick, className = '', children, style }) => (
    <button onClick={onClick} className={`w-full text-left px-4 py-3 text-sm hover:bg-slate-700 font-medium flex items-center gap-2 animate-menu-item ${className}`} style={style}>
        {children}
    </button>
);


export default App;