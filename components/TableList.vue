<template>
  <div class="table-list">
    <table v-show="curPageData.length" :class="tableClass">
      <thead>
        <tr>
          <th>{{ $locales.table.th1 }}</th>
          <th>{{ $locales.table.th2 }}</th>
          <th>{{ $locales.table.th3 }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in curPageData"
          :key="item.key || index"
          @click="$router.push(item.path)"
        >
          <td class="title valign-wrapper">
            {{ item.title }}
            <i class="material-icons small" v-if="item.frontmatter.password">
              lock
            </i>
          </td>
          <td class="date">
            {{ $moment(item.frontmatter.dateTime.ctime).format("LL") }}
          </td>
          <td class="date">
            {{ $moment(item.frontmatter.dateTime.mtime).format("LL") }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分页 -->
    <Pagination
      :pages="pages"
      :curPage="curPage"
      :range="$themeConfig.pagination.range"
      @getCurrentPage="curPage = $event"
    />
  </div>
</template>

<script>
import Pagination from "@theme/components/Pagination";
import pagination from "@theme/mixins/pagination";

export default {
  components: { Pagination },
  mixins: [pagination],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    tableClass: "",
  },
};
</script>

<style lang="stylus" scoped>
table tbody tr
  transition: all unit($transitionTime, 's')

  &:hover
    cursor: pointer
</style>
