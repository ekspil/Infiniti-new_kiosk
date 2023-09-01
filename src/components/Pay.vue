<template>
  <v-row justify="center">
    <v-dialog
      v-model="pay.activePay"
      persistent
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card
        height="100vh"
        dark
        color="grey darken-4"
        class="text-center overflow-hidden transition-ease-in-out"
        :class="{
          'bg-img': !pay.alert && !pay.orderId && !sbp,
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
          {{ pay.alert }}
        </v-alert>

        <v-card-text class="pa-10" v-if="pay.alert">
          <h3>Произошла ошибка при отправке заказа!</h3>
          <h1>Выше описание ошибки для технического сотрудника!</h1>
        </v-card-text>
        <div v-if="false">
          <div>{{ input }}</div>
          <keyboard
            v-model="input"
            @custom="custom"
            @input="changed"
            :layouts="[
              '1234567890{delete:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}zxcvbnm|{space:space}{custom:custom}',
              '!@#$%^&*(){delete:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}ZXCVBNM|{space:space}{custom:custom}',
            ]"
            :maxlength="16"
          ></keyboard>
        </div>
        <v-card
          v-if="!sbp && pay.orderId"
          class="grey lighten-3 ma-auto mt-16 position_card"
          max-width="800px"
          light
        >
          <v-img
            class="position_orderId"
            height="150px"
            width="150px"
            src="/logo_black.png"
          ></v-img>
          <v-card-text class="pa-12">
            <h1> Спасибо за заказ!</h1>
            <br/>
            <h3> Номер заказа:</h3>
            <br />
            <h1 class="order_style">{{  pay.iiko ? Number(String(pay.iikoId).slice(-3)) : Number(String(pay.orderId).slice(-4)) }}</h1>
            <br />
            <h1>Запомни или сфотографируй номер заказа</h1>
            <br />
            <h3>Чеки и номер заказа больше не печатаются</h3>
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="ma-auto mb-10"
            rounded
            outlined
            color="brown"
            x-large
              @click="clear"
            >
              Следующий заказ
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-if="sbp"
          class="grey lighten-3 ma-auto mt-16 position_card"
          max-width="800px"
          light
        >
          <v-img
            class="position_orderId"
            height="150px"
            width="150px"
            src="/logo_black.png"
          ></v-img>
          <v-card-text class="pa-3">
            <h3> Для оплаты через СБП воспользуйся своим банковским приложением и наведи камеру на QR код. Обычно требуется выбрать раздел "ПЛАТЕЖИ" и выбрать "Оплатить по QR коду"</h3>
            <h3> СБП - самый современный и безопасный способ оплаты. Давайте привыкать к хорошему :)</h3>
            <div class="text-center">

              <v-img
                class="position_qr"
                height="300px"
                width="300px"
                :src="sbp.imageBMP"
              ></v-img>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              class="ma-auto mb-10"
              rounded
              outlined
              color="red"
              x-large
              @click="clearPay"
            >
              Отмена оплаты
            </v-btn>
            <v-btn
              class="ma-auto mb-10"
              rounded
              outlined
              color="brown"
              x-large
              @click="payTerminal"
              :disabled="!!pay.terminalPayWait"
            >
              Оплата на терминале {{pay.terminalPayWait}}
            </v-btn>
          </v-card-actions>
        </v-card>

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
import keyboard from "vue-keyboard";
export default {
  components: { keyboard },
  props: {
    pay: {
      type: Object,
      default: () => ({}),
    },
    sbp: {
      type: Object,
      default: null,
    },
    payTerminal: {
      type: Function,
      default: ()=>{},
    },
  },
  data: () => ({
    alert: true,
    input: "",
  }),
  mounted(){

    this.interval = setInterval(()=>{
      if(!this.pay || !this.pay.terminalPayWait) return

      this.pay.terminalPayWait = this.pay.terminalPayWait - 1
      if(this.pay.terminalPayWait === 0) this.pay.terminalPayWait = ""

    }, 1000)
  },
  beforeDestroy() {
    if(this.interval){
      clearInterval(this.interval)
    }
  },
  methods: {
    clear(){
      this.$emit("clear");
    },
    clearPay(){
      this.$emit("clearSBP")
      this.pay.activePay = false
    },
    changed(value) {
      console.log("Value " + value);
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

.position_orderId {
  top: -75px;
  left: 325px;
}
.position_card {
  top: 20vh;
}
.position_qr {
  text-align: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
}
.order_style {
  font-family: "Oswald";
  font-size: 155px;
  line-height: 165px;
  color: red
}
</style>
