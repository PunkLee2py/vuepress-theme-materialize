<template>
  <Common>
    <template #main-content>
      <div class="col s12">
        <div class="card-panel center">
          <h4 class="title m-0">
            {{ $blogConfig.tags.text }} - {{ $tags.length }}
          </h4>
          <div class="content">
            <ul class="tags">
              <li
                class="tag-item"
                v-for="(item, index) in $tags.list"
                :key="item.path || index"
                :class="{ active: item.name === curKey }"
              >
                <Router-link :to="item.path" :style="itemStyle(item.name)">
                  {{ item.name }}
                </Router-link>
              </li>
            </ul>
            <!-- 显示当前文章列表 -->
            <TableList
              v-show="$tagsPost.length"
              :data="$tagsPost"
              :tableClass="$themeConfig.tags.tableClass"
            />
          </div>
        </div>
      </div>
    </template>
  </Common>
</template>

<script>
import TableList from "@theme/components/TableList";
import animation from "@theme/mixins/animation";

export default {
  name: "Tags",
  components: { TableList },
  mixins: [animation],
  computed: {
    curKey() {
      return this.$currentTags ? this.$currentTags.key : "";
    },
  },
  methods: {
    randomRgb() {
      let rgb = [];
      for (let i = 0; i < 3; i++) {
        rgb.push(this.randomInteger(255, 50));
      }
      return rgb;
    },
    itemStyle(key) {
      const randomStyle = {
        fontSize: `${this.randomInteger(33, 12)}px`,
        color: `rgb(${this.randomRgb()})`,
      };
      const resolveStyle = this.curKey ? { fontSize: "16px" } : {};
      if (key === this.curKey) {
        return { fontSize: "33px", color: "#ca2203" };
      }

      return { ...randomStyle, ...resolveStyle };
    },
  },
};
</script>

<style lang="stylus" scoped>
.tags li
  cursor: pointer
  display: inline-block
  padding: 0 0.3rem
  transition: all 0.3s
  line-height: 1.2rem

  &:hover
    transform: scale(1.1)

  a
    transition: all 0.6s

  a:hover
    color: var(--textColor) !important

  &.active
    a
      font-size: 2rem !important
      color: var(--textColor) !important
      text-shadow: 0 0 0.2em var(--textColor)
</style>
