<template>
  <v-card flat tile class="overflow-auto" max-height="calc(100vh - 330px)">
    <v-container v-for="type in types" :key="type" class="" fluid>
      <v-row>
        <v-col
          v-for="product in products"
          :key="product.id"
          cols="12"
          sm="6"
          md="6"
        >
          <v-card flat class="" @click="productToCart(product)">
            <v-img :src="product.img || '/burger.png'" height="300px"> </v-img>
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

  components: {},
  data: () => ({
    types: ["main_menu"],
  }),

  methods: {
    productToCart(product) {
      this.$emit("productToCart", product)
    },
  },
};
</script>
