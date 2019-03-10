<template>
    <b-card class="slist">
        <header slot="header" class="slist__header">
            <button v-if="prevScreen" class="btn btn-light">Назад</button>
            <h4>{{title}}</h4>
        </header>
        <b-form-input @change="searchChanged" type="search" placeholder="Поиск"></b-form-input>
        <hr>
        <b-list-group v-if="items.length" class="mt-2">
            <b-list-group-item button v-for="item in items" :key="item.id" @click="$emit('item-click', item)">
                {{item.name}}
            </b-list-group-item>
        </b-list-group>
        <b-alert class="mt-2" :show="!items.length">Локация пуста</b-alert>
    </b-card>
</template>

<script>
    import throttle from 'lodash/throttle';
    export default {
        name: "SearchableList",
        props: {
            title: String,
            items: Array
        },
        data() {
            return {
                prevScreen: false,
                search: ''
            }
        },
        methods: {
            searchChanged: throttle((e) => {
                this.$emit('searchChanged', e);
            }, 200)
        }
    }
</script>

<style scoped>

</style>
