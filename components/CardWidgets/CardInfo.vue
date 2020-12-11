<template>
    <div class="card-panel">
        <div class="center">
            <div class="avatar">
                <Img
                    :src="
                        $themeConfig.avatar ||
                            require('@theme/images/avatar.png')
                    "
                    class="circle animate_hover"
                />
            </div>
            <h5 class="author-name animate_hover">{{ $siteTitle }}</h5>
            <p class="author-description">{{ $description }}</p>
            <div class="action">
                <a class="waves-effect btn" @click="addFavorite()">
                    <i class="material-icons">bookmark_border</i>
                    {{ $locales.aside.bookmark }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { addFavorite } from "@theme/utils";

export default {
    methods: {
        addFavorite,
    },
};
</script>

<style lang="stylus" scoped>
.card-panel
  .avatar img
    max-width: 100%
    display: inline-block
    width: 120px
    transition: all 0.3s

  .action
    a
      width: 100%
      display: flex
      justify-content: center
      align-items: center
</style>
