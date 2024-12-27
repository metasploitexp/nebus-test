const DEFAULT_STORAGE_KEY = 'data';

export const state = () => ({
    localData: [],
})

export const getters = {
    getLocalData(state) {
        return state.localData;
    },
}

export const mutations = {
    setLocalData(state, value) {
        state.localData = value;
    }
}

export const actions = {
    getItemById({getters}, id) {
        return getters['getLocalData'].find(x => x.id === id);
    },
    getFromLocalStorage({commit}, storageKey = DEFAULT_STORAGE_KEY) {
        const storage = localStorage.getItem(storageKey) || '[]';
        commit('setLocalData', JSON.parse(storage));
    },
    setToLocalStorage({getters}, storageKey = DEFAULT_STORAGE_KEY) {
        localStorage.setItem(storageKey, JSON.stringify(getters['getLocalData']));
    },
    addItem({getters, commit, dispatch}, item) {
        const data = [...getters['getLocalData']];
        let id = 1;
        if (data?.length) {
            id += data[data.length-1].id;
        }
        data.push({
            id, ...item,
        })
        commit('setLocalData', data);
        dispatch('setToLocalStorage');
    },
    updItem({getters, commit, dispatch}, item) {
        const data = [...getters['getLocalData']];
        const index = data.findIndex(i => i.id === item.id);
        if (index >= 0) {
            data.splice(index, 1, item);
            commit('setLocalData', data);
            dispatch('setToLocalStorage');
        }
    },
    delItem({getters, commit, dispatch}, item) {
        const data = [...getters['getLocalData']];
        const index = data.findIndex(i => i.id === item.id);
        if (index >= 0) {
            data.splice(index, 1);
            commit('setLocalData', data);
            dispatch('setToLocalStorage');
        }
    }
}