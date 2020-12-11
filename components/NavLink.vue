<template>
  <!-- 内部链接 -->
  <Router-link
    v-if="!isExternalLink"
    :class="pageClass"
    :to="item.link ? item.link : $localePath"
  >
    <i class="material-icons left hide-on-med-only">{{ item.icon }}</i>
    <span>{{ item.text }}</span>
  </Router-link>
  <!-- 外部链接 -->
  <a
    v-else
    :class="pageClass"
    :href="item.link"
    :target="target"
    :rel="isMailtoOrTel ? null : 'noopener noreferrer'"
  >
    <i class="material-icons left hide-on-med-only">{{ item.icon }}</i>
    <span>{{ item.text }}</span>
  </a>
</template>

<script>
import { isExternal, isMailto, isTel } from "@theme/utils";

export default {
  props: {
    item: {
      required: true,
    },
  },
  computed: {
    pageClass() {
      return "waves-block waves-effect waves-light sidenav-close";
    },
    icon() {
      let classed = "fa-fw fa";
      let externalIcon = "fa-external-link";
      let internalIcon = "fa-slack";
      let icon = this.item.icon
        ? this.item.icon
        : this.isExternalLink
        ? externalIcon
        : internalIcon;
      return `${classed} ${icon}`;
    },
    target() {
      return this.item.target
        ? this.item.target
        : this.isMailtoOrTel
        ? ""
        : "_blank";
    },
    isExternalLink() {
      return isExternal(this.item.link);
    },
    isMailtoOrTel() {
      return isMailto(this.item.link) || isTel(this.item.link);
    },
  },
  methods: {
    isMailto,
    isTel,
  },
};
</script>
