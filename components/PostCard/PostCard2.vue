<template>
  <div class="card-panel card-animation">
    <!-- Post Sticky -->
    <div
      class="sticky"
      :class="{ sticky: item.frontmatter.sticky }"
      :data-sticky="item.frontmatter.sticky"
    ></div>
    <!-- Post Cover -->
    <Img
      class="z-depth-3 image-n-margin"
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
  margin-top: 50px !important

  a
    color: var(--textColor)

  a:hover
    color: var(--accentColor)

  img
    width: 100%
    min-height: 180px
    border-radius: 6px
    cursor: pointer

    @media only screen and (min-width: $screenLarge)
      height: 180px
      width: auto

.card-animation, .image-n-margin
  margin-top: -50px
  transition: all unit($transitionTime * 2, 's')

.card-animation:hover .image-n-margin
  margin-top: -70px
  margin-bottom: 20px
</style>