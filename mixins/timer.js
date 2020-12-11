export default {
    data() {
        return {
            timer: null,
            timerTime: new Date().setHours(0, 0, 0),
        };
    },
    beforeDestroy() {
        this.timerDestroy();
    },
    watch: {
        $route() {
            this.timerDestroy();
        },
    },
    methods: {
        timerStart(ele, sec = 1000) {
            this.timer = setInterval(() => {
                this.timerTime += sec;
                let text = this.$moment(this.timerTime).format("HH:mm:ss");
                document.querySelector(ele).innerText = text;
            }, sec);
        },
        timerDestroy() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timerTime = new Date().setHours(0, 0, 0);
            }
        },
    },
};
