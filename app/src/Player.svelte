<script>
  import { images } from './stores.js';

  export let current = '';

  export let name = '';

  let iscurrent = false;
  $: iscurrent = name.toLowerCase() === current.toLowerCase();

  export let distance;
  export let car;
  export let color;
  export let last;
  export let active;
  export let winner;
  export let nextround;

  let total = 100;
  let bgcolor = 'bg-' + color;
  let distances = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  $: imgSrc = images[car];
</script>

<div class="flex lg:w-1/4 md:w-2/5 sm:w-2/3 flex-col m-1 border-2 rounded-md" style="border-color: {color}">

  <div class="flex flex-1 flex-row">
    <div class="flex flex-1 class:success={winner}">

      <div class="ml-2 flex flex-1 flex-col flex-1 text-2xl border-0 border-bottom-1" style="border-color: {color}">
        <p class:font-bold={active}>
          {#if nextround}
            <span class="text-green-500">
              <b>&radic;</b>
            </span>
          {:else}
            <span class="text-red-500">
              <b>&times;</b>
            </span>
          {/if}
          {#if iscurrent}*{/if}

          <span style="text-decoration: underline; text-decoration-color: {color}">
            <i>{name}</i>
          </span>

          {#if !nextround}
            <b>({last})</b>
          {/if}

        </p>
        {#if !active}
          <p class="text-red-500">
            <b>out</b>
          </p>
        {/if}
      </div>

    </div>
    <div class="flex flex-1">
      <div class="flex-0 mx-2">
        <img src={imgSrc} height="100px" width="150px" alt={car} />
      </div>
    </div>

  </div>

  <div class="progress flex-0 border border-5" style="border-color: {color}">
    <div
      class="progress-bar"
      role="progressbar"
      style=" background-image: linear-gradient(to bottom right, white, {color}); background-color: {color}; width: {distance / 1500}%"
      aria-valuenow={distance / 1500}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <b class="ml-2">{distance}</b>
    </div>
  </div>

</div>
