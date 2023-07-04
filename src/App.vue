<script setup>
import { ref } from 'vue'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const audio = document.querySelector('#audio');

let word = ref('')
let full = ref([])

function fetchData() {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      full.value = data
      audio.setAttribute("src", `${data[0]?.phonetics[0]?.audio}`)
      if (!audio.getAttribute("src")) {
        audio.setAttribute("src", `${data[0]?.phonetics[1]?.audio}`)
      }
    })
    .catch((error) => {
      console.log('No Definitions Found')
    })
}

function playAudio() {
  document.querySelector("#audio").play();
}
</script>

<template>
  <div>
    <div class="flex flex-col mx-auto p-[20px] max-w-[689px]">
      <div class="flex justify-between items-center mb-10">
        <a href="/">
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
      <div v-if="full[0]?.word" class="mt-8 text-bluish dark:text-greenish">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-4xl font-bold mb-2 md:text-6xl md:mb-3">{{ full[0]?.word }}</h3>
            <span class="font-semibold text-xl md:text-2xl">{{ full[0]?.phonetic }}</span>
          </div>
          <div @click="playAudio()" v-if="audio.getAttribute('src')"
            class="playButton bg-bluish text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl hover:text-bluish hover:bg-white border-4 border-bluish cursor-pointer dark:bg-greenish dark:border-greenish dark:text-bluish dark:hover:bg-bluish dark:hover:text-greenish transition-all duration-300 md:w-20 md:h-20">
            <i class="fa-solid fa-play"></i>
          </div>
        </div>
        <div class="mt-4" v-for="item in full">
          <div class="flex gap-5 items-center md:gap-8">
            <span class="block italic font-bold text-2xl mb-1 md:text-3xl">{{ item?.meanings[0]?.partOfSpeech }}</span>
            <div class="relative top-0.5 h-[1px] w-full bg-[lightgray] dark:bg-lightGreenish"></div>
          </div>
          <span class="block text-xl mb-2 mt-4 md:text-2xl">Meaning</span>
          <div class="flex items-center gap-3">
            <div class="relative bottom-0.5 w-1.5 h-1.5 bg-bluish rounded-full dark:bg-greenish"></div>
            <p class="text-lg mb-2 md:text-xl">{{ item?.meanings[0]?.definitions[0]?.definition }}</p>
          </div>
          <p class="text-lightBluish pl-3 md:text-xl dark:text-lightGreenish">
            {{ item?.meanings[0]?.definitions[0]?.example || "" }}
          </p>
        </div>

        <div v-if="full[0]?.sourceUrls[0]" class="my-5">
          <div class="h-[1px] w-full bg-[lightgray] dark:bg-lightGreenish mb-5"></div>
          <p>
            Source: {{ full[0]?.sourceUrls[0] }}
          </p>
        </div>
      </div>
      <div v-if="!full[0]?.word" class="mt-8 text-bluish dark:text-greenish">
        <p class="text-bluish dark:text-greenish text-3xl text-center mt-4">No definitions found!</p>
      </div>
    </div>
  </div>
</template>