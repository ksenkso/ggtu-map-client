<template>
    <div class="home">
        <div ref="mapContainer" class="map-container"></div>
        <SupportContainer></SupportContainer>
    </div>
</template>

<script>
    import {Scene} from 'ggtu-map';
    import 'ggtu-map/dist/main.css';
    import SupportContainer from "@/components/SupportContainer";
    let scene;
    export default {
        name: 'home',
        components: {SupportContainer,},
        data() {
            return {
                locations: {
                    type: Array,
                    default: []
                },
                currentLocation: {},
                currentBuilding: {}
            }
        },
        mounted() {
            scene = new Scene(this.$refs.mapContainer);
            this.$api.locations.getRoot()
                .then(location => {
                    scene.setLocation(location)
                        .then(() => {
                            this.currentLocation = location;
                        })
                })
        },
        provide: {
            /**
             *
             * @return {IScene}
             */
            getScene() {
                return scene;
            }
        }
    }
</script>
<style lang="sass">
.home
    position: relative
    width: 100%
    height: 100%
    .map-container
        position: absolute
        width: 100%
        height: 100%
</style>
