<template>
    <div class="pathfinder">
        <div class="pathfinder__header">
            <div class="pathfinder__title">
                <button @click="$emit('toggle')" type="button" class="pathfinder__back js-back" title="Назад">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
                </button>
                <h4>Поиск маршрута</h4>
            </div>
            <form action="#" class="js-pathfinder-form">
                <div class="pathfinder__inputs">
                    <div class="pathfinder__group">
                        <input type="text" name="pathfinder-from" id="pathfinder-from" title="Откуда" class="panel__input js-from" autocomplete="off">
                        <label for="pathfinder-from">Откуда</label>
                    </div>
                    <div class="pathfinder__group">
                        <input type="text" name="pathfinder-to" id="pathfinder-to" title="Куда" class="panel__input js-to" autocomplete="off">
                        <label for="pathfinder-to">Куда</label>
                    </div>
                </div>
                <button class="panel__button panel__button_block">Найти</button>
            </form>
        </div>
        <Loader :show="showLoader"></Loader>
        <div class="pathfinder__path path">
            <div class="path__step step">
                <div class="step__direction">Налево, 40 м</div>
                <div class="step__destination">Выход из здания</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Loader from './Loader'
    export default {
        name: "Pathfinder",
        components: {Loader},
        data() {
            return {
                showLoader: false
            }
        }
    }
</script>

<style scoped lang="sass">
.pathfinder
    &__title
        margin-bottom: 18px
    &__header
        padding: 12px 8px
        background-color: #4286f4
        color: #fff
        h4
            display: inline-block
            vertical-align: middle
            margin: 0
    &__back
        cursor: pointer
        vertical-align: middle
        background-color: transparent
        border: none
        svg
            fill: #fff
    &__group
        position: relative
        margin-bottom: 24px
        display: flex
    &__inputs
        display: flex
        flex-direction: column
        label
            position: absolute
            cursor: text
            color: #000
            top: 4px
            left: 4px
            font-size: 0.8em
            transition: top .1s ease-in-out, font-size .1s ease-in-out, color .1s linear
        input
            border-radius: 3px
            border: 1px solid lightgrey
            padding: 4px
            min-width: 220px
            width: 100%
            &:focus + label
                top: -18px
                font-size: 0.6em
                cursor: default
                color: #fff
    &__path
        .step
            padding: 8px
            margin-bottom: 8px
            border-bottom: 1px solid lightgrey
            cursor: pointer
            &:last-child
                border-bottom: none
            &__direction
                font-size: 0.9em
            &__destination
                margin-top: 2px
                font-size: 0.7em

</style>
