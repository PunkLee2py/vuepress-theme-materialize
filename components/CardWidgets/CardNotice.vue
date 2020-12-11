<template>
  <div v-if="$themeConfig.notice" class="card-panel">
    <div class="title valign-wrapper">
      <i class="material-icons">notifications_active</i>
      <b class="ml-6">{{ $locales.aside.notice }}</b>
    </div>
    <div class="content">
      <p class="m-0">{{ $themeConfig.notice }}</p>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.card-panel i
  animation: tada unit($transitionTime * 6, 's') linear infinite
</style>
