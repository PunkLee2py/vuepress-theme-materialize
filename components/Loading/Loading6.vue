<template>
    <div class="spinner"></div>
</template>

<style lang="stylus" scoped>
.spinner
  width: 40px
  height: 40px
  margin: 100px auto
  background-color: $loadingColor
  border-radius: 100%
  -webkit-animation: sk-scaleout 1s infinite ease-in-out
  animation: sk-scaleout 1s infinite ease-in-out

@keyframes sk-scaleout
  0%
    -webkit-transform: scale(0)

  100%
    -webkit-transform: scale(1)
    opacity: 0

@keyframes sk-scaleout
  0%
    -webkit-transform: scale(0)
    transform: scale(0)

  100%
    -webkit-transform: scale(1)
    transform: scale(1)
    opacity: 0
</style>
