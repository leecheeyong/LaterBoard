<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-indigo-100 flex flex-col"
  >
    <header
      class="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-30"
    >
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex flex-col sm:flex-row justify-between items-center py-4 sm:py-6 gap-2 sm:gap-0">
          <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            <span
              class="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-100 text-primary-600 shadow-md"
            >
              <svg
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <h1 class="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Later<span class="text-indigo-600">Board</span>
            </h1>
          </div>
          <div class="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-2 sm:gap-4">
            <span class="text-sm sm:text-base text-gray-700 font-medium text-center sm:text-left">
              👋 Welcome, {{ user?.email }}
            </span>
            <button
              @click="handleLogout"
              class="btn-secondary text-sm sm:text-base rounded-lg shadow-md px-3 py-2 sm:px-4 sm:py-2 w-full sm:w-auto"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>

    <div
      v-if="randomCard"
      class="bg-gradient-to-r from-indigo-50 via-primary-50 to-accent-100 border-b border-indigo-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center gap-4">
          <div class="text-indigo-600">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <div>
            <p class="text-base text-indigo-800 font-semibold">
              Idea of the Day
            </p>
            <p class="text-xl text-indigo-700 font-bold">
              {{ randomCard.title }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <main class="flex-1">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="stack in stacks"
            :key="stack.id"
            class="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col min-h-[340px] transition-all duration-200 hover:scale-[1.02]"
            @drop="onDrop($event, stack.id)"
            @dragover.prevent
            @dragenter.prevent
          >
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-bold text-gray-900">{{ stack.name }}</h3>
              <span class="text-xs text-gray-400"
                >{{ getStackCards(stack.id).length }} ideas</span
              >
            </div>
            <button
              @click="openAddCardModal(stack.id)"
              class="w-full border border-dashed border-primary-200 rounded-lg p-4 mb-6 text-primary-500 hover:border-primary-400 hover:text-primary-700 transition-colors duration-150 bg-white/60 shadow-sm font-semibold"
            >
              + Add new idea
            </button>
            <div class="flex-1 space-y-4">
              <div
                v-for="card in getStackCards(stack.id)"
                :key="card.id"
                class="card bg-white/70 backdrop-blur-md rounded-xl p-5 cursor-pointer hover:shadow-lg hover:bg-primary-50/60 transition-all duration-150 border border-gray-100"
                draggable="true"
                @dragstart="onDragStart($event, card)"
                @click="openCardModal(card)"
              >
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold text-gray-900 text-lg">
                    {{ card.title }}
                  </h4>
                  <span
                    v-if="card.tag"
                    class="text-xs bg-gray-100 px-2 py-1 rounded"
                  >
                    <span v-if="card.tag.includes('exciting')">🔥</span>
                    <span v-else-if="card.tag.includes('cool')">🧊</span>
                    {{ card.tag }}
                  </span>
                </div>
                <p
                  v-if="card.description"
                  class="text-sm text-gray-500 line-clamp-2"
                >
                  {{ card.description }}
                </p>
              </div>
              <div
                v-if="getStackCards(stack.id).length === 0"
                class="text-gray-300 italic text-base py-4 text-center"
              >
                No ideas yet. Add one!
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showAddCardModal"
        class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        @click="closeAddCardModal"
      >
        <div
          class="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-10 w-full max-w-lg mx-1 sm:mx-4 shadow-2xl border-2 border-primary-200 overflow-y-auto max-h-[95vh]"
          @click.stop
        >
          <h3 class="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-8 text-primary-700 text-center">
            Add New Idea
          </h3>
          <form @submit.prevent="addCard" class="space-y-4 sm:space-y-8">
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Title</label>
              <input
                v-model="newCard.title"
                type="text"
                required
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="Enter idea title"
              />
            </div>
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                v-model="newCard.description"
                rows="3"
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="Optional description"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Tag</label>
              <input
                v-model="newCard.tag"
                type="text"
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="e.g., exciting, cool, maybe"
              />
            </div>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
              <button type="submit" class="w-full sm:flex-1 bg-gradient-to-r from-primary-400 to-primary-600 text-gray-900 rounded-xl py-2 sm:py-4 text-sm sm:text-lg font-bold shadow-lg hover:from-primary-500 hover:to-primary-700 transition">Add Idea</button>
              <button type="button" @click="closeAddCardModal" class="w-full sm:flex-1 btn-secondary rounded-xl py-2 sm:py-4 text-sm sm:text-lg font-bold">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <div
        v-if="showCardModal"
        class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        @click="closeCardModal"
      >
        <div
          class="bg-white/95 backdrop-blur-2xl rounded-3xl p-4 sm:p-10 w-full max-w-lg mx-1 sm:mx-4 shadow-2xl border-2 border-primary-200 overflow-y-auto max-h-[95vh]"
          @click.stop
        >
          <h3 class="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-8 text-primary-700 text-center">
            Edit Idea
          </h3>
          <form @submit.prevent="updateCard" class="space-y-4 sm:space-y-8">
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Title</label>
              <input
                v-model="editingCard.title"
                type="text"
                required
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="Enter idea title"
              />
            </div>
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                v-model="editingCard.description"
                rows="3"
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="Optional description"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm sm:text-lg font-semibold text-gray-700 mb-2">Tag</label>
              <input
                v-model="editingCard.tag"
                type="text"
                class="w-full px-3 sm:px-5 py-2 sm:py-4 border border-primary-200 rounded-xl focus:outline-none focus:ring-primary-300 focus:border-primary-400 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-sm sm:text-lg shadow-sm"
                placeholder="e.g., exciting, cool, maybe"
              />
            </div>
            <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-2">
              <button type="submit" class="w-full sm:flex-1 bg-gradient-to-r from-primary-400 to-primary-600 text-gray-900 rounded-xl py-2 sm:py-4 text-sm sm:text-lg font-bold shadow-lg hover:from-primary-500 hover:to-primary-700 transition">Save Changes</button>
              <button type="button" @click="deleteCard" class="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 sm:py-4 text-sm sm:text-lg font-bold shadow-lg transition">Delete</button>
              <button type="button" @click="closeCardModal" class="w-full sm:flex-1 btn-secondary rounded-xl py-2 sm:py-4 text-sm sm:text-lg font-bold">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useFirestore } from "../composables/useFirestore";
