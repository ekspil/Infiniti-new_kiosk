<template>
  <v-row justify="center">
    <v-dialog
      v-model="pay.activePay"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card  height="100vh" dark color="grey darken-4" class="text-center overflow-hidden transition-ease-in-out" :class="{
        'bg-img': !pay.alert && !pay.orderId,

      }"
      >
        <v-alert
          v-if="pay.alert"
          :value="pay.alert"
          color="red"
          dark
          class="ma-0"
          border="bottom"
          icon="mdi-alert"
          transition="scale-transition"
        >
          {{pay.alert}}
          </v-alert>

        <v-card-text class="pa-10" v-if="pay.alert">
          <h3>Произошла ошибка при оплате, обратитесь на кассу...</h3>
        </v-card-text>

        <div>{{input}}</div>
        <keyboard
          v-model="input"
          @custom="custom"
          @input="changed"
          :layouts="[
        '1234567890{delete:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}zxcvbnm|{space:space}{custom:custom}',
        '!@#$%^&*(){delete:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}ZXCVBNM|{space:space}{custom:custom}'
    ]"
          :maxlength="16"
        ></keyboard>

        <v-card-text class="pa-12" v-if="pay.orderId">
          <h3>Ваш заказ:</h3>
          <br>
          <h1>{{pay.orderId}}</h1>
          <br>
          <h3>Чеки теперь не печатаются</h3>
          <h3>Запомните или сфотографируйте номер заказа</h3>
        </v-card-text>

        <v-progress-linear
          v-if="!pay.alert"
          :active="true"
          :indeterminate="true"
          absolute
          bottom
          color="yellow darken-2"
        ></v-progress-linear>
<!--        <v-img-->
<!--          width="700"-->
<!--          height="850"-->
<!--          class="align-self-center"-->
<!--          src="/pay.jpg"-->
<!--        ></v-img>-->

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import keyboard from 'vue-keyboard';
export default {
  components: { keyboard },
  props: {
    pay: {
      type: Object,
      default: ()=>({}),
    },
  },
  data: () => ({
    alert: true,
    input: "",
  }),
  methods: {
    changed(value) {
      console.log('Value ' + value);
    },

    custom(keyboard) {
      console.log(keyboard.value);
    },
    payOpenClose() {
      this.$emit("payOpenClose");
    },
  },

};
</script>
<style>
.bg-img {
  background: url(/pay.jpg) center center no-repeat darkgrey;
  background-size: 1080px;
}
</style>
