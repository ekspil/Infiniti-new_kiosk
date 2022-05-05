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

    <bottom @cartOpenClose="cartOpenClose" @clear="clear" :cart="cart"></bottom>
    <!--    <bottom-sheet :activeBottomSheet="activeBottomSheet"></bottom-sheet>-->
    <cart
      :activeCart="activeCart"
      :cart="cart"
      :orderType="orderType"
      :products="products"
      @cartOpenClose="cartOpenClose"
      @productMinus="productMinusFromCart"
      @productPlus="productToCart"
      @productDelete="productDeleteFromCart"
      @orderTypeChange="orderTypeChange"
      @payOpenClose="payOpenClose"
    ></cart>
    <helper
      :helper="helper"
      :mods="mods"
      :selectedProduct="selectedProduct"
      :products="products"
      @helperOpenClose="helperOpenClose"
    ></helper>
    <pay :pay="pay" @payOpenClose="payOpenClose"></pay>
    <start
      :activeStart="activeStart"
      @startOpenClose="startOpenClose"
      @orderTypeChange="orderTypeChange"
    ></start>
    <lock :activeLock="kiosk.lock"></lock>
  </div>
</template>

<script>
import Bottom from "@/components/Bottom";
import Navigation from "@/components/Navigation";
import Top from "@/components/Top";
import Menu from "@/components/Menu";

import Cart from "@/components/Cart";
import Helper from "@/components/Helper";
import Pay from "@/components/Pay";
import Start from "@/components/Start";
import Lock from "@/components/Lock";

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
    Start,
    Pay,
    Lock,
  },

  data: () => ({
    orderType: "IN",
    pay: {
      alert: "",
      activePay: false,
      orderId: "",
      success: false,
    },
    activeCart: false,
    activeStart: true,
    helper: false,
    selectedGroupId: null,
    selectedProduct: null,
    products: null,
    groups: null,
    mods: null,
    cart: [],
    timeToClear: 0,
    updateInterval: null,
    kiosk: {
      lock: true,
    },
  }),

  methods: {
    clear() {
      this.pay = {
        alert: "",
        activePay: false,
        orderId: "",
        success: false,
      };
      this.activeCart = false;
      this.activeStart = true;
      this.helper = false;
      this.selectedGroupId = null;
      this.selectedProduct = null;
      this.cart = [];
    },
    async payOpenClose() {
      this.timeToClear = 300
      this.pay.activePay = !this.pay.activePay;
      try {
        const result = await this.$store.dispatch("kassa/payTerminal", {
          items: this.cart,
          type: this.orderType,
        });
        if (result.ok === false) {
          this.pay.alert = result.result;
          setTimeout(() => {
            this.pay.alert = ""
            this.pay.activePay = false
          }, 7000);
        }
        if (result.ok === true) {
          this.pay.orderId = result.order.id;
          setTimeout(() => {
            this.clear();
          }, 7000);
        }
      } catch (e) {
        this.pay.alert = e.message;
      }
    },
    cartOpenClose() {
      this.timeToClear = 60
      this.activeCart = !this.activeCart;
    },
    startOpenClose() {
      this.timeToClear = 60
      this.activeStart = !this.activeStart;
    },
    orderTypeChange(type) {
      this.timeToClear = 60
      this.orderType = type;
    },
    productToCart(prod, replace) {
      this.timeToClear = 60
      const product = JSON.parse(JSON.stringify(prod));
      if (product.mods && product.mods.length > 0) {
        this.helper = true;
        this.selectedProduct = product;
        if (replace !== undefined) {
          this.selectedProduct.replace = replace;
        }
        return;
      }
      this.cart = cartPlus(this.cart, product);
    },
    productMinusFromCart(product) {
      this.timeToClear = 60
      this.cart = cartMinus(this.cart, product);
    },
    productDeleteFromCart(product) {
      this.timeToClear = 60
      this.cart = cartDelete(this.cart, product);
    },
    groupSelect(groupId) {
      this.timeToClear = 60
      this.selectedGroupId = groupId;
    },
    helperOpenClose(type) {
      this.timeToClear = 60
      this.helper = !this.helper;
      if (type === "CANCEL") {
        this.selectedProduct = null;
      }
      if (type === "ADD") {
        if (this.selectedProduct.replace !== undefined) {
          const num = this.selectedProduct.replace;
          this.cart = this.cart.map((item, index) => {
            if (index === num) {
              delete this.selectedProduct.replace;
              return this.selectedProduct;
            }
            return item;
          });
          this.selectedProduct = null;
        } else {
          this.cart = cartPlus(this.cart, this.selectedProduct);
          this.selectedProduct = null;
        }
      }
    },
    async updateStatus() {
      const name = this.$store.state.auth.name;
      if (!name) {
        this.$store.commit("auth/setToken", null);
        await this.$router.push("/login");
        return;
      }
      const result = await this.$store.dispatch("data/getKiosk", { name });
      if (result.command === "reload") {
        alert("Перезагрузка");
      }
      if (result.command === "logout") {
        this.$store.commit("auth/setToken", null);
        await this.$router.push("/login");
      }
      this.kiosk = result;
    },
    minusTime(){
      if(this.timeToClear >= 3){

        this.timeToClear -= 3
      }
      if(this.timeToClear < 3 && this.timeToClear > -3){
        this.clear()
      }
    }
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

    this.updateInterval = setInterval(async () => {
      this.minusTime()
      await this.updateStatus();
    }, 3000);
  },
  beforeDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  },
};
</script>
<style>
/*
 *  STYLE 6
 */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  background-color: #f90;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

html {
  font-weight: bold;
}
h1,
h2,
h3,
h4,
h5 {
}
</style>
