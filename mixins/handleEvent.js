import { throttle } from "lodash";

const intervalTime = 100;

/* 监听滚动事件 */
function _handleScroll() {
    let currentTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    let offset = currentTop - this.scrollTop;
    this.scrollTop = currentTop;
    this.isScrollUp = offset < 0 ? true : false;
}
export const handleScroll = {
    data() {
        return {
            scrollTop: 0,
            isScrollUp: true,
        };
    },
    mounted() {
        this.handleScroll(); // initialization
        document.addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll: throttle(_handleScroll, intervalTime),
    },
};
/* 监听窗口事件 */
function _handleResize() {
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
}
export const handleResize = {
    data() {
        return {
            winWidth: 0,
            winHeight: 0,
        };
    },
    mounted() {
        this.handleResize(); // initialization
        document.addEventListener("resize", this.handleResize);
    },
    beforeDestroy() {
        document.removeEventListener("resize", this.handleResize);
    },
    methods: {
        handleResize: throttle(_handleResize, intervalTime),
    },
};
