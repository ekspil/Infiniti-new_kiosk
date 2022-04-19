<template>
  <v-dialog
    v-model="activeLock"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center black" height="100vh">
      <v-container fill-height class="justify-center">
        <v-card class="black">

          <v-progress-circular
            class="mt-16 "
            :size="70"
            :width="7"
            color="yellow darken-3"
            indeterminate
          ></v-progress-circular>
          <h1 class="black orange--text">Киоск временно недоступен</h1>
        </v-card>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activeLock: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  methods: {
    lockOpenClose() {
      this.$emit("lockOpenClose", false);
    },
  },
};
</script>
