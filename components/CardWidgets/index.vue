<template>
  <div
    v-if="enable"
    :class="{ sticky_layout: $themeConfig.pageWidgets.sticky }"
  >
    <div v-for="(item, index) in widgetsComList" :key="index" class="col s12">
      <component :is="item.com" class="widget"></component>
    </div>
  </div>
</template>

<script>
import CardInfo from "./CardInfo";
import CardNotice from "./CardNotice";
import CardClock from "./CardClock";
import CardSiteInfo from "./CardSiteInfo";

const WIDGETS = ["CardInfo", "CardNotice", "CardClock", "CardSiteInfo"];

export default {
  components: {
    CardInfo,
    CardNotice,
    CardClock,
    CardSiteInfo,
  },
  computed: {
    enable() {
      return (
        this.$themeConfig.pageWidgets !== false && this.widgetsComList.length
      );
    },
    widgetsComList() {
      let arr = [];
      let widgets = this.$themeConfig.pageWidgets;
      for (let i in widgets) {
        if (WIDGETS.includes(i) && widgets[i]) {
          arr.push({ com: i });
        }
      }
      // Sort by 'number'
      return arr;
    },
  },
};
</script>
