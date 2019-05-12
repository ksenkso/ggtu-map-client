<template>
    <div class="loader"></div>
</template>

<script>
    export default {
        name: "Loader"
    }
</script>

<style scoped lang="sass">
$size: 64px
$color: #4286f4
.loader
    box-sizing: border-box
    position: relative
    width: 1px
    height: 1px
    overflow: hidden
    background-color: #fff
    border: 6px solid $color
    border-radius: 50%
    transition: width .2s ease-in-out, height .2s ease-in-out, visibility 0s linear 0.2s
    z-index: 99
    &_show
        width: 48px
        height: 48px
        &:before
            animation: rotate 1.5s linear infinite reverse -0.75s, bubbles 5s linear infinite -1s
        &:after
            animation: rotate 1.5s linear infinite, bubbles 5s linear infinite
    &_hide
        visibility: hidden
        display: none
    &:before
        content: ''
        display: block
        position: absolute
        border-radius: 50%
        width: 100%
        height: 100%
        border: 5px solid darken($color, 15%)
        top: 0
        left: 0

        transform-origin: top left
        z-index: 100
    &:after
        box-sizing: border-box
        content: ''
        display: block
        position: absolute
        border-radius: 50%
        width: 100%
        height: 100%
        border: 6px solid darken($color, 15%)
        bottom: 0
        right: 0

        transform-origin: bottom right
        z-index: 100
@keyframes bubbles
    0%
        border-width: 3px
    50%
        border-width: 12px
    100%
        border-width: 3px
@keyframes rotate
    0%
        transform: rotate(0)
    50%
        transform: rotate(180deg)
    100%
        transform: rotate(360deg)
</style>
