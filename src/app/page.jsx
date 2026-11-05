import { INITIAL_IBANI_SONGS } from '../data/ibaniSongs';
import IbaniMusicApp from './IbaniMusicApp';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const songParam = params?.v || params?.song;

  const song = songParam
    ? INITIAL_IBANI_SONGS.find(s => s.youtubeId === songParam || s.id === songParam)
    : null;

  if (song) {
    const title = `${song.title} — Ibani Music`;
    const description = `Listen to "${song.title}" by ${song.artist}. Authentic indigenous Ibani cultural song from Grand Bonny and Opobo Kingdoms.`;
    const thumbnail = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`;
    const videoEmbed = `https://www.youtube.com/embed/${song.youtubeId}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'video.other',
        siteName: 'Ibani Music',
        images: [
          {
            url: thumbnail,
            width: 480,
            height: 360,
            alt: song.title,
          },
        ],
        videos: [
          {
            url: videoEmbed,
            secureUrl: videoEmbed,
            type: 'text/html',
            width: 1280,
            height: 720,
          },
        ],
      },
      twitter: {
        card: 'player',
        title,
        description,
        images: [thumbnail],
        players: [
          {
            playerUrl: videoEmbed,
            streamUrl: videoEmbed,
            width: 1280,
            height: 720,
          },
        ],
      },
    };
  }

  // Fallback metadata for general site sharing
  const defaultTitle = 'Ịbạnị Nume — Ibani Songs & Indigenous Music Videos';
  const defaultDesc = 'Enjoy Ibani nume, traditional folklore, rhythms, and cultural music of the Ibani people from the Niger Delta.';
  const defaultThumb = 'https://img.youtube.com/vi/d_mgJAiEw1w/hqdefault.jpg';

  return {
    title: defaultTitle,
    description: defaultDesc,
    openGraph: {
      title: defaultTitle,
      description: defaultDesc,
      type: 'website',
      siteName: 'Ibani Music',
      images: [
        {
          url: defaultThumb,
          width: 480,
          height: 360,
          alt: 'Ibani Music',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: defaultTitle,
      description: defaultDesc,
      images: [defaultThumb],
    },
  };
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const songParam = params?.v || params?.song;

  return <IbaniMusicApp initialSongParam={songParam} />;
}
