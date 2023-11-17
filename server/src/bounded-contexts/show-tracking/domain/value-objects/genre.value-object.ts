export class Genre {
  name: string;

  static existingGenres = [
    'Action & Adventure',
    'Animation',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama ',
    'Kids',
    'Mystery',
    'News',
    'Reality',
    'Sci-Fi & Fantasy',
    'Soap',
    'Talk',
    'War & Politics',
    'Western',
  ];

  constructor(name: string) {
    if (!Genre.existingGenres.includes(name)) {
      throw new Error('Genre is invalid');
    }
    this.name = name;
  }
}
