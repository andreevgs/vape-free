<template>
  <v-dialog
    v-model="isWarningModalOpen"
    max-width="500"
  >
    <v-card>
      <v-card-title class="d-flex flex-column align-center">
        <v-icon class="mt-2 mb-2" icon="mdi-alert" color="warning" size="x-large"></v-icon>
        <span style="color: rgb(var(--v-theme-warning))">Предупреждение</span>
      </v-card-title>
      <v-card-text>
        {{currentRecommendation.content}}
      </v-card-text>
      <v-card-actions class="card-actions flex-column align-stretch">
        <v-btn size="large" color="error" variant="tonal" @click="isWarningModalOpen = false">Ну и что?</v-btn>
        <v-btn size="large" color="success" variant="tonal" @click="isWarningModalOpen = false">Понял, воздержусь</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-container class="container d-flex fill-height flex-column justify-center align-stretch">
    <div class="d-flex flex-column statistics">
      <h3 class="text-h4">я не парю уже</h3>
      <h1 class="text-h4">10<span class="text-h6"> дней</span></h1>
      <h1 class="text-h4">
        23<span class="text-h6"> часа</span>
        56<span class="text-h6"> минут</span>
        32<span class="text-h6"> секунды</span>
      </h1>
      <h3 class="text-h5">сэкономлено <br/><span class="text-h4">20 BYN</span></h3>
      <h3 class="text-h5">ваша жизнь стала дольше на <br/><span class="text-h4">20 МИНУТ</span></h3>
    </div>
    <div class="controls d-flex flex-column">
      <v-btn variant="tonal" size="x-large" prepend-icon="mdi-cog">настройки</v-btn>
      <v-btn variant="tonal" size="x-large" color="error" prepend-icon="mdi-smoke">я попарил</v-btn>
      <v-btn
        variant="tonal"
        size="x-large"
        color="warning"
        prepend-icon="mdi-battery-alert-variant-outline"
        @click="onDesired"
      >хочу парить</v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import recomendations from "@/recomendations";

export default defineComponent({
  setup() {
    const isWarningModalOpen = ref(false);
    const currentRecommendation = ref<any>({});

    const onDesired = () => {
      let randomIndex = Math.floor(Math.random() * recomendations.length);
      currentRecommendation.value = recomendations[randomIndex];
      isWarningModalOpen.value = true;
    }

    return {
      isWarningModalOpen,
      currentRecommendation,
      onDesired,
    }
  }
});
</script>

<style>
  .container {
    max-width: 500px;
    row-gap: 5rem;
  }
  .statistics {
    row-gap: 2rem;
  }
  .controls {
    row-gap: 1rem;
  }
  .card-actions {
    row-gap: 0.5rem;
  }
  .card-actions * {
    margin-inline-start: 0 !important;
  }
</style>
