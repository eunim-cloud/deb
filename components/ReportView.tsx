import React from 'react';
import { WorkerCard, RecommendedSong } from '../types';
import EmpathyCard from './EmpathyCard';
import MusicSection from './MusicSection';
import CorporateTranslator from './CorporateTranslator';

interface ReportViewProps {
    card: WorkerCard;
    song: RecommendedSong | null;
}

const ReportView: React.FC<ReportViewProps> = ({ card, song }) => {
    const today = new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-white p-6 md:p-8 rounded-sm shadow-xl border border-gray-200 relative max-w-lg w-full mx-auto" style={{ minHeight: '600px' }}>
            {/* Paper texture effect (optional simple background) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')] opacity-10 pointer-events-none"></div>

            {/* Header */}
            <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold font-serif tracking-tighter">일일 직장인 상태 보고서</h1>
                    <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Daily Status Report for Office Workers</p>
                </div>
                <div className="text-right">
                    <div className="border border-black px-2 py-1 inline-block">
                        <p className="text-[8px] font-bold text-center border-b border-black w-full mb-1">결 재</p>
                        <div className="flex gap-0">
                            <div className="w-12 h-12 flex items-center justify-center relative">
                                <span className="text-gray-300 text-xs">담당</span>
                            </div>
                            <div className="w-12 h-12 border-l border-black flex items-center justify-center relative">
                                <div className="absolute inset-0 flex items-center justify-center transform -rotate-12 opacity-80">
                                    <div className="border-2 border-red-600 rounded-full w-10 h-10 flex items-center justify-center p-1">
                                        <span className="text-red-600 font-bold text-[10px] text-center leading-none">운명<br />승인</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meta Data */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm font-mono border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">문서 번호</span>
                    <span className="font-bold">DOC-{new Date().getFullYear()}-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-gray-400 text-xs">작성일</span>
                    <span className="font-bold">{today}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">작성자</span>
                    <span className="font-bold">익명의 직장인</span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-gray-400 text-xs">상태 분류</span>
                    <span className="font-bold text-blue-600">
                        {card.categories ? card.categories.join(', ') : '일반'}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
                {/* Section 1: Visual Evidence */}
                <div className="space-y-2">
                    <h2 className="text-sm font-bold bg-black text-white px-2 py-1 inline-block">1. 현장 증거 사진</h2>
                    <div className="transform scale-90 sm:scale-100 origin-top-left transition-transform">
                        <EmpathyCard card={card} />
                    </div>
                </div>

                {/* Section 2: Prescription */}
                {song && (
                    <div className="space-y-2">
                        <h2 className="text-sm font-bold bg-black text-white px-2 py-1 inline-block">2. 긴급 처방 (노동요)</h2>
                        <MusicSection song={song} />
                    </div>
                )}

                {/* Section 3: Corporate Translation */}
                <div className="space-y-2">
                    <h2 className="text-sm font-bold bg-black text-white px-2 py-1 inline-block">3. 회사식 해석</h2>
                    <CorporateTranslator card={card} />
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm font-bold text-gray-500 mb-1">
                    진지하지 않습니다. 아무말이나 합니다.
                </p>
                <p className="text-xs text-gray-400">
                    아무 말이나 합니다. 생각보다 정확할 수도 있습니다.
                </p>
                <p className="font-serif font-bold italic text-gray-200 mt-4 text-lg">
                    CONFIDENTIAL
                </p>
            </div>
        </div>
    );
};

export default ReportView;

