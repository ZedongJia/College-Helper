<template>
    <div class="cover">
        <Board class="pop-frame">
            <slot></slot>
        </Board>
    </div>
</template>
<style>
.cover {
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.5;
    width: 100vw;
    height: 100vh;
    background-color: black;
}
.pop-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    width:50%
}
</style>
