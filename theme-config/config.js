module.exports = {
    /**************************************
     * 全部默认为开启状态
    Tags/Categories/Timelines - 博客 标签/分类/时间轴 页面配置
    **************************************/
    // location: 在导航栏菜单中所占的位置
    // text: 默认文案为自动获取locales
    // icon: 导航栏的图标
    // 或者将值设为false以关闭此页面
    tags: {
        text: "",
        icon: "local_offer",
        location: 0,
        tableClass: "", // striped, highlight, centered, responsive-table
    },
    categories: {
        text: "",
        icon: "category",
        location: 0,
        tableClass: "",
    },
    timelines: {
        text: "",
        icon: "av_timer",
        location: 0,
    },
    /**************************************
    Page 404 - 404页面
    **************************************/
    page404: {
        message: "BAD REQUEST", // or ["msg1", "msg2"]
    },
    /**************************************
    Navbar - 导航栏链接
    **************************************/
    nav: [],
    /**************************************
    Page Loading Effect - 页面加载效果
    **************************************/
    pageLoading: { text: "", com: 0, side: "", delay: 0 },
    /**************************************
    Page Banner - 页面顶部Banner
    **************************************/
    pageBanner: {
        enable: false, // or ["/", "/tags/", "/categories/", "/timelines/"]
        effect: 0,
        title: "",
        text: "", // or ["text1", "text2", ...]
        items: "", // or ["img1", "img2", ...]
        style: {},
    },
    /**************************************
    Page Post Style - 页面文章样式
    **************************************/
    pagePost: { side: "right", com: 0 },
    /**************************************
    Page Card Widgets - 页面侧边小部件
    **************************************/
    pageWidgets: {
        sticky: false, // sticky layout
        CardInfo: true,
        CardNotice: true,
        CardClock: false,
        CardSiteInfo: true,
    },
    // or all disable
    // pageWidgets: false,
    /**************************************
    Theme Locales - 主题多语言配置
    **************************************/
    locales: {},
    /**************************************
    Avatar - 头像
    **************************************/
    avatar: "",
    /**************************************
    Notice - 网站公告
    **************************************/
    notice: "",
    /**************************************
    Sort by time - 按时间排序(创建/修改)时间
    **************************************/
    sort: "ctime", // "ctime" or "mtime"
    /**************************************
    SiteInfo - 站点信息
    **************************************/
    // Blog Start Date - 博客项目的创建时间
    // format: 2020-02-02 20:20:20
    // default: 'docs' folder creation time
    docsDate: "",
    /**************************************
    Footer
    **************************************/
    footer: {
        start: "",
        end: "",
        customText: "", // or ["text1", "text2 <a href='/'>link</a>", ...]
        themeInfo: true,
    },
    /**************************************
    Pagination - 分页
    **************************************/
    pagination: {
        perPage: 6,
        range: 3,
    },
    /**************************************
    Search - 搜索
    **************************************/
    search: {
        placeholder: "Please enter title/tag/category",
        maxSuggestions: 10,
        hotKeys: "F2",
    },
    /**************************************
    Comments - 评论
    **************************************/
    valine: {
        appId: "",
        appKey: "",
        avatar: "retro",
        visitor: true,
        lang: "en",
    },
    /**************************************
    Image - 全局图片设置
    **************************************/
    img: {
        loading: "", // "/loadingImg.gif" or "loadingImg.svg"
        loadingSvg: 10, // 0 ~ 11 // if not set loading, default to use theme svg effects
        error: "", // "/errorImg.png"
        global: "https://picsum.photos/400/200", // For posts without a cover
    },
    /**************************************
    Sidebar: Accent Color - 主题可选主调色
    **************************************/
    colorList: [],
    /**************************************
    unGrabber
    **************************************/
    unGrabber: false,
    unGrabberText: "",
};
