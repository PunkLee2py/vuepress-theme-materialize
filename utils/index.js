export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^(https?:|mailto:|tel:)/;

/* File Check */
/***********************************************/
export function isImg(path) {
    const imgExt = [
        "png",
        "jpg",
        "jpeg",
        "bmp",
        "gif",
        "webp",
        "psd",
        "svg",
        "tiff",
    ];
    let index = path.lastIndexOf(".");
    var ext = path.substr(index + 1);
    return imgExt.includes(ext);
}

/* Link Check */
/***********************************************/
export function isExternal(path) {
    return outboundRE.test(path);
}
export function isMailto(path) {
    return /^mailto:/.test(path);
}
export function isTel(path) {
    return /^tel:/.test(path);
}

/* Random */
/***********************************************/
export function randomIndex(data) {
    return Math.floor(Math.random() * data.length);
}
export function randomInteger(max, min = 1) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/* Document */
/***********************************************/
export function scrollTo(el) {
    let offsetTop = document.querySelector(el).offsetTop;
    document.documentElement.scrollTop = offsetTop;
}
export function scrollToBar(el) {
    //获取当前滚动条的位置
    var long1 = document.querySelector(el).scrollTop();
    //获取滚动条的长度
    var long2 = $("#dd2").height();
    //alert(h);
    //设置滚动条的位置
    // document.getElementById('dd2').scrollTop=100;
    //获取滚动条的高度
    var long3 = $("#dd2")[0].scrollHeight;
    document.getElementById("dd2").scrollTop = (long2 + long3) * nows - 200;
}

/* Format */
/***********************************************/
export function formatDate(time, fmt = "yyyy-MM-dd hh:mm:ss") {
    time = time.replace(/-/g, "/");
    const date = new Date(time);
    if (/(y+)/.test(fmt)) {
        fmt = fmt
            .replace(RegExp.$1, date.getFullYear() + "")
            .substr(4 - RegExp.$1.length);
    }

    const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
    };

    for (const key in o) {
        if (RegExp(`(${key})`).test(fmt)) {
            const str = o[key] + "";
            fmt = fmt.replace(RegExp.$1, str.length === 2 ? str : "0" + str);
        }
    }
    return fmt;
}

/* Add to browser favorites */
/***********************************************/
export function addFavorite() {
    var url = window.location;
    var title = document.title;
    var message =
        "您的浏览器不支持,请按 'Ctrl+D' 手动收藏! \nYour browser does not support it, please press 'Ctrl+D' to manually collect!";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert(message);
    } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    } else if (document.all) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            alert(message);
        }
    } else {
        alert(message);
    }
}

/* Throttle */
/***********************************************/
export function throttle(func, wait, options) {
    var timeout, context, args;
    var previous = 0;
    if (!options) options = {};

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    return throttled;
}
/* Toggle fullScreen */
/***********************************************/
export function toggleFullScreen() {
    (document.fullScreenElement && null !== document.fullScreenElement) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)
        ? document.documentElement.requestFullScreen
            ? document.documentElement.requestFullScreen()
            : document.documentElement.mozRequestFullScreen
            ? document.documentElement.mozRequestFullScreen()
            : document.documentElement.webkitRequestFullScreen
            ? document.documentElement.webkitRequestFullScreen(
                  Element.ALLOW_KEYBOARD_INPUT
              )
            : document.documentElement.msRequestFullscreen &&
              (document.msFullscreenElement
                  ? document.msExitFullscreen()
                  : document.documentElement.msRequestFullscreen())
        : document.cancelFullScreen
        ? document.cancelFullScreen()
        : document.mozCancelFullScreen
        ? document.mozCancelFullScreen()
        : document.webkitCancelFullScreen && document.webkitCancelFullScreen();
}
