<template>
    <div class="support">
        <div class="support__main">
            <transition>
                <BuildingsList v-if="currentView === 'buildings'" @building-changed="onBuildingChanged"></BuildingsList>
                <PlacesList :location-id="currentLocation.id" v-if="currentView === 'locations'"></PlacesList>
            </transition>
            <SearchBox @search-done="locateFirstSearchResult" class="mt-2"></SearchBox>
        </div>
        <FloorsSwitch
                v-if="currentBuilding.id"
                :building-id="currentBuilding.id"
                @location-selected="onLocationChanged"
        />
    </div>
</template>

<script>
    import BuildingsList from "@/components/BuildingsList";
    import FloorsSwitch from "@/components/FloorsSwitch";
    import PlacesList from "@/components/PlacesList";
    import SearchBox from "@/components/SearchBox";
    export default {
        name: "SupportContainer",
        components: {BuildingsList, FloorsSwitch, PlacesList, SearchBox},
        inject: ['getScene'],
        data() {
            return {
                locations: {
                    type: Array,
                    default: []
                },
                currentLocation: {},
                currentBuilding: {},
                currentView: 'buildings'

            }
        },
        methods: {
            onBuildingChanged(building) {
                this.currentBuilding = building;
            },
            onLocationChanged(location) {
                this.currentLocation = location;
                this.currentView = 'locations'
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
            }
        }
    }
</script>

<style scoped lang="sass">
.support
    &__main
        max-width: 600px
        position: absolute
        z-index: 1000
        min-width: 400px
        top: 40px
        right: 40px
.fade-enter-active, .fade-leave-active
    transition: opacity .5s

.fade-enter, .fade-leave-to
  opacity: 0

</style>
