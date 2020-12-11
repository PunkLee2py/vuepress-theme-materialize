<template>
  <video>
    <source :src="url" type="video/mp4" />
  </video>
</template>

<script>
export default {
  props: {
    src: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      url: "",
    };
  },
  mounted() {
    this.url = this.src;
  },
};
</script>