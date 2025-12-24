
import React from 'react';
import { WorkerCard } from '../types';

interface EmpathyCardProps {
  card: WorkerCard;
}

const EmpathyCard: React.FC<EmpathyCardProps> = ({ card }) => {

  return (
    <div className="bg-white border-2 border-black rounded-lg overflow-hidden shadow-2xl aspect-[3/4] flex flex-col p-8 relative">
      {/* Quote at Top */}
      <div className="flex-none mb-8">
        <div className="serif text-2xl font-bold leading-snug text-center px-4 whitespace-pre-line">
          <span className="text-3xl font-serif text-gray-400">"</span>
          {card.quote}
          <span className="text-3xl font-serif text-gray-400">"</span>
        </div>
      </div>

      {/* Illustration in Middle */}
      <div className="flex-grow flex items-center justify-center relative bg-white border border-gray-100 rounded-md">
        {card.imageUrl ? (
          <img 
            src={card.imageUrl} 
            alt={card.description} 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-300">
            <i className="fa-solid fa-image text-3xl mb-2"></i>
            <p className="text-[10px] uppercase tracking-widest font-bold">이미지 준비 중</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex-none mt-8 text-center border-t border-gray-100 pt-4">
        <p className="text-[10px] text-gray-400 font-mono tracking-widest">
          #OFFICE_LIFE #ID_{card.id.toString().padStart(2, '0')}
        </p>
        <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold">
          Office Worker Random Draw
        </p>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-4 right-4 text-[10px] font-bold text-gray-300 rotate-45">
        LIMITED EDITION
      </div>
    </div>
  );
};

export default EmpathyCard;
