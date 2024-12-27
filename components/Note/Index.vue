<template>
    <div class="note">
        <div class="note__label">
            {{ item.label }}
        </div>

    </div>
</template>

<script>
export default {
    name: 'Note',
    props: {
        item: {
            type: Object,
            default: () => {},
        }
    },
}
</script>