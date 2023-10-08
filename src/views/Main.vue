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
  <v-container v-if="startTime && elapsedTime" class="container d-flex fill-height flex-column justify-center align-stretch">
    <div class="d-flex flex-column statistics">
      <h3 class="text-h4">я не парю уже</h3>
      <h1 class="text-h4">{{elapsedTime.days}}<span class="text-h6"> дней</span></h1>
      <h1 class="text-h4">
        {{elapsedTime.hours}}<span class="text-h6"> часа</span>
        {{elapsedTime.minutes}}<span class="text-h6"> минут</span>
        {{elapsedTime.seconds}}<span class="text-h6"> секунды</span>
      </h1>
      <h3 class="text-h5">сэкономлено <br/><span class="text-h4">20 BYN</span></h3>
      <h3 class="text-h5">ваша жизнь стала дольше на <br/><span class="text-h4">20 МИНУТ</span></h3>
    </div>
    <div class="controls d-flex flex-column">
      <v-btn variant="tonal" size="x-large" prepend-icon="mdi-cog">настройки</v-btn>
      <v-btn
        variant="tonal"
        size="x-large"
        color="error"
        prepend-icon="mdi-smoke"
        @click="onGiveUp"
        :disabled="isGiveUpButtonDisabled"
      >
        я попарил
        <span class="timer" v-if="giveUpButtonDisabledTime">{{getExpirationTime(giveUpButtonDisabledTime)}}</span>
      </v-btn>
      <v-btn
        variant="tonal"
        size="x-large"
        color="warning"
        prepend-icon="mdi-battery-alert-variant-outline"
        @click="onDesired"
        :disabled="isDesireButtonDisabled"
      >
        хочу парить
        <span class="timer" v-if="desireButtonDisabledTime">{{getExpirationTime(desireButtonDisabledTime)}}</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import {defineComponent, onBeforeMount, onBeforeUnmount, ref} from "vue";
import recomendations from "@/recomendations";
import {getElapsedTime, getExpirationTime} from "../../utils/time";

export default defineComponent({
  setup() {
    const isWarningModalOpen = ref(false);
    const currentRecommendation = ref<any>({});
    const startTime = ref<number>((new Date()).getTime());
    const elapsedTime = ref<null | any>({});
    const isDesireButtonDisabled = ref(false);
    const isGiveUpButtonDisabled = ref(false);
    const desireButtonDisabledTime = ref<null | number>(null);
    const giveUpButtonDisabledTime = ref<null | number>(null);

    let updateElapsedTimeInterval: NodeJS.Timeout;
    let disableDesireButtonInterval: NodeJS.Timeout;
    let disableGiveUpButtonInterval: NodeJS.Timeout;
    let disableDesireButtonTimeot: NodeJS.Timeout;

    onBeforeMount(() => {
      const savedStartTime = parseInt(localStorage.getItem('startTime'));
      savedStartTime ?
        startTime.value = savedStartTime : localStorage.setItem('startTime', startTime.value.toString());

      updateElapsedTimeInterval = setInterval(() => {
        elapsedTime.value = getElapsedTime(startTime.value);
      }, 1000);
    });
    onBeforeUnmount(() => {
      desireButtonDisabledTime.value = null;
      giveUpButtonDisabledTime.value = null;
      clearInterval(updateElapsedTimeInterval);
      clearInterval(disableDesireButtonInterval);
      clearInterval(disableGiveUpButtonInterval);
    });

    const onDesired = () => {
      let randomIndex = Math.floor(Math.random() * recomendations.length);
      currentRecommendation.value = recomendations[randomIndex];
      isWarningModalOpen.value = true;
      isDesireButtonDisabled.value = true;
      desireButtonDisabledTime.value = 300000;
      disableDesireButtonInterval = setInterval(() => {
        desireButtonDisabledTime.value = desireButtonDisabledTime.value - 1000;
      }, 1000);
      disableDesireButtonTimeot = setTimeout(() => {
        desireButtonDisabledTime.value = null;
        clearInterval(disableDesireButtonInterval);
        isDesireButtonDisabled.value = false;
      }, 300000);
    }

    const onGiveUp = () => {
      isDesireButtonDisabled.value = true;
      isGiveUpButtonDisabled.value = true;
      desireButtonDisabledTime.value = 300000;
      giveUpButtonDisabledTime.value = 300000;
      clearInterval(disableDesireButtonInterval);
      clearTimeout(disableDesireButtonTimeot);
      startTime.value = (new Date()).getTime();
      localStorage.setItem('startTime', startTime.value.toString());
      disableDesireButtonInterval = setInterval(() => {
        desireButtonDisabledTime.value = desireButtonDisabledTime.value - 1000;
      }, 1000);
      disableGiveUpButtonInterval = setInterval(() => {
        giveUpButtonDisabledTime.value = giveUpButtonDisabledTime.value - 1000;
      }, 1000);
      setTimeout(() => {
        desireButtonDisabledTime.value = null;
        giveUpButtonDisabledTime.value = null;
        clearInterval(disableDesireButtonInterval);
        clearInterval(disableGiveUpButtonInterval);
        isDesireButtonDisabled.value = false;
        isGiveUpButtonDisabled.value = false;
      }, 300000);
    }

    return {
      startTime,
      elapsedTime,
      isWarningModalOpen,
      currentRecommendation,
      onDesired,
      onGiveUp,
      isDesireButtonDisabled,
      isGiveUpButtonDisabled,
      desireButtonDisabledTime,
      giveUpButtonDisabledTime,
      getExpirationTime,
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
  .timer {
    position: absolute;
    right: 1rem;
  }
</style>
