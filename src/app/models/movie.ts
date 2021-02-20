export interface Movie {
    id: number,
    poster_path?: string,
    release_date: string,
    popularity: number,
    title: string,
    overview: string,
    is_favorite: boolean,
}