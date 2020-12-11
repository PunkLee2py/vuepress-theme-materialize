<template>
    <div class="timeline-list center">
        <ul class="timeline">
            <!-- 显示当前年份 -->
            <li
                class="year"
                v-for="(item, index) in pageData"
                :key="item.key || index"
                :class="['fadeInDown', `delay-${index + 1}`]"
                v-if="typeof item === 'string'"
            >
                <div class="timeline-badge">
                    <i>{{ item }}</i>
                </div>
                <span>{{ resetINVERTED() }}</span>
            </li>
            <!-- 当前年份下的文章列表 -->
            <li v-else :class="itemClass(index)">
                <div class="timeline-badge animate_pulse_hover">
                    <span
                        href="javascript:void(0);"
                        class="tooltipped"
                        data-position="top"
                        :data-tooltip="
                            $moment(item.frontmatter.dateTime.ctime).format(
                                'LLL'
                            )
                        "
                    >
                        <i class="material-icons">access_time</i>
                    </span>
                </div>
                <div class="timeline-panel">
                    <div class="card-panel m-0">
                        <div class="card-image">
                            <br />
                            <Img
                                :src="item.frontmatter.cover"
                                :style="item.frontmatter.coverStyle"
                                @click="$router.push(item.path)"
                            />
                        </div>
                        <!-- <div class="divider"></div> -->
                        <div class="card-text" @click="$router.push(item.path)">
                            <h5 class="valign-wrapper m-0">
                                {{ item.title }}
                                <i
                                    class="material-icons"
                                    v-if="item.frontmatter.password"
                                >
                                    lock
                                </i>
                            </h5>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
let INVERTED = true;
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        pageData() {
            let pageData = [];
            let repeatYear = [];
            this.data.map((item, index) => {
                // 向列表中添加年份日期
                let date = item.frontmatter.dateTime.ctime.split("-");
                if (date.length)
                    if (repeatYear.indexOf(date[0]) === -1)
                        pageData.push(date[0]), repeatYear.push(date[0]);
                pageData.push(item);
            });
            this.resetINVERTED();
            return pageData;
        },
    },
    methods: {
        resetINVERTED() {
            INVERTED = true; // 重置变量
        },
        itemClass(index) {
            INVERTED = !INVERTED;
            return [
                INVERTED ? "inverted" : "",
                `fadeIn${INVERTED ? "Right" : "Left"}`,
                `delay-${index + 1}`,
            ];
        },
    },
};
</script>

<style lang="stylus" scoped>
.card-panel
  width: 100%

  .card-image
    overflow: hidden

    & img
      height: 180px
      transition: all unit($transitionTime * 2, 's')

      @media only screen and (max-width: $screenLarge)
        height: 120px

  .card-text
    position: absolute
    overflow: hidden
    top: 1rem
    left: 1rem
    bottom: 1rem
    right: 1rem
    transition: all unit($transitionTime * 2, 's')

  &:hover
    .card-text
      color: var(--accentColor)
      transform: translateX(10px)

    img
      transform: scale(1.1)

.timeline
  position: relative
  display: flow-root
  margin: 0

  &:before
    position: absolute
    content: ''
    width: 3px
    height: 100%
    background-color: var(--accentColor)

  li
    position: relative
    float: left
    clear: left
    width: 50%
    margin-bottom: 1rem

    .timeline-badge
      position: absolute
      cursor: pointer
      z-index: 1
      top: 27px
      right: -19px
      width: 35px
      height: 35px
      text-align: center
      border-radius: 50%
      background-color: var(--accentColor)
      color: var(--relativeTextColor)

      i
        font-size: 1.4rem
        line-height: 35px

    .timeline-panel
      top: 0.3rem
      position: relative
      cursor: pointer
      width: calc(100% - 43px)

      &::after, &::before
        content: ' '
        display: inline-block
        position: absolute

      &::after
        top: 27px
        right: -14px
        border-top: 14px solid transparent
        border-right: 0 solid var(--relativeAccentColor)
        border-bottom: 14px solid transparent
        border-left: 14px solid var(--relativeAccentColor)

      &::before
        top: 26px
        right: -15px
        border-top: 15px solid transparent
        border-right: 0 solid var(--boxShadowColor)
        border-bottom: 15px solid transparent
        border-left: 15px solid var(--boxShadowColor)

    &.inverted
      float: right
      clear: right

      .timeline-badge
        left: -15px

      .timeline-panel
        float: right

        &::before
          right: auto
          left: -15px
          border-right-width: 15px
          border-left-width: 0

        &::after
          right: auto
          left: -14px
          border-right-width: 14px
          border-left-width: 0

    &.year
      margin: 0
      margin: 1rem 0 5rem 0

      & + li + li:not(.year)
        margin-top: 4rem

      .timeline-badge
        top: 0
        right: -2.1rem
        width: 60px
        height: 60px
        font-size: 1rem
        line-height: 4.5rem

        i
          text-shadow: 0 0 0.2em white

    &.year:first-child
      margin: 0
      margin-bottom: 5rem

@media only screen and (max-width: $screenLarge)
  .timeline::before
    left: 2rem

  .timeline li
    position: relative
    float: left
    clear: left
    width: 100%

    .timeline-badge
      top: 22px
      left: 0.8rem
      margin-left: 0

    .timeline-panel
      top: 0
      float: right
      width: calc(100% - 5rem)

      &::before
        right: auto
        left: -15px
        border-right-width: 15px
        border-left-width: 0

      &::after
        right: auto
        left: -14px
        border-right-width: 14px
        border-left-width: 0

    &.inverted
      float: left
      clear: left

      .timeline-badge
        left: 0.8rem

  .timeline li.year
    margin: 0 0 5rem 0

    .timeline-badge
      left: 0

    & + li + li:not(.year)
      margin: 0
      margin-bottom: 1rem
</style>
