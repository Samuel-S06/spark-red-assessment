import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const API_KEY = process.env.TMDB_API_KEY;
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'TMDB_API_KEY not set.' },
      { status: 500 }
    );
  }
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`;

  try {
    const res = await fetch(url);
    const m = await res.json();
    if (m.success === false) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }
    const cast = (m.credits?.cast ?? [])
      .slice(0, 8)
      .map((c: { name: string }) => c.name);
    const out = {
      id: m.id,
      title: m.title,
      desc: m.overview,
      img: m.poster_path
        ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
        : '/file.svg',
      backdrop: m.backdrop_path
        ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
        : null,
      rating: m.vote_average,
      year: m.release_date?.split('-')[0] ?? 'N/A',
      runtime: m.runtime,
      genres: (m.genres ?? []).map((g: { name: string }) => g.name),
      cast,
    };
    return NextResponse.json(out);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
