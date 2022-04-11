<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import {
  getSectionsForRosenkranzType,
  RosenkranzType,
  Section,
  SectionType,
} from './services/rosenkranz';

const currentSectionIndex = ref(0);

const selectedRosenkranzType = ref<RosenkranzType | null>(null);

const sections = computed<Section[] | null>(
  () => selectedRosenkranzType.value && getSectionsForRosenkranzType(selectedRosenkranzType.value)
);

const currentLines = computed(() => sections.value?.[currentSectionIndex.value].text);

const onClickPage = () => {
  if (!sections.value) {
    return;
  }

  if (currentSectionIndex.value === sections.value.length - 1) {
    resetRosenkranz();
    return;
  }
  currentSectionIndex.value++;
};

const translateX = computed(() => currentSectionIndex.value * 1.5);

const resetRosenkranz = () => {
  currentSectionIndex.value = 0;
  selectedRosenkranzType.value = null;
};

const rosenkranzTypeOptions = [
  {
    type: RosenkranzType.FREUDENREICHE_GEHEIMNISSE,
    text: 'Freudenreiche Geheimnisse',
  },
  {
    type: RosenkranzType.GLORREICHE_GEHEIMNISSE,
    text: 'Glorreiche Geheimnisse',
  },
  {
    type: RosenkranzType.LICHTREICHE_GEHEIMNISSE,
    text: 'Lichtreiche Geheimnisse',
  },
  {
    type: RosenkranzType.SCHMERZHAFTE_GEHEIMNISSE,
    text: 'Schmerzhafte Geheimnisse',
  },
];

const onKeyUp = (event: KeyboardEvent) => {
  console.log(event);
  if (event.code !== 'Space') return;
  onClickPage();
};

onMounted(() => {
  document.addEventListener('keyup', onKeyUp);
});

onUnmounted(() => {
  document.removeEventListener('keyup', onKeyUp);
});
</script>

<template>
  <div class="h-screen w-screen overflow-hidden">
    <transition name="fade" mode="out-in">
      <div
        v-if="!selectedRosenkranzType"
        class="grid h-full w-full gap-14 rounded-lg bg-[#f1faee] px-10 py-12 text-2xl text-[#f1faee] md:grid-cols-2"
      >
        <button
          class="select-none rounded-2xl bg-[#1d3557] text-[#f1faee]"
          v-for="option in rosenkranzTypeOptions"
          :key="option.type"
          @click="selectedRosenkranzType = option.type"
        >
          {{ option.text }}
        </button>
      </div>

      <div
        v-else
        class="text text-[calc(min(2vh, 3.3vw))] relative flex h-full w-full select-none items-center justify-center bg-[#f1faee] font-medium text-[#1d3557]"
        @click="onClickPage"
      >
        <div class="p-8">
          <transition name="fade" mode="out-in">
            <div class="" :key="currentSectionIndex">
              <p class="mt-[0.5vh]" v-for="line in currentLines">{{ line }}</p>
            </div>
          </transition>
        </div>

        <div
          class="absolute bottom-8 left-[calc(50%-0.75rem)] flex transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateX(-${translateX}rem)` }"
        >
          <div
            v-for="(section, index) in sections"
            :key="index"
            class="flex h-8 w-6 items-center justify-center transition-transform duration-300 ease-in-out"
            :class="{ '-translate-y-2': index === currentSectionIndex }"
          >
            <div v-if="section.type === SectionType.INTRO" class="text-center text-xs">-</div>
            <div v-else-if="section.type === SectionType.CREDO" class="text-center text-3xl">♱</div>
            <div
              v-else-if="section.type === SectionType.GLORIA_PATRI"
              class="text-center text-base"
            >
              -
            </div>
            <div
              v-else-if="section.type === SectionType.PATER_NOSTER"
              class="text-center text-base text-[#a8dadc]"
            >
              ●
            </div>
            <div
              v-else="section.type === SectionType.AVE_MARIA"
              class="text-center text-sm text-[#e63946]"
            >
              ●
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
