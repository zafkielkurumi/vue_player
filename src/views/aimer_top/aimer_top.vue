<template>
  <div class="aimer_top">
    <div class="artist_name">
      Aimer
      <span style="font-size: 17px' ">エメ</span>
    </div>
    <img  src="@assets/images/aimer.jpg" alt />
    <ul>
      <li
        v-for="(song, index) in songs"
        :key="song.id"
        class="song_title"
        :style="index % 2 === 0 ? 'background: #f7f7f7' : ''"
        @dblclick="playAndAdd(song)"
      >
        <span>{{index + 1}}</span>
        <span style="margin-right: 20px ">{{song.name}}</span>
        <a @click="addMusic(song)">添加</a>
        <a @click="playAndAdd(song)">播放</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { createNamespacedHelpers, } from 'vuex';
const {mapActions,  mapGetters } = createNamespacedHelpers('playMusic');
import { musicList, curSong, playAndAdd, addMusic } from '@/store/modules/play_music';
import {API} from '@/plugin/http/apis';
export default {
  name: "aimerTop",
  data() {
    return {
      aimer: "",
      songs: []
    };
  },
  mounted() {
       API.getTopSong('16152').then(songs => {
            this.songs = songs;
        });
  },
  methods: {
    ...mapActions([playAndAdd, addMusic]),
  },
  computed: {
    ...mapGetters([musicList, curSong])
  }
};
</script>
<style lang="scss" scoped>
@import "./aimer_top.scss";
</style>
