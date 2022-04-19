<template>
  <v-row justify="center">
    <v-dialog
      v-model="activePay"
      persistent
      width="700px"
    >
      <v-card height="800px"  color="grey lighten-5" class="text-center overflow-hidden transition-ease-in-out">

        <v-progress-linear
          :active="true"
          :indeterminate="true"
          absolute
          bottom
          color="yellow darken-2"
        ></v-progress-linear>
        <v-img
          width="700"
          height="850"
          class="align-self-center"
          src="/pay.jpg"
        ></v-img>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  props: {
    activePay: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
  }),
  methods: {
    payOpenClose() {
      this.$emit("payOpenClose");
    },
  },

};
</script>
