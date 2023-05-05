<template>
  <v-overlay
    :absolute="true"
    :value="coupon.modal"
    @click="clearCoupon"
  >
    <div @click.stop="">
      <v-card v-if="!coupon.find" class="coupon_card" width="300px" light>
        <v-img
          class="position_coupon"
          height="100px"
          width="100px"
          src="/logo_black.png"
        ></v-img>
        <v-card-title class="text-h5 text-uppercase pt-0">
          <v-spacer></v-spacer>Купон <v-spacer></v-spacer
        ></v-card-title>
        <v-card-text class="text-h4 red--gray text-center">{{
          coupon.input || "0"
        }}</v-card-text>
        <keyboard
          class="pb-7"
          v-model="coupon.input"
          :layouts="['123|456|789|{←:backspace}0{OK:custom}']"
          :maxlength="16"
          @input="changed"
          @custom="custom"
        ></keyboard>
      </v-card>

      <v-card v-if="coupon.find" class="coupon_card" width="300px" light>
        <v-img
          class="position_coupon"
          height="100px"
          width="100px"
          src="/logo_black.png"
        ></v-img>

        <v-container fluid >
          <v-row>
            <v-col
              cols="12"
            >
              <v-card
                flat
                class="grey lighten-4 overflow-hidden"
                @click="productToCart(coupon.find)"
              >
                <v-img
                  aspect-ratio="1.3"
                  :src="
                    coupon.find.img
                      ? 'https://terminal-api.rb24.ru/api/v1/files/download/1/' +
                        coupon.find.img
                      : '/burger.png'
                  "
                >
                </v-img>
                <v-card-title class="pt-0 pb-0"
                ><div class="ma-auto text-truncate">
                  {{ coupon.find.name }}
                </div></v-card-title
                >
                <v-card-title class="pt-0 pb-0">
                  <div class="text-subtitle-1 ma-auto">
                    {{ coupon.find.price }} р.
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-overlay>
  <!--  <v-dialog v-model="coupon.modal" max-width="300">-->
  <!--    <v-card class="coupon_card">-->
  <!--      <v-img-->
  <!--        class="position_coupon"-->
  <!--        height="100px"-->
  <!--        width="100px"-->
  <!--        src="/logo_black.png"-->
  <!--      ></v-img>-->
  <!--      <v-card-title class="text-h5 text-uppercase">-->
  <!--        <v-spacer></v-spacer>Купон <v-spacer></v-spacer-->
  <!--      ></v-card-title>-->
  <!--      <v-card-text class="text-h4 red&#45;&#45;gray text-center">{{-->
  <!--          coupon.input || "0"-->
  <!--        }}</v-card-text>-->
  <!--      <keyboard-->
  <!--        class="pb-7"-->
  <!--        v-model="coupon.input"-->
  <!--        :layouts="['123|456|789|{←:backspace}0{OK:custom}']"-->
  <!--        :maxlength="16"-->
  <!--        @input="changed"-->
  <!--        @custom="custom"-->
  <!--      ></keyboard>-->
  <!--    </v-card>-->
  <!--  </v-dialog>-->
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
    return {};
  },
  methods: {
    changed() {
      this.$emit("updateTimer");
    },
    custom() {
      this.$emit("findCoupon");

      this.$forceUpdate()
    },
    clearCoupon() {
      this.$emit("clearCoupon");
    },
    productToCart() {
      this.$emit("productToCart", this.coupon.find);
      this.clearCoupon()

    },
  },
};
</script>

<style scoped>
.position_coupon {
  line-height: 30px;
  top: -50px;
  left: 100px;
  z-index: 1500 !important;
}
.coupon_div {
  height: 400px;
}
.coupon_card {
  z-index: 500 !important;
}
</style>
