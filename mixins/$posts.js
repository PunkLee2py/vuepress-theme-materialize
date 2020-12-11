export default {
    computed: {
        $sortTime() {
            return this.$themeConfig.sort;
        },
        $posts() {
            const {
                $home: { list: articles },
            } = this;
            let posts = articles.reduce((total, currentValue) => {
                return [...total, ...currentValue.pages];
            }, []);
            sortByDate(posts, this.$sortTime); // 默认排序为创建时间
            sortBySticky(posts);
            return posts;
        },
        $categoriesPost() {
            const $current = this.$currentCategories;
            let posts = $current ? $current.pages : [];
            sortByDate(posts, this.$sortTime);
            return posts;
        },
        $tagsPost() {
            const $current = this.$currentTags;
            let posts = $current ? $current.pages : [];
            sortByDate(posts, this.$sortTime);
            return posts;
        },
        $timelinesPost() {
            let posts = this.$posts;
            sortByDate(posts);
            return posts;
        },
    },
};
/* Sort by date */
function sortByDate(posts, dateType = "ctime") {
    posts.sort((prev, next) => {
        const prevDate = new Date(
            prev.frontmatter.dateTime[dateType]
        ).getTime();
        const nextDate = new Date(
            next.frontmatter.dateTime[dateType]
        ).getTime();
        return nextDate - prevDate;
    });
}
/* Sort by sticky */
function sortBySticky(posts) {
    posts.sort((prev, next) => {
        const prevSticky = prev.frontmatter.sticky;
        const nextSticky = next.frontmatter.sticky;
        if (prevSticky && !nextSticky) {
            return -1;
        } else if (!prevSticky && nextSticky) {
            return 1;
        }
    });
}
