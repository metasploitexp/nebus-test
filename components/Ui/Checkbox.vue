<template>
    <div class="ui-checkbox">
        <b-form-checkbox v-model="currentValue" />
    </div>
</template>

<script>
export default {
    name: 'UiCheckbox',
    props: {
        value: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: '38px',
        }
    },
    computed: {
        currentValue: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    }
}
</script>

<style lang="scss">
.ui-checkbox {
    width: v-bind(size);
    height: v-bind(size);

    .custom-control-label::after {
        height: v-bind(size);
        width: v-bind(size);
        margin-top: -5px;
    }

    .custom-checkbox .custom-control-label::before {
        height: v-bind(size);
        width: v-bind(size);
        margin-top: -5px;
    }
    .custom-control-input {
        height: v-bind(size);
        width: v-bind(size);
    }
}
</style>