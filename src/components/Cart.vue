<template>
  <v-bottom-sheet v-model="activeCart" fullscreen>
    <v-sheet class="text-center brown" height="100%">
      <v-container>
        <v-card
          flat
          tile
          width="100%"
          class="brown  d-flex align-center  mb-6"
        >
          <v-card flat color="brown" width="30%" >
            <v-btn
              class="ml-0"
              rounded
              outlined
              color="grey lighten-4"
              dark
              @click="cartOpenClose"
            >
              Назад
            </v-btn>
          </v-card>
          <v-card flat color="brown" width="40%">
            <v-card-text class="d-flex flex-column">
              <div class="align-self-start text-h3 text--primary">
                Твой заказ
              </div>
            </v-card-text>
          </v-card>
          <v-card flat color="grey lighten-4" width="30%"> </v-card>
        </v-card>
      </v-container>
      <v-container class="pa-0">
        <div height="50vh" class="brown overflow-hidden">
          <v-row dense>
            <v-col v-for="(item, i) in cart" :key="i" cols="12">
              <v-card class="grey lighten-4 ">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="text-h5"
                      v-text="item.name"
                    ></v-card-title>

                    <v-card-subtitle
                      class="pa-0 text-left pl-10"
                      v-for="mod in item.mods"
                      :key="item.name + mod.name"
                      v-text="mod"
                    ></v-card-subtitle>

                    <v-card-actions class="mb-5">
                      <v-card elevation="0" width="130px" class="ml-3 mr-3 grey lighten-4"
                        ><h2>{{ item.price * item.count }} Руб.</h2></v-card
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
                        @click="productDelete(item)"
                        >Удалить</v-btn
                      >
                      <v-btn
                        v-if="item.mods.length > 0"
                        color="brown"
                        class="ml-16 align-self-end"
                        rounded
                        outlined
                        @click="productPlus(item)"
                        >Изменить состав</v-btn
                      >
                    </v-card-actions>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="item.img || '/burger.png'"></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    activeCart: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    productPlus(product) {
      this.$emit("productPlus", product);
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
  },
};
</script>
