import {API} from '@/plugin/http/apis'

export const playMusic = 'playMusic';
export const deleteMusic = 'deleteMusic';
export const addMusic = 'addMusic';
export const playAndAdd = 'playAndAdd';
export const clearMusic = 'clearMusic';
export const musicList = 'musicList';
export const curSong = 'curSong';


const state = {
    musicList: [],
    curSong: {
        url: 'http://m7.music.126.net/20200202223347/d594f13cac6a398670e050cc5d8689c5/ymusic/465b/da1f/7e9a/7c3f24036d2ee7c12a01e6579b78f4dd.mp3'
    }
}
const initState = {
    musicList: []
}

const getters = {
    musicList: state => state.musicList,
    curSong: state => state.curSong,
}
/// action 可以异步
const actions = {
    [deleteMusic]({commit}, song) {
        commit(deleteMusic, song);
    },
    async [playAndAdd]({commit}, song)  {
        let curSong = await API.getSongUrl(song.id);
        curSong = {
            ...curSong,
            name: song.name,
            picUrl: song.picUrl || song.al.picUrl
        }
        commit(addMusic, curSong);
        commit(playMusic, curSong);
    },
    [clearMusic]({commit}) {
        commit(clearMusic);
    },
    [playMusic]({commit}, song) {
        commit(playMusic, song);
    },
    [addMusic]({commit}, song) {
        commit(addMusic, song);
    },
}
// 严格应该使用深拷贝
const mutations = {
    [addMusic](state, song) {
        const { musicList} = state;
         if (!musicList.find(r => r.id === song.id)) {
            state.musicList = [...musicList, song];
        }
    },
    [deleteMusic](state, song) {
        const { musicList} = state;
        state.musicList = musicList.filter(r => r.id != song.id)
    },
    [clearMusic](state) {
        state.musicList = []
    },
    [playMusic](state, song) {
        state.curSong = song;
    }
}

export default {
    getters,
    actions,
    mutations,
    state,
    initState,
    namespaced: true
}
