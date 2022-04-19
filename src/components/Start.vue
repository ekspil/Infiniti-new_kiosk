<template>
  <v-dialog
    v-model="activeStart"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center black" height="100vh">
      <v-card
        class="ml-8 mr-8 mt-0 overflow-hidden"
        color="black"
        elevation="0"
        height="70vh"
      >
        <video class="mx-auto col" autoplay muted loop>
          <source src="/radar.mp4" type="video/mp4" />
        </video>
      </v-card>
      <v-card v-bind="localAttrs" :padless="true" elevation="0">
        <v-card
          class="ma-0 overflow-auto"
          color="black"
          elevation="0"
          width="100%"
          rounded="0"
        >
          <v-container fluid>
            <v-card
              elevation="0"
              width="100%"
              class="black text-center d-flex align-center justify-space-around mb-6"
            >
              <v-card
                color="orange"
                width="40%"
                @click="orderTypeChange('OUT')"
                elevation="5"

              >

                <v-img src="/out.png"></v-img>
              </v-card>

              <v-card
                color="orange"
                width="40%"
                @click="orderTypeChange('IN')"
                elevation="5"
              >
                <v-img src="/here.png"></v-img>
              </v-card>
            </v-card>
          </v-container>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activeStart: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Array,
      default: () => [],
    },
    orderType: {
      type: String,
      default: "IN",
    },
  },
  data: () => ({
    localAttrs: {
      fixed: true,
    },
  }),
  computed: {},
  methods: {
    startOpenClose() {
      this.$emit("startOpenClose");
    },
    orderTypeChange(type) {
      this.$emit("orderTypeChange", type);
      setTimeout(() => {
        this.startOpenClose();
      }, 250);
    },
  },
};
</script>
