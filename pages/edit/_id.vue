<template>
    <div class="edit">
        <div class="edit__label">
            Редактирование заметки
        </div>
        <Form :id="+$route.params.id" />
    </div>
</template>

<script>
export default {
    name: 'EditPage',
}
</script>

<style lang="scss">
.edit {
    &__label {
        font-weight: 700;
        font-size: 36px;

        @media all and (max-width: 700px) {
            font-size: 28px;
        } 
    }
}
</style>