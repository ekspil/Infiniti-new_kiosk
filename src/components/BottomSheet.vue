<template>
  <div class="text-center">
    <v-btn color="blue" dark @click="sheet = !sheet"> Open v-model </v-btn>
    <v-bottom-sheet v-model="sheet" fullscreen>
      <v-sheet class="text-center" height="100%">
        <v-btn class="mt-6" text color="red" @click="sheet = !sheet">
          close
        </v-btn>
        <div class="py-3">
          This is a bottom sheet using the controlled by v-model instead of
          activator
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  data: () => ({
    sheet: true
  }),
  methods:{
    open(){
      this.sheet = true
    }
  },
  created: function() {
    this.$parent.$on('bottomSheetOpen', this.open);
  }
};
</script>
