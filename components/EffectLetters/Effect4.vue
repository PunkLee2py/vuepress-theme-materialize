<template>
  <h1 class="ml4">
    <span class="slot-text" style="display: none"><slot /></span>
    <span class="letters letters-1"></span>
    <span class="letters letters-2"></span>
    <span class="letters letters-3"></span>
  </h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    /* 更换接收slot并分割到各个letters中 */
    const slotText = document.querySelector(".ml4 .slot-text").innerText;
    const lettersMap = [
      document.querySelector(".ml4 .letters-1"),
      document.querySelector(".ml4 .letters-2"),
      document.querySelector(".ml4 .letters-3"),
    ];
    let textList = slotText.trim().split(" ");
    lettersMap.map((item, index) => {
      if (textList[index]) {
        item.innerText = textList[index];
      }
    });

    var ml4 = {};
    ml4.opacityIn = [0, 1];
    ml4.scaleIn = [0.2, 1];
    ml4.scaleOut = 3;
    ml4.durationIn = 800;
    ml4.durationOut = 600;
    ml4.delay = 500;

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml4 .letters-1",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-1",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-2",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: ml4.opacityIn,
        scale: ml4.scaleIn,
        duration: ml4.durationIn,
      })
      .add({
        targets: ".ml4 .letters-3",
        opacity: 0,
        scale: ml4.scaleOut,
        duration: ml4.durationOut,
        easing: "easeInExpo",
        delay: ml4.delay,
      })
      .add({
        targets: ".ml4",
        opacity: 0,
        duration: 500,
        delay: 500,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml4
  position: relative
  font-weight: 900
  font-size: 4.5em

.ml4 .letters
  position: absolute
  margin: auto
  left: 0
  top: 0.3em
  right: 0
  opacity: 0
</style>