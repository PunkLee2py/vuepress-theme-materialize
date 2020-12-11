<template>
  <Common>
    <template #main-content>
      <div class="col s12">
        <TimeLineList :data="curPageData" :key="renderKey" />
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
import TimeLineList from "@theme/components/TimeLineList";
import Pagination from "@theme/components/Pagination";
import pagination from "@theme/mixins/pagination";

export default {
  components: { TimeLineList, Pagination },
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
      return this.$timelinesPost;
    },
  },
};
</script>
