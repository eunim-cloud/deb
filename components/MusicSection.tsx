import React from 'react';
import { RecommendedSong } from '../types';
import YouTubePlayer from './YouTubePlayer';

interface MusicSectionProps {
  song: RecommendedSong;
}

const MusicSection: React.FC<MusicSectionProps> = ({ song }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500">
          <i className="fa-brands fa-youtube"></i>
        </div>
        <h3 className="font-bold text-sm">오늘의 추천 노동요</h3>
      </div>

      <div className="flex flex-col gap-3">
        {/* YouTube Player */}
        <YouTubePlayer videoId={song.videoId} />

        {/* Helper Text / Song Info */}
        <div className="flex flex-col justify-center min-w-0">
          <h4 className="text-sm font-bold line-clamp-2 leading-tight">
            {song.title}
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            {song.channelName}
          </p>
        </div>
      </div>

      {song.reason && (
        <div className="mt-3 bg-gray-50 p-3 rounded-xl">
          <p className="text-[11px] text-gray-600 leading-relaxed italic">
            <i className="fa-solid fa-quote-left text-[8px] mr-1 text-gray-400"></i>
            {song.reason}
          </p>
        </div>
      )}
    </div>
  );
};

export default MusicSection;
