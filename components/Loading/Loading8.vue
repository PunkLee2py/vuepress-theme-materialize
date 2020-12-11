<template>
    <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
</template>

<style lang="stylus" scoped>
.spinner
  display: flex
  justify-content: center
  align-items: center

.spinner > div
  width: 38px
  height: 38px
  background-color: $loadingColor
  border-radius: 100%
  display: inline-block
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both
  animation: sk-bouncedelay 1.4s infinite ease-in-out both

.spinner .bounce1
  -webkit-animation-delay: -0.32s
  animation-delay: -0.32s

.spinner .bounce2
  margin: 0 10px
  -webkit-animation-delay: -0.16s
  animation-delay: -0.16s

@keyframes sk-bouncedelay
  0%, 80%, 100%
    -webkit-transform: scale(0)

  40%
    -webkit-transform: scale(1)

@keyframes sk-bouncedelay
  0%, 80%, 100%
    -webkit-transform: scale(0)
    transform: scale(0)

  40%
    -webkit-transform: scale(1)
    transform: scale(1)
</style>
