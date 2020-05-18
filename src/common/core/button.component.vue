<script>
  export default {
    name: 'core-button',
    props: {
      lightMode: {
        type: Boolean,
        default: false
      },
      large: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
    
<template>
  <button
    @click="$emit('click')"
    :class="{
      'dark': !lightMode,
      'light': lightMode,
      'large': large
    }"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  $light: #f5da55;
  $dark: #323330;
  $fontSize: 14px;
  $fontSizeLarge: 28px;
  $padding: 10px 20px;
  $paddingLarge: 20px 40px;

  button {
    display: block;
    font-size: $fontSize;
    background: transparent;
    transition: all .25s ease-out;
    border-radius: 3px;
    text-transform: uppercase;
    padding: $padding;
    font-size: 20px;
    line-height: 24px;
    cursor: pointer;

    &.large {
      padding: $paddingLarge;
      font-size: $fontSizeLarge;
    }

    &.light {
      border: 1px solid $light;
      color: $light;

      &:hover {
        background: $light;
        color: #000;
      }
    }

    &.dark {
      border: 1px solid $dark;
      color: $light;
      background: $dark;

      &:hover {
        background: darken($dark, 10%);
      }
    }
  }
</style>