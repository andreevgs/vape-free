<template>
  <v-app>
    <v-main>
      <router-view />
      <v-bottom-navigation
        class="nav-bar"
        grow
      >
        <v-btn class="nav-button" to="/vape-free/progress">
          <v-icon>mdi-check-circle</v-icon>
          Прогресс
        </v-btn>
        <v-btn class="nav-button" to="/vape-free/statistics">
          <v-icon>mdi-chart-bar</v-icon>
          Статистика
        </v-btn>
        <v-btn class="nav-button" to="/vape-free/settings">
          <v-icon>mdi-cog</v-icon>
          Настройки
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
</script>
<style>
  .nav-bar {
    height: auto !important;
  }
  .nav-button {
    padding: 20px 0 20px 0 !important;
    padding-bottom: calc(20px + env(safe-area-inset-bottom));
    max-width: 100% !important;
  }
</style>
