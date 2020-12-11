import blogThemeConfig from "./config";

export default ($themeConfig) => {
    let { nav, avatar, pagination, search } = $themeConfig;

    // 忽略要特殊处理的配置
    merge($themeConfig, blogThemeConfig, ["nav", "dateTime"]);

    /* Navbar
     **********/
    // 去除无用数据
    nav = nav.filter((item) => {
        item.type = item.items && item.items.length ? "links" : "link";
        return item.text;
    });
    // 按照 location 属性排序
    // $themeConfig.nav = [...blogThemeConfig.nav, ...nav];
    $themeConfig.nav = blogThemeConfig.nav;
    $themeConfig.nav.sort((a, b) => {
        let a_loc = a.location ? a.location : $themeConfig.nav.length;
        let b_loc = b.location ? b.location : $themeConfig.nav.length;
        return a_loc - b_loc;
    });
};

/* Merge: 合并用户与默认配置 */
function merge(config1, config2, ignoreKeys) {
    const configKeys = Object.keys(config2);
    for (let i = 0; i < configKeys.length; i++) {
        let curKey = configKeys[i];
        if (ignoreKeys.indexOf(curKey) !== -1) continue;

        if (typeof config1[curKey] === "object") {
            if (Array.prototype.isPrototypeOf(config1[curKey])) {
                config1[curKey] = [...config2[curKey], ...config1[curKey]];
            } else {
                config1[curKey] = {
                    ...config2[curKey],
                    ...config1[curKey],
                };
            }
        } else {
            if (config2[curKey]) config1[curKey] = config2[curKey];
        }
    }
    return config1;
}
