export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
}

interface CacheResponse {
    data: YouTubeVideo[];
    cached: boolean;
    timestamp: number;
    stale?: boolean;
}

/**
 * Fetch work songs from cached server API endpoint
 * This reduces YouTube API quota usage by caching results for 12 hours
 */
export const fetchWorkSongs = async (category: string): Promise<YouTubeVideo[]> => {
    try {
        const response = await fetch(`/api/youtube-cache?category=${encodeURIComponent(category)}`);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch songs: ${response.statusText}`);
        }

        const result: CacheResponse = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
};
