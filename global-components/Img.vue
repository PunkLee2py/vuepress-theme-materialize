<template>
  <img :src="url" :class="loading ? 'loading' : ''" />
</template>

<script>
const SVG_LOADERS = {
  0: "audio.svg",
  1: "ball-triangle.svg",
  2: "bars.svg",
  3: "circles.svg",
  4: "grid.svg",
  5: "hearts.svg",
  6: "oval.svg",
  7: "puff.svg",
  8: "rings.svg",
  9: "spinning-circles.svg",
  10: "tail-spin.svg",
  11: "three-dots.svg",
};

export default {
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: "",
      loading: true,
    };
  },
  mounted() {
    const { global, loading, loadingSvg: svg, error } = this.$themeConfig.img;
    const loadingSvg = require(`../images/svg-loaders/${SVG_LOADERS[svg]}`);
    const loadingImg = loading || loadingSvg;
    const errorImg = error || require("../images/404.png");

    var imgObj = new Image();
    imgObj.src = this.src || global;
    // 1.loading
    this.url = loadingImg;
    imgObj.backgroundColor = "#000";
    // 2.error
    imgObj.onerror = () => {
      imgObj.src = errorImg;
    };
    // 3.success
    imgObj.onload = () => {
      this.loading = false;
      this.url = imgObj.src;
    };
  },
};
</script>

<style lang="stylus" scoped>
img.loading
  object-fit: scale-down !important
  background-color: var(--accentColor-3)
  width: 100%
</style>