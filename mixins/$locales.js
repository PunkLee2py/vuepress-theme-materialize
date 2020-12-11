import { zhHans, zhHant, en, ja, ko } from "../theme-config/locales";

export default {
    computed: {
        $locales() {
            const themeLocales = this.$themeLocaleConfig.locales || {};

            if (/^zh\-(CN|cn|SG|sg)$/.test(this.$lang)) {
                return { ...zhHans, ...themeLocales };
            }
            if (/^zh\-(HK|hk|MO|mo|TW|tw)$/.test(this.$lang)) {
                return { ...zhHant, ...themeLocales };
            }
            if (/^ja\-(JP|jp)$/.test(this.$lang)) {
                return { ...ja, ...themeLocales };
            }
            if (/^ko\-(KR|kr)$/.test(this.$lang)) {
                return { ...ko, ...themeLocales };
            }
            return { ...en, ...themeLocales };
        },
    },
    methods: {
        applyLocale(val) {
            this._setStorageLocale(val);
        },
        /* Session Storage */
        _getStorageLocale(val) {
            const key = `${this.$siteTitle.replace(/\s/g, "_")}_blog_locale`;
            const curVal = localStorage.getItem(key);
            return curVal || val;
        },
        _setStorageLocale(val) {
            const key = `${this.$siteTitle.replace(/\s/g, "_")}_blog_locale`;
            localStorage.setItem(key, val);
        },
    },
};
