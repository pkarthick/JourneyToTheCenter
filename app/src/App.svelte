<script lang="typescript">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  import Playground from './Playground.svelte';

  let loggedin = false;
  let current = '';
  let password = '';
  let nextround = false;
  let active = false;
  let score = 0;

  $: loggedin = current && current.toLowerCase() === password.toLowerCase();

  let ws;
  const players = writable([]);

  const onReceiveMessage = ({ data }) => players.update(m => JSON.parse(data));

  onMount(() => {
    if (ws) ws.close();
    let wsproto = 'ws';

    let proto = window.location.protocol.endsWith('https:');
    if (proto) wsproto = 'wss';

    ws = new WebSocket(`${wsproto}://${window.location.host}/ws`);
    ws.addEventListener('message', onReceiveMessage);

    return () => {
      ws.removeEventListener('message', onReceiveMessage);
    };
  });

  onDestroy(() => {
    if (ws) ws.close();
  });

  // $: if (loggedin) {
  //   players.subscribe(pls => {
  //     const cur = pls.find(pl => pl.name.toLowerCase() === current.toLowerCase());
  //     if (cur) {
  //       active = cur.active;
  //       score = cur.last;
  //     }
  //   });
  // }

  function checkNextRound(pls) {
    const cur = pls.find(pl => pl.name.toLowerCase() === current.toLowerCase());
    if (cur) {
      return cur.nextround;
    }
    return false;
  }

  function updatePlayerScore(event) {
    ws.send(JSON.stringify({ type: 'update score', player: current, score: event.detail.score }));
  }
</script>

{#if loggedin}
  <div class="flex justify-center h-full p-3">
    <Playground on:updateScore={updatePlayerScore} players={$players} {current} nextround={checkNextRound($players)} />
  </div>
{:else}
  <div class="h-full flex flex-1 content-center justify-center">
    <div class="flex flex-col self-center w-full max-w-xs">

      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Player Name</label>
          <select
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-1 px-1 pr-8 rounded
            leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            bind:value={current}
          >
            <option value="">Pick your name</option>
            {#each $players as player}
              <option value={player.name}>{player.name}</option>
            {/each}
          </select>
          <!-- <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none
            focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Player Name"
            bind:value={current}
          /> -->
        </div>
        <!-- <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3
            leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            bind:value={password}
          />

        </div> -->
        {#if current}
          <div class="flex items-center justify-center">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none
              focus:shadow-outline"
              type="button"
              on:click={() => (loggedin = true)}
            >
              Let's Play
            </button>

          </div>
        {/if}
      </form>
      <p class="text-center text-gray-500 text-xs">&copy;2020 Karthick</p>
    </div>
  </div>
{/if}
