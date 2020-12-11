<template>
    <div class="theme-container">
        <div class="container center">
            <div class="card-panel m-3" :style="pageStyle">
                <div>
                    <h2 class="mb-0">404</h2>
                    <p class="mt-0">{{ $themeConfig.error404.message }}</p>
                    <Router-link
                        :to="$localePath"
                        class="btn waves-effect waves-light"
                    >
                        Back Home
                    </Router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        pageStyle() {
            const initStyle = {
                height: "50vh",
                background:
                    "linear-gradient(45deg, var(--accentColor-6), var(--accentColor-1))",
            };
            return { ...initStyle, ...this.$themeConfig.error404.style };
        },
    },
};
</script>

<style lang="stylus" scoped>
.theme-container
  display: flex
  justify-content: center
  align-items: center

  .card-panel
    display: flex
    justify-content: center
    align-items: center
</style>
