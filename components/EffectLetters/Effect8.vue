<template>
  <h1 class="ml12"><slot /></h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml12");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml12 .letter",
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1200,
        delay: (el, i) => 500 + 30 * i,
      })
      .add({
        targets: ".ml12 .letter",
        translateX: [0, -30],
        opacity: [1, 0],
        easing: "easeInExpo",
        duration: 1100,
        delay: (el, i) => 100 + 30 * i,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml12
  font-weight: 200
  font-size: 1.8em
  text-transform: uppercase
  letter-spacing: 0.5em

.ml12 .letter
  display: inline-block
  line-height: 1em
</style>