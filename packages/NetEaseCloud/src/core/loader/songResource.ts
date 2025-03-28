
import { VoiceParams } from '../../models/state/state'
import {
    SongList,
    PlaySongParams, 
    getAlbumListParams, 
    PlaySingerParams, 
    PlaySingerSongParams, 
    PlaySingerTypeSongParams, 
    PlayTypeParams, 
    PlayRankingParams, 
    PlayLanguageParams,
    SongUrlParams,
    getSongPlayUrlParams
} from '../../models/player/player';

import { MusicLevel } from '../../models/player/check';
import { voiceSearchSong, getAlbumList, getSongDetail, getMusicQurlity, getSongPlayUrl } from '../../api/api'


/**
 * 歌曲资源
 * 
 */
export class SongResource {
    /**
     * 语音搜索
     * @param params 业务参数 mediaType = "0" (mediaType = 0 为模糊搜索)
     * @returns 歌曲列表
     */
    async voiceSearchSong ({ mediaName, artistName, mediaType = "0" }: Partial<VoiceParams>) {
        return await voiceSearchSong({ mediaName, artistName, mediaType });
    }

    /**
     * 获取专辑列表
     * @param params {albumId: 专辑id}
     * @returns 专辑列表
     */
    async getAlbumList (params: getAlbumListParams): Promise<void> {
        try {
            let res = await getAlbumList(params)
            return res;
        } catch (error) {
            
        }
    }

    /**
     * 播放[歌名/专辑]
     * @param params 业务参数
     * @returns 歌曲/专辑列表
     */
    async playSong ({ songName, mediaType = "1" }: PlaySongParams): Promise<SongList[] | void> {
       try {
        let voiceList = await this.voiceSearchSong({
            mediaName: songName,
            mediaType: mediaType // 默认搜歌曲
        })

        switch (mediaType) {
            case '2': // 专辑
                if(!voiceList['albums']) return [];
                let albumId = voiceList['albums'][0]['id'];
                let albumList = await getAlbumList({ albumId })
                return albumList;
            default:
            case "1": // 歌曲
                return voiceList['songs'] || [];
        }
        
       } catch (error) {
            console.log(error, '播放歌曲部分出错')
       }
    }

