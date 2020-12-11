<template>
  <component :is="'PostCard' + postCom" :item="item">
    <!-- Post Content -->
    <div class="post-wrap">
      <!-- Title -->
      <div class="post-title animate_a">
        <Router-link :to="item.path" class="valign-wrapper">
          {{ item.title }}
          <i class="material-icons" v-if="item.frontmatter.password">lock </i>
        </Router-link>
      </div>
      <!-- Category -->
      <div
        v-show="$blogConfig.categories.enable"
        class="category post-meta-wrap"
      >
        <Router-link
          :to="`${$blogConfig.categories.link}${item.frontmatter.categories[0]}`"
          class="meta"
          v-if="item.frontmatter.categories.length"
        >
          <i class="material-icons">{{ $themeConfig.categories.icon }}</i>
          {{ item.frontmatter.categories[0] }}
        </Router-link>
      </div>
      <!-- Created && Updated time -->
      <div class="post-meta-wrap">
        <span class="meta">
          <i class="material-icons">create</i>
          {{ $moment(item.frontmatter.dateTime.ctime).startOf().fromNow() }}
        </span>
        <div class="separator" v-if="item.frontmatter.categories.length"></div>
        <span class="meta">
          <i class="material-icons">update</i>
          {{ $moment(item.frontmatter.dateTime.mtime).startOf().fromNow() }}
        </span>
      </div>
      <!-- Description -->
      <p class="post-desc">
        {{ item.frontmatter.description }}
      </p>
    </div>
  </component>
</template>

<script>
import PostCard0 from "./PostCard0";
import PostCard1 from "./PostCard1";
import PostCard2 from "./PostCard2";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    PostCard0,
    PostCard1,
    PostCard2,
  },
  computed: {
    postCom() {
      const { com } = this.$themeConfig.pagePost;
      return com;
    },
  },
};
</script>

<style lang="stylus" scoped>
.animate_a
  display: inline-flex
</style>
