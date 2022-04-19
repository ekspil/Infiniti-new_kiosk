<template>
  <v-navigation-drawer app color="purple lighten-5" floating clipped permanent>
    <v-list dense v-model="selected" tile>
      <v-list-item-group>
        <v-list-item
          v-for="group in groups"
          :key="group.name"
          link
          @click="groupSelect(group.id)"
        >
          <v-list-item-avatar rounded>
            <v-img :alt="group.name"  :src="group.img ? 'http://localhost:3210/api/v1/files/download/1/' + group.img : '/burger.png'"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-h6 overflow-visible">{{
              group.name.toUpperCase()
            }}</v-list-item-title>
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
