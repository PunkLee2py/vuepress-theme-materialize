<template>
  <div class="theme-container">
    <!-- Page Loading -->
    <Loading :class="loadClass + ' ' + $themeConfig.pageLoading.side" />
    <!-- Popup -->
    <Modals />
    <Sidebar :data="nav" />
    <SidebarColor />
    <slot name="popup" />

    <div id="body-wrap" :class="{ open: showToc }">
      <!-- Navbar -->
      <Navbar :data="nav" />
      <!-- Main -->
      <slot name="main">
        <main class="container" :style="{ fontSize: `${fontSize}%` }">
          <slot>
            <!-- Banner -->
            <div wrapper="banner-wrapper" class="row mb-0">
              <div class="col s12">
                <Banner class="slideInLeftBig duration-10" />
              </div>
            </div>
            <!-- Main Content -->
            <div class="main-wrapper layout-wrap row">
              <!-- Content List -->
              <div
                id="content-list"
                class="col s12 l9 p-0"
                :class="$themeConfig.pagePost.side + '-side'"
              >
                <slot name="main-content" />
              </div>
              <!-- Aside List -->
              <CardWidgets id="aside-list" class="col s12 l3 p-0" />
            </div>
          </slot>
        </main>
      </slot>
      <!-- Footer -->
      <Footer />
    </div>

    <!-- Fixed Action Btn -->
    <div class="fixed-action-btn zoomIn delay-10" v-if="showFixedBtn">
      <a href="javascript:void(0);" class="btn-floating btn-large">
        <i class="material-icons">settings</i>
      </a>
      <ul>
        <!-- Back To Top -->
        <li>
          <a
            class="btn-floating"
            href="javascript:void(0);"
            @click="scrollTo('nav')"
          >
            <i class="material-icons">keyboard_arrow_up</i>
          </a>
        </li>
        <!-- Zoom in and out font size -->
        <li>
          <a
            href="javascript:void(0);"
            class="btn-floating"
            @click="fontSize += 5"
          >
            <i class="material-icons">exposure_plus_1</i>
          </a>
        </li>
        <li>
          <a
            href="javascript:void(0);"
            class="btn-floating"
            @click="fontSize -= 5"
          >
            <i class="material-icons">exposure_neg_1</i>
          </a>
        </li>
        <!-- Extra action btn -->
        <slot name="fixedActionBtn" />
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar";
import Modals from "@theme/components/Modals";
import Sidebar from "@theme/components/Sidebar";
import SidebarColor from "@theme/components/SidebarColor";
import CardWidgets from "@theme/components/CardWidgets";
import Footer from "@theme/components/Footer";
import Loading from "@theme/components/Loading";
import Banner from "@theme/components/Banner";
import { scrollTo } from "@theme/utils";
import { unGrabberInit, materializeInit } from "./Initialize";

export default {
  name: "Common",
  components: {
    Navbar,
    Modals,
    Sidebar,
    SidebarColor,
    CardWidgets,
    Footer,
    Loading,
    Banner,
  },
  props: {
    showToc: {
      type: Boolean,
      default: false,
    },
    showFixedBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      fontSize: 100,
      loadClass: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.loadClass = "loaded";
    }, this.$themeConfig.pageLoading.delay);

    if (this.$themeConfig.unGrabber) {
      unGrabberInit(
        this.$themeConfig.unGrabber,
        this.$themeConfig.unGrabberText
      );
    }

    materializeInit();
  },
  updated() {
    materializeInit();
  },
  computed: {
    nav() {
      let defaultNav = {};
      Object.keys(this.$blogConfig).map((key) => {
        if (this.$blogConfig[key].enable) {
          defaultNav[key] = this.$blogConfig[key];
        }
      });

      Object.keys(defaultNav).map((key) => {
        const item = this.$themeConfig[key];
        // change locale language or user text
        defaultNav[key].text = item.text || this.$locales.nav[key];
        this.$blogConfig[key].text = item.text || this.$locales.nav[key];
        // change location
        defaultNav[key].location = item.location;
        // change icon
        defaultNav[key].icon = item.icon;
      });
      // Sort by 'location' attribute
      let nav = [...Object.values(defaultNav), ...this.userNav];
      return nav.sort((a, b) => {
        let a_loc = a.location ? a.location : nav.length;
        let b_loc = b.location ? b.location : nav.length;
        return a_loc - b_loc;
      });
    },
    userNav() {
      let nav = this.$themeConfig.nav || [];
      // 去除无用数据，并设置链接类型
      return nav.filter((item) => {
        item.type = item.items && item.items.length ? "links" : "link";
        return item.text;
      });
    },
    languageNav() {
      const { locales } = this.$site;
      if (locales && Object.keys(locales).length > 1) {
        const currentLink = this.$page.path;
        const routes = this.$router.options.routes;
        const themeLocales = this.$site.themeConfig.locales || {};
        const languageDropdown = {
          text: this.$themeLocaleConfig.selectText || "Languages",
          ariaLabel: this.$themeLocaleConfig.ariaLabel || "Select language",
          items: Object.keys(locales).map((path) => {
            const locale = locales[path];
            const text =
              (themeLocales[path] && themeLocales[path].label) || locale.lang;
            let link;
            // Stay on the current page
            if (locale.lang === this.$lang) {
              link = currentLink;
            } else {
              // Try to stay on the same page
              link = currentLink.replace(this.$localeConfig.path, path);
              // fallback to homepage
              if (!routes.some((route) => route.path === link)) {
                link = path;
              }
            }
            return { text, link };
          }),
        };
        return [languageDropdown];
      }
      return [];
    },
  },
  methods: {
    scrollTo,
  },
};
</script>
