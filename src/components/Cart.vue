<template>
  <v-dialog
    v-model="activeCart"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center brown" height="100vh">
      <v-card elevation="0" class="text-left" height="5vh">
        <v-card
          height="5vh"
          flat
          tile
          width="100%"
          class="brown d-flex align-center mb-6"
        >
          <v-card flat color="brown" width="30%">
            <v-btn
              class="ml-12"
              rounded
              outlined
              color="grey lighten-4"
              dark
              x-large
              @click="cartOpenClose"
            >
              {{ getNameByLang(Back) }}
            </v-btn>
          </v-card>
          <v-card flat color="brown" width="40%">
            <v-card-text class="d-flex flex-column">
              <div class="align-self-center text-h3 text--primary text-nav">
                {{ getNameByLang(YouOrder) }}
              </div>
            </v-card-text>
          </v-card>
          <v-card flat color="grey lighten-4" width="30%"> </v-card>
        </v-card>
      </v-card>
      <v-card
        class="ml-8 mr-8 mt-0 overflow-auto"
        color="brown"
        elevation="0"
        height="70vh"
      >
        <v-container fluid>
          <v-row dense>
            <v-col v-for="(item, i) in cart" :key="'prod' + i" cols="12">
              <v-card class="grey lighten-4">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5 text-nav"
                      v-text="getNameByLang(item)"
                    ></v-card-title>

                    <div v-if="item.items">
                      <v-card-subtitle
                        class="pa-0 text-left pl-10"
                        v-for="mod in item.items"
                        :key="'sub_prod' + i + item.id + getProduct(mod).name"
                        v-text="
                          getProduct(mod).count ||
                          1 + ' x ' + getProduct(mod).name
                        "
                      ></v-card-subtitle>
                    </div>
                    <v-card-actions class="mb-5">
                      <v-card
                        elevation="0"
                        min-width="130px"
                        class="ml-3 mr-3 grey lighten-4"
                        ><h2 style="white-space: nowrap;">{{ item.price * item.count }} {{ getNameByLang(Rub) }}</h2></v-card
                      >
                      <v-btn
                        class="ml-2 mr-8"
                        fab
                        dark
                        small
                        color="brown"
                        @click="productMinus(item)"
                        ><v-icon dark> mdi-minus </v-icon></v-btn
                      >
                      <v-card elevation="0" class="grey lighten-4"
                        ><h2>{{ item.count }}</h2></v-card
                      >
                      <v-btn
                        class="ml-8"
                        fab
                        dark
                        small
                        color="brown"
                        @click="productPlus(item)"
                        ><v-icon dark> mdi-plus </v-icon></v-btn
                      >
                      <v-btn
                        color="red"
                        class="ml-16 align-self-end"
                        rounded
                        outlined
                        min-width="25%"
                        @click="productDelete(item)"
                        >{{ getNameByLang(Delete) }}</v-btn
                      >
                      <v-btn
                        v-if="item.mods.length > 0"
                        color="brown"
                        class="ml-16 align-self-end"
                        rounded
                        outlined
                        @click="productPlus(item, i)"
                        >Изменить состав</v-btn
                      >
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img
                      :src="
                        item.img
                          ? 'https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/' +
                            item.img
                          : '/burger.png'
                      "
                    ></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card
        class="ml-8 mr-8 mt-0 overflow-auto"
        color="brown"
        elevation="0"
        height="calc(25vh - 80px)"
      >
        <v-container fluid v-if="helpersSelect.length > 0">
          <v-row>
            <v-col cols="12"
              ><div class="align-self-center text-h3 text--primary mt-3 text-nav">
              {{ getNameByLang(RecomendsForYou) }}
              </div></v-col
            >
            <v-col
              v-for="(product, index) in helpersSelect.slice(0, 4)"
              :key="'helper' + index + product.id"
              cols="3"
            >
              <v-card
                flat
                class="grey lighten-4 overflow-hidden"
                @click="productToCart(product)"
                height="250px"
              >
                <v-img
                  aspect-ratio="1.3"
                  :src="
                    product.img
                      ? 'https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/' +
                        product.img
                      : '/burger.png'
                  "
                >
                </v-img>
                <v-card-title class="pt-0 pb-0"
                  ><div class="ma-auto text-truncate">
                    {{getNameByLang(product)}}
                  </div></v-card-title
                >
                <v-card-title class="pt-0 pb-0">
                  <div class="text-subtitle-1 ma-auto">
                    {{ product.price }} {{getNameByLang(Rub)}}
                  </div>
                </v-card-title>
                <v-fab-transition>
                  <v-btn
                    @click="productToCart(product)"
                    key="mdi-plus"
                    fab
                    color="brown"
                    dark
                    absolute
                    right
                    bottom
                    small
                    class="v-btn--example mb-7 mr-0"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-fab-transition>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-footer v-bind="localAttrs" :padless="true" height="80px">
        <v-card
          class="ma-0 overflow-auto"
          color="brown"
          elevation="0"
          width="100%"
          rounded="0"
        >
          <v-container fluid>
            <v-card
              flat
              tile
              width="100%"
              class="brown text-center d-flex align-center justify-space-between mb-6"
            >
              <v-card flat color=" brown" width="30%">
                <v-btn
                  class="pa-0"
                  rounded
                  outlined
                  color="grey lighten-4"
                  x-large
                  @mouseover.prevent=""
                >
                  <v-btn
                    class="mt-1 mb-1 ml-1"
                    :outlined="false"
                    rounded
                    large
                    :dark="orderTypeStyle.inDark"
                    :color="orderTypeStyle.inColor"
                    elevation="0"
                    @click="orderTypeChange('IN')"
                  >
                    <v-icon>mdi-brightness-percent</v-icon>
                    {{ getNameByLang(TakeHere) }}</v-btn
                  ><v-btn
                    class="mt-1 mb-1 mr-1"
                    :outlined="false"
                    rounded
                    large
                    :dark="orderTypeStyle.outDark"
                    :color="orderTypeStyle.outColor"
                    elevation="0"
                    @click="orderTypeChange('OUT')"
                  >
                    <v-icon>mdi-magnify</v-icon>
                  {{ getNameByLang(TakeAway) }}
                  </v-btn>
                </v-btn>
              </v-card>
              <v-card flat color="grey lighten-4" width="30%"> </v-card>
              <v-card flat color="brown" width="30%">
                <v-btn
                  rounded
                  color="success"
                  dark
                  x-large
                  @click="payOpenClose"
                  min-width="85%"
                  :disabled="cart.length === 0"
                  ><v-icon size="24px" class="mr-2"> mdi-shopping </v-icon>
                  {{ getNameByLang(Pay) }} {{ cartData.sum }} {{ getNameByLang(Rub) }}
                </v-btn>
              </v-card>
            </v-card>
          </v-container>
        </v-card>
      </v-footer>
    </v-card>
  </v-dialog>
