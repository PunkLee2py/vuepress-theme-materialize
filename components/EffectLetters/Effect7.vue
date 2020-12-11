<template>
  <h1 class="ml11">
    <span class="text-wrapper">
      <span class="line line1"></span>
      <span class="letters"><slot /></span>
    </span>
  </h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml11 .letters");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /([^\x00-\x80]|\w)/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml11 .line",
        scaleY: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
      })
      .add({
        targets: ".ml11 .line",
        translateX: [
          0,
          document.querySelector(".ml11 .letters").getBoundingClientRect()
            .width + 10,
        ],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100,
      })
      .add({
        targets: ".ml11 .letter",
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        offset: "-=775",
        delay: (el, i) => 34 * (i + 1),
      })
      .add({
        targets: ".ml11",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml11
  font-weight: 700
  font-size: 3.5em

.ml11 .text-wrapper
  position: relative
  display: inline-block
  padding-top: 0.1em
  padding-right: 0.05em
  padding-bottom: 0.15em

.ml11 .line
  opacity: 0
  position: absolute
  left: 0
  height: 100%
  width: 3px
  background-color: var(--relativeAccentColor)
  transform-origin: 0 50%

.ml11 .line1
  top: 0
  left: 0

.ml11 .letter
  display: inline-block
  line-height: 1em
</style>