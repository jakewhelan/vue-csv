<script>
  export default {
    name: 'core-input',
    props: {
      name: String,
      value: String,
      placeholder: {
        type: String,
        default: ''
      },
      focusOnInit: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      hasError: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (this.focusOnInit) {
        this.$refs.input.focus()
      }
    }
  }
</script>
    
<template>
  <input
    @input="$emit('input', $event.target.value)"
    @keyup.enter="$emit('keyup', $event)"
    :value="value"
    :placeholder="placeholder"
    :type="type"
    :class="{
      error: hasError
    }"
    ref="input"
  />
</template>

<style lang="scss" scoped>
  input {
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    font-size: 20px;
    line-height: 24px;
    width: 100%;
    border: 1px solid #282926;
    color: #282926;

    &:focus {
      background: darken(#fff, 12.5%);
    }

    &::placeholder { 
      font-size: 18px;
      color: #282926;
    }

    &.error {
      border: 1px solid darken(red, 10%);;
    }
  }
</style>