<template>
    <div class="buildings">
        <SearchableList
                title="Здания"
                :items="buildings"
                @item-click="onItemClick"
        />
    </div>
</template>

<script>
    import SearchableList from "@/components/SearchableList";

    export default {
        name: "BuildingsList",
        components: {SearchableList},
        data() {
            return {
                buildings: [],
                currentBuilding: {}
            }
        },
        mounted() {
            this.$api.buildings.getAll()
                .then(buildings => {
                    this.buildings = buildings;
                    if (buildings.length) {
                        this.currentBuilding = this.buildings[0];
                    }
                });
        },
        methods: {
            onItemClick(item) {
                console.log(item);
                this.currentBuilding = item;
                this.$emit('building-changed', Object.assign({}, item));
            }
        }
    }
</script>

<style scoped>

</style>
