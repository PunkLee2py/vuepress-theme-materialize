<template>
  <h1 class="ml15">
    <span class="slot-text" style="display: none"><slot /></span>
    <span class="word">Out</span>
    <span class="word">now</span>
  </h1>
</template>

<script>
import anime from "./anime.min.js";

export default {
  mounted() {
    /* 更换接收slot并分割到各个letters中 */
    const slotText = document.querySelector(".ml15 .slot-text").innerText;
    const lettersMap = [
      document.querySelector(".ml15 span:nth-child(2)"),
      document.querySelector(".ml15 span:nth-child(3)"),
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
        targets: ".ml15 .word",
        scale: [14, 1],
        opacity: [0, 1],
        easing: "easeOutCirc",
        duration: 800,
        delay: (el, i) => 800 * i,
      })
      .add({
        targets: ".ml15",
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000,
      });
  },
};
</script>

<style lang="stylus" scoped>
.ml15
  font-weight: 800
  font-size: 3.8em
  text-transform: uppercase
  letter-spacing: 0.5em

.ml15 .word
  display: inline-block
  line-height: 1em
</style>