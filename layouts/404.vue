<template>
  <Common :showFixedBtn="false">
    <template #main>
      <main class="container flex-wrap center middle">
        <div class="main-wrapper">
          <div class="row center">
            <div class="col s12" :class="animateClass()">
              <h2 class="mb-0 delay-12 duration-6" :class="titleClass">404</h2>
              <p>{{ message }}</p>
            </div>
            <div class="col s12 delay-6" :class="animateClass()">
              <Router-link
                :to="$localePath"
                class="btn waves-effect waves-light"
              >
                <i class="material-icons">home</i>
                <i class="material-icons">keyboard_return</i>
              </Router-link>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Common>
</template>

<script>
import animation from "@theme/mixins/animation";

export default {
  mixins: [animation],
  computed: {
    titleClass() {
      const animateList = "pulse flash rotate shakeX shakeY tada jello swing bounce rubberBand wobble".split(
        " "
      );
      return this.animateClass(animateList);
    },
    message() {
      let msgs = this.$themeConfig.page404.message;
      if (typeof msgs === "string") msgs = [msgs];
      return msgs[this.randomIndex(msgs)];
    },
  },
};
</script>
