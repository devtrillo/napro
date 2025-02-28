<script lang="ts">
  import Button from '../button.svelte';

  let { ref = $bindable(null), ...restProps }: Button.Props = $props();
</script>

<Button bind:ref type="submit" {...restProps} />
