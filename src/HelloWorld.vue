<script setup lang="ts">
import { bus } from './demos';

function handleEvent() {
    bus.emit('increment', 10)
}
</script>

<template>
    <div>
        <h2>HelloWorld Component</h2>
        <button @click="handleEvent">count++</button>
    </div>
</template>