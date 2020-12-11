<template>
  <component :is="'Effect' + effCom"><slot /></component>
</template>

<script>
import Effect1 from "./Effect1";
import Effect2 from "./Effect2";
import Effect3 from "./Effect3";
import Effect4 from "./Effect4";
import Effect5 from "./Effect5";
import Effect6 from "./Effect6";
import Effect7 from "./Effect7";
import Effect8 from "./Effect8";
import Effect9 from "./Effect9";
import Effect10 from "./Effect10";

export default {
  props: {
    effCom: {
      default: 1,
    },
  },
  components: {
    Effect1,
    Effect2,
    Effect3,
    Effect4,
    Effect5,
    Effect6,
    Effect7,
    Effect8,
    Effect9,
    Effect10,
  },
};
</script>