</template>

<script>
import { cartReduce, helpersForYou, orderTypeStyle } from "@/utils/cart";
import {
  AddToCart,
  Back,
  Cancel,
  Delete,
  Pay,
  RecomendsForYou,
  Rub,
  TakeAway,
  TakeHere,
  YouOrder
} from "../utils/buttonNames";

export default {
  props: {
    getNameByLang: {
      type: Function
    },
    helpers: {
      type: Array,
      default: null,
    },
    kiosk: {
      type: Object,
      default: null,
    },
    activeCart: {
      type: Boolean,
      default: false,
    },

    products: {
      type: Array,
      default: null,
    },
    cart: {
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
  computed: {
    RecomendsForYou(){
      return RecomendsForYou
    },
    YouOrder(){
      return YouOrder
    },
    Delete(){
      return Delete
    },
    Back(){
      return Back
    },
    TakeAway(){
      return TakeAway
    },
    TakeHere(){
      return TakeHere
    },
    Rub(){
      return Rub
    },
    Pay(){
      return Pay
    },
    AddToCart(){
      return AddToCart
    },
    Cancel(){
      return Cancel
    },
    helpersSelect() {
      return helpersForYou(this.helpers, this.products, this.cart, this.kiosk)
    },
    cartData() {
      return cartReduce(this.cart);
    },
    orderTypeStyle() {
      return orderTypeStyle(this.orderType)
    },
  },
  methods: {
    getProduct(id) {
      return this.products.find((it) => it.id == id);
    },
    productPlus(product, replace) {
      this.$emit("productPlus", product, replace, true);
    },
    productToCart(product) {
      this.$emit("productToCart", product, undefined, true);
    },
    productMinus(product) {
      this.$emit("productMinus", product);
    },
    productDelete(product) {
      this.$emit("productDelete", product);
    },
    cartOpenClose() {
      this.$emit("cartOpenClose");
    },
    orderTypeChange(type) {
      this.$emit("orderTypeChange", type);
    },
    payOpenClose() {
      this.$emit("billAskOpenClose");
      //this.$emit("payOpenClose");
    },
  },
};
</script>
