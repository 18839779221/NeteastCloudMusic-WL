export interface CommonDateListModel<T> {
    data: T[],
    code: number,
}

export interface BannerResModel {
    banners: BannerModel[],
    code: number
}

export interface BannerModel {
    imageUrl: string,
    targetId: number,
    titleColor: string,
    typeTitle: string,
    url?: string,
}

export interface HotRecommendResModel {
    hasTaste: boolean,
    code: number,
    categroy: number,
    result: HotRecommendModel[]
}

export interface HotRecommendModel {
    id: number,
    type?: number,
    name: string,
    copywriter?: string,
    picUrl: string,
    canDislike: string,
    trackNumberUpdateTime: number,
    playCount: number,
    trackCount: number,
    highQuality: boolean,
    alg?: string
}

export interface ArtistResModel {
    artists: ArtistModel[],
    more: boolean,
    code: number
}

export interface ArtistModel {
    id: number,
    name: string,
    albumSize: number,
    alias?: string[],
    briefDesc?: string,
    followed: boolean,
    img1v1Id?: number,
    img1v1Id_str?: string,
    img1v1Url?: string,
    musicSize: number,
    picId: number,
    picId_str: string,
    picUrl: string,
    topicPerson?: number,
    trans?: string
}

export interface NewestAlbumModel {
    albums: AlbumModel[],
    code: number,
}

export interface AlbumModel {
    id: number,
    name: string,
    type: string,
    size: number,
    picId: number,
    picId_str: string,
    pic: number,
    picUrl: string,
    blurPicUrl: string,
    publishTime: number,
    description: string,
    tags: string,
    company: string,
    briefDesc: string,
    artist: ArtistModel,
    artists: ArtistModel[],
    songs?: string,
    alias?: string[],
    status: 1,
    copywriteId: number,
    paid: boolean,
    onSale: boolean,
}

// 合并到MusicDetailModel
// export interface MusicUrlModel {
//     id: number,
//     url: string,
//     br: number,
//     size: number,
//     md5: string,
//     code: number, 
//     expi: number,
//     type: string,
//     level: string
// }

export interface MusicDetailResModel {
    songs: MusicDetailModel[],
    code: 200
}

export interface MusicDetailModel {
    id: number,
    name: string,
    ar: ArtistModel[],
    alia: string[],
    tns: string[],
    publishTime: number,
    mv: number,
    pop: number,
    dt: number, //歌曲时长
    al: AlbumModel,
    url: string,
    br: number,
    size: number,
    md5: string,
    lyric?: string,
}

export interface LyricResModel {
    lrc: {
        version: number,
        lyric: string,
    },
    code: number,
}

export interface PlayListResModel {
    code: number,
    playlist: PlayListModel
}

export interface PlayListModel {
    id: number,
    name: string,
    coverImgId: number,
    coverImgUrl: string,
    userId: number,
    createTime: number,
    status: number,
    trackCount: number,
    playCount: number,
    subscribeCount: number,
    subscribers: UserInfoModel[],
    ordered: boolean,
    description: string,
    tags: string[],
    creator: UserInfoModel,
    tracks: MusicDetailModel[]
}

export interface UserInfoModel {
    defaultAvatar: boolean,
    authStatus: number,
    followed: boolean,
    followeds: number,
    follows: number,
    avatarUrl: string,
    accountStatus: boolean,
    gender: number,
    city: number,
    birthday: number,
    userId: number,
    userType: number,
    nickname: string,
    description: string,
    detailDescription: string,
    avatarImgId: number,
    backgroundImgId: number,
    backgroundUrl: string,
    playlistCount: number,
    playlistBeSubscribedCount: number,
    province: number,
}

export interface LoginResModel{
    loginType: number,
    code: number
    account?: AccountInfoModel,
    token?: string,
    cookie?: string,
    profile?: UserInfoModel
}

export interface AccountInfoModel {
    id: string,
    user_name: string,
    create_time: number,
    ban: number,
    status: number,
    salt?: string,
    vipType: number,
}
