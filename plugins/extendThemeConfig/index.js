const fs = require("fs");

module.exports = (options, ctx) => {
    return {
        name: "plugin-extendThemeConfig",
        async ready() {
            const { sourceDir, siteConfig } = ctx;
            const { blogThemeConfig, ignoreKeys } = options;
            const sourceStat = fs.statSync(sourceDir);
            /* 完善默认配置 */
            // Docs folder creation time
            blogThemeConfig.docsDate =
                sourceStat.birthtime.getFullYear() != 1970
                    ? sourceStat.birthtime
                    : sourceStat.ctime;

            /* Auto Merge */
            if (!siteConfig.themeConfig) siteConfig.themeConfig = {};
            merge(siteConfig.themeConfig, blogThemeConfig, ignoreKeys || []);
        },
    };
};

/**
 * 合并用户与默认配置
 * @param {Object} $themeConfig
 * @param {Object} $blogConfig default themeConfig
 * @param {Array} ignoreKeys Key for manual merge, ignored key list
 */
function merge($themeConfig, $blogConfig, ignoreKeys) {
    const blogConfKeys = Object.keys($blogConfig);
    for (let i = 0; i < blogConfKeys.length; i++) {
        let curKey = blogConfKeys[i];
        if (ignoreKeys.includes(curKey)) continue;
        ////////////////////////////////////////////////
        // only value is set to false, will not merge //
        if ([undefined, true].includes($themeConfig[curKey])) {
            $themeConfig[curKey] = $blogConfig[curKey];
        } else if ($themeConfig[curKey] !== false) {
            if (typeof $themeConfig[curKey] === "object") {
                if (Array.prototype.isPrototypeOf($themeConfig[curKey])) {
                    // Array
                    $themeConfig[curKey] = [
                        ...$blogConfig[curKey],
                        ...$themeConfig[curKey],
                    ];
                } else {
                    // Object
                    $themeConfig[curKey] = {
                        ...$blogConfig[curKey],
                        ...$themeConfig[curKey],
                    };
                }
            } else {
                if ($blogConfig[curKey] && !$themeConfig[curKey]) {
                    $themeConfig[curKey] = $blogConfig[curKey];
                }
            }
        }
    }
    return $themeConfig;
}
