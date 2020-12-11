<template>
  <h1 class="ml5">
    <span class="slot-text" style="display: none"><slot /></span>
    <span class="text-wrapper">
      <span class="line line1"></span>
      <span class="letters letters-left"></span>
      <span class="letters ampersand">asd</span>
      <span class="letters letters-right"></span>
      <span class="line line2"></span>
    </span>
  </h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    /* 更换接收slot并分割到各个letters中 */
    const slotText = document.querySelector(".ml5 .slot-text").innerText;
    const lettersMap = [
      document.querySelector(".ml5 .letters-left"),
      document.querySelector(".ml5 .ampersand"),
      document.querySelector(".ml5 .letters-right"),
    ];
    let textList = slotText.trim().split(" ");
    lettersMap.map((item, index) => {
      if (textList[index]) {
        item.innerText = textList[index];
      }
    });

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml5 .line",
        opacity: [0.5, 1],
        scaleX: [0, 1],
        easing: "easeInOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml5 .line",
        duration: 600,
        easing: "easeOutExpo",
        translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em",
      })
      .add({
        targets: ".ml5 .ampersand",
        opacity: [0, 1],
        scaleY: [0.5, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=600",
      })
      .add({
        targets: ".ml5 .letters-left",
        opacity: [0, 1],
        translateX: ["0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=300",
      })
      .add({
        targets: ".ml5 .letters-right",
        opacity: [0, 1],
        translateX: ["-0.5em", 0],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=600",
      })
      .add({
        targets: ".ml5",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml5
  position: relative
  font-weight: 300
  font-size: 4.5em

.ml5 .text-wrapper
  position: relative
  display: inline-block
  padding-top: 0.1em
  padding-right: 0.05em
  padding-bottom: 0.15em
  line-height: 1em

.ml5 .line
  position: absolute
  left: 0
  top: 0
  bottom: 0
  margin: auto
  height: 3px
  width: 100%
  background-color: var(--relativeAccentColor)
  transform-origin: 0.5 0

.ml5 .ampersand
  font-family: Baskerville, serif
  font-style: italic
  font-weight: 400
  width: 1em
  margin-right: -0.1em
  margin-left: -0.1em

.ml5 .letters
  display: inline-block
  opacity: 0
</style>