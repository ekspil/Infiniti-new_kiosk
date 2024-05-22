<template>
  <v-overlay
    :absolute="true"
    :value="productDescription.show"
    @click="clearDelete"
  >
    <div @click.stop="">
      <v-card
        v-if="productDescription.product"
        class="coupon_card"
        width="700px"
        light
      >
        <v-img
          class="position_coupon"
          height="100px"
          width="100px"
          src="/logo_black.png"
        ></v-img>
        <v-card flat align="center" >
          <v-img
            transition="scroll-y-transition"
            :src="
              productDescription.product.img
                ? 'https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/' +
                  productDescription.product.img
                : '/burger.png'
            "
            aspect-ratio="1.3"
            width="400px"
          ></v-img>


          <v-card-title class="pt-0 pb-0"
            ><div class="ma-auto">
              {{ productDescription.product.name }}
            </div></v-card-title
          >
          <v-card-title class="pt-0 pb-0">
            <div class="text-subtitle-1 ma-auto wrap-nobreak">
              {{ productDescription.product.description }}
            </div>
            <div class="text-subtitle-1 ma-auto"><br>
              <b>Пищевая ценность на 100г. продукта:</b>
              {{ `Ккал: ${productDescription.product.des_k}, Белки: ${productDescription.product.des_p}, Жиры: ${productDescription.product.des_l}, Углеводы: ${productDescription.product.des_c}` }}
            </div>
          </v-card-title>

          <v-container fluid v-if="productDescription.product && productDescription.product.helpers && helpers.length > 0">
            <v-row>
              <v-col cols="12"
              ><div class="align-self-center">
                Рекомендуем вместе:
              </div></v-col
              >
              <v-col
                v-for="(product, index) in helpers"
                :key="'helper' + index + product.id"
                cols="3"
              >
                <v-card
                  flat
                  class="grey lighten-4 overflow-hidden"
                  @click="productToCartHelper(product)"
                  height="180px"
                >
                  <v-img
                    v-if="cardClass === product.id"
                    :class="cardClass === product.id ? 'loader' : ''"
                    transition="scroll-y-transition"
                    aspect-ratio="1.3"
                    :src="
                    product.img
                      ? 'https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/' +
                        product.img
                      : '/burger.png'
                  "
                  >
                  </v-img>
                  <v-img
                    transition="scroll-y-transition"
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
                    {{ product.name }}
                  </div></v-card-title
                  >
                  <v-card-title class="pt-0 pb-0">
                    <div class="text-subtitle-1 ma-auto">
                      {{ product.price }} р.
                    </div>
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>


          <v-card-actions>
            <v-btn
              class="ml-2 mr-8 mb-3 mt-4"
              fab
              dark
              small
              color="error"
              @click="productCount(-1)"
            ><v-icon dark> mdi-minus </v-icon></v-btn
            >
            <v-card elevation="0" class="grey lighten-4 mb-3 mt-4"
            ><h2>{{ productDescription.product.count ? productDescription.product.count : productDescription.product.count = 1}}</h2></v-card
            >
            <v-btn
              class="ml-8 mb-3 mt-4"
              fab
              dark
              small
              color="success"
              @click="productCount(1)"
            ><v-icon dark> mdi-plus </v-icon></v-btn
            >
            <v-btn
              :key="productDescription.product.id + 'btn'"

              color="success"
              dark
              @click="productToCart(productDescription.product,  productDescription.product.count)"
              bottom
              large

              class="ml-15 pl-16 pr-16  mb-3 mt-4"
            >
              Добавить в корзину
            </v-btn>
            <v-btn
              :key="productDescription.product.id + 'btn_с'"
              @click="clearDelete"
              color="error"
              dark
              large
              bottom

              class="ml-15 pl-5 pr-5 mb-3 mt-4"
            >
              Передумал
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-card>

    </div>
  </v-overlay>
</template>

<script>
export default {
  components: {},
  props: {
    productDescription: {
      type: Object,
      default: null,
    },
    allHelpers: {
      type: Array,
      default: ()=>[]
    },
    allAvalibleProducts: {
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      cardClass: null,
    };
  },
  methods: {
    changed() {
      this.$emit("updateTimer");
    },
    async custom() {
      await this.findBill();

      this.$forceUpdate();
    },
    clearDelete() {
      this.$emit("clearDelete");
    },
    productToCart(product, count) {
      const replace = undefined
      this.cardClass = product.id;
      setTimeout(() => {
        this.cardClass = null;
      }, 280);
      this.$emit("productToCart", product, replace, count);
      if(count){
        this.clearDelete()
      }
    },
    productToCartHelper(product) {
      const replace = undefined
      this.cardClass = product.id;
      setTimeout(() => {
        this.cardClass = null;
      }, 280);
      this.$emit("productToCart", product, replace, true);
    },
    productCount(num){
      if(!this.productDescription.product.count){
        this.productDescription.product.count = 1
      }
      this.productDescription.product.count += num
      this.$forceUpdate()
    }
  },
  computed: {
    helpers(){
      if(!this.productDescription.product) return null
      const selectedHelpers = []
      for(let helperId of this.productDescription.product.helpers){
        let helper = this.allHelpers.find((item)=>item.id === helperId)
        selectedHelpers.push(helper)
      }
      let selectedHelperProductIds = []
      for(let item of selectedHelpers ){

        if(!item || !item.items) continue
        selectedHelperProductIds.push(...item.items)
      }
      const selectedProducts = []
      while(selectedProducts.length < 3){
        if(selectedHelperProductIds.length === 0) break
        const randomId = selectedHelperProductIds[Math.floor(Math.random()*selectedHelperProductIds.length)]
        const product = this.allAvalibleProducts.find(item => item.id === randomId)
        if(!product) continue
        selectedProducts.push(product)
        selectedHelperProductIds = selectedHelperProductIds.filter(item => item !== randomId)
      }

      return selectedProducts
    }
  }
};
</script>

<style scoped>
.position_coupon {
  line-height: 30px;
  top: -50px;
  left: 300px;
  z-index: 1500 !important;
}

.coupon_card {
  z-index: 500 !important;
}
.loader {
  animation: loader 0.3s infinite ease-in;
  z-index: 9999;
  position: fixed;
  width: 180px;
}

@keyframes loader {
  0% {
    transform: translateY(0px);
    width: 180px;
  }
  50% {
    transform: translateY(10vh);
    width: 160px;
  }
  100% {
    transform: translateY(100vh);
    width: 100px;
  }
}

.wrap-nobreak {
  overflow-wrap: normal;  /* не поддерживает IE, Firefox; является копией word-wrap */
  word-wrap: normal;
  word-break: normal;  /* не поддерживает Opera12.14, значение keep-all не поддерживается IE, Chrome */
  line-break: auto;  /* нет поддержки для русского языка */
  hyphens: manual;
}

</style>
