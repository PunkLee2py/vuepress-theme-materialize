import { formatDate } from "@theme/utils";

export default {
    filters: {
        formatMoney(num, sym = "") {
            if (num) {
                if (isNaN(num)) {
                    return 0;
                }
                num = typeof num == "string" ? parseFloat(num) : num; // 判断是否是字符串如果是字符串转成数字
                num = num.toFixed(2); // 保留两位
                num = parseFloat(num); // 转成数字
                num = num.toLocaleString(); // 转成金额显示模式
                // 判断是否有小数
                if (num.indexOf(".") === -1) {
                    num = sym + num;
                } else {
                    console.log(num.split(".")[1].length);
                }
                return num; // 返回的是字符串23,245.12保留2位小数
            } else {
                return 0;
            }
        },
        formatDateValue(value) {
            if (!value) return "";
            // 返回的value的值都是这个样子2019-09-20T18:22:30.000Z
            // 对value进行处理
            value = value.replace("T", " ").slice(0, value.lastIndexOf("."));
            // 转化后的value 2019-09-20 18:22:30
            // 获取到时分秒
            const h = Number(value.substr(11, 2));
            const m = Number(value.substr(14, 2));
            const s = Number(value.substr(17, 2));
            // 判断时分秒是不是 00:00:00 (如果是用户手动输入的00:00:00也会不显示)
            if (h > 0 || m > 0 || s > 0) {
                // 时分秒有一个> 0 就说明用户输入一个非 00:00:00 的时分秒
                return formatDate(value);
            } else {
                // 用户没有输入或者输入了 00:00:00
                return formatDate(value, "yyyy-MM-dd");
            }
        },
    },
};
