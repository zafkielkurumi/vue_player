<template>
  <div id="app">
    <div class="content">
      <router-view />
    </div>

    <Player
     :curSong="curSong"
     :musicList="musicList"
     :deleteMusic="deleteMusic"
     :playMusic="playAndAdd"
     :clearMusic="clearMusic"
     ></Player>
  </div>
</template>
<script>
import Player from '@/components/player/player.vue';
import { createNamespacedHelpers, } from 'vuex';
const {mapActions,  mapGetters } = createNamespacedHelpers('playMusic');
import { curSong, musicList, deleteMusic, playAndAdd, clearMusic } from '@/store/modules/play_music';
export default {
  name: 'App',
  components: {
    Player
  },
  methods: {
    ...mapActions([deleteMusic, playAndAdd, clearMusic])
  },
  computed: {
    ...mapGetters([curSong, musicList])
  }
}
</script>
<style lang="scss" scoped>
.content {
  padding-bottom: 53px;
}
</style>
