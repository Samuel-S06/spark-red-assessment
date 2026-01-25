import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'Action';
  
  const API_KEY = process.env.TMDB_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'TMDB_API_KEY not set. Add it to .env.local.' },
      { status: 500 }
    );
  }
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const transformedMovies = (data.results || []).map((m: any) => ({
      id: m.id,
      title: m.title,
      desc: m.overview,
      img: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '/file.svg',
      rating: m.vote_average,
      year: m.release_date?.split('-')[0] || 'N/A'
    }));

    return NextResponse.json(transformedMovies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}