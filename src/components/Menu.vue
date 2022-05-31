<template>
  <v-card flat tile class="overflow-y-auto overflow-x-hidden" height="calc(100vh - 330px)">
    <v-container v-for="type in types" :key="type" class="" fluid>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="6"
        >
          <v-card
            flat
            :class="cardClass === product.id ? 'loader' : ''"
            @click="productToCart(product)"
          >
            <v-img
              transition="scroll-y-transition"
              :src="
                product.img
                  ? 'https://api.rb24.ru/api/v1/files/download/1/' + product.img
                  : '/burger.png'
              "
              aspect-ratio="1.3"
            >
            </v-img>
            <v-card-title class="pt-0 pb-0"
              ><div class="ma-auto">{{ product.name }}</div></v-card-title
            >
            <v-card-title class="pt-0 pb-0">
              <div class="text-subtitle-1 ma-auto">{{ product.price }} р.</div>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "Menu",
  props: {
    products: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  computed: {},
  components: {},
  data: () => ({
    types: ["main_menu"],
    cardClass: null,
  }),

  methods: {
    productToCart(product) {
      this.$emit("productToCart", product);
      this.cardClass = product.id;
      setTimeout(() => {
        this.cardClass = null;
      }, 150);
    },
  },
};
</script>
<style>
.loader {
  animation: loader 0.14s infinite ease-in;
  z-index: 9999;
  position: fixed;
  width: 400px;
}

@keyframes loader {
  0% {
    transform: translateY(0px);
    width: 400px;
  }
  100% {
    transform: translateY(100vh);
    width: 100px;
  }
}
</style>
