<template>
  <div class="col s12" id="comments-container">
    <div class="card-panel fadeInUp delay-10 duration-10">
      <div id="comments"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    const Valine = require("valine");

    if (!this.options.pageSize) {
      this.options["pageSize"] = this.$themeConfig.perPage;
    }
    this.options["el"] = "#comments";
    new Valine(this.options);
  },
};
</script>

<style lang="stylus">
.vinput, #veditor, .vbtn, .vcontent p
  color: var(--textColor) !important

.vat
  color: var(--accentColor) !important

.vbtn:hover
  color: var(--accentColor) !important
  border: 1px solid var(--accentColor) !important

.vinput:not(#veditor)
  margin: 0 !important
  box-sizing: border-box !important

  &:focus
    border-bottom: 1px solid var(--accentColor) !important
    box-shadow: none !important

.vicon
  fill: var(--accentColor) !important
</style>
