<template>
    <b-button class="ui-button" :variant="variant" @click="$emit('click')">{{ text }}</b-button>
</template>

<script>
export default {
    name: 'UiButton',
    props: {
        text: {
            type: String,
            default: '',
        },
        variant: {
            type: String,
            default: 'primary',
        }
    }
}
</script>

<style lang="scss">
.ui-button {
    padding: 10px 25px;
}
</style>