<template>
        <div>
                <span class="icon-list" @click="isShow = !isShow">{{musicList.length}}</span>
               <div v-if="isShow" class="musicList">
                    <span @click="isShow = !isShow" class="musicList-close">关闭</span>
                    <div class="musicList-head">
                        <div class="musicList-head-left">
                            <h4>播放列表({{musicList.length}})</h4>
                            <span @click="clearMusic" class="musicList-clear">清除</span>
                        </div>
                        <div class="musicList-head-right">
                            {{curSong.name}}
                        </div>
                    </div>
                    
                    <div class="musicList-body">
                        <div class="musicList-body-content">
                            <ul>
                                 <li v-for="song in musicList" :key="song.id" @click="playMusic(song)" 
                                 :class="['musicList-li', curSong.id === song.id && 'musicList-li-current' ]">
                                        <span>{{song.name}}</span>
                                        <span @click="onDelete($event, song)" class="musicList-li-delete">删除</span>
                                    </li>
                                
                            </ul>
                        </div>
                        <div class="lyric">todo</div>
                    </div>
                </div>
              
            </div>
</template>
<script>

export default {
  name: 'MusicList',
  data() {
      return {
           isShow: false
      }
  },
 props: {
     musicList: { type: Array, default: () => []},
     deleteMusic: { type: Function, default: () => () => {}},
     playMusic: { type: Function, default: () => () => {}},
     clearMusic: { type: Function, default: () => () => {}},
     curSong: { type: Object, default: () => ({})},
 },
 methods:{
       onDelete(e, song) {
        e.stopPropagation();
        this.deleteMusic(song);
    }
 }
}
</script>
<style lang="scss" scoped>
@import './music_list.scss';
</style>
