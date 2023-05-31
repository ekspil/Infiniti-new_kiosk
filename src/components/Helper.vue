<template>
  <v-bottom-sheet
    v-model="helper"
    v-if="mods && products && selectedProduct"
    persistent
  >
    <v-card class="overflow-auto" color="brown" elevation="0" :height="getModProducts.length > 4 ? '760px' : '480px'">
      <v-container fluid class="text-center">
        <v-card flat color=" brown" width="100%" class="mt-6 mb-6">
          <v-btn
            class="pa-0"
            rounded
            outlined
            color="grey lighten-4"
            x-large
            @mouseover.prevent=""
          >
            <v-btn

              v-for="(mod, index) of selectedProductMods"
              :key="mod.id"
              class="ma-1"
              :outlined="false"
              rounded
              large
              :dark="
                index === selectedMod
                  ? orderTypeStyle.inDark
                  : orderTypeStyle.outDark
              "
              :color="
                index === selectedMod
                  ? orderTypeStyle.inColor
                  : orderTypeStyle.outColor
              "
              elevation="0"
              @click="selectMod(index)"
            >
              {{ mod.name }}
            </v-btn>
          </v-btn>
        </v-card>
        <v-row>
          <v-col v-for="product in getModProducts" :key="product.id" cols="3">
            <v-card
              flat
              class="grey lighten-4 overflow-hidden"
              @click="selectModToProd(product)"
              height="250px"
            >
              <v-img
                aspect-ratio="1.3"
                :src="
                  product.img
                    ? 'https://api.rb24.ru/api/v1/files/download/1/' +
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
                </div>
              </v-card-title>
              <v-fab-transition v-if="checkedMod(product)">
                <v-btn
                  :key="product.id + 'btn'"
                  fab
                  color="success"
                  dark
                  absolute
                  right
                  bottom
                  small
                  class="v-btn--example mb-7 mr-0"
                >
                  <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                </v-btn>
              </v-fab-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
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
              <v-card flat color="brown" width="30%">
                <v-btn
                  rounded
                  color="error"
                  dark
                  x-large
                  @click="helperOpenClose('CANCEL')"
                  ><v-icon size="24px" class="mr-2"> mdi-cancel </v-icon>
                  Передумал
                </v-btn>
              </v-card>
              <v-card flat color="grey lighten-4" width="30%"> </v-card>
              <v-card flat color="brown" width="30%">
                <v-btn
                  rounded
                  color="success"
                  dark
                  x-large
                  :disabled="!getButtonEndText().selectedItems[selectedMod]"
                  @click="helperOpenClose(getButtonEndText().action)"
                  ><v-icon size="24px" class="mr-2"> mdi-chevron-right</v-icon>
                  {{ getButtonEndText().text }}
                </v-btn>
              </v-card>
            </v-card>
          </v-container>
        </v-card>
      </v-footer>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  props: {
    helper: {
      type: Boolean,
      default: false,
    },
    mods: {
      type: Array,
      default: null,
    },
    products: {
      type: Array,
      default: null,
    },
    selectedProduct: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    localAttrs: {
      fixed: true,
    },
    selectedMod: 0,
  }),
  computed: {
    selectedProductMods() {
      const res = this.selectedProduct.mods.map((item) => {
        return this.mods.find((it) => it.id === item);
      });

      return res.filter(item => item)
    },
    getModProducts() {
      const id = this.selectedProduct?.mods[this.selectedMod];
      if (!id) return [];
      const mod = this.mods.find((i) => i.id === id);

      const res = mod.items.map((it) => {
        return this.products.find((i) => i.id === it);
      });

      return res.filter(item => item)
    },
    orderTypeStyle() {
      return {
        inColor: "grey lighten-4",
        outColor: "brown",
        inDark: false,
        outDark: true,
      };
    },
  },
  methods: {

    checkModProducts(modId) {
      const id = this.selectedProduct?.mods[modId];
      if (!id) return [];
      const mod = this.mods.find((i) => i.id === id);

      const res =  mod.items.map((it) => {
        return this.products.find((i) => i.id === it);
      });

      return res.filter(i => i)
    },
    getButtonEndText() {
      const result = this.selectedProduct.mods.reduce(
        (acc, item, index) => {
          if(acc.selectedItems[index] === undefined){

            acc.selectedItems[index] = false
          }
          acc.all++;
          if (this.selectedProduct.items) {
            if (this.selectedProduct.items[index]) {
              const isAny = this.checkModProducts(index).find(it=> it.id === this.selectedProduct.items[index] )
              if(isAny){
                acc.selectedItems[index] = true
                acc.selected++;
              }
            }
          }

          return acc;
        },
        { selected: 0, all: 0, selectedItems:[] }
      );

      if (result.all == result.selected) {
        return {
          text: "Готово",
          action: "ADD",
          selectedItems: result.selectedItems
      };
      } else {
        return {
          text: "Далее",
          action: "NEXT",
          selectedItems: result.selectedItems
        };
      }
    },
    checkedMod(product) {
      if (
        !this.selectedProduct.items ||
        this.selectedProduct.items.length === 0
      ) {
        return false;
      }
      if (this.selectedProduct.items[this.selectedMod] === product.id) {
        return true;
      }
      return false;
    },
    selectMod(index) {
      if(!this.getButtonEndText().selectedItems[this.selectedMod]){
        return
      }
      this.selectedMod = index;
    },
    selectModToProd(product) {
      if (!this.selectedProduct.items) {
        this.selectedProduct.items = [];
      }
      this.selectedProduct.items[this.selectedMod] = product.id;
      if(!this.selectedProduct.setProducts) this.selectedProduct.setProducts = []
      this.selectedProduct.setProducts[this.selectedMod] = JSON.parse(JSON.stringify(product));
      if(!this.selectedProduct.setProducts[this.selectedMod].count){
        this.selectedProduct.setProducts[this.selectedMod].count = 1
      }

      this.$forceUpdate();
    },
    helperOpenClose(type) {
      if (type === "CANCEL") {
        this.selectedMod = 0;

        this.$emit("helperOpenClose", type);
      }
      if(type === "NEXT"){
        this.selectedMod++
        return
      }
      if(type === "ADD"){
        this.selectedMod= 0

        this.$emit("helperOpenClose", type);

        return
      }
    },
  },
};
</script>
