<template>
    <div class="layouts-default">
        <Nuxt />
    </div>
</template>

<script>
export default {
    name: 'LayoutsDefault',
    created() {
        this.$store.dispatch('getFromLocalStorage');
    }
}
</script>

<style lang="scss">
.layouts-default {
    padding: 30px 100px;

    @media all and (max-width: 700px) {
        padding: 30px 20px;
    }
}
</style>
