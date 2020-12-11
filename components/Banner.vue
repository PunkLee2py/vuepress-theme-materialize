<template>
    <div class="card banner center" v-if="enable">
        <div class="banner-content">
            <div class="title-wrap" v-if="$themeConfig.pageBanner.title">
                <!-- Effect Title -->
                <EffectLetters
                    v-if="$themeConfig.pageBanner.effect > 0"
                    :effCom="$themeConfig.pageBanner.effect"
                    class="title"
                >
                    {{ $themeConfig.pageBanner.title }}
                </EffectLetters>
                <!-- Title -->
                <h3 v-else class="title animate_text_shadow">
                    {{ $themeConfig.pageBanner.title }}
                </h3>
            </div>

            <!-- Text -->
            <p class="text" v-if="textList">
                <span>
                    <i
                        class="animate_text_shadow"
                        v-for="(text, index) in textList"
                        :key="index"
                        :style="textItemStyle(index)"
                    >
                        {{ text }}
                    </i>
                </span>
            </p>
        </div>
        <div
            class="carousel carousel-slider"
            :style="$themeConfig.pageBanner.style"
        >
            <!-- Carousel Item -->
            <div
                class="carousel-item"
                v-for="(item, index) in itemList"
                :key="index"
            >
                <!-- <Img v-if="item.type === 'img'" :src="item.src" />
        <Video v-else :src="item.src" /> -->
                <Img :src="item.src" />
            </div>
        </div>
    </div>
</template>

<script>
import EffectLetters from "@theme/components/EffectLetters";
import { isImg } from "@theme/utils";

export default {
    components: { EffectLetters },
    computed: {
        enable() {
            let enable = false,
                enablePage = this.$themeConfig.pageBanner.enable;
            if (typeof enablePage === "boolean") return enablePage;

            if (enablePage instanceof Array) {
                const clearPath = this.$route.fullPath.replace(
                    /(?=[^\/tags|categories|timeline\/|^\/tags|categories|timeline]).*/g,
                    ""
                );
                enable = enablePage.includes(clearPath) ? true : false;
            }
            return enable;
        },
        textList() {
            return this.resolveArray("text");
        },
        itemList() {
            let data = [];
            // Identify image or video
            this.resolveArray("items").map((i) => {
                data.push({
                    src: i,
                    type: isImg(i) ? "img" : "video",
                });
            });
            return data;
        },
    },
    methods: {
        /* 始终返回数组格式 */
        resolveArray(key) {
            const items = this.$themeConfig.pageBanner[key];
            return typeof items === "string" ? [items] : items;
        },
        textItemStyle(index) {
            index += 1;
            const len = this.textList.length;
            const angle = (360 / len) * index;
            return {
                transform: `rotateX(${angle}deg) translateZ(30px)`,
            };
        },
    },
};
</script>

<style lang="stylus" scoped>
.banner
  position: relative
  overflow: hidden
  background-image: linear-gradient(to bottom, var(--accentColor-1) 0, var(--accentColor-5) 60%, var(--accentColor-6) 80%, var(--accentColor) 100%)

  img, video
    height: 100%
    width: 100%

  img
    object-fit: cover
    background-size: cover
    background-position: center center
    background-repeat: no-repeat

  video
    object-fit: fill

  .banner-content
    position: absolute
    padding: 0 3%
    width: 100%
    top: 1rem
    z-index: 1

  .title
    margin-bottom: 0
    font-size: 3rem
    color: var(--accentColor)

  .text
    color: #fff
    font-size: 130%
    font-weight: 600
    text-align: center
    position: relative
    width: 100%
    height: 3rem
    overflow: hidden
    perspective: 300px

    >span
      position: absolute
      top: 50%
      left: 0
      width: 100%
      height: 30px
      margin-top: -15px
      transform-style: preserve-3d
      animation: text_rotate unit($transitionTime * 33, 's') infinite linear

      >i
        color: #3f4257
        position: absolute
        top: 0
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        width: 100%
        height: 30px
        line-height: 30px
        left: 0
        font-style: normal
        -webkit-backface-visibility: hidden
        backface-visibility: hidden
        text-indent: 1rem

      /* for i in 1 .. 6
      >i:nth-of-type(n+{i})
        transform: rotateX((360 / 6 * i)deg) translateZ(30px) */

@keyframes text_rotate
  to
    transform: rotateX(-360deg)
</style>
