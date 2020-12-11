<template>
  <h1 class="ml2"><slot /></h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml2");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml2 .letter",
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 70 * i,
      })
      .add({
        targets: ".ml2",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml2
  font-weight: 900
  font-size: 3.5em

.ml2 .letter
  display: inline-block
  line-height: 1em
</style>