<template>
  <div
    class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50"
  >
    <div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center mb-16 flex flex-col items-center justify-center">
        <div class="flex items-center justify-center mb-4 gap-2">
          <img
            src="/logo.png"
            alt="LaterBoard Logo"
            class="w-14 h-14 sm:w-16 sm:h-16 object-contain align-middle"
            style="margin-bottom: 0"
          />
          <h1
            class="text-4xl sm:text-6xl font-bold text-gray-900 mb-0 flex items-center"
            style="line-height: 1"
          >
            Later<span class="text-indigo-600">Board</span>
          </h1>
        </div>
        <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your ideas, gently stored for later.
        </p>
        <p class="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
          A calm space where you can offload non-urgent ideas, creative
          thoughts, future plans, or maybe-later projects into organized stacks.
        </p>

        <button
          @click="getStarted"
          class="btn-primary text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          Get Started
        </button>
      </div>

      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <div class="text-center p-6">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Capture Ideas
          </h3>
          <p class="text-gray-600">
            Quickly save those fleeting thoughts and creative sparks for later
            exploration.
          </p>
        </div>

        <div class="text-center p-6">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Organize Stacks
          </h3>
          <p class="text-gray-600">
            Group similar ideas into custom stacks that make sense for your
            thinking.
          </p>
        </div>

        <div class="text-center p-6">
          <div
            class="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">
            Gentle Reminders
          </h3>
          <p class="text-gray-600">
            Get inspired by a random idea from your collection each day.
          </p>
        </div>
      </div>

      <div class="text-center text-gray-500">
        <p>A minimal space for future-thinking minds.</p>
      </div>
    </div>
  </div>
  <footer class="py-8 text-center text-gray-500 text-sm">
    <p>
      Made with <span class="text-red-500">❤️</span> by
      <a
        href="https://github.com/leecheeyong"
        target="_blank"
        class="text-gray-700 hover:underline"
      >
        Chee Yong Lee
      </a>
    </p>
    <p class="mt-1">
      Project available as open source under the terms of
      <a
        href="https://github.com/leecheeyong/laterboard/blob/main/LICENSE"
        target="_blank"
        class="text-gray-700 hover:underline"
        >MIT License</a
      >
    </p>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { user } = useAuth();

const getStarted = () => {
  if (user.value) {
    router.push("/dashboard");
  } else {
    router.push("/login");
  }
};
</script>
