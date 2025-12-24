
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { fetchWorkSongs, YouTubeVideo } from './api/youtube';
import { CARDS } from './constants';
import { WorkerCard, RecommendedSong, Category } from './types';
import ReportView from './components/ReportView';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<WorkerCard | null>(null);
  const [currentSong, setCurrentSong] = useState<RecommendedSong | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [selectedCategory, setSelectedCategory] = useState<Category>('출근');
  const [playlist, setPlaylist] = useState<YouTubeVideo[]>([]);
  // Cache playlists by category to avoid re-fetching
  const [playlistCache, setPlaylistCache] = useState<Record<string, YouTubeVideo[]>>({});

  const categories: Category[] = ['출근', '코어타임', '야근', '멘탈', '퇴근'];

  const [previewCard, setPreviewCard] = useState<WorkerCard | null>(null);

  const getKeywordForCategory = (category: Category): string => {
    switch (category) {
      case '출근': return '출근길 신나는 노래';
      case '코어타임': return '집중력 높이는 음악';

      case '야근': return '야근할 때 듣는 편안한 노래';
      case '멘탈': return '멘탈 케어 힐링 음악';
      case '퇴근': return '퇴근길 팝송';
      default: return '직장인 노동요';
    }
  };

  useEffect(() => {
    const loadSongs = async () => {
      // Check cache first
      if (playlistCache[selectedCategory] && playlistCache[selectedCategory].length > 0) {
        setPlaylist(playlistCache[selectedCategory]);
        return;
      }

      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey) {
        console.warn('YouTube API key is not set. Please set VITE_YOUTUBE_API_KEY in your .env.local file.');
        setIsLoading(false);
        return;
      }

      // Only show spinner for initial song load, not card draw
      if (!currentCard) setIsLoading(true);
      const keyword = getKeywordForCategory(selectedCategory);
      const songs = await fetchWorkSongs(apiKey, keyword);
      setPlaylist(songs);
      setPlaylistCache(prev => ({ ...prev, [selectedCategory]: songs }));
      setIsLoading(false);
    };
    loadSongs();
  }, [selectedCategory]);

  const getRandomSong = useCallback(() => {
    if (playlist.length === 0) {
      return {
        title: "직장인 노동요: 일하기 싫을 때 듣는 플레이리스트",
        channelName: "Essential",
        thumbnail: "https://img.youtube.com/vi/1_8yXm-oQ3Y/mqdefault.jpg",
        videoId: "1_8yXm-oQ3Y",
        reason: "가장 대중적인 노동요 플레이리스트입니다."
      };
    }
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const song = playlist[randomIndex];

    let reason = "오늘의 업무 효율을 책임질 노동요입니다!";
    if (selectedCategory === '야근') reason = "긴 밤을 함께해 줄 노동요입니다.";
    if (selectedCategory === '코어타임') reason = "최고의 몰입을 위한 플레이리스트입니다.";
    if (selectedCategory === '퇴근') reason = "수고한 당신을 위한 퇴근길 선곡!";

    return {
      title: song.title,
      channelName: song.channelTitle,
      thumbnail: song.thumbnail,
      videoId: song.id,
      reason: reason
    };
  }, [playlist, selectedCategory]);

  const handleDraw = async () => {
    setIsLoading(true);
    setPreviewCard(CARDS[0]); // Start with any card

    // Filter cards based on category
    let availableCards = CARDS.filter(card => card.categories?.includes(selectedCategory));

    if (availableCards.length === 0) availableCards = CARDS;

    // Shuffle animation
    const duration = 1500;
    const intervalTime = 80;
    const startTime = Date.now();

    await new Promise<void>(resolve => {
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= duration) {
          clearInterval(interval);
          resolve();
        } else {
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          setPreviewCard(availableCards[randomIndex]);
        }
      }, intervalTime);
    });

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const selectedCard = availableCards[randomIndex];

    setCurrentCard(selectedCard);
    setPreviewCard(null); // Clear preview

    const song = getRandomSong();
    setCurrentSong(song);

    setIsLoading(false);
  };

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      link.download = `office-draw-${currentCard?.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error("Save image failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    // Optional: Initial draw or show landing
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 pb-24">
      {/* Header */}


      {/* Main Content */}
      <main className="w-full max-w-md px-4 pt-6 flex flex-col gap-6 flex-grow">
        {!currentCard && !isLoading && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
              <div className="absolute w-20 h-28 bg-gray-200 border-2 border-gray-300 rounded-xl transform -rotate-6 animate-shuffle-left"></div>
              <div className="absolute w-20 h-28 bg-gray-200 border-2 border-gray-300 rounded-xl transform rotate-6 animate-shuffle-right"></div>
              <div className="absolute w-20 h-28 bg-white border-2 border-gray-400 rounded-xl shadow-lg z-10 flex items-center justify-center">
                <i className="fa-solid fa-question text-3xl text-gray-300"></i>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">오늘의 직장인 상태 보고</h2>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              지금 상태를 선택하고<br />
              버튼을 눌러 확인하세요!
            </p>
          </div>
        )}

        {isLoading && previewCard && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
            <i className="fa-solid fa-file-pen text-4xl mb-4 text-gray-400"></i>
            <div className="text-xl font-bold">보고서 작성 중...</div>
            <p className="text-gray-500 text-sm mt-2">당신의 상태보고서를 작성중입니다</p>
          </div>
        )}

        {isLoading && !previewCard && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">로딩 중...</p>
          </div>
        )}

        {currentCard && !isLoading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
            <div ref={cardRef}>
              <ReportView card={currentCard} song={currentSong} />
            </div>

            {/* Actions for Report */}
            <div className="flex gap-2">
              <button
                onClick={handleSaveImage}
                disabled={isSaving}
                className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
              >
                <i className={`fa-solid ${isSaving ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
                보고서 저장
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin} - ${currentCard.quote}`);
                  alert("링크가 복사되었습니다!");
                }}
                className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-all"
              >
                <i className="fa-solid fa-link"></i>
                보고서 공유
              </button>
            </div>

            <p className="text-center text-xs text-gray-400">
              * 위 보고서는 귀하의 정신 건강을 위해 작성되었습니다.
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Area */}
      <div className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-md border-t p-4 z-50 flex flex-col gap-4">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                ? 'bg-black text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          onClick={handleDraw}
          disabled={isLoading}
          className="w-full bg-black text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 font-bold flex items-center justify-center gap-3"
        >
          <i className="fa-solid fa-shuffle"></i>
          {currentCard ? '다시 뽑기' : '보고서 작성'}
        </button>
      </div>
    </div>
  );
};

export default App;
