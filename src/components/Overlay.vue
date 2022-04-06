<template>
  <div class="text-center">

    <v-overlay :value="overlay">
      <v-btn
        color="orange lighten-2"
        @click="$router.push('/')"
      >
        Hide Overlay
      </v-btn>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: "Overlay",

  data: () => ({
    overlay: true,
  })
};
</script>
