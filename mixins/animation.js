import { randomIndex, randomInteger } from "@theme/utils";

const animateList = ["fade", "zoom", "bounce", "slide", "back"];
const prefixList = ["In", "Out"];
const suffixList = ["Up", "Down", "Left", "Right"];
const hasInOut = ["fade", "zoom", "bounce"];
const hasBig = ["fade", "slide"];

export default {
    data() {
        return {
            prefixIndex: 0,
            suffixIndex: null,
        };
    },
    methods: {
        randomIndex,
        randomInteger,
        animateClass(list) {
            const _list = list || this.animateList;
            return _list[this.randomIndex(_list)];
        },
        animateStyle(delay = 0, duration = 1, mode = "both") {
            return {
                animation: this.animateList[this.randomIndex(this.animateList)],
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                animationFillMode: mode,
            };
        },
        _animateList(prefix, suffix) {
            let arr = [];
            animateList.map((i) => {
                prefix.map((j) => {
                    if (hasInOut.indexOf(i) !== -1) arr.push(i + j);
                    suffix.map((k) => {
                        arr.push(i + j + k);
                        if (hasBig.indexOf(i) !== -1)
                            arr.push(i + j + k + "Big");
                    });
                });
            });
            return arr;
        },
    },
    computed: {
        animateList() {
            let prefix = [prefixList[this.prefixIndex]];
            let suffix =
                this.suffixIndex !== null
                    ? [suffixList[this.suffixIndex]]
                    : suffixList;
            return this._animateList(prefix, suffix);
        },
    },
};
