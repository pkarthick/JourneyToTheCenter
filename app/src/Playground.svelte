<script lang="typescript">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { timer } from './timer';

  import Player from './Player.svelte';
  export let current = '';
  export let nextround = false;
  export let players = [];

  export let score = 0;

  let distances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const dispatch = createEventDispatcher();

  function startNextRound() {
    nextround = true;
    dispatch('updateScore', {
      name: name,
      score: score
    });
  }
</script>

<div class="p-1 flex-col self-center">

  <div class="flex flex-1 flex-wrap">
    {#each players as player}
      <Player {...player} {current} />
    {/each}
  </div>

  {#if !nextround}
    <div class="mt-1 inline-flex md:inline-flex md:flex-row justify-center" data-toggle="buttons">
      {#each distances as distance}
        <div
          class="btn m-1 p-2 bg-gray-200 border-1 cursor-pointer"
          class:bg-blue-200={score === distance}
          on:click={() => (score = distance)}
        >

          <span class:font-bold={score === distance}>{distance}</span>
        </div>
      {/each}

      {#if score > 0}
        <button
          class="ml-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border
          border-blue-500 hover:border-transparent rounded self-center"
          on:click={startNextRound}
        >
          <span>Start Next Round</span>
        </button>
      {/if}
    </div>
  {/if}
</div>
