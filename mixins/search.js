import get from "lodash/get";

export default {
    data() {
        return {
            query: "",
            focusIndex: 0,
            showSearchBox: false,
            placeholder: undefined,
        };
    },
    mounted() {
        this.placeholder = this.$themeConfig.search.placeholder;
        document.addEventListener("keydown", this.onHotkey);
    },
    beforeDestroy() {
        document.removeEventListener("keydown", this.onHotkey);
    },
    computed: {
        showSuggestions() {
            return this.suggestions && this.suggestions.length;
        },

        suggestions() {
            const res = [];
            const query = this.query.trim().toLowerCase();
            if (!query) {
                return res;
            }

            const { pages } = this.$site;
            const max = this.$themeConfig.search.maxSuggestions;
            const localePath = this.$localePath;
            for (let i = 0; i < pages.length; i++) {
                if (res.length >= max) break;
                const p = pages[i];

                if (matchQuery(query, p)) {
                    res.push(p);
                } else if (p.headers) {
                    for (let j = 0; j < p.headers.length; j++) {
                        if (res.length >= max) break;
                        const h = p.headers[j];
                        if (h.title && matchQuery(query, p, h.title)) {
                            res.push(
                                Object.assign({}, p, {
                                    path: p.path + "#" + h.slug,
                                    header: h,
                                })
                            );
                        }
                    }
                }
            }
            return res;
        },
    },
    methods: {
        onHotkey(event) {
            const { hotKeys } = this.$themeConfig.search;
            if (
                event.srcElement === document.body &&
                hotKeys.includes(event.key)
            ) {
                this.showSearchBox = !this.showSearchBox;
            }
        },
        onUp() {
            if (this.showSuggestions) {
                if (this.focusIndex > 0) {
                    this.focusIndex--;
                } else {
                    this.focusIndex = this.suggestions.length - 1;
                }
            }
        },
        onDown() {
            if (this.showSuggestions) {
                if (this.focusIndex < this.suggestions.length - 1) {
                    this.focusIndex++;
                } else {
                    this.focusIndex = 0;
                }
            }
        },
        go(i) {
            if (!this.showSuggestions) {
                this.showSearchBox = false;
                return;
            }
            // 解决重复点击相同路由链接 NavigationDuplicated 的错误
            this.$router.push(this.suggestions[i].path).catch((err) => {
                console.log(err);
            });
            this.showSearchBox = false;
            this.focusIndex = 0;
            this.query = "";
        },
    },
};

function matchQuery(query, page, additionalStr = null) {
    let domain = get(page, "title", "");

    if (get(page, "frontmatter.tags")) {
        domain += ` ${page.frontmatter.tags.join(" ")}`;
    }

    if (additionalStr) {
        domain += ` ${additionalStr}`;
    }

    return matchTest(query, domain);
}

const matchTest = (query, domain) => {
    const escapeRegExp = (str) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

    // eslint-disable-next-line no-control-regex
    const nonASCIIRegExp = new RegExp("[^\x00-\x7F]");

    const words = query
        .split(/\s+/g)
        .map((str) => str.trim())
        .filter((str) => !!str);

    if (!nonASCIIRegExp.test(query)) {
        // if the query only has ASCII chars, treat as English
        const hasTrailingSpace = query.endsWith(" ");
        const searchRegex = new RegExp(
            words
                .map((word, index) => {
                    if (words.length === index + 1 && !hasTrailingSpace) {
                        // The last word - ok with the word being "startswith"-like
                        return `(?=.*\\b${escapeRegExp(word)})`;
                    } else {
                        // Not the last word - expect the whole word exactly
                        return `(?=.*\\b${escapeRegExp(word)}\\b)`;
                    }
                })
                .join("") + ".+",
            "gi"
        );
        return searchRegex.test(domain);
    } else {
        // if the query has non-ASCII chars, treat as other languages
        return words.some((word) => domain.toLowerCase().indexOf(word) > -1);
    }
};
