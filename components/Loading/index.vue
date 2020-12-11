<template>
    <div id="loader-wrapper">
        <div id="loader">
            <span class="logo">{{ logoText }}</span>
            <component :is="'Loading' + loadingCom" class="eff-box">
            </component>
        </div>
    </div>
</template>

<script>
import Loading0 from "./Loading0";
/* https://tobiasahlin.com/spinkit/ */
import Loading1 from "./Loading1";
import Loading2 from "./Loading2";
import Loading3 from "./Loading3";
import Loading4 from "./Loading4";
import Loading5 from "./Loading5";
import Loading6 from "./Loading6";
import Loading7 from "./Loading7";
import Loading8 from "./Loading8";
import Loading9 from "./Loading9";
import Loading10 from "./Loading10";
import Loading11 from "./Loading11";
import Loading12 from "./Loading12";

export default {
    name: "Loading",
    components: {
        Loading0,
        Loading1,
        Loading2,
        Loading3,
        Loading4,
        Loading5,
        Loading6,
        Loading7,
        Loading8,
        Loading9,
        Loading10,
        Loading11,
        Loading12,
    },
    computed: {
        logoText() {
            return this.$themeConfig.pageLoading.text;
        },
        loadingCom() {
            const { com } = this.$themeConfig.pageLoading;
            return com;
        },
    },
};
</script>

<style lang="stylus" scoped>
#loader-wrapper
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 1000
  transition: all unit($transitionTime * 2, 's') unit($transitionTime, 's') cubic-bezier(0.645, 0.045, 0.355, 1)
  background-color: $loadingBgColor
  color: $loadingColor
  opacity: 0.9

  #loader
    display: block
    position: relative
    left: 50%
    top: 50%
    width: 150px
    height: 150px
    margin: -75px 0 0 -75px
    z-index: 1001
    display: flex
    justify-content: center
    align-items: center
    transition: all unit($transitionTime * 2, 's') ease-out

  .eff-box
    height: 100%
    width: 100%

  .logo
    color: #eee
    position: absolute
    font-size: 2rem
    z-index: 1

/* page loading */
#loader-wrapper.loading
  transform: translateX(0%)

  &.left, &.right
    transform: translateX(0%)

  &.top, &.bottom
    transform: translateY(0%)

  #loader
    opacity: 1

/* page loaded */
#loader-wrapper.loaded
  transform: translateX(-100%)

  &.left
    transform: translateX(-100%)

  &.right
    transform: translateX(100%)

  &.top
    transform: translateY(-100%)

  &.bottom
    transform: translateY(100%)

  #loader
    opacity: 0
</style>
