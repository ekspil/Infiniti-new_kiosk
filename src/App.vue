<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    activeBottomSheet: false,
  }),

  methods: {
    actions(action) {
      switch (action) {
        case "addon":
          this.$emit("bottomSheetOpen");
          break;
      }
    },
  },
};
</script>
