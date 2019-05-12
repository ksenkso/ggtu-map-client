<template>
    <div class="search-box">
        <form @submit="submitQuery" action="#" class="js-find-places search-box__form">
            <div class="search-box__header">
                <input aria-label="Поиск" v-model="search" type="search" name="search" id="ggtu-map-search" title="Поиск"
                       placeholder="Поиск мест">
                <div class="buttons">
                    <button class="button" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
                    <button @click="$emit('toggle')" class="button js-open-paths" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"/>
                            <path d="M0 0h24v24H0z" fill="none"/>
                        </svg>
                    </button>
                </div>
            </div>
        </form>
        <Loader :show="showLoader"></Loader>
        <div class="search-box__results">
            <transition-group name="results" tag="div">
                <div class="search-box__result result" v-for="(result, index) in results" :key="index">
                    <div class="deepest">{{result.name}}</div>
                    <div class="location">{{result.location}}</div>
                </div>
            </transition-group>
        </div>
        <div v-if="showResults && !results.length" class="search-box__no-results">Ничего не найдено</div>
    </div>
</template>

<script>
    import api from '../api';
    import {deepestSearchResult} from "@/utils";
    import Loader from './Loader';

    export default {
        name: "SearchBox",
        components: {Loader},
        data() {
            return {
                search: '',
                results: [],
                showResults: false,
                showLoader: false
            }
        },
        methods: {
            query() {
                let queryDone = false;
                setTimeout(() => {
                    if (!queryDone) {
                        this.showLoader = true
                    }
                }, 50);
                api.search.query(this.search)
                    .then(results => {
                        queryDone = true;
                        this.showLoader = false;
                        this.showResults = true;
                        this.results = results.map((result) => {
                            return {
                                name: deepestSearchResult(result).name,
                                location: [
                                    result.building ? result.building.name : false,
                                    result.location ? result.location.name : false
                                ].filter(Boolean).join(', ')
                            }
                        });
                        this.$emit('search-done', results);
                    });
            },
            submitQuery(e) {
                e.preventDefault();
                if (this.search) {
                    this.query();
                }
            },
            showPathfinder() {

            }
        }
    }
</script>

<style scoped lang="sass">
    .results
        &-complete-item
            transition: all .2s
        &-complete-enter, &-complete-leave-to
            opacity: 0
            transform: translateY(24px)
        &-complete-leave-active
            position: absolute
    .button
        display: inline-block
        border: none
        background-color: #fff
        padding: 8px 0
        position: relative
        border-radius: 3px
        transition: box-shadow .1s ease-in-out
        cursor: pointer

    .search-box
        position: relative
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .13)
        padding: 12px 8px
        background-color: #fff
        border-radius: 3px
        width: max-content
        display: flex
        flex-direction: column
        .loader
            margin: 0 auto
        &__header
            display: flex
            align-items: center
            margin-bottom: 12px

        input
            border-radius: 3px
            border: 1px solid lightgrey
            padding: 4px
            min-width: 220px

        .buttons
            .button
                border-radius: 0
                padding: 0 10px

                &:first-child
                    border-right: 1px solid lightgrey

        &__results
            .result
                border-bottom: 1px solid lightgrey
                padding-bottom: 10px
                margin-bottom: 8px

                &:last-child
                    border-bottom: none
                    padding-bottom: 0

                .deepest
                    font-weight: bold
                    line-height: 1.6
                    margin-bottom: 4px

                .location
                    font-size: 0.8em
</style>
