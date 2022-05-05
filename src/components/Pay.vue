<template>
  <v-row justify="center">
    <v-dialog
      v-model="pay.activePay"
      persistent
      width="700px"
    >
      <v-card height="800px"  color="grey lighten-5" class="text-center overflow-hidden transition-ease-in-out" :class="{
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

export default {
  props: {
    pay: {
      type: Object,
      default: ()=>({}),
    },
  },
  data: () => ({
    alert: true
  }),
  methods: {
    payOpenClose() {
      this.$emit("payOpenClose");
    },
  },

};
</script>
<style>
.bg-img {
  background: url(/pay.jpg) center center no-repeat darkgrey;
  background-size: 700px;
}
</style>
