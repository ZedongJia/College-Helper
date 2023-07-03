<template>
    <div>
        <div class="full-screen pop-frame">
            <slot></slot>
        </div>
        <div class="full-screen cover"></div>
    </div>
</template>
<style>
.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.cover {
    z-index: 100;
    opacity: 0.5;
    background-color: black;
}
.pop-frame {
    z-index: 200;
}
</style>
