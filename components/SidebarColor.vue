<template>
  <div id="sidebar-color" class="sidenav">
    <h5>
      {{ $locales.color.theme }}
      <a class="sidenav-close right" href="javascript:void(0);">
        <i class="material-icons">close</i>
      </a>
    </h5>
    <!-- Mode -->
    <h6 class="mt-6">{{ $locales.color.mode }}</h6>
    <hr class="divider" />
    <div class="row">
      <div
        class="input-field col s12"
        v-for="item in modeList"
        :key="item.value"
      >
        <div class="switch">
          {{ item.text }}
          <label class="right">
            <input
              type="checkbox"
              :value="item.value"
              @change="changeEvent($event)"
              @input="curColorMode.mode = $event.target.value"
              :checked="item.value === curColorMode.mode"
            />
            <span class="lever"></span>
          </label>
        </div>
      </div>
    </div>
    <!-- Color -->
    <h6 class="mt-6">{{ $locales.color.color }}</h6>
    <hr class="divider" />
    <p>
      <span
        v-for="(color, index) in colorList"
        :key="index"
        class="color-option"
        :class="[{ selected: index === curColorMode.colorIndex }]"
        :style="{ backgroundColor: color }"
        @click="curColorMode.colorIndex = index"
      ></span>
    </p>
  </div>
</template>

<script>
import modeConfigs from "@theme/theme-config/mode.js";
import { makeAlphaColor } from "@theme/theme-config/mode";

export default {
  data() {
    return {
      modeList: [
        { text: "Auto", value: "auto" },
        { text: "Light", value: "light" },
        { text: "Dark", value: "dark" },
      ],
      curColorMode: { mode: "auto", colorIndex: 0 },
    };
  },
  mounted() {
    this.curColorMode = this._getStorageColor(this.curColorMode);
    this.applyMode(this.curColorMode.mode);
    const color = this.colorList[this.curColorMode.colorIndex];
    if (color) this.applyColor(color);
  },
  watch: {
    curColorMode: {
      handler(val) {
        const { mode, colorIndex } = val;
        this.applyMode(mode);
        this.applyColor(this.colorList[colorIndex]);
        this._setStorageColor(val);
      },
      deep: true,
    },
  },
  computed: {
    colorList() {
      let data = [
        "", // default color
      ];
      const userColorList = this.$themeConfig.colorList;
      const defaultColorList = [
        "#f44336",
        "#9c27b0",
        "#e91e63",
        "#00bcd4",
        "#ff8f00",
        "#5d4037",
      ];
      return userColorList.length
        ? data.concat(userColorList)
        : data.concat(defaultColorList);
    },
  },
  methods: {
    applyColor(color) {
      if (!color) return;
      const $root = document.querySelector(":root");
      const options = makeAlphaColor("--accentColor", color);
      for (const k in options) {
        $root.style.setProperty(k, options[k]);
      }
    },
    applyMode(mode) {
      const $root = document.querySelector(":root");
      $root.removeAttribute("style"); // Clear all style first
      if (mode === "auto") {
        const curDate = new Date();
        let darkStartDate = new Date();
        let darkEndDate = new Date();
        darkStartDate.setHours(6, 0, 0); // 6:00:00
        darkEndDate.setHours(20, 0, 0); // 20:00:00
        if (curDate < darkStartDate || curDate > darkEndDate) {
          mode = "dark";
        }
      }
      if (["light", "dark"].includes(mode)) {
        const options = modeConfigs[mode] || [];
        for (const k in options) {
          $root.style.setProperty(k, options[k]);
        }
      }
    },

    changeEvent(e) {
      // 如果改变的值等于当前值，则不允改变
      if (e.target.defaultValue === this.curColorMode.mode)
        e.target.checked = true;
    },
    /* Local Storage */
    _getStorageColor(val) {
      const key = `${this.$siteTitle.replace(/\s/g, "_")}_blog_color`;
      const curVal = JSON.parse(localStorage.getItem(key));
      return curVal || val;
    },
    _setStorageColor(val) {
      const key = `${this.$siteTitle.replace(/\s/g, "_")}_blog_color`;
      localStorage.setItem(key, JSON.stringify(this.curColorMode));
    },
  },
};
</script>

<style lang="stylus" scoped>
.color-option
  display: inline-block
  width: 1.5rem
  height: 1.5rem
  margin: 0.5rem
  cursor: pointer
  border: 3px solid #fff
  border-radius: 50%
  background-color: $accentColor

  &.selected
    box-shadow: 0 0 10px 3px var(--accentColor)
</style>