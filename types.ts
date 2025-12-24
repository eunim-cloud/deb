export type Category = '출근' | '야근' | '멘탈' | '퇴근' | '코어타임';

export interface WorkerCard {
  id: number;
  quote: string;
  description: string;
  prompt: string;
  imageUrl?: string;
  categories?: Category[];
}

export interface RecommendedSong {
  title: string;
  channelName: string;
  thumbnail: string;
  videoId: string;
  reason?: string;
}
