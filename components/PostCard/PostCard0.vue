<template>
  <div class="card-panel" :style="item.frontmatter.coverStyle">
    <!-- Post Sticky -->
    <div
      class="sticky"
      :class="{ sticky: item.frontmatter.sticky }"
      :data-sticky="item.frontmatter.sticky"
    ></div>
    <!-- Post Cover -->
    <Img
      :src="item.frontmatter.cover"
      :style="item.frontmatter.coverStyle"
      @click.native="$router.push(item.path)"
    />
    <!-- Post Content -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="stylus" scoped>
.card-panel
  height: 230px
  color: var(--relativeTextColor)

  a
    color: var(--relativeTextColor)

  a:hover
    color: var(--accentColor)

.post-wrap:before
  position: absolute
  top: 0
  left: 0
  display: block
  width: 100%
  height: 100%
  content: ''
  border-radius: 6px
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1))
  z-index: -1

img
  position: absolute
  border-radius: 6px
  top: 0
  left: 0
  width: 100%
  height: 100%
  object-fit: cover
  background-position: center center
  background-repeat: no-repeat
  z-index: -1
</style>
