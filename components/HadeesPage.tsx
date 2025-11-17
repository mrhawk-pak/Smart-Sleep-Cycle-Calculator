
import React from 'react';
import { hadeesList } from '../constants/hadees';

interface HadeesPageProps {
    onBack: () => void;
}

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button onClick={onClick} className="inline-flex items-center gap-2 bg-slate-800 text-yellow-400 py-2 px-4 rounded-lg text-sm font-semibold mb-4 transition hover:bg-slate-700 active:translate-x-[-2px]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        Back to Home
    </button>
);

const HadeesPage: React.FC<HadeesPageProps> = ({ onBack }) => {
    return (
        <>
            <div className="mt-8 p-4 sm:p-6 bg-slate-900 rounded-2xl shadow-2xl">
                <BackButton onClick={onBack} />
                <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>100+ Authentic Hadiths About Sleep & Dreams</h2>
                <div className="space-y-4">
                    {hadeesList.map((hadees, index) => (
                        <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 shadow-lg border border-slate-600 text-slate-300 text-sm sm:text-base leading-relaxed">
                            <strong className="text-yellow-400 font-bold">{index + 1}.</strong> {hadees}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HadeesPage;
