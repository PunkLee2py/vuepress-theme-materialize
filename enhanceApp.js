import $posts from "@theme/mixins/$posts";
import $filters from "@theme/mixins/$filters";
import $locales from "@theme/mixins/$locales";
import moment from "moment";

export default ({
    Vue, // VuePress 正在使用的 Vue 构造函数
    options, // 附加到根实例的一些选项
    router, // 当前应用的路由实例
    siteData, // 站点元数据
    isServer, // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
    const { themeConfig, locales } = siteData;

    Vue.mixin($posts);
    Vue.mixin($filters);
    Vue.mixin($locales);
    /* Initialize the locale of moment */
    const lang = locales ? locales["/"].lang : "";
    Vue.prototype.$moment = moment;
    Vue.prototype.$moment.locale(lang);

    /* Initialize the blogConfig */
    const $blogConfig = (Vue.prototype.$blogConfig = {
        tags: {
            enable: true,
            text: "Tags",
            icon: "local_offer",
            link: "/tags/",
            type: "link",
            location: 0,
        },
        categories: {
            enable: true,
            text: "Categories",
            icon: "category",
            link: "/categories/",
            type: "link",
            location: 0,
        },
        timelines: {
            enable: true,
            text: "TimeLine",
            icon: "av_timer",
            link: "/timelines/",
            type: "link",
            location: 0,
        },
    });
    // turn off the page
    Object.keys($blogConfig).map((key) => {
        const item = themeConfig[key];
        if (!item) {
            $blogConfig[key].enable = false;
        }
    });

    Vue.directive("focus", {
        inserted: function(el) {
            el.focus();
        },
    });
};
