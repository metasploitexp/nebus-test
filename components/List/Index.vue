<template>
    <div class="list">
        <div class="list__label">
            Список заметок
            <ui-button class="ml-auto" text="СОЗДАТЬ" variant="outline-secondary" @click="handleCreate" />
        </div>
        <div class="list__content">
            <b-card
                class="list__content-card"
                v-for="item, index in items"
                :key="index"
                :title="item.label"
            >
                <div 
                    class="list__content-notes" 
                    v-for="note, key in computedNotes(item.notes)" 
                    :key="key"
                    :class="{'list__content-notes--strike': note.checked}"
                >
                    {{ key + 1 }}. {{ note.text }}
                </div>
                <div class="mt-3 list__content-buttons">
                    <ui-button variant="outline-primary" text="Редактировать" @click="handleEdit(item.id)" />
                    <ui-button variant="outline-danger" text="Удалить" @click="handleDelete(item)" />
                </div>
            </b-card>
            <div class="list__no-content" v-if="!items.length">
                Нет созданных заметок
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'List',
    data() {
        return {
            visible: false,
        }
    },
    computed: {
        ...mapGetters({
            items: 'getLocalData',
        }),
    },
    methods: {
        handleCreate() {
            this.$router.push('/add')
        },
        handleEdit(index) {
            this.$router.push(`/edit/${index}`);
        },
        handleDelete(item) {
            this.$bvModal.msgBoxConfirm('Удалить заметку?', {centered: true, okTitle: 'Удалить', cancelTitle: 'Отмена'})
                .then((res) => {
                    if (res) {
                        this.$store.dispatch('delItem', item)
                    }
                })
        },
        computedNotes(notes) {
            return notes.slice(0, 3);
        }
    }
}
</script>

<style lang="scss">
.list {
    display: flex;
    flex-direction: column;
    gap: 30px;

    &__label {
        font-size: 36px;
        font-weight: 700;
        display: flex;

        @media all and (max-width: 700px) {
            font-size: 28px;
        } 
    }

    &__content {
        display: flex;
        flex-flow: column;
        gap: 20px;

        &-notes {
            display: flex;
            flex-direction: column;
            gap: 10px;
            font-size: 18px;

            &--strike {
                text-decoration: line-through;
                color: green;
            }
        }

        &-buttons {
            display: flex;
            gap: 10px;

            @media all and (max-width: 700px) {
                flex-direction: column;
            } 
        }
    }

    &__no-content {
        font-size: 40px;
        margin: auto;
    }
}
</style>