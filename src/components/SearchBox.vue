<template>
    <b-card title="Поиск" class="search">
        <b-form @submit.prevent="query">
            <b-form-input type="search" placeholder="Поиск" v-model="search"></b-form-input>
        </b-form>
        <b-list-group class="mt-3">
            <b-list-group-item v-for="result in results" :key="deepest(result).id">
                <h4>{{deepest(result).name}}</h4>
                <h6 v-if="result.location && result.place">{{result.location.name}}</h6>
                <h6 v-if="result.building && (result.place || result.location)">{{result.building.name}}</h6>
            </b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
    import api from '../api';
    import {deepestSearchResult} from "@/utils";

    export default {
        name: "SearchBox",
        data() {
            return {
                search: '',
                results: [],
            }
        },
        methods: {
            query() {
                api.search.query(this.search)
                    .then(results => {
                        this.results = results;
                        this.$emit('search-done', results);
                    });
            },
            /**
             *
             * @param {ISearchResult} result
             * @return {Object}
             */
            deepest(result) {
                return deepestSearchResult(result);
            }
        }
    }
</script>

<style scoped lang="sass">

</style>
