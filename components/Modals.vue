<template>
  <div class="modals">
    <!-- Shortcuts Modal Structure -->
    <div id="shortcuts-modal" class="modal bottom-sheet">
      <div class="modal-content">
        <h4>{{ $locales.shortcut.shortcut }}</h4>
        <div class="divider"></div>
        <div class="row m-0">
          <!-- Site shortcuts -->
          <div class="col s12 m6 bold">
            <h5>{{ $locales.shortcut.website }}</h5>
            <div class="divider"></div>
            <p v-if="hotKeys">
              <kbd>{{ hotKeys }}</kbd> : {{ $locales.shortcut.search }}
            </p>
          </div>
          <!-- Common shortcuts -->
          <div class="col s12 m6 bold mb-1">
            <h5>{{ $locales.shortcut.common }}</h5>
            <div class="divider"></div>
            <p><kbd>F11</kbd> : Toggle FullScreen</p>
            <p><kbd>Ctrl</kbd> + <kbd>D</kbd> : Add Bookmark</p>
            <p><kbd>Alt</kbd> + <kbd>F4</kbd> : ???</p>
          </div>
        </div>
      </div>
      <!-- <div class="modal-footer">
        <a class="modal-close waves-effect waves-green btn-flat"> Agree </a>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hotKeys() {
      return this.$themeConfig.search.hotKeys;
    },
  },
};
</script>