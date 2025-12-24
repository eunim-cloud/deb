export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    channelTitle: string;
}

export const fetchWorkSongs = async (apiKey: string, keyword?: string): Promise<YouTubeVideo[]> => {
    const query = keyword || "직장인 노동요"; // Office worker work songs
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            // Log detailed error for debugging
            console.error('YouTube API Error:', data);
            throw new Error(data.error?.message || 'Failed to fetch from YouTube API');
        }

        if (!data.items) {
            return [];
        }

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title, // HTML entities might be returned, might need decoding if React doesn't handle it
            thumbnail: item.snippet.thumbnails.medium.url,
            channelTitle: item.snippet.channelTitle,
        }));
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
};
