<template>
  <div>
    <top></top>

    <navigation :groups="groups" @groupSelect="groupSelect"></navigation>

    <v-main>
      <Menu
        v-if="products"
        :products="selectedProducts"
        @productToCart="productToCart"
      ></Menu>
    </v-main>

    <bottom @cartOpenClose="cartOpenClose" :cart="cart"></bottom>
    <!--    <bottom-sheet :activeBottomSheet="activeBottomSheet"></bottom-sheet>-->
    <cart
      :activeCart="activeCart"
      :cart="cart"
      @cartOpenClose="cartOpenClose"
      @productMinus="productMinusFromCart"
      @productPlus="productToCart"
      @productDelete="productDeleteFromCart"
    ></cart>
    <helper :helper="helper" @helperOpenClose="helperOpenClose"></helper>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Navigation from "@/components/Navigation";
import Top from "@/components/Top";
import Menu from "@/components/Menu";

import Cart from "@/components/Cart";
import Helper from "@/components/Helper";

import { cartPlus, cartMinus, cartDelete } from "@/utils/cart";

export default {
  name: "App",
  components: {
    Bottom,
    Navigation,
    Top,
    Menu,
    Cart,
    Helper,
  },

  data: () => ({
    activeCart: false,
    helper: true,
    selectedGroupId: null,
    products: null,
    groups: null,
    mods: null,
    cart: [],
  }),

  methods: {
    cartOpenClose() {
      this.activeCart = !this.activeCart;
    },
    productToCart(product) {
      this.cart = cartPlus(this.cart, product);
    },
    productMinusFromCart(product) {
      this.cart = cartMinus(this.cart, product);
    },
    productDeleteFromCart(product) {
      this.cart = cartDelete(this.cart, product);
    },
    groupSelect(groupId) {
      this.selectedGroupId = groupId;
    },
    helperOpenClose() {
      this.helper = !this.helper;
    },
  },
  computed: {
    selectedProducts() {
      return this.products.filter((product) => {
        if (!this.selectedGroupId) return product;
        if (product.group_id === this.selectedGroupId) return product;
      });
    },
  },
  async mounted() {
    this.mods = await this.$store.dispatch("data/getAllMods", {});
    this.products = await this.$store.dispatch("data/getAllProducts", {});
    this.groups = await this.$store.dispatch("data/getAllGroups", {});
  },
};
</script>
