<template>
    <div class="form">
        <div class="form__label">
            <b-form-group label="Название" label-size="lg">
                <ui-input v-model="form.label" />
            </b-form-group>
        </div>
        <b-form-group label="Todo лист" label-size="lg">
            <div class="form__notes" v-for="note, key in form.notes" :key="key">
                <ui-checkbox v-model="note.checked" />
                <ui-input v-model="note.text" />
                <ui-button class="" v-if="form.notes.length > 1" variant="warning" text="Удалить" @click="handleDelete(key)" />
            </div>
        </b-form-group>
        <div class="ml-auto">
            <ui-button v-if="hasUndo" variant="outline-secondary" text="Отменить изменения" @click="handleUndo" />
            <ui-button v-if="canRedo" variant="outline-secondary" text="Вернуть изменения" @click="handleRedo" />
            <ui-button variant="secondary" text="Добавить +" @click="handleAdd" />
        </div>
        <div class="form__buttons">
            <ui-button variant="primary" :text="!id ? 'Создать' : 'Сохранить'" @click="handleSave" />
            <ui-button variant="secondary" text="Отмена" @click="handleBack" />
            <ui-button variant="danger" text="Удалить" v-if="id" @click="handleRemove" />
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Form',
    props: {
        id: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            form: {
                label: '',
                notes: [{checked: false, text: ''}],
            },
            originalItem: {},
            canRedo: false,
            forkForm: {},
        }
    },
    computed: {
        hasUndo() {
            if (this.id) {
                this.canRedo = false;
                return JSON.stringify(this.form) !== JSON.stringify(this.originalItem);
            }
            return false;
        }
    },
    methods: {
        ...mapActions({
            addItem: 'addItem',
            updItem: 'updItem',
            getItemById: 'getItemById',
        }),
        handleAdd() {
            this.form.notes.push({checked: false, text: ''});
        },
        handleDelete(index) {
            this.form.notes.splice(index, 1);
        },
        handleBack() {
            this.$bvModal.msgBoxConfirm(this.id ? 'Отменить редактирование?' : 'Jтменить создание?', {centered: true, okTitle: 'Выйти', cancelTitle: 'Остаться'})
                .then((res) => {
                    if (res) {
                        this.$router.push('/');
                    }
                })
        },
        handleSave() {
            this.id ? this.updItem(this.form) : this.addItem(this.form)
            this.$router.push('/');
        },
        updateForm(data) {
            this.form = {
                label: data.label,
                id: data.id,
                notes: JSON.parse(JSON.stringify(data.notes)),
            }
        },
        handleRemove() {
            this.$bvModal.msgBoxConfirm('Удалить заметку?', {centered: true, okTitle: 'Удалить', cancelTitle: 'Отмена'})
                .then((res) => {
                    if (res) {
                        this.$store.dispatch('delItem', this.form)
                        this.$router.push('/');
                    }
                })
        },
        async getItem() {
            const result = await this.getItemById(this.id);
            this.updateForm(result);
            this.originalItem = result;
        },
        async handleUndo() {
            this.forkForm = JSON.parse(JSON.stringify(this.form));
            await this.getItem();
            this.canRedo = true;
        },
        handleRedo() {
            this.form = JSON.parse(JSON.stringify(this.forkForm));
            this.canRedo = false;
        }
    },
    created() {
        if (this.id) {
            this.getItem();
        }
    }
}
</script>

<style lang="scss">
.form {
    display: flex;
    flex-flow: column;
    gap: 20px;
    margin-top: 30px;

    &__notes {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }

    &__undo {
        text-decoration: underline;
        color: #6c757d;
        user-select: none;
        cursor: pointer;
        text-align: center;
    }

    &__buttons {
        display: flex;
        gap: 10px;

        @media all and (max-width: 700px) {
            flex-direction: column;
        } 
    }
}
</style>