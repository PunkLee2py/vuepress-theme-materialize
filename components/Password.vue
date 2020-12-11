<template>
  <Common :showFixedBtn="false">
    <template #main>
      <main class="container flex-wrap middle">
        <div class="main-wrapper row center">
          <div class="col s12">
            <div class="card-panel duration-10" :class="passwordClass">
              <div class="inner-wrap" :style="disabled ? 'z-index:1000' : ''">
                <Preloader progress :class="{ progress: disabled }" />
              </div>
              <div class="row">
                <h4>
                  <i class="material-icons">lock</i>
                  {{ $frontmatter.title }}
                </h4>
                <div
                  class="input-field password-input col s12 m8 offset-m2 l6 offset-l3"
                >
                  <input
                    id="password"
                    type="password"
                    v-model="password"
                    @keydown.enter="validate_password()"
                    @keydown.esc="password = ''"
                    v-focus
                  />
                  <label for="password">{{ placeholder }}</label>
                </div>
                <div class="col s12">
                  <button
                    name="action"
                    class="btn waves-effect waves-light"
                    :class="{
                      disabled: disabled || !password,
                    }"
                    @click="validate_password()"
                  >
                    {{ button }}
                    <i class="material-icons right">fingerprint</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </template>
  </Common>
</template>

<script>
import Preloader from "@theme/components/Preloader";
import md5 from "md5";

export default {
  props: ["value"],
  components: { Preloader },
  data() {
    return {
      error: "",
      button: "",
      password: "",
      placeholder: "",
      passwordClass: "",
      passwordErrorClass: "",
      disabled: false,
      disabledTime: 1,
    };
  },
  mounted() {
    if (!this.password_hash || this.password_hash === this._getStoragePWD()) {
      this.togglePermit(true);
    }

    const userLocales = this.$frontmatter.passwordLocales || {};
    this.error = userLocales.error || this.$locales.password.error;
    this.button = userLocales.button || this.$locales.password.button;
    this.placeholder =
      userLocales.placeholder || this.$locales.password.placeholder;
    this.passwordClass = this.$frontmatter.passwordClass || "fadeInLeftBig";
    this.passwordErrorClass = this.$frontmatter.passwordErrorClass || "shakeX";
  },
  watch: {
    disabled(val) {
      if (val) {
        this.disabledTime *= 2;
        this.passwordClass = this.passwordErrorClass;
      } else {
        this.passwordClass = "";
      }
    },
  },
  computed: {
    password_hash() {
      const { password } = this.$frontmatter;
      const password_string = String(password);
      return password && password_string.length
        ? md5(password_string.trim())
        : null;
    },
  },
  methods: {
    togglePermit(val) {
      this.$emit("input", val);
    },
    validate_password() {
      if (this.disabled || !this.password) return;

      const current_hash = md5(this.password.trim());
      this.password = "";
      // correct
      if (current_hash === this.password_hash) {
        this._setStoragePWD(current_hash);
        this.togglePermit(true);
        return true;
      }
      // incorrect
      if (M) {
        M.toast({
          html: this.error,
        });
      } else {
        alert(this.error);
      }
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 1000 * this.disabledTime);
      return false;
    },
    /* Session Storage */
    _getStoragePWD() {
      const key = this.$route.name;
      return sessionStorage.getItem(key);
    },
    _setStoragePWD(val) {
      const key = this.$route.name;
      sessionStorage.setItem(key, val);
    },
  },
};
</script>

<style lang="stylus" scoped>
.password-input
  input
    text-align: center
    font-size: 1.5rem

  label
    transition: all 0.3s
    position: relative
    top: -3rem
    left: 0
    font-size: 1.3rem

    &.active
      top: -5.5rem
</style>
