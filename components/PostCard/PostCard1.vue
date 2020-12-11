<template>
  <div class="card-panel">
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
  a
    color: var(--textColor)

  a:hover
    color: var(--accentColor)

  img
    cursor: pointer
    min-height: 180px
    width: 100%

    @media only screen and (min-width: $screenLarge)
      height: 180px
      width: auto
</style>