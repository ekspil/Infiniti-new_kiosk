<template>
  <v-dialog v-model="coupon.modal"  max-width="250">
    <v-card >
      <v-card-title class="text-h5 text-uppercase un"> <v-spacer></v-spacer>Купон <v-spacer></v-spacer></v-card-title>
      <v-card-text class="text-h4 red--gray text-center">{{ coupon.input || "0" }}</v-card-text>
      <keyboard
        class="pb-7 "
        v-model="coupon.input"
        :layouts="[
          '123|456|789|{←:backspace}0{OK:custom}',
        ]"
        :maxlength="16"
        @input="changed"

        @custom="custom"
      ></keyboard>
<!--      <v-card-actions>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn color="orange darken-1" text @click="pay.billDialog = true">-->
<!--          Не надо отправлять-->
<!--        </v-btn>-->
<!--        <v-spacer></v-spacer>-->
<!--        <v-btn color="green darken-1" text :disabled="!pay.email.includes('@')" @click="payOpenClose">-->
<!--          Готово-->
<!--        </v-btn>-->
<!--        <v-spacer></v-spacer>-->
<!--      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>

<script>
import keyboard from "vue-keyboard";
export default {
  components: { keyboard },
  props: {
    coupon: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
    };
  },
  methods:{
    changed() {
      this.$emit("updateTimer");
    },
    custom() {
      this.$emit("findCoupon");

    },

  }
};
</script>

<style scoped>
.vue-keyboard-key{
  color: red;
}
</style>
