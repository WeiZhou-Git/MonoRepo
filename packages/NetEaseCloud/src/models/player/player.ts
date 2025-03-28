import { PlayMode, Level } from "./check"

export interface PlayerParams {
	container: string,
}

export interface PlaySongParams {
    songName: string,
    mediaType: string
}

export interface getAlbumListParams {
    albumId: string
}

export interface PlaySingerParams {
    singer: string
}

export interface PlaySingerSongParams {
    mediaName: string,
    artistName: string
    mediaType: string,
}

export interface PlaySingerTypeSongParams{
    mediaName: string,
    artistName: string
}

export interface PlayTypeParams{
    mediaName: string,
}

export interface PlayRankingParams {
    mediaName: string,
}

export interface PlayLanguageParams {
    mediaName: string,
}


export interface SongList {
    id: string,
    songName: string
}

export interface SongUrlParams {
    songId: string,
    level: string
}

export interface getSongPlayUrlParams {
    songId: string,
    bitrate: number,
    level: string
}

export interface PlaySongListParams {
    songList: SongList[] | void,
    playMode: PlayMode
}

export interface PlayerState {
    songList: SongList[] | void,
    orderSongList: SongList[] | void,
    playMode: PlayMode,
    currSongId: string,
    level: string
}

export interface ChangeQualityParams{
    level: Level
}

