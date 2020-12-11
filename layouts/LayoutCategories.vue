<template>
  <Common>
    <template #main-content>
      <div class="col s12">
        <div class="card-panel center">
          <h4 class="title m-0">
            {{ $blogConfig.categories.text }} - {{ $categories.length }}
          </h4>
          <div class="content">
            <ul class="categories">
              <li
                class="category-item"
                v-for="(item, index) in $categories.list"
                :key="item.path || index"
                :class="{ active: item.name === curKey }"
              >
                <Router-link :to="item.path" class="waves-effect">
                  <span class="category-name">
                    {{ item.name }}
                  </span>
                  <span class="post-num">
                    {{ item.pages.length }}
                  </span>
                </Router-link>
              </li>
            </ul>
            <!-- 显示当前文章列表 -->
            <TableList
              v-show="$categoriesPost.length"
              :data="$categoriesPost"
              :tableClass="$themeConfig.categories.tableClass"
            />
          </div>
        </div>
      </div>
    </template>
  </Common>
</template>

<script>
import TableList from "@theme/components/TableList";

export default {
  name: "Categories",
  components: { TableList },
  computed: {
    curKey() {
      return this.$currentCategories ? this.$currentCategories.key : "";
    },
  },
};
</script>

<style lang="stylus" scoped>
.category-item
  vertical-align: middle
  margin: 4px 8px 10px
  display: inline-block
  cursor: pointer
  border-radius: 0.25rem
  font-size: 13px
  box-shadow: 0 1px 8px 0 var(--boxShadowColor)
  transition: all unit($transitionTime * 2, 's')

  &:hover, &.active
    text-shadow: 0 0 0.2em #fff
    background: var(--accentColor)

    a span.category-name
      color: var(--relativeTextColor)

    .post-num
      color: var(--accentColor)
      background-color: var(--relativeTextColor)

  a
    display: flex
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 8px 14px
    justify-content: space-between
    align-items: center
    color: var(--textColor)

    .post-num
      padding: 0 6px
      margin-left: 4px
      height: 1.2rem
      text-align: center
      line-height: 1.2rem
      border-radius: 0.25rem
      font-size: 0.7rem
      color: var(--relativeTextColor)
      background-color: var(--accentColor)
</style>