    /**
     * 播放[歌手名]的歌
     * @param param 歌手名字
     * @returns 歌手歌曲列表
     */
    async playSinger ({ singer }: PlaySingerParams): Promise<void> {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName: singer,
                mediaType: '3' // 搜索歌手歌曲
            })
            return voiceList['songs'] || [];
        } catch (error) {
            console.log(error, '播放歌手歌曲部分出错')
            
        }

    }

    /**
     * 播放[歌手名]的 歌/专辑
     * @param param 歌手名字 
     * @returns 歌手歌曲列表
     */
    
    async playSingerSong ({ mediaName, mediaType = "1", artistName }: PlaySingerSongParams): Promise<void | object[]> {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName, 
                mediaType, 
                artistName
            })

            switch (mediaType) {
                case '2': // 专辑
                    if(!voiceList['albums']) return [];
                    let albumId = voiceList['albums'][0]['id'];
                    let albumList = await getAlbumList({ albumId })
                    return albumList;
                default:
                case "1": // 歌曲
                    return voiceList['songs'] || [];
            }
        } catch (error) {
            console.log(error, '播放歌手[歌曲/专辑]部分出错')
        }
    }

    /**
     * 播放[歌手]的[类型]的歌曲
     * @param param { 歌手， 类型 }
     * @returns 歌手[类型]歌曲列表
     */
    async playSingerTypeSong ({ artistName, mediaName  }: PlaySingerTypeSongParams): Promise<void | object[]> {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName: artistName + mediaName, // 泛词[类型]
            })

            return voiceList['songs'] || [];
        } catch (error) {
            console.log(error, '播放歌手[类型]部分出错')
        }
    }

     /**
     * 播放[类型]的歌曲
     * @param param { 类型 }
     * @returns [类型]歌曲列表
     */
    async playType ({ mediaName }: PlayTypeParams): Promise<void | object[]>  {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName: mediaName,  // 泛词[类型]
            })

            return voiceList['songs'] || [];
        } catch (error) {
            console.log(error, '播放歌手[类型]部分出错')
        }
    }

    /**
     * 播放[榜单]歌曲
     * @param params 榜单
     * @returns 歌曲列表 
     */
    async playRanking ({ mediaName }: PlayRankingParams): Promise<void | object[]> {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName: mediaName,  // 泛词[排行版]
            })

            return voiceList['songs'] || [];
        } catch (error) {
            console.log(error, '播放[榜单]部分出错')
        }
    }

    /**
     * 播放[语种]的歌曲
     * @param params 榜单
     * @returns 歌曲列表 
     */
    async playLanguage ({ mediaName }: PlayLanguageParams): Promise<void | object[]> {
        try {
            let voiceList = await this.voiceSearchSong({
                mediaName: mediaName,  // 泛词[语种]
            })

            return voiceList['songs'] || [];
        } catch (error) {
            console.log(error, '播放[语种]部分出错')
        }
    }


     /**
     * 播放[我的歌单|我的收藏]的歌曲 
     * （需用户ID）
     * @param params 榜单
     * @returns 歌曲列表 
     */
     async playMySongList (params: any): Promise<void | object[]> {
        try {
           
        } catch (error) {
            console.log(error, '播放[我的歌单|我的收藏]部分出错')
        }
    }
    
    /**
     * 获取歌曲详情
     * @param songId 歌曲ID
     * @returns 歌曲详情
     */
    async getSongDetail (songId: string) {
        try {
            return await getSongDetail({
                songId,
                withUrl: true, // 下发url
                qualityFlag: true, // 下发音质
                // level: 'standard'
                // extFlags: JSON.stringify({"hqScene":"standard"})
                // bitrate: 0
            })
        } catch (error) {
            console.log(error, '获取歌曲详情')
        }
    }

    /**
     * 获取歌曲音质
     * @param songId 歌曲ID
     * @returns 歌曲音质
     */
    async changeMusicQuality (songId: string) {
        try {
            return await getMusicQurlity({
                songId
            })
        } catch (error) {
            
        }
    }

    /**
     * 获取不同音质 歌曲url
     */

    async getSongPlayUrl (params: SongUrlParams) {
        try {
            const { songId, level } = params;
            let getUrlParams: Partial<getSongPlayUrlParams> = { songId }
            switch (level) {
                case MusicLevel["STANDARD"]: // 标准
                    getUrlParams['bitrate'] = 128;
                    break;
                case MusicLevel["HIGHER"]: //较高
                    getUrlParams['bitrate'] = 192;
                    break;
                case MusicLevel["EXHIGH"]: // 极高
                    getUrlParams['bitrate'] = 320;
                    break;
                case MusicLevel['LOSSLESS']: // 无损
                    getUrlParams['bitrate'] = 999;
                    break;
                case MusicLevel['HIRES']:  //hires
                    getUrlParams['bitrate'] = 1999;
                    break;
                // case 'jyEffectMusic':
                //     getUrlParams['level'] = 'jyeffect';
                //     break;
                // case 'jyMasterMusic':
                //     getUrlParams['level'] = 'jymaster';
                // case 'skMusic':
                //     getUrlParams['level'] = 'sky';
                // case 'dolbyMusic':
                // case 'vividMusic':       
                default:
                    return;
            }
            let songItem = await getSongPlayUrl(getUrlParams);
            if(level === songItem.level) {
                console.log('** 切换音质至 ' + level + ' **')
                return songItem.url;
            } else {
                console.log('## 切' + level + '音质失败 ##')
                return null;
            }
        } catch (error) {
            
        }
    }
}


export const songResource = new SongResource();