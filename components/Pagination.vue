<template>
  <ul class="pagination center" v-if="show">
    <li class="chevron">
      <a href="javascript:void(0);" v-show="curPage !== 1" @click="jumpPage(1)">
        <i class="material-icons">first_page</i>
      </a>
    </li>
    <li
      v-for="(page, index) in pageRange"
      :key="index"
      :class="{ active: page === curPage }"
      @click="jumpPage(page)"
    >
      <a href="javascript:void(0);">{{ page }}</a>
    </li>
    <li class="chevron">
      <a
        href="javascript:void(0);"
        v-show="curPage < pages"
        @click="jumpPage(pages)"
      >
        <i class="material-icons">last_page</i>
      </a>
    </li>
  </ul>
  <ul class="pagination center" v-else>
    <li class="active">
      <a href="javascript:void(0);">1</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    // 总页数
    pages: {
      type: Number,
      default: 0,
    },
    // 范围数
    range: {
      type: Number,
      default: 3,
    },
    // 当前数
    curPage: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    show() {
      return this.pages && this.pages != 1;
    },
    pageRange() {
      let pageList = [this.curPage];
      for (let i = 1; i < this.range + 1; i++) {
        if (this.curPage - i >= 1) {
          pageList.push(this.curPage - i);
        }
        if (this.curPage + i <= this.pages) {
          pageList.push(this.curPage + i);
        }
      }
      pageList.sort((a, b) => {
        return a - b;
      });
      return pageList;
    },
  },
  methods: {
    jumpPage(num) {
      this.$emit("getCurrentPage", num);
    },
  },
};
</script>
