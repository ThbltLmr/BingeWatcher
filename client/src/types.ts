export type Show = {
  title: string,
  description: string,
  posterUrl: {value: string},
  numberOfSeasons: number,
  tmdbId: number,
  genres: string[],
}

export type WatchedShow = {
  show: Show,
  watchedSeasons: number,
}
