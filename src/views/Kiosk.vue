<template>
  <div>
    <top></top>

    <navigation :groups="grps" @groupSelect="groupSelect"></navigation>

    <v-main>
      <Menu
        v-if="products"
        :products="selectedProducts"
        @productToCart="productToCart"
      ></Menu>
    </v-main>

    <bottom
      @cartOpenClose="cartOpenClose"
      @couponOpenClose="couponOpenClose"
      @clear="clear"
      :cart="cart"
    ></bottom>
    <!--    <bottom-sheet :activeBottomSheet="activeBottomSheet"></bottom-sheet>-->
    <cart
      :activeCart="activeCart"
      :cart="cart"
      :orderType="orderType"
      :products="prods"
      :helpers="helpers"
      :kiosk="kiosk"
      @cartOpenClose="cartOpenClose"
      @productMinus="productMinusFromCart"
      @productPlus="productToCart"
      @productDelete="productDeleteFromCart"
      @orderTypeChange="orderTypeChange"
      @payOpenClose="payOpenCloseSBP"
      @productToCart="productToCart"
      @billAskOpenClose="billAskOpenClose"
    ></cart>
    <bill-ask
      :pay="pay"
      @payOpenClose="payOpenCloseSBP"
      @billAskOpenClose="billAskOpenClose"
      @updateTimer="updateTimer"
    ></bill-ask>
    <helper
      :helper="helper"
      :mods="mods"
      :selectedProduct="selectedProduct"
      :products="prods"
      @helperOpenClose="helperOpenClose"
    ></helper>
    <pay
      :pay="pay"
      :sbp="sbp"
      @payOpenClose="payOpenCloseSBP"
      :payTerminal="payOpenClose"
      @clear="clear"
      @clearSBP="clearSBP"
    ></pay>
    <start
      :activeStart="activeStart"
      @startOpenClose="startOpenClose"
      @orderTypeChange="orderTypeChange"
    ></start>
    <coupon
      :coupon="coupon"
      @updateTimer="updateTimer"
      @findCoupon="findCoupon"
      @couponOpenClose="couponOpenClose"
      @clearCoupon="clearCoupon"
      @productToCart="productToCart"
    ></coupon>
    <lock :activeLock="kiosk.lock"></lock>
    <delete-bill
      :deleteBill="deleteBill"
      @clearDelete="clearDelete"
      @updateTimer="updateTimer"
    ></delete-bill>
    <Description
      :productDescription="productDescription"
      :allHelpers="helpers"
      :allAvalibleProducts="prods"
      @clearDelete="clearDeleteDescription"
      @updateTimer="updateTimer"
      @productToCart="productToCart"
    ></Description>
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
import BillAsk from "@/components/BillAsk";
import Coupon from "@/components/Coupon";
import DeleteBill from "@/components/DeleteBill";
import Description from "@/components/Description";

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
    BillAsk,
    Coupon,
    DeleteBill,
    Description
  },

  data: () => ({
    payTimeSBP: 0,
    orderType: "IN",
    pay: {
      alert: "",
      activePay: false,
      orderId: "",
      success: false,
      billAsk: false,
      billDialog: false,
      email: "",
      terminalPayWait: "",
    },
    sbp: null,
    coupon: {
      modal: false,
      input: "",
      find: null,
    },
    activeCart: false,
    activeStart: true,
    helper: false,
    selectedGroupId: null,
    selectedProduct: null,
    products: null,
    groups: null,
    helpers: null,
    mods: null,
    cart: [],
    timeToClear: 0,
    updateInterval: null,
    updateInterval2: null,
    kiosk: {
      lock: true,
      stops: [],
    },
    deleteBill: {
      show: false,
      input: "",
      find: null,
    },
    productDescription: {
      show: false,
      product: null,
    },
  }),

  methods: {
    clearSBP() {
      this.sbp = null;
      this.payTimeSBP = 10
    },
    clear() {
      this.pay = {
        alert: "",
        activePay: false,
        orderId: "",
        success: false,
        billAsk: false,
        billDialog: false,
        email: "",
        terminalPayWait: "",
        imageSBP: "",
      };
      this.coupon = {
        modal: false,
        input: "",
      };
      this.activeCart = false;
      this.activeStart = true;
      this.helper = false;
      this.selectedGroupId = null;
      this.selectedProduct = null;
      this.cart = [];
      this.sbp = null;
      this.productDescription.show = false;
      this.productDescription.product = null;
    },
    updateTimer() {
      this.timeToClear = 60;
    },
    findCoupon() {
      this.timeToClear = 60;
      if (!this.coupon.input) return;
      let p = this.products;
      if (this.kiosk && this.kiosk.type === "IIKO") {
        p = this.products.filter((item) => item.codeIiko);
      }

      const prod = p.find(
        (item) => Number(item.coupon) === Number(this.coupon.input)
      );

      if (!prod || this.kiosk.stops.includes(prod.id)) {
        this.coupon.input = "Не найден";
        setTimeout(() => {
          this.coupon.input = "";
        }, 1000);
        return;
      }
      const coupon = JSON.parse(JSON.stringify(prod));
      coupon.name = `Купон №${coupon.coupon}: ${coupon.name}`;
      if (coupon.couponPrice) {
        coupon.price = coupon.couponPrice;
      }
      this.coupon.find = coupon;
    },
    clearCoupon() {
      this.timeToClear = 60;
      this.coupon.find = null;
      this.coupon.modal = false;
      this.coupon.input = "";
    },
    clearDelete() {
      this.timeToClear = 0;
      this.deleteBill.find = null;
      this.deleteBill.show = false;
      this.deleteBill.input = "";
      this.deleteBill.process = false;
    },
    clearDeleteDescription() {
      this.timeToClear = 60;
      this.productDescription.show = false;
      this.productDescription.product = null;
    },
    async payOpenCloseSBP() {
      this.timeToClear = 999;
      this.pay.activePay = !this.pay.activePay;
      try {
        const result = await this.$store.dispatch("data/paySBP", {
          items: this.cart,
          type: this.orderType,
          kiosk: this.$store.state.auth.name,
          clientEmail: this.pay.email,
        });
        this.sbp = result;
        this.pay.terminalPayWait =
          (new Date("2023-08-09").getTime() - 1690848000000) /
          (1000 * 60 * 60 * 24);

        this.payTimeSBP = 200;
        let res1
        while (this.payTimeSBP > 0) {
          this.timeToClear = 999;
          try {
            res1 = await this.$store.dispatch("data/checkSBPApply", {
              items: this.cart,
              type: this.orderType,
              kiosk: this.$store.state.auth.name,
              clientEmail: this.pay.email,
              qrcId: result.qrcId
            });
            if (!res1 || !res1.payed) this.payTimeSBP--;
            if(res1.payed) break


          } catch (e) {
            console.log(e.message);
            this.payTimeSBP=0;
          }
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
        }
        console.log(res1)
        if (res1.ok === true) {
          this.pay.activePay = true
          this.sbp = null
          this.pay.orderId = res1.order.order.id;
          this.pay.iiko = res1.order.order.iiko;
          this.pay.iikoId = res1.order.order.iikoId;
        }
        else {
          this.sbp = null
          this.pay.alert = res1.message;
        }
        this.timeToClear = 60;
      } catch (e) {
        await this.payOpenClose();
      }
    },
    async payOpenClose() {
      this.sbp = null
      this.timeToClear = 999;
      this.payTimeSBP = 10
      this.pay.activePay = true;
      try {
        const result = await this.$store.dispatch("kassa/payTerminal", {
          items: this.cart,
          type: this.orderType,
          kiosk: this.$store.state.auth.name,
          clientEmail: this.pay.email,
        });
        if (result.ok === false) {
          this.pay.alert = result.result.replace(/[.*+?^${}()|[\]\\]/g, "");
          setTimeout(() => {
            this.pay.alert = "";
            this.pay.activePay = false;
          }, 15000);
        }
        if (result.ok === true) {
          this.pay.orderId = result.order.id;
          this.pay.iiko = result.order.iiko;
          this.pay.iikoId = result.order.iikoId;
        }
        this.timeToClear = 60;
      } catch (e) {
        this.timeToClear = 60;
        this.pay.alert = e.message;
      }
    },
    cartOpenClose() {
      this.timeToClear = 60;
      this.activeCart = !this.activeCart;
    },
    couponOpenClose() {
      this.timeToClear = 60;
      this.coupon.modal = !this.coupon.modal;
    },
    billAskOpenClose() {
      this.timeToClear = 60;
      this.pay.billAsk = !this.pay.billAsk;
    },
    startOpenClose() {
      this.timeToClear = 60;
      this.activeStart = !this.activeStart;
    },
    orderTypeChange(type) {
      this.timeToClear = 60;
      this.orderType = type;
    },
    productToCart(prod, replace, count) {
      this.timeToClear = 60;
      if(prod.description && !count){
        this.productDescriptionOpen(prod)
        return
      }
      const product = JSON.parse(JSON.stringify(prod));
      if (product.mods && product.mods.length > 0) {
        this.helper = true;
        this.selectedProduct = product;
        if (replace !== undefined) {
          this.selectedProduct.replace = replace;
        }
        return;
      }
      this.cart = cartPlus(this.cart, product, count);
    },
    productDescriptionOpen(prod){
      this.productDescription.show = true;
      this.productDescription.product = JSON.parse(JSON.stringify(prod));
    },
    productMinusFromCart(product) {
      this.timeToClear = 60;
      this.cart = cartMinus(this.cart, product);
    },
    productDeleteFromCart(product) {
      this.timeToClear = 60;
      this.cart = cartDelete(this.cart, product);
    },
    groupSelect(groupId) {
      this.timeToClear = 60;
      this.selectedGroupId = groupId;
    },
    helperOpenClose(type) {
      this.timeToClear = 60;
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
        location.reload();
      }
      if (result.command === "logout") {
        this.$store.commit("auth/setToken", null);
        await this.$router.push("/login");
      }
      if (result.command === "settlement") {
        await this.$store.dispatch("kassa/settlement", {});
      }
      if (result.command === "delete_bill") {
        console.log(result.command);
        this.deleteBill.show = true;
        setTimeout(() => {
          this.deleteBill.show = false;
        }, 60000);
      }
      this.kiosk = result;
    },
    minusTime() {
      if (this.timeToClear >= 3) {
        this.timeToClear -= 3;
      }
      if (this.timeToClear < 3 && this.timeToClear > -3) {
        this.clear();
      }
    },
  },
  sockets: {
    SBPPaymentSuccess(data) {
      if(!this.sbp) return
      if(this.sbp.qrcId !== data.qrcId) return
      const newSbp = JSON.parse(JSON.stringify(this.sbp))
      newSbp.payed = true
      this.sbp = newSbp
    }
  },
  computed: {
    grps() {
      if (!this.groups) return this.groups;
      if (!this.products) return this.groups;

      return this.groups.filter((g) => {
        const item = this.prods.find((it) => {
          if(it.group_id === g.id) return true
          if(it.groups && it.groups.includes(g.id))return true
          return false
        });
        if (item) return true;
        return false;
      });
    },
    prods() {
      if (!this.products) return null;
      let p = this.products.filter((product) => {
        if (product.hidden === true) return false;
        if (this.kiosk.stops.includes(product.id)) return false;

        return true;
      });

      if (this.kiosk && this.kiosk.type === "IIKO") {
        p = p.filter((item) => item.codeIiko);
      }

      p.sort((a, b) => {
        if (Number(a.priority) > Number(b.priority)) return 1; // если первое значение больше второго
        if (Number(a.priority) === Number(b.priority)) return 0; // если равны
        if (Number(a.priority) < Number(b.priority)) return -1;
      });
      return p.map((item) => {
        if (this.kiosk.vip) {
          item.price = item.priceVip || 9999;
        }
        return item;
      });
    },
    selectedProducts() {
      let p = this.products.filter((product) => {
        if (product.hidden === true) return false;
        if (this.kiosk.stops.includes(product.id)) return false;

        if (!this.selectedGroupId) {
          if (!Number(product.priority)) return false;
          if (Number(product.priority)) return true;
        }
        if (product.groups) {
           if (product.groups.includes(this.selectedGroupId)) return true;
        }
        else if (product.group_id === this.selectedGroupId)   return true;
      });

      if (this.kiosk && this.kiosk.type === "IIKO") {
        p = p.filter((item) => item.codeIiko);
      }

      p.sort((a, b) => {
        if (Number(a.priority) > Number(b.priority)) return 1; // если первое значение больше второго
        if (Number(a.priority) === Number(b.priority)) return 0; // если равны
        if (Number(a.priority) < Number(b.priority)) return -1;
      });
      return p.map((item) => {
        if (this.kiosk.vip) {
          item.price = item.priceVip || 9999;
        }
        return item;
      });
    },
  },
  async mounted() {
    this.mods = await this.$store.dispatch("data/getAllMods", {});
    this.products = await this.$store.dispatch("data/getAllProducts", {});
    this.groups = await this.$store.dispatch("data/getAllGroups", {});
    this.helpers = await this.$store.dispatch("data/getAllHelpers", {});

    setTimeout(async () => {
      await this.$store.dispatch("kassa/settlement", {});
    }, 10000);

    this.updateInterval2 = setInterval(async () => {
      await this.$store.dispatch("kassa/settlement", {});
    }, 24 * 3600 * 1000);

    this.updateInterval = setInterval(async () => {
      this.minusTime();
      await this.updateStatus();
    }, 5000);
  },
  beforeDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      clearInterval(this.updateInterval2);
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

div {
  font-family: "Oswald";
  font-weight: bold;
}
</style>
