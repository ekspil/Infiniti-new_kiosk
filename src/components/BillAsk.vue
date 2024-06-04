<template>
  <v-dialog v-if="pay && pay.billAsk !== undefined" v-model="pay.billAsk" persistent max-width="600">
    <v-card v-if="!pay.billDialog">
      <v-card-title class="text-h5"> <v-spacer></v-spacer>
        {{ getNameByLang(DoesSendBill) }} <v-spacer></v-spacer></v-card-title>
      <v-card-text
        >Мы заботимся об экологии и постепенно уходим от чеков на бумаге. На
        этом устройстве печать на бумаге больше не доступна. Хотите, чтобы мы
        отправили вам чек на электронную почту?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-1" text @click="pay.billDialog = true">
          {{getNameByLang(SendEmail) }}
        </v-btn>
        <v-btn color="green darken-1"  text @click="payOpenClose">
          {{getNameByLang(NotSendEmail) }}
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-card v-if="pay.billDialog">
      <v-card-title class="text-h5 text-uppercase un"> <v-spacer></v-spacer>Укажите свою почту <v-spacer></v-spacer></v-card-title>
      <v-card-text class="text-h4 orange--text text-center">{{ pay.email || "ваша@почта" }}</v-card-text>
      <keyboard
        v-model="pay.email"
        :layouts="[
          '1234567890{delete:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}zxcvbnm|@{space:space}.',
          '!@#$%^-_(){delete:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}ZXCVBNM|@{space:space}.',
        ]"
        :maxlength="16"
        @input="changed"
      ></keyboard>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange darken-1" text @click="payOpenClose('NOT_SEND')">
          Не надо отправлять
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text :disabled="!pay.email.includes('@')" @click="payOpenClose">
          Готово
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import keyboard from "vue-keyboard";
import { SendEmail, NotSendEmail, DoesSendBill } from "../utils/buttonNames";

export default {
  components: { keyboard },
  props: {
    getNameByLang: {
      type: Function
    },
    pay: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      input: "",
    };
  },
  computed: {
    DoesSendBill(){
      return DoesSendBill
    },
    SendEmail(){
      return SendEmail
    },
    NotSendEmail(){
      return NotSendEmail
    },
  },
  methods:{
    payOpenClose(command) {
      this.pay.billDialog = false
      if(command === "NOT_SEND") this.pay.email = ""
      this.$emit("billAskOpenClose");
      this.$emit("payOpenClose");
    },
    changed() {
      this.$emit("updateTimer");
    },
  }
};
</script>

<style scoped></style>
