<template>
    <div id="main-layout">
        <RouterView></RouterView>
        <RouterLink to="/second">goto second</RouterLink>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
#main-layout {
    width: 100%;
    height: 100vh;
}
</style>
