<template>
  <div v-if="progress" class="m-0">
    <div class="indeterminate"></div>
  </div>
  <div v-else class="preloader-wrapper">
    <div class="spinner-layer">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.progress
  border-radius: 6px 6px 0 0
</style>