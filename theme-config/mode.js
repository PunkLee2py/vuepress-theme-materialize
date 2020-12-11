export default {
    light2: {
        /* Non custom */
        "--img-filter": "brightness(1.1)",
        /* Base Color */
        ...makeAlphaColor("--accentColor", "#eee"),
        "--relativeAccentColor": "#fafafa",
        "--textColor": "#000",
        "--relativeTextColor": "#000",
        "--boxShadowColor": `rgba(${convertRGB("#fcfcfc")}, 0.${6})`,
        /* Code Color */
        "--codeBgColor": "#f6f8fa",
        "--codeLightColor": `rgba(${convertRGB("#000")}, 0.${2})`,
    },
    dark: {
        /* Non custom */
        "--img-filter": "brightness(0.8)",
        "--color-bg-html": "#666",
        /* Base Color */
        ...makeAlphaColor("--accentColor", "#333"),
        "--relativeAccentColor": "#555",
        "--textColor": "#ccc",
        "--relativeTextColor": "#ccc",
        "--boxShadowColor": `rgba(${convertRGB("#999")}, 0.${2})`,
        "--zoomBgColor": "#666",
        /* Code Color */
        "--codeBgColor": "#666",
        "--codeLightColor": `rgba(${convertRGB("#000")}, 0.${2})`,
    },
};
export function makeAlphaColor(name, colorVar) {
    let data = {};
    data[`${name}`] = colorVar;
    const colorRGB = convertRGB(colorVar) || colorVar;
    for (let i = 1; i < 10; i++) {
        data[`${name}-${i}`] = `rgba(${colorRGB}, 0.${i})`;
    }
    return data;
}
/**
 * Hexadecimal Convert RGB
 * @param {String} value Color Value
 */
export function convertRGB(value) {
    let a = value;
    if (a.substr(0, 1) == "#") a = a.substring(1);
    let len = a.length;
    if (len != 6 && len != 3) return false;
    if (/[^0-9a-f]/i.test(a)) return false;
    a = a.toLowerCase();
    let b = new Array();
    for (let x = 0; x < 3; x++) {
        b[0] =
            len == 6
                ? a.substr(x * 2, 2)
                : a.substr(x * 1, 1) + a.substr(x * 1, 1);
        b[3] = "0123456789abcdef";
        b[1] = b[0].substr(0, 1);
        b[2] = b[0].substr(1, 1);
        b[20 + x] = b[3].indexOf(b[1]) * 16 + b[3].indexOf(b[2]);
    }
    return b[20] + "," + b[21] + "," + b[22];
}
