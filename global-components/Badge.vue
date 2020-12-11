<script>
export default {
  functional: true,
  props: {
    text: String,
    type: {
      type: String,
      default: "tip",
    },
  },
  render(h, { props, slots }) {
    return h(
      "span",
      {
        class: ["badge", props.type],
      },
      props.text || slots().default
    );
  },
};
</script>

<style lang="stylus" scoped>
.badge
  display: inline-block
  height: 18px
  line-height: 1
  border-radius: 3px
  margin-left: 3px
  min-width: 3px
  color: var(--relativeTextColor)

  &.tip, &.green
    background-color: $badgeTipColor

  &.warn, &.yellow
    background-color: $badgeWarnColor

  &.danger, &.red
    background-color: $badgeDangerColor
</style>
