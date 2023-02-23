<script lang="ts">
    import io, { type Socket } from 'socket.io-client';
    import { onMount } from 'svelte';

    let socket: Socket;
    let message = '';
    let messages: string[] = [];

    onMount(() => {
        socket = io();
        socket.on('message', (msg) => {
            messages = [...messages, msg];
        });
    });
</script>

{#each messages as msg}
    <p>{msg}</p>
{/each}

<input type="text" bind:value={message} />

<button on:click={() => {
    socket.emit('message', message)
    message = '';
}}>Send</button>