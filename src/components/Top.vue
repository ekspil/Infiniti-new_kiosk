<template>
  <v-system-bar
    app
    color="purple lighten-5"
    flat
    dark
    clipped-left
    height="250"
    class="pa-0"
  >
    <v-carousel
      :show-arrows="false"
      :continuous="true"
      :cycle="true"
      hide-delimiters
      height="250"
      style="padding: 0"
    >
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-system-bar>
</template>

<script>
export default {
  name: "Top",

  data: () => ({
    items: [
      {
        src: "/kiosk_top.jpg",
      },
      {
        src: "/kiosk_top.jpg",
      },
      {
        src: "/kiosk_top.jpg",
      },
    ],
  }),
};
</script>
