/**
Pagination Mixins
=================
import pagination from "@theme/mixins/pagination";
mixins: [pagination],
computed: {
    data() {
        return this.$posts;
    }
}
 */
export default {
    data() {
        return {
            curPage: 1,
        };
    },
    mounted() {
        this.curPage = this._getStoragePage(1);
    },
    watch: {
        $route(val) {
            this.curPage = this._getStoragePage(1);
        },
        curPage(val) {
            this.curPage = val;
            // 避免修改配置重载后，页数不对的情况
            this.curPage = this.curPage > this.pages ? 1 : this.curPage;
            this._setStoragePage(val);
        },
    },
    computed: {
        /* Total pages */
        pages() {
            return Math.ceil(
                this.data.length / this.$themeConfig.pagination.perPage
            );
        },
        /* Current page article data */
        curPageData() {
            const perPage = this.$themeConfig.pagination.perPage;
            const start = this.curPage * perPage - perPage;
            const end = this.curPage * perPage;
            return this.data.slice(start, end);
        },
    },
    methods: {
        /* Session Storage */
        _getStoragePage(val) {
            const key = this.$route.name;
            const curVal = sessionStorage.getItem(key);
            if (curVal === null) this._setStoragePage(val);
            return parseInt(curVal || val);
        },
        _setStoragePage(val) {
            const key = this.$route.name;
            sessionStorage.setItem(key, val);
        },
    },
};