import { useAuth } from "../composables/useAuth";
import { where, orderBy } from "firebase/firestore";

const { user } = useAuth();
const { addDocument, updateDocument, deleteDocument, subscribeToCollection } =
  useFirestore();

const stacks = ref([]);
const cards = ref([]);
const showAddCardModal = ref(false);
const showCardModal = ref(false);
const editingCard = ref(null);
const newCard = ref({ title: "", description: "", tag: "" });
const randomCard = ref(null);
const selectedStackId = ref(null);

function getStackCards(stackId) {
  return cards.value.filter((card) => card.stackId === stackId);
}

function selectRandomCard() {
  if (cards.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * cards.value.length);
    randomCard.value = cards.value[randomIndex];
  } else {
    randomCard.value = null;
  }
}

watch(cards, () => {
  selectRandomCard();
});

function subscribeUserCollections() {
  if (user.value && user.value.uid) {
    subscribeToCollection(
      "stacks",
      [where("userId", "==", user.value.uid), orderBy("createdAt")],
      (data) => {
        stacks.value = data;
      },
    );
    subscribeToCollection(
      "cards",
      [where("userId", "==", user.value.uid), orderBy("createdAt", "desc")],
      (data) => {
        cards.value = data;
        selectRandomCard();
      },
    );
  }
}

onMounted(() => {
  subscribeUserCollections();
});

watch(
  () => user.value && user.value.uid,
  (val) => {
    if (val) {
      subscribeUserCollections();
    }
  },
);

async function addCard() {
  if (!newCard.value.title.trim()) return;
  const result = await addDocument("cards", {
    title: newCard.value.title,
    description: newCard.value.description,
    tag: newCard.value.tag,
    stackId: selectedStackId.value,
    userId: user.value.uid,
  });
  if (result.success) {
    closeAddCardModal();
  } else {
    alert("Failed to save idea: " + (result.error || "Unknown error"));
  }
}

function openAddCardModal(stackId) {
  selectedStackId.value = stackId;
  showAddCardModal.value = true;
}

function closeAddCardModal() {
  showAddCardModal.value = false;
  selectedStackId.value = null;
  newCard.value = { title: "", description: "", tag: "" };
}

function openCardModal(card) {
  editingCard.value = { ...card };
  showCardModal.value = true;
}

function closeCardModal() {
  showCardModal.value = false;
  editingCard.value = null;
}

async function updateCard() {
  if (!editingCard.value || !editingCard.value.title.trim()) return;
  const result = await updateDocument("cards", editingCard.value.id, {
    title: editingCard.value.title,
    description: editingCard.value.description,
    tag: editingCard.value.tag,
    stackId: editingCard.value.stackId,
  });
  if (result.success) {
    closeCardModal();
  } else {
    alert("Failed to update idea: " + (result.error || "Unknown error"));
  }
}

async function deleteCard() {
  if (!editingCard.value || !editingCard.value.id) return;
  if (confirm("Are you sure you want to delete this idea?")) {
    const result = await deleteDocument("cards", editingCard.value.id);
    if (result.success) {
      closeCardModal();
    } else {
      alert("Failed to delete idea: " + (result.error || "Unknown error"));
    }
  }
}
</script>
