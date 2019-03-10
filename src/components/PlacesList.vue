<template>
    <SearchableList
            title="Места"
            :items="places"
    />
</template>

<script>
    import SearchableList from "@/components/SearchableList";

    export default {
        name: "PlacesList",
        components: {SearchableList},
        props: {
            locationId: Number
        },
        data() {
            return {
                places: []
            }
        },
        async mounted() {
            const places = await this.$api.locations.getPlaces(this.locationId);
            console.log(places);
            this.places = places;
        }
    }
</script>

<style scoped>

</style>
