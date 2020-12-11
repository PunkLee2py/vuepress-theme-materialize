<template>
  <!-- Password Page -->
  <Password v-if="!permit" v-model="permit" :key="renderKey" />
  <!-- Post page -->
  <Common v-else-if="permit" :showToc="showToc">
    <div class="main-wrapper row">
      <!-- Article Toc -->
      <ul
        id="sidebar-toc"
        class="sidenav sidenav-fixed table-of-contents"
        :class="{ open: showToc }"
      >
        <li
          v-for="(item, index) in $page.headers"
          :key="index"
          :class="`level-${item.level}`"
        >
          <a :href="`#${item.slug}`">{{ item.title }}</a>
        </li>
      </ul>
      <!-- Article Cover -->
      <div class="col s12">
        <div
          id="article-cover"
          class="card card-mask fadeInDown duration-13"
          :style="$frontmatter.coverStyle"
        >
          <!-- Cover -->
          <Img :src="$frontmatter.cover" :style="$frontmatter.coverStyle" />
          <!-- Info -->
          <div class="post-info">
            <div class="title">{{ $frontmatter.title }}</div>
            <!-- Tag -->
            <div
              class="tag post-meta-wrap"
              v-show="$frontmatter.tags && $blogConfig.tags.enable"
            >
              <Router-link
                v-for="(tag, index) in $frontmatter.tags"
                :key="index"
                :to="`${$blogConfig.tags.link}${tag}`"
                class="meta"
              >
                {{ tag }}
              </Router-link>
            </div>
            <!-- Category -->
            <div
              class="category post-meta-wrap"
              v-show="category && $blogConfig.categories.enable"
            >
              <span class="meta">
                <i class="material-icons">{{ $themeConfig.categories.icon }}</i>
                {{ $locales.post.category }}:&nbsp;
                <Router-link
                  :to="`${$blogConfig.categories.link}${category}`"
                  class="meta"
                >
                  {{ category }}
                </Router-link>
              </span>
            </div>
            <!-- Created && Updated time -->
            <div class="post-meta-wrap">
              <span class="meta">
                <i class="material-icons">create</i>
                <a
                  class="tooltipped"
                  :data-tooltip="
                    $moment($frontmatter.dateTime.ctime).format('LLL')
                  "
                >
                  {{ $locales.post.ctime }}
                  {{ $moment($frontmatter.dateTime.ctime).startOf().fromNow() }}
                </a>
              </span>
              <div class="separator"></div>
              <span class="meta">
                <i class="material-icons">update</i>
                <a
                  class="tooltipped"
                  :data-tooltip="
                    $moment($frontmatter.dateTime.mtime).format('LLL')
                  "
                >
                  {{ $locales.post.mtime }}
                  {{ $moment($frontmatter.dateTime.mtime).startOf().fromNow() }}
                </a>
              </span>
            </div>
            <!-- Total words && Reading timer  -->
            <div class="post-meta-wrap">
              <span class="meta">
                <i class="material-icons">assessment</i>
                {{ $locales.post.words }}:
                {{ $frontmatter.wordCount | formatMoney }}
              </span>
              <div class="separator"></div>
              <span class="meta">
                <i class="material-icons">timer</i>
                {{ $locales.post.timer }}:&nbsp;
                <span id="reading_timer">--:--:--</span>
              </span>
            </div>
            <!-- Visitor count && Comment count -->
            <div class="post-meta-wrap" v-show="showComments">
              <span
                :id="$page.path"
                :data-flag-title="$frontmatter.title"
                class="meta leancloud_visitors"
              >
                <i class="material-icons">visibility</i>
                <span>{{ $locales.post.count }}:&nbsp;</span>
                <i class="leancloud-visitors-count">0</i>
              </span>
              <div class="separator"></div>
              <span class="meta">
                <i class="material-icons">comment</i>
                <a
                  href="javascript:void(0);"
                  @click="scrollTo('#comments-container')"
                >
                  {{ $locales.post.comment }}:&nbsp;
                  <i class="valine-comment-count" :data-xid="$page.path"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Article Content -->
      <div class="col s12">
        <div id="article-container" class="card-panel fadeInUp duration-13">
          <Content />
        </div>
      </div>
      <!-- Comments -->
      <Comments v-if="showComments" :options="$themeConfig.valine" />
    </div>
    <!-- Fixed Action Btn -->
    <template #fixedActionBtn>
      <li v-if="showComments">
        <a
          href="javascript:void(0);"
          class="btn-floating"
          @click="scrollTo('#comments-container')"
        >
          <i class="material-icons">comment</i>
        </a>
      </li>
      <li v-if="$frontmatter.toc && $page.headers">
        <a
          href="javascript:void(0);"
          class="btn-floating sidenav-trigger"
          data-target="sidebar-toc"
          @click="showToc = !showToc"
        >
          <i class="material-icons">format_list_bulleted</i>
        </a>
      </li>
    </template>
  </Common>
