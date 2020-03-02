<template>
  <div class="vol">
    <div @click="volControlClick" class="vol-controller"></div>
    <div :style="{ visibility: volControl ? 'visible' : 'hidden' }" class="vol-progress-bg">
      <div class="vol-inside">
        <div :style="{height: currentVol }" class="vol-current"></div>
        <span
          v-drag="{onMouseMove: onMouseMove}"
          @mousedown="onMouseDown"
          :style="{ transform: transform }"
          ref="volItem"
          class="vol-item"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Volume",
  data() {
    return {
      transform: "translate3d(0px , -90px, 1px)",
      currentVol: '90px',
      volControl: false
    };
  },
  // inject: ['audio'],
  methods: {
    onMouseDown(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    // vol拖动
    onMouseMove(pos) {
      const { audio } = this.$parent.$refs;
     
      if (audio) {
        const disty = pos.y <= -90 ? -90 : pos.y >= 0 ? 0 : pos.y;
        const y = Math.abs(disty);
        const volPercent = y / 90;
        this.transform = `translate3d(0px , ${disty}px, 1px)`;
         console.log(audio);
          this.currentVol = `${y}px`;
        audio.volume = volPercent;
      }
    },
    volControlClick() {
      this.volControl = !this.volControl;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./volume.scss";
</style>
