<template>
  <div id="card-clock" class="card">
    <div
      class="clock alpha"
      style="--h1: 9; --h2: 5; --m1: 0; --m2: 8; --s1: 2; --s2: 8"
    >
      <span
        class="cog hours tens words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
      <span
        class="cog hours words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
      <span class="colon">:</span>
      <span
        class="cog minutes tens words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
      <span
        class="cog minutes words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
      <span class="colon">:</span>
      <span
        class="cog seconds tens words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
      <span
        class="cog seconds words chars splitting"
        data-splitting=""
        style="--word-total: 1; --char-total: 10"
        ><span class="word" data-word="0123456789" style="--word-index: 0"
          ><span class="char" data-char="0" style="--char-index: 0">0</span
          ><span class="char" data-char="1" style="--char-index: 1">1</span
          ><span class="char" data-char="2" style="--char-index: 2">2</span
          ><span class="char" data-char="3" style="--char-index: 3">3</span
          ><span class="char" data-char="4" style="--char-index: 4">4</span
          ><span class="char" data-char="5" style="--char-index: 5">5</span
          ><span class="char" data-char="6" style="--char-index: 6">6</span
          ><span class="char" data-char="7" style="--char-index: 7">7</span
          ><span class="char" data-char="8" style="--char-index: 8">8</span
          ><span class="char" data-char="9" style="--char-index: 9"
            >9</span
          ></span
        ></span
      >
    </div>
  </div>
</template>

<script>
/* We need zero-led values to help with the tens columns, and to allow for better looping around when reaching '9' */
function leadingZeroString(n) {
  return ("0" + n).slice(-2);
}

function updateTime(clock) {
  var d = new Date();
  var h = leadingZeroString(d.getHours());
  var m = leadingZeroString(d.getMinutes());
  var s = leadingZeroString(d.getSeconds());

  clock.style.setProperty("--h1", h[0]);
  clock.style.setProperty("--h2", h);
  clock.style.setProperty("--m1", m[0]);
  clock.style.setProperty("--m2", m);
  clock.style.setProperty("--s1", s[0]);
  clock.style.setProperty("--s2", s);
}

export default {
  data() {
    return {
      $ele: null,
      timer: null,
    };
  },
  mounted() {
    this.$ele = document.querySelector("#card-clock>.clock");
    this.timer = setInterval(() => updateTime(this.$ele), 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="stylus" scoped>
.clock
  border-radius: 6px
  color: var(--accentColor) !important
  background-color: var(--relativeAccentColor) !important

  if ($cardClock == alpha)
    color: #f0f0f0 !important
    background-color: rgba(0, 0, 0, 0.2) !important

.colon
  color: var(--accentColor)
</style>
<style src="./style.css" scoped></style>
