<template>
  <v-dialog
    v-model="activeStart"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center black" height="100vh">
      <v-card
        class="ml-0 mr-0 mt-0 overflow-hidden"
        color="black"
        elevation="0"
        height="100vh"
      >
        <video class="mx-0 px-0 col" width="100%" autoplay muted loop>
          <source :src="`https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/kiosk-rb-bg-${this.$store.state.auth.id}`" type="video/mp4" />
        </video>
        <v-overlay :absolute="false" :opacity="0" :value="true">
          <v-container  class="position_bottom">
            <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="2">

                <v-card
                  color="orange"
                  @click="selectLang('ru')"
                  elevation="5"
                  class="rounded-my ma-auto"
                  height="50" width="50"
                >
                  <v-img src="/ru.png" height="50" width="50"></v-img> </v-card
                >

              </v-col>
              <v-col cols="2">

                <v-card
                  color="orange"
                  @click="selectLang('gb')"
                  elevation="5"
                  class="rounded-my ma-auto"
                  height="50" width="50"
                >
                  <v-img src="/gb.png" height="50" width="50" class="pa-0 ma-0"></v-img> </v-card
                >

              </v-col>
              <v-col cols="2">

                <v-card
                  color="orange"
                  @click="selectLang('cn')"
                  elevation="5"
                  class="rounded-my ma-auto"
                  height="50" width="50"
                >
                  <v-img src="/cn.png" height="50" width="50"></v-img> </v-card
                >

              </v-col>
              <v-col cols="2">

                <v-card
                  color="orange"
                  @click="selectLang('kr')"
                  elevation="5"
                  class="rounded-my ma-auto"
                  height="50" width="50"
                >
                  <v-img src="/kr.png" height="50" width="50"></v-img> </v-card
                >

              </v-col>
              <v-col cols="2" align-self="center" >

                <v-card
                  color="orange"
                  @click="selectLang('jp')"
                  elevation="5"
                  class="rounded-my ma-auto"
                  height="50" width="50"
                >
                  <v-img src="/jp.png" height="50" width="50"></v-img> </v-card
                >

              </v-col>
              <v-col cols="1"></v-col>
            </v-row>
            <v-row>
              <v-col :key="1" cols="6"
                ><v-card
                  color="orange"
                  @click="orderTypeChange('OUT')"
                  elevation="5"
                  class="rounded-my"


                >
                <v-img v-if="lang === 'ru'" src="/ta-ru.png"></v-img>
                <v-img v-if="lang === 'cn'" src="/ta-cn.png"></v-img>
                <v-img v-if="lang === 'kr'" src="/ta-kr.png"></v-img>
                <v-img v-if="lang === 'jp'" src="/ta-jp.png"></v-img>
                <v-img v-if="lang === 'gb'" src="/ta-gb.png"></v-img></v-card
              ></v-col>
              <v-col :key="2" cols="6"
                ><v-card
                  color="orange"
                  @click="orderTypeChange('IN')"
                  elevation="5"
                  class="rounded-my"
                >
                <v-img v-if="lang === 'ru'" src="/in-ru.png"></v-img>
                <v-img v-else-if="lang === 'cn'" src="/in-cn.png"></v-img>
                <v-img v-else-if="lang === 'kr'" src="/in-kr.png"></v-img>
                <v-img v-else-if="lang === 'jp'" src="/in-jp.png"></v-img>
                <v-img v-else-if="lang === 'gb'" src="/in-gb.png"></v-img></v-card
              ></v-col>
            </v-row>
            <v-row>
              <v-col cols="8">
              </v-col>
              <v-col cols="4">
                {{this.$store.state.auth.uid || "Kiosk"}}
              </v-col>
            </v-row>
          </v-container>
        </v-overlay>
      </v-card>
      <v-card v-if="false" v-bind="localAttrs" :padless="true" elevation="0">
        <v-card
          class="ma-0 overflow-auto"
          color="black"
          elevation="0"
          width="100%"
          rounded="0"
        >
          <v-container fluid>
            <v-card
              elevation="0"
              width="100%"
              class="black text-center d-flex align-center justify-space-around mb-6"
            >
              <v-card
                color="orange"
                width="40%"
                @click="orderTypeChange('OUT')"
                elevation="5"
              >
                <v-img v-if="lang === 'ru'" src="/ta-ru.png"></v-img>
                <v-img v-if="lang === 'cn'" src="/ta-cn.png"></v-img>
                <v-img v-if="lang === 'kr'" src="/ta-kr.png"></v-img>
                <v-img v-if="lang === 'jp'" src="/ta-jp.png"></v-img>
                <v-img v-if="lang === 'gb'" src="/ta-gb.png"></v-img>
              </v-card>

              <v-card
                color="orange"
                width="40%"
                @click="orderTypeChange('IN')"
                elevation="5"
              >
                <v-img v-if="lang === 'ru'" src="/in-ru.png"></v-img>
                <v-img v-else-if="lang === 'cn'" src="/in-cn.png"></v-img>
                <v-img v-else-if="lang === 'kr'" src="/in-kr.png"></v-img>
                <v-img v-else-if="lang === 'jp'" src="/in-jp.png"></v-img>
                <v-img v-else-if="lang === 'gb'" src="/in-gb.png"></v-img>
              </v-card>
            </v-card>
          </v-container>
        </v-card>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    activeStart: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Array,
      default: () => [],
    },
    orderType: {
      type: String,
      default: "IN",
    },
    lang: {
      type: String,
      default: "ru",
    },
  },
  data: () => ({
    localAttrs: {
      fixed: true,
    },
  }),
  computed: {},
  methods: {
    selectLang(lang){
      this.$emit("selectLang", lang);
    },
    startOpenClose() {
      this.$emit("startOpenClose");
    },
    orderTypeChange(type) {
      this.$emit("orderTypeChange", type);
      setTimeout(() => {
        this.startOpenClose();
      }, 250);
    },
  },
};
</script>
<style>
.position_bottom {
  position: relative;
  bottom: -35vh
}
.rounded-my {
  border-radius: 30px !important;
}
</style>
