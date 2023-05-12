<template>
    <AppProvider>
        <div>App</div>
        <RouterView></RouterView>
    </AppProvider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppProvider from './layout/AppProvider.vue';

const router = useRouter();

onMounted(() => {
    console.log(router.getRoutes());
    console.log('[App.vue]', `Hello world from Electron ${process.versions.electron}!`);
});
</script>
