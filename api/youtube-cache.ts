// Vercel Serverless Function types
interface VercelRequest {
  method?: string;
  query: Record<string, string | string[] | undefined>;
  body?: any;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
}

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
}

interface CacheEntry {
  data: YouTubeVideo[];
  timestamp: number;
}

// In-memory cache (will be shared across requests in the same instance)
const cache: Record<string, CacheEntry> = {};

// Cache duration: 12 hours (43200000 ms)
const CACHE_DURATION = 12 * 60 * 60 * 1000;

const getKeywordForCategory = (category: string): string => {
  switch (category) {
    case '출근': return '출근길 신나는 노래';
    case '코어타임': return '집중력 높이는 음악';
    case '야근': return '야근할 때 듣는 편안한 노래';
    case '멘탈': return '멘탈 케어 힐링 음악';
    case '퇴근': return '퇴근길 팝송';
    default: return '직장인 노동요';
  }
};

const fetchFromYouTube = async (apiKey: string, keyword: string): Promise<YouTubeVideo[]> => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(keyword)}&type=video&maxResults=10&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('YouTube API Error:', data);
      throw new Error(data.error?.message || 'Failed to fetch from YouTube API');
    }

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    throw error;
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { category } = req.query;

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category parameter is required' });
  }

  const apiKey = process.env.VITE_YOUTUBE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'YouTube API key is not configured' });
  }

  const keyword = getKeywordForCategory(category);
  const cacheKey = category;

  // Check cache
  const cached = cache[cacheKey];
  const now = Date.now();

  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    // Return cached data
    return res.status(200).json({
      data: cached.data,
      cached: true,
      timestamp: cached.timestamp,
    });
  }

  // Cache expired or doesn't exist, fetch from YouTube
  try {
    const videos = await fetchFromYouTube(apiKey, keyword);
    
    // Update cache
    cache[cacheKey] = {
      data: videos,
      timestamp: now,
    };

    return res.status(200).json({
      data: videos,
      cached: false,
      timestamp: now,
    });
  } catch (error: any) {
    // If fetch fails but we have stale cache, return stale cache
    if (cached) {
      console.warn('YouTube API failed, returning stale cache');
      return res.status(200).json({
        data: cached.data,
        cached: true,
        stale: true,
        timestamp: cached.timestamp,
      });
    }

    return res.status(500).json({
      error: 'Failed to fetch YouTube videos',
      message: error.message,
    });
  }
}

