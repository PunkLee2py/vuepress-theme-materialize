<template>
    <div class="loading0"></div>
</template>

<style lang="stylus" scoped>
.loading0
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  border-radius: 50%
  border: 3px solid transparent
  border-top-color: var(--accentColor)
  animation: spin 2s linear infinite

  &:before
    content: ''
    position: absolute
    top: 5px
    left: 5px
    right: 5px
    bottom: 5px
    border-radius: 50%
    border: 3px solid transparent
    border-top-color: var(--accentColor-7)
    animation: spin 3s linear infinite

  &:after
    content: ''
    position: absolute
    top: 15px
    left: 15px
    right: 15px
    bottom: 15px
    border-radius: 50%
    border: 3px solid transparent
    border-top-color: var(--accentColor-3)
    animation: spin 2s linear infinite

@keyframes spin
  0%
    transform: rotate(0deg)

  100%
    transform: rotate(360deg)
</style>
