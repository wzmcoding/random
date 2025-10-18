<script setup lang="ts">
import { ref } from 'vue'
import { bus } from './demos';

const count = ref(0)
bus.on('increment', (val: number) => {
    count.value += val
})
</script>

<template>
    <div>
        <h2>Child Component</h2>
        <p>Count: {{ count }}</p>
    </div>
</template>