<template>
  <div class="navbar-fixed">
    <nav :class="pageClass">
      <!-- Navbar -->
      <div class="nav-wrapper container">
        <!-- Home Btn -->
        <Router-link :to="$localePath" class="brand-logo left animate_hover">
          {{ $siteTitle }}
        </Router-link>
        <!-- Navbar List -->
        <ul class="right">
          <!-- SearchBox Btn -->
          <li>
            <a
              class="waves-block waves-effect waves-light"
              @click="showSearchBox = !showSearchBox"
            >
              <i class="material-icons">search</i>
            </a>
          </li>
          <!-- FullScreen Btn -->
          <li class="hide-on-med-and-down">
            <a
              href="javascript:void(0);"
              class="waves-block waves-effect waves-light"
              @click="toggleFullScreen()"
            >
              <i class="material-icons">settings_overscan</i>
            </a>
          </li>
          <!-- Shortcuts Btn -->
          <li class="hide-on-med-and-down">
            <a
              href="#shortcuts-modal"
              class="waves-block waves-effect waves-light modal-trigger"
            >
              <i class="material-icons">keyboard</i>
            </a>
          </li>
          <!-- Choose Color Btn -->
          <li>
            <a
              href="javascript:void(0);"
              data-target="sidebar-color"
              class="waves-block waves-effect waves-light sidenav-trigger display-block m-0"
            >
              <i class="material-icons">color_lens</i>
            </a>
          </li>
          <!-- Dropdown language Btn -->
          <!-- <li>
            <a
              href="javascript:void(0);"
              data-target="dropdown-language"
              class="waves-block waves-effect waves-light dropdown-trigger"
            >
              <i class="material-icons">translate</i>
            </a>
            <ul id="dropdown-language" class="dropdown-content">
              <li v-for="(locale, index) in []" :key="index">
                <a
                  href="javascript:void(0);"
                  class="waves-block waves-effect waves-light"
                  @click="applyLocale(locale)"
                >
                  {{ locale }}
                </a>
              </li>
            </ul>
          </li> -->
          <!-- Sidebar Mobile Btn -->
          <li class="hide-on-med-and-up">
            <a
              href="javascript:void(0);"
              data-target="sidebar-mobile"
              class="waves-block waves-effect waves-light sidenav-trigger m-0"
            >
              <i class="material-icons">menu</i>
            </a>
          </li>
          <!-- NavLink Btn -->
          <span class="hide-on-small-only">
            <li v-for="(item, index) in data" :key="item.link || index">
              <DropdownLink
                v-if="item.type === 'links'"
                :index="index"
                :item="item"
              />
              <NavLink
                v-else
                :item="item"
                class="waves-block waves-effect waves-light"
              />
            </li>
          </span>
        </ul>
      </div>
      <!-- SearchBox Input -->
      <div class="nav-wrapper searchbox-input" v-if="showSearchBox">
        <div class="input-field">
          <input
            id="search"
            type="search"
            :placeholder="placeholder"
            v-model="query"
            @keyup.up="onUp"
            @keyup.down="onDown"
            @keyup.enter="go(focusIndex)"
            v-focus
          />
          <label class="label-icon" for="search">
            <i class="material-icons">search</i>
          </label>
          <i class="material-icons" @click="showSearchBox = false">close</i>
        </div>
      </div>
      <!-- SearchBox Result List -->
      <div
        class="searchbox-result-list"
        v-show="showSearchBox && showSuggestions"
      >
        <a
          v-for="(s, i) in suggestions"
          :key="i"
          href="javascript:void(0);"
          @click="go(i)"
        >
          <div
            class="nav-wrapper searchbox-result-item"
            :class="{ focused: i === focusIndex }"
          >
            <span>
              {{ s.title || s.path }}
            </span>
            <span v-if="s.header">
              &nbsp;&rArr;&nbsp;
              {{ s.header.title }}
            </span>
          </div>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink";
import DropdownLink from "@theme/components/DropdownLink";
import search from "@theme/mixins/search";
import { handleScroll } from "@theme/mixins/handleEvent";
import { toggleFullScreen } from "@theme/utils";

/* 处理 SearchBox 滚动事件 */
function handleScrollEvent(
  el = ".searchbox-result-list",
  itemEl = ".searchbox-result-item"
) {
  /*
    offsetTop: 元素距离上边界的实际距离
    offsetHeight: 元素的实际高度(包括边线的高)
    clientHeight: 可见区域高度
    scrollHeight: 正文全总高度
    scrollTop: 网页被卷去的高
     */
  const $el = document.querySelector(el);
  const $item = document.querySelector(itemEl);
  const $items = document.querySelectorAll(itemEl);
  $items.forEach((item, index) => {
    item.classList.forEach((cls) => {
      if (cls === "focused") {
        const curItemHeight = index * $item.scrollHeight;
        const offsetItemHeight = Math.ceil(index - 2) * $item.scrollHeight;
        // 设置滚动条的位置
        $el.scrollTop = offsetItemHeight;
      }
    });
  });
}

export default {
  components: { NavLink, DropdownLink },
  mixins: [search, handleScroll],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFixed: false,
      isVisible: true,
    };
  },
  watch: {
    focusIndex() {
      this.$nextTick(() => {
        if (this.showSearchBox) handleScrollEvent();
      });
    },
  },
  computed: {
    pageClass() {
      if (this.scrollTop > 56) {
        this.isFixed = true;
        this.isVisible = this.isScrollUp ? true : false;
      } else if (this.scrollTop === 0) {
        this.isFixed = false;
        this.isVisible = true;
      }
      /* Close Search Box */
      this.showSearchBox = false;
      return { fixed: this.isFixed, visible: this.isVisible };
    },
  },
  methods: {
    toggleFullScreen,
  },
};
</script>
