<template>
  <v-overlay :absolute="true" :value="deleteBill.show" @click="clearDelete">
    <div @click.stop="">
      <v-card v-if="!deleteBill.find" class="coupon_card" width="400px" light>
        <v-img
          class="position_coupon"
          height="100px"
          width="100px"
          src="/logo_black.png"
        ></v-img>
        <v-card-title class="text-h5 text-uppercase pt-0">
          <v-spacer></v-spacer>Аннулирование чека <v-spacer></v-spacer
        ></v-card-title>
        <v-card-text class="text-h4 red--gray text-center">{{
          deleteBill.input || "Введите номер чека"
        }}</v-card-text>
        <keyboard
          class="pb-7"
          v-model="deleteBill.input"
          :layouts="['123|456|789|{←:backspace}0{OK:custom}']"
          :maxlength="16"
          @input="changed"
          @custom="custom"
        ></keyboard>
      </v-card>

      <v-card
        v-if="deleteBill.find && !deleteBill.process"
        class="coupon_card"
        width="300px"
        light
      >
        <v-img
          class="position_coupon"
          height="100px"
          width="100px"
          src="/logo_black.png"
        ></v-img>

        <v-container fluid>
          <v-row>
            <v-col cols="12">
              <v-card
                flat
                class="grey lighten-4 overflow-hidden"
                @click="run(deleteBill.find)"
              >
                <v-card-title class="pt-0 pb-0"
                  ><div class="ma-auto text-truncate">
                    {{
                      `Чек № ${deleteBill.find.id} на сумму: ${deleteBill.find.sum} р.`
                    }}
                  </div></v-card-title
                >
                <v-card-title class="pt-0 pb-0">
                  <div
                    v-for="item of deleteBill.find.items"
                    :key="item.id + item.name"
                    class="text-subtitle-1 ma-auto"
                  >
                    {{ `${item.count} x ${item.name}` }} р.
                  </div>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <v-card v-if="deleteBill.process">
        <v-container fill-height class="justify-center">
          <v-card>
            <h1 class="black orange--text">{{ deleteBill.process }}</h1>
          </v-card>
        </v-container>
      </v-card>
    </div>
  </v-overlay>
</template>

<script>
import keyboard from "vue-keyboard";
export default {
  components: { keyboard },
  props: {
    deleteBill: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {};
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

    async findBill() {
      this.$emit("updateTimer");
      const res = await this.$store.dispatch(
        "kassa/findOrderKassa",
        { number: this.deleteBill.input, kiosk: this.$store.state.auth.id }
      );
      if (!res || res.error) {
        this.deleteBill.input = "Чек не найден!";
        this.$emit("updateTimer");
        this.$forceUpdate();
        setTimeout(() => {
          this.deleteBill.input = "";
          this.$forceUpdate();
        }, 2000);
        return;
      }
      this.deleteBill.find = res
    },
    async run() {
      this.deleteBill.process = "Внимание на пинпад";
      this.$forceUpdate();
      this.$emit("updateTimer");
      try {
        let result
        if(!this.deleteBill.find.qrcId){

          result = await this.$store.dispatch("kassa/returnChekPayment", {
            items: this.deleteBill.find.items,
            type: this.deleteBill.find.type,
            kiosk: this.$store.state.auth.name,
            RRNCode: this.deleteBill.find.RRNCode,
            AuthorizationCode: this.deleteBill.find.AuthorizationCode,
            id: this.deleteBill.find.id
          });
        }else {
          this.deleteBill.process = "Ожидание ответа от сервера СБП";
          this.$forceUpdate();
          result = await this.$store.dispatch("data/returnSBPPayment", {
            items: this.deleteBill.find.items,
            type: this.deleteBill.find.type,
            kiosk: this.$store.state.auth.name,
            id: this.deleteBill.find.id,
            qrcId: this.deleteBill.find.qrcId
          });
        }

        if (result.ok === false) {
          this.deleteBill.process = result.result || result.message;
          this.$forceUpdate();
          setTimeout(() => {
            this.deleteBill.process = null;
          }, 5000);
        }
        if (result.ok === true) {
          this.deleteBill.process = "Успешно аннулировано!";
          this.$forceUpdate();
          setTimeout(() => {
            this.clearDelete();
          }, 5000);
        }
      } catch (e) {
        this.deleteBill.process = "ОШИБКА: " + e.message;
        this.$forceUpdate();
        setTimeout(() => {
          this.clearDelete();
        }, 5000);
      }
    },
  },
};
</script>

<style scoped>
.position_coupon {
  line-height: 30px;
  top: -50px;
  left: 100px;
  z-index: 1500 !important;
}
.coupon_div {
  height: 400px;
}
.coupon_card {
  z-index: 500 !important;
}
</style>
