<template>
  <footer>
    <div class="footer-wrapper">
      <!-- theme info -->
      <div class="theme_info" v-if="$themeConfig.footer.themeInfo">
        <a
          href="https://github.com/PunkLee2py/vuepress-theme-materialize"
          target="_blank"
        >
          vuepress-theme-materialize
        </a>
        by
        <a href="https://punk_lee.gitee.io/" target="_blank">PunkLee</a>
      </div>
      <!-- custom text & copyright -->
      <div
        class="custom_text"
        v-for="(text, index) in customTextList"
        :key="index"
        v-html="text"
      ></div>
      <div class="copyright">
        &copy;
        <span v-if="startDate">{{ startDate }} - </span>
        <span>
          {{ endDate }} By
          <Router-link :to="$localePath">{{ $siteTitle }}</Router-link>
        </span>
      </div>
    </div>
  </footer>
</template>

<script>
const currentYear = new Date().getFullYear().toString();

export default {
  computed: {
    startDate() {
      const defaultDate = new Date(this.$themeConfig.docsDate)
        .getFullYear()
        .toString();
      const userDate = this.$themeConfig.footer.start;
      return userDate
        ? userDate
        : defaultDate !== this.endDate
        ? defaultDate
        : null;
    },
    endDate() {
      return this.$themeConfig.footer.end || currentYear;
    },
    customTextList() {
      const { customText } = this.$themeConfig.footer;
      const isString = typeof customText === "string";
      return isString ? [customText] : customText;
    },
  },
};
</script>
