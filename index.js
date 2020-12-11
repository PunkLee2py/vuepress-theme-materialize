const path = require("path");

// Theme API.
module.exports = (options, ctx) => {
    const { themeConfig, siteConfig } = ctx;

    // resolve algolia
    const isAlgoliaSearch =
        themeConfig.algolia ||
        Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
            (base) => themeConfig.locales[base].algolia
        );

    return {
        alias() {
            return {
                "@AlgoliaSearchBox": isAlgoliaSearch
                    ? path.resolve(__dirname, "components/AlgoliaSearchBox.vue")
                    : path.resolve(__dirname, "noopModule.js"),
            };
        },
        /* import local .css */
        alias: {
            materialize: path.resolve(__dirname, "./materialize"),
        },

        plugins: [
            require("./plugins/extendFrontMatter"),
            [
                require("./plugins/extendThemeConfig"),
                { blogThemeConfig: require("./theme-config/config.js") },
            ],
            /* 以下为官方插件 */
            [
                "@vuepress/plugin-blog",
                {
                    frontmatters: [
                        {
                            id: "home",
                            keys: ["title"],
                            path: "/",
                            layout: "LayoutHome",
                            // scopeLayout: "LayoutHome",
                        },
                        {
                            id: "tags",
                            keys: ["tags"],
                            path: "/tags/",
                            layout: "LayoutTags",
                            scopeLayout: "LayoutTags",
                        },
                        {
                            id: "categories",
                            keys: ["categories"],
                            path: "/categories/",
                            layout: "LayoutCategories",
                            scopeLayout: "LayoutCategories",
                        },
                        {
                            id: "timelines",
                            keys: ["timelines"],
                            path: "/timelines/",
                            layout: "LayoutTimelines",
                            scopeLayout: "LayoutTimelines",
                        },
                    ],
                },
            ],
            [
                "@vuepress/medium-zoom",
                {
                    selector: ".content__default :not(a) > img",
                },
            ],
            /* Container - tip/warn/danger */
            [
                "container",
                {
                    type: "tip",
                    before: (icon) =>
                        `<blockquote class="icons tip"><i class="material-icons">${icon}</i><div>`,
                    after: "</div></blockquote>",
                },
            ],
            [
                "container",
                {
                    type: "warn",
                    before: (icon) =>
                        `<blockquote class="icons warn"><i class="material-icons">${icon}</i><div>`,
                    after: "</div></blockquote>",
                },
            ],
            [
                "container",
                {
                    type: "danger",
                    before: (icon) =>
                        `<blockquote class="icons danger"><i class="material-icons">${icon}</i><div>`,
                    after: "</div></blockquote>",
                },
            ],
        ],
    };
};
