<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

function fetchData() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
    .then((response) => response.json())
    .then((data) => {
      word = data[0].word;
      phonetic = data[0].phonetic;
      partOfSpeech = data[0].meanings[0].partOfSpeech;
      definition = data[0].meanings[0].definitions[0].definition;
      example = data[0].meanings[0].definitions[0].example;
      console.log(word, phonetic, partOfSpeech, definition, example)

      document.querySelector("#audio").setAttribute("src", `${data[0].phonetics[0].audio}`)
    })
}

function playAudio() {
  document.querySelector("#audio").play();
}

let word = ref('')
let phonetic = ref('')
let partOfSpeech = ref('')
let definition = ref('')
let example = ref('')




</script>

<template>
  <div>
    <div class="flex flex-col mx-auto p-[20px] max-w-[689px]">
      <div class="flex justify-between items-center mb-10">
        <a href="#">
          <i class="fa-solid fa-book text-5xl text-bluish dark:text-greenish"></i>
        </a>
        <i @click="toggleDark()"
          class="fa-solid fa-moon text-3xl cursor-pointer text-white border-4 border-bluish rounded-full h-12 w-12 flex items-center justify-center bg-bluish hover:bg-white hover:text-bluish dark:border-greenish dark:text-bluish dark:bg-greenish dark:hover:bg-bluish dark:hover:text-greenish transition-all duration-300"></i>
      </div>
      <div class="relative">
        <input type="text" @keyup.enter="fetchData()" v-model="word"
          class="h-14 w-full text-xl pl-6 py-3 text-white font-medium rounded-full outline-none pr-12 bg-bluish focus:outline-4 focus:outline-greenish outline-offset-0 dark:outline-4 dark:outline-greenish dark:text-greenish"
          placeholder="Search for any word..." />
        <i @click="fetchData()"
          class="fas fa-search absolute right-3 top-2 p-2 text-xl text-white cursor-pointer dark:text-greenish"></i>
      </div>

      <div class="mt-8 text-bluish dark:text-greenish">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-4xl font-bold mb-2 md:text-6xl md:mb-3">{{ word }}</h3>
            <span class="font-semibold text-xl md:text-2xl">{{ phonetic }}</span>
          </div>
          <div @click="playAudio()"
            class="playButton bg-bluish text-white rounded-full w-20 h-20 flex items-center justify-center text-3xl hover:text-bluish hover:bg-white border-4 border-bluish cursor-pointer dark:bg-greenish dark:border-greenish dark:text-bluish dark:hover:bg-bluish dark:hover:text-greenish transition-all duration-300">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <div class="mt-4">
          <span class="block italic font-bold text-2xl mb-1 md:text-3xl">{{ partOfSpeech }}</span>
          <hr class="text-lightBluish dark:text-lightGreenish" />
          <span class="block text-xl mb-2 mt-4 md:text-2xl">Meaning</span>
          <div class="flex items-center gap-3">
            <div class="relative bottom-0.5 w-1.5 h-1.5 bg-bluish rounded-full dark:bg-greenish"></div>
            <p class="text-lg mb-2 md:text-xl">{{ definition }}</p>
          </div>
          <p class="text-lightBluish pl-3 md:text-xl dark:text-lightGreenish">
            {{ example || "" }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>