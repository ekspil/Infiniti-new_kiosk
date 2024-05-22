<template>
  <v-navigation-drawer app color="purple lighten-5" floating clipped permanent stateless >
    <v-list dense v-model="selected" tile>
      <v-list-item-group>
        <v-list-item
          v-for="group in groups"
          :key="group.name"
          link
          class="pl-1 pr-1"
          @click="groupSelect(group.id)"
        >
          <v-list-item-avatar rounded class="mr-1 mb-3 mt-3">
            <v-img :alt="group.name"  :src="group.img ? 'https://infiniti-kiosk-files-ekspil.amvera.io/api/v1/files/download/1/' + group.img : '/burger.png'"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-h5 overflow-visible "><div>{{
              group.name.toUpperCase()
              }}</div></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    groups: {
      type: Array,
      default: () => {
        return [{ name: "Загрузка...", icon: "mdi-hamburger" }];
      },
    },
  },
  data: () => ({
    selected: null,
    value: null,
  }),
  methods: {
    groupSelect(groupId) {
      this.$emit("groupSelect", groupId);
    },
  },
};
</script>
<style>
.text-nav {
  font-family: "Oswald" !important;
  font-weight: bold !important;
}
</style>
