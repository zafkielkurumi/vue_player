<template>
  <div class="bottom_box">
    <div class="bg">
      <audio ref="audio" :src="curSong.url"
      @play="onPlay"
      @pause="onPause"
      @timeupdate="onTimeUpdate"
      @canplay="onCanPlay"
      autoPlay
      ></audio>
      <div class="player">
        <div class="btns">
          <span @click="prevMusic" class="pre"></span>
          <span v-if="isPlay" @click="onPlayClick" class="pause"></span>
          <span v-else @click="onPlayClick" class="play"></span>
          <span @click="nextMusic" class="next"></span>
        </div>
        <img v-if="curSong.picUrl" class="avatar" :src="curSong.picUrl " alt />
        <img v-else class="avatar" src="@assets/images/aimer.jpg" alt />
        <div class="progress">
          <div class="top">
            <a href class="song_name">{{curSong ? curSong.name : '暂无播放歌曲'}}</a>
          </div>
          <div class="bottom">
            <div class="progressbar" ref="progressItem" @mousedown="progressMouseDown">
              <div :style="{width: `${bufferWidth}px`}" class="readeybar"></div>
              <div :style="{width: `${finishWidth}px`}" class="finishbar"></div>
              <div
                @mousedown="onMouseDown"
                v-drag="{onMouseMove: onMouseMove, onMouseEnd: onMouseEnd}"
                ref="pbar"
                :style="{transform: `translate3d(${finishWidth}px, -50%, 1px)` }"
                class="pbar"
              >
                <i></i>
              </div>
            </div>
            <div class="time">{{currentTime}} / {{totalTime}}</div>
          </div>
        </div>
        <div style="margin: 11px 0 0 20px; display: flex ">
          <Volume></Volume>
          <MusicList
            :musicList="musicList"
            :curSong="curSong"
            :playMusic="playMusic"
            :clearMusic="clearMusic"
            :deleteMusic="deleteMusic"
          ></MusicList>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const progressWidth = 493;
import MusicList from "./music_list.vue";
import Volume from "./volume.vue";
export default {
  name: "Player",
  data() {
    return {
      currentTime: "00:00",
      totalTime: "00:00",
      isPlay: false,
      bufferWidth: 0,
      finishWidth: 0,
      isDraging: false // 进度条是否在拖动中
    };
  },
  components: {
    MusicList,
    Volume
  },
  provide: function() {
    return {
      audio: this.$refs.audio
    };
  },
  props: {
    curSong: { type: Object, default: () => ({}) },
    musicList: { type: Array, default: () => [] },
    deleteMusic: { type: Function, default: () => () => {} },
    playMusic: { type: Function, default: () => () => {} },
    clearMusic: { type: Function, default: () => () => {} }
  },
  methods: {
    // 进度条拖动
    onMouseMove(pos) {
      this.isDraging = true;
      this.finishWidth =
        pos.x >= progressWidth ? progressWidth : pos.x <= 0 ? 0 : pos.x;
    },
    onMouseEnd() {
      const audio = this.$refs.audio;
      this.isDraging = false;
      if (this.curSong.id) {
        const currentTime = (audio.duration * this.finishWidth) / progressWidth;
        audio.currentTime = currentTime;
      }
    },
    // 秒转换-分:秒的格式
    getTime(time) {
      if (time) {
        const minute = parseInt((time / 60) % 60);
        const second = parseInt(time % 60);
        let minuteText = `${minute}`;
        let secondText = `${second}`;
        if (minute < 10) {
          minuteText = `0${minute}`;
        }
        if (second < 10) {
          secondText = `0${second}`;
        }
        return `${minuteText}:${secondText}`;
      } else {
        return "00:00";
      }
    }, // 进度条down
    onMouseDown(event) {
      event.stopPropagation();
      event.preventDefault();
    },

    onCanPlay() {
      const { audio } = this.$refs;
      this.totalTime = this.getTime(audio.duration);
    },

    onTimeUpdate() {
      const { audio } = this.$refs;
      const currentTime = parseInt(audio.currentTime);
      const buffered = audio.buffered;
      let bufferTime = 0;
      if (buffered.length !== 0) {
        bufferTime = buffered.end(buffered.length - 1);
      }
      if (!this.isDraging) {
        this.finishWidth = progressWidth * (audio.currentTime / audio.duration);
      }

      this.currentTime = this.getTime(currentTime);
      this.bufferWidth = progressWidth * (bufferTime / audio.duration);
    },
    // 点击设置进度条
    progressMouseDown(event) {
      event.preventDefault();
      event.stopPropagation();
      const { progressItem, audio } = this.$refs;
      const distX = event.pageX - progressItem.getBoundingClientRect().left;
      if (this.curSong.id) {
        const currentTime = (audio.duration * distX) / progressWidth;
        audio.currentTime = currentTime;
        this.currentTime = this.getTime(currentTime);
      }
      this.finishWidth = distX;
    },
    onPlayClick() {
      const { audio } = this.$refs;
      this.isPlay ? audio.pause() : audio.play();
    },
    onPlay() {
      this.isPlay = true;
    },

    onPause() {
      this.isPlay = false;
    },
    prevMusic() {
      const { audio } = this.$refs;
      const index = this.musicList.findIndex(r => r.id === this.curSong.id);
      if (index > -1) {
        if (index === 0) {
          this.playMusic(
            this.musicList[this.musicList.length - 1] || this.musicList[0]
          );
        } else {
          this.playMusic(this.musicList[index - 1]);
        }
        this.onSwitchMusic();
      } else {
        if (this.curSong.id) {
          this.onSwitchMusic();
        } else {
          audio.currentTime = 0;
        }
      }
    },
    nextMusic() {
      const index = this.musicList.findIndex(r => r.id === this.curSong.id);
      const { audio } = this.$refs;
      if (index > -1) {
        if (index === this.musicList.length) {
          this.playMusic(this.musicList[0]);
        } else {
          this.playMusic(this.musicList[index + 1] || this.musicList[0]);
        }
        this.onSwitchMusic();
      } else {
        if (this.curSong.id) {
          this.onSwitchMusic();
        } else {
          audio.currentTime = 0;
        }
      }
    },
     onSwitchMusic() {
        const {audio} = this.$refs;
        audio.currentTime = 0;
        if (!this.isPlay) {
            audio.play();
        }
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
@import "./player.scss";
</style>