</template>

<script>
import Password from "@theme/components/Password";
import Comments from "@theme/components/Comments";
import timer from "@theme/mixins/timer";
import { scrollTo } from "@theme/utils";

export default {
  name: "Layout",
  mixins: [timer],
  components: { Password, Comments },
  data() {
    return {
      permit: null,
      showToc: null,
      renderKey: 1,
    };
  },
  watch: {
    permit(val) {
      if (val) {
        this.init_toc();
        /* Start Reading Timer */
        this.timerStart("#reading_timer");
      }
    },
    $route(newVal, oldVal) {
      if (newVal.name !== oldVal.name) {
        /* Init Data */
        this.permit = this.showToc = null;
        ++this.renderKey;
      }
    },
  },
  computed: {
    category() {
      const { categories } = this.$frontmatter;
      if (categories && categories.length) {
        return categories[0];
      }
      return null;
    },
    coverStyle() {
      const { cover, coverStyle } = this.$frontmatter;
      const coverSrc = cover ? this.$withBase(cover) : "";
      const initCoverStyle = {
        backgroundImage: `url(${coverSrc})`,
      };
      return cover ? { ...initCoverStyle, ...coverStyle } : {};
    },
    /* Comments - Valine */
    showComments() {
      const { valine } = this.$themeConfig;
      if (valine.appId && valine.appKey) {
        return this.$frontmatter.comments;
      }
      return false;
    },
  },
  methods: {
    scrollTo,
    /* Table of Contents */
    init_toc() {
      const { toc, tocDelay } = this.$frontmatter;
      if (this.$page.headers) {
        if (toc) {
          setTimeout(() => {
            this.showToc = true;
          }, tocDelay || 500);
        } else {
          this.showToc = false;
        }
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
$margin = 22rem

#article-cover
  min-height: 20rem
  background-position: center center
  background-size: cover
  color: #eee
  display: flex
  align-items: flex-end

  a
    color: #eee

  a:hover
    color: var(--accentColor)

  img
    position: absolute
    border-radius: 6px
    top: 0
    left: 0
    width: 100%
    height: 100%
    object-fit: cover
    background-size: cover
    background-position: center center
    background-repeat: no-repeat
    z-index: -1

.post-info
  position: relative
  text-align: left
  overflow: hidden
  padding: 1rem 1.7rem

  @media only screen and (min-width: $screenMedium)
    padding: 1.5rem 2.2rem

  @media only screen and (min-width: $screenLarge)
    padding: 2rem 2.7rem

  .title
    font-size: 2rem
    line-height: 1.5

    @media only screen and (min-width: $screenMedium)
      font-size: 2.25rem

    @media only screen and (min-width: $screenLarge)
      font-size: 2.5rem

  .post-meta-wrap
    margin: 0.3rem 0

  .category a
    color: #eee

    &:hover
      text-decoration: underline

  .tag a.meta
    display: inline-block
    margin-right: 0.3rem
    margin-bottom: 0.3rem
    padding: 0 0.3rem
    border-radius: 0.6rem
    font-size: 85%
    width: fit-content
    border: 1px solid #eee
    transition: all unit($transitionTime, 's') ease-in-out
    color: #eee

    &:hover
      border: 1px solid var(--accentColor)
      background: var(--accentColor)
      color: #eee !important
</style>
