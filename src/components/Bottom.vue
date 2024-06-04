<template>
  <v-footer app v-bind="localAttrs" :padless="padless" height="80px">
    <v-card
      flat
      tile
      width="100%"
      class="grey lighten-4 text-center d-flex align-center justify-space-between mb-6"
    >
      <v-card flat color="grey lighten-4" width="30%">
        <!--        <v-btn class="ma-2" outlined fab color="brown">-->
        <!--          <v-icon>mdi-brightness-percent</v-icon>-->
        <!--        </v-btn>-->
        <!--        <v-btn class="ma-2" outlined fab color="brown">-->
        <!--          <v-icon>mdi-magnify</v-icon>-->
        <!--        </v-btn>-->
        <v-btn class="ma-2" outlined fab color="brown" @click="clear">
          <v-icon>mdi-cancel</v-icon>
        </v-btn>

        <v-btn class="ma-2" outlined fab color="brown" @click="couponOpenClose">
          <v-icon>mdi-tag</v-icon>
        </v-btn>
      </v-card>
      <v-card flat color="grey lighten-4" width="30%">
        <v-card-text class="d-flex flex-column">
          <div class="align-self-start">{{ getNameByLang(Positions) }} {{ cartData.count }}:</div>
          <div class="align-self-start text-h5 text--primary">
            {{ cartData.sum }} Р
          </div>
        </v-card-text>
      </v-card>
      <v-card flat color="grey lighten-4" min-width="30%">
        <v-btn
          rounded
          color="brown"
          x-large
          dark
          :disabled="cart.length === 0"
          @click="openCart"
          min-width="80%"
          ><v-icon size="24px"> mdi-shopping </v-icon>
          {{ getNameByLang(Cart)}}
        </v-btn>
      </v-card>
    </v-card>
  </v-footer>
</template>

<script>
import { cartReduce } from "@/utils/cart";
import { Cart, Positions } from "../utils/buttonNames";
export default {
  props: {
    getNameByLang: {
      type: Function
    },
    actions: {
      type: Function,
      default: () => {},
    },
    cart: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
    padless: true,
    appProp: false,
    localAttrs: {
      fixed: true,
    },
  }),
  methods: {
    click(data) {
      if (data === "mdi-home") {
        this.$router.push("/pay");
      }
      if (data === "mdi-email") {
        this.appProp = !this.appProp;
      }
      if (data === "mdi-calendar") {
        this.actions("addon");
      }
    },
    openCart() {
      this.$emit("cartOpenClose");
    },
    couponOpenClose() {
      this.$emit("couponOpenClose");
    },
    clear() {
      this.$emit("clear");
    },
  },
  computed: {
    Positions(){
      return Positions
    },
    Cart(){
      return Cart
    },
    cartData() {
      return cartReduce(this.cart);
    },
  },
};
</script>
