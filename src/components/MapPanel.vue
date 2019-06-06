<template>
    <div class="map__panel">
        <transition name="component-shift" mode="out-in">
            <component @toggle="togglePanels" @search-done="locateFirstSearchResult" :is="currentPanel"></component>
        </transition>
    </div>
</template>

<script>
    import SearchBox from "@/components/SearchBox";
    import Pathfinder from '@/components/Pathfinder';

    export default {
        name: "MapPanel",
        components: {SearchBox, Pathfinder},
        inject: ['getScene'],
        data() {
            return {
                locations: {
                    type: Array,
                    default: []
                },
                currentLocation: {},
                currentBuilding: {},
                currentPanel: 'SearchBox'

            }
        },
        methods: {
            onBuildingChanged(building) {
                this.currentBuilding = building;
            },
            onLocationChanged(location) {
                this.currentLocation = location;
                this.currentPanel = 'locations'
            },
            /**
             *
             * @param {ISearchResult[]} results
             */
            async locateFirstSearchResult(results) {
                if (results.length) {
                    const scene = this.getScene();
                    if (results[0].location && results[0].location.id !== scene.getLocation().id) {
                        await scene.setLocation(results[0].location);
                    }
                    if (results[0].place) {
                        scene.centerOnObject(results[0].place);
                    }
                }
            },
            togglePanels() {
                this.currentPanel = this.currentPanel === 'SearchBox' ? 'Pathfinder' : 'SearchBox';
            }
        }
    }
</script>

<style lang="sass">

.map__panel
    position: absolute
    z-index: 1000
    top: 20px
    left: 20px
    border-radius: 3px
    overflow: hidden
    background: #fff
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .13)
    width: 325px
    .button
        cursor: pointer
        max-width: 140px
        display: inline-block
        border: none
        border-radius: 3px
        font-size: 16px
        background-color: #fff
        padding: 6px 12px
        transition: box-shadow .1s ease-in-out
        &:hover
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .13)
        &:active
            box-shadow: 0 2px 7px 0 rgba(0, 0, 0, .18)
        &_block
            max-width: 100%
            display: block
            width: 100%
.component-shift-enter-active, .component-shift-leave-active
    transition: opacity .1s ease

.component-shift-enter, .component-shift-leave-to
    opacity: 0


</style>
