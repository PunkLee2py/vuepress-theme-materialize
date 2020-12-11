const fs = require("fs");
const path = require("path");

module.exports = (options = {}, context) => ({
    name: "plugin-extendFrontMatter",
    extendPageData($page) {
        const {
            _filePath, // 源文件的绝对路径
            _content, // 源文件的原始内容字符串
            _strippedContent, // 源文件剔除掉 frontmatter 的内容字符串
            key, // 页面唯一的 hash key
            frontmatter, // 页面的 frontmatter 对象
            regularPath, // 当前页面遵循文件层次结构的默认链接
        } = $page;

        if (_filePath) {
            const fStat = fs.statSync(_filePath);
            const fName = path.basename(_filePath);
            /* 为每篇文章设置属性
             ********************/
            // title: If not set, this file name is used
            if (!frontmatter.hasOwnProperty("title") || !frontmatter.title) {
                let title = fName.replace(/.md$/, "");
                $page.title = title;
                $page.frontmatter.title = title;
            }
            // tags && categories
            const { tags, categories } = frontmatter;
            $page.frontmatter.tags = tags || [];
            $page.frontmatter.categories = categories || ["Default"];
            // description
            const { description } = frontmatter;
            let articleContent = _strippedContent;
            articleContent = articleContent.replace(/<\/?.+?\/?>/g, ""); // Remove html tag
            $page.frontmatter.description =
                description || articleContent.slice(0, 78);
            // dateTime: 包含文件创建与修改时间，用户date将覆盖默认创建时间
            let ctime =
                (fStat.birthtime.getFullYear() != 1970
                    ? fStat.birthtime
                    : fStat.ctime) || new Date();
            let mtime = fStat.mtime || new Date();
            if (frontmatter.hasOwnProperty("date")) {
                let userDate = new Date(frontmatter.date);
                if (userDate.toJSON() && userDate.getFullYear() != 1970)
                    ctime = userDate;
            }
            $page.frontmatter.dateTime = { ctime, mtime };
            // wordCount: The total number of words in the article
            $page.frontmatter.wordCount = _strippedContent.length;
            // toc && comments
            const { toc, comments } = frontmatter;
            $page.frontmatter.toc = toc !== undefined ? toc : true;
            $page.frontmatter.comments =
                comments !== undefined ? comments : true;
        }
    },
});
