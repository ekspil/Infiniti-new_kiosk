<template>
  <v-card class="ma-auto" color="#26c6da" dark max-width="500">
    <v-card-title>
      <v-icon large left> mdi-account </v-icon>
      <span class="text-h6 font-weight-light">Авторизация</span>
    </v-card-title>

    <div class="text-h5 font-weight-bold">
      <v-text-field
        class="ma-5"
        label="Логин"
        :rules="rules"
        hide-details="auto"
        v-model="login"
      ></v-text-field>
      <v-text-field
        class="ma-5"
        label="Пароль"
        type="password"
        v-model="password"
      ></v-text-field>
      <v-btn :loading="loading" color="error" plain block @click="loginClick"
        >Войти</v-btn
      >
    </div>

    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  components: {},

  data: () => ({
    loading: false,
    login: null,
    password: null,
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 1) || "Min 3 characters",
    ],
  }),

  methods: {
    async loginClick() {
      this.loading = true;
      const formData = {
        name: this.login,
        key: this.password,
      };
      const ok = await this.$store.dispatch("auth/login", formData);
      console.log(ok)
      if (!ok) {
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      } else {
        this.loading = false;

        this.$router.push("/kiosk");
      }
    },
  },
};
</script>
