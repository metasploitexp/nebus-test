<template>
    <div class="add">
        <div class="add__label">
            Создание заметки
        </div>
        <Form />
    </div>
</template>

<script>
export default {
    name: 'AddPage',
}
</script>

<style lang="scss">
.add {
    &__label {
        font-weight: 700;
        font-size: 36px;

        @media all and (max-width: 700px) {
            font-size: 28px;
        }
    }
}
</style>