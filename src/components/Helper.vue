<template>
  <v-bottom-sheet v-model="helper" height="70%">
    <v-sheet class="text-center" height="70%">
      <v-btn class="mt-6" text color="red" @click="helperOpenClose">
        close
      </v-btn>
      <div class="py-3">
        This is a bottom sheet using the controlled by v-model instead of
        activator
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        s
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    helper: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    helperOpenClose() {
      this.$emit("helperOpenClose");
    },
  },
};
</script>
