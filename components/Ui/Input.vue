<template>
    <b-form-input v-model="currentValue" :type="type" />
</template>

<script>
export default {
    name: 'UiInput',
    props: {
        value: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
}
</script>