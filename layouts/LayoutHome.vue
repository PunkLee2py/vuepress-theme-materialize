<template>
  <Common>
    <template #main-content>
      <div
        class="col s12 l6 post"
        v-for="(item, index) in curPageData"
        :key="item.key || index"
      >
        <PostCard :item="item" :class="['fadeInDown', `delay-${index + 1}`]" />
      </div>
      <div v-if="!curPageData.length" class="col s12">
        <div class="card-panel p-5 center">
          <h3>Noting~.~</h3>
          <h5>No Blog Post yet...</h5>
        </div>
      </div>

      <div
        class="col s12 pagination-wrap"
        :class="['fadeInUp', `delay-${curPageData.length + 1}`]"
        :key="renderKey"
      >
        <Pagination
          :pages="pages"
          :curPage="curPage"
          :range="$themeConfig.pagination.range"
          @getCurrentPage="curPage = $event"
        />
      </div>
    </template>
  </Common>
</template>

<script>
import PostCard from "@theme/components/PostCard";
import Pagination from "@theme/components/Pagination";
import pagination from "@theme/mixins/pagination";

export default {
  name: "Home",
  components: { PostCard, Pagination },
  mixins: [pagination],
  data() {
    return {
      renderKey: 1,
    };
  },
  watch: {
    curPageData() {
      ++this.renderKey;
    },
  },
  computed: {
    data() {
      return this.$posts;
    },
  },
};
</script>