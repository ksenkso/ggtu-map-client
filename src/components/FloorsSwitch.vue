<template>
    <b-button-group class="floors" vertical>
        <b-button @click="selectFloor(floor)" v-for="floor in floors" :key="floor.id">{{floor.name}}</b-button>
    </b-button-group>
</template>

<script>
    export default {
        name: "FloorsSwitch",
        props: {
            buildingId: Number
        },
        data() {
            return {
                floors: []
            }
        },
        mounted() {
            this.$api.buildings.getLocations(this.buildingId)
                .then(floors => {
                    floors.sort((f1, f2) => f1.floor - f2.floor);
                    this.floors = floors;
                    if (floors[0]) {
                        this.selectFloor(floors[0]);
                    }
                });
        },
        methods: {
            selectFloor(floor) {
                this.$emit('location-selected', floor);
            }
        },
        watch: {
            buildingId(oldValue, newValue) {
                console.log(oldValue, newValue);
            }
        }
    }
</script>

<style scoped lang="sass">
.floors
    position: absolute
    z-index: 1000
    bottom: 40px
    right: 40px
</style>
