<template>
  <h1 class="ml3"><slot /></h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector(".ml3");
    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime
      .timeline({ loop: true })
      .add({
        targets: ".ml3 .letter",
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1),
      })
      .add({
        targets: ".ml3",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml3
  font-weight: 900
  font-size: 3.5em
</style>