<template>
  <div class="card-panel">
    <div class="title valign-wrapper">
      <i class="material-icons">trending_up</i>
      <b class="ml-6">{{ $locales.aside.site }}</b>
    </div>
    <div class="content">
      <p class="m-0">
        <span>{{ $locales.aside.siteTime }} :</span>
        <span> {{ docsDays }} </span>
      </p>
      <p class="m-0">
        <span>{{ $locales.aside.siteArticle }} :</span>
        <span>
          {{ totalPostCount | formatMoney }}
        </span>
      </p>
      <p class="m-0">
        <span>{{ $locales.aside.siteWords }} :</span>
        <span>
          {{ totalWordCount | formatMoney }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    docsDays() {
      const date = this.$themeConfig.docsDate;
      const dateVal = new Date(date).toISOString();
      const start = this.$moment(dateVal).format();
      const current = this.$moment(new Date()).format();
      return this.$moment(current).diff(start, "day");
    },
    totalPostCount() {
      return this.$posts.length;
    },
    totalWordCount() {
      return this.$site.pages.reduce((total, curItem) => {
        let wordCount = curItem.frontmatter.wordCount;
        return total + (wordCount ? wordCount : 0);
      }, 0);
    },
  },
};
</script>

<style lang="stylus" scoped>
.content>p
  display: flex
  align-items: center

.content>p>span:first-child
  box-flex: 1
  flex: 1
</style>
