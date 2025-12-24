import React, { useMemo } from 'react';
import { WorkerCard } from '../types';
import { CORPORATE_TRANSLATIONS } from '../constants';

interface CorporateTranslatorProps {
    card: WorkerCard;
}

const CorporateTranslator: React.FC<CorporateTranslatorProps> = ({ card }) => {
    // Use useMemo to keep the specific translation stable for the same card instance
    // We incorporate card.id into the dependency so it changes when the card changes
    const translation = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * CORPORATE_TRANSLATIONS.length);
        return CORPORATE_TRANSLATIONS[randomIndex];
    }, [card.id]);



    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                    <i className="fa-solid fa-briefcase"></i>
                </div>
                <h3 className="font-bold text-sm">회사식 해석</h3>
            </div>

            <div className="flex flex-col gap-4">
                {/* Translation Part */}
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">회사식 번역</p>
                    <div className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">·</span>
                        <p className="text-sm font-medium text-gray-800">{translation}</p>
                    </div>
                </div>

                {/* Excuse Part */}

            </div>

            <p className="text-[10px] text-gray-400 text-right mt-2 italic">
                * 업무 맥락에 맞춰 자동 생성된 결과입니다.
            </p>
        </div>
    );
};

export default CorporateTranslator;
