<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              Later<span class="text-indigo-600">Board</span>
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ user?.email }}</span>
            <button
              @click="handleLogout"
              class="btn-secondary text-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>

    <div v-if="randomCard" class="bg-indigo-50 border-b border-indigo-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center space-x-3">
          <div class="text-indigo-600">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <div>
            <p class="text-sm text-indigo-800 font-medium">Idea of the Day</p>
            <p class="text-indigo-700">{{ randomCard.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="stack in stacks"
          :key="stack.id"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[320px]"
          @drop="onDrop($event, stack.id)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">{{ stack.name }}</h3>
            <span class="text-xs text-gray-400">{{ getStackCards(stack.id).length }} ideas</span>
          </div>

          <button
            @click="openAddCardModal(stack.id)"
            class="w-full border border-dashed border-gray-200 rounded-lg p-3 mb-4 text-gray-400 hover:border-primary-300 hover:text-primary-600 transition-colors duration-150 bg-gray-50"
          >
            + Add new idea
          </button>

          <div class="flex-1 space-y-3">
            <div
              v-for="card in getStackCards(stack.id)"
              :key="card.id"
              class="card bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md hover:bg-primary-50 transition-all duration-150 border border-gray-100"
              draggable="true"
              @dragstart="onDragStart($event, card)"
              @click="openCardModal(card)"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900 text-base">{{ card.title }}</h4>
                <span v-if="card.tag" class="text-xs bg-gray-100 px-2 py-1 rounded">
                  <span v-if="card.tag.includes('exciting')">🔥</span>
                  <span v-else-if="card.tag.includes('cool')">🧊</span>
                  {{ card.tag }}
                </span>
              </div>
              <p v-if="card.description" class="text-sm text-gray-500 line-clamp-2">
                {{ card.description }}
              </p>
            </div>
            <div v-if="getStackCards(stack.id).length === 0" class="text-gray-300 italic text-sm py-2 text-center">
              No ideas yet. Add one!
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddCardModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md mx-2 shadow-2xl border border-gray-100">
        <h3 class="text-xl font-bold mb-6 text-gray-900">Add New Idea</h3>
        <form @submit.prevent="addCard" class="space-y-6">
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="newCard.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="Enter idea title"
            />
          </div>
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="newCard.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="Optional description"
            ></textarea>
          </div>
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Tag</label>
            <input
              v-model="newCard.tag"
              type="text"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="e.g., exciting, cool, maybe"
            />
          </div>
          <div class="flex space-x-3 pt-2">
            <button type="submit" class="flex-1 btn-primary rounded-lg py-3 text-base font-bold">Add Idea</button>
            <button type="button" @click="closeAddCardModal" class="flex-1 btn-secondary rounded-lg py-3 text-base font-bold">Cancel</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showCardModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md mx-2 shadow-2xl border border-gray-100">
        <h3 class="text-xl font-bold mb-6 text-gray-900">Edit Idea</h3>
        <form @submit.prevent="updateCard" class="space-y-6">
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Title</label>
            <input
              v-model="editingCard.title"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="Enter idea title"
            />
          </div>
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="editingCard.description"
              rows="3"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="Optional description"
            ></textarea>
          </div>
          <div>
            <label class="block text-base font-medium text-gray-700 mb-2">Tag</label>
            <input
              v-model="editingCard.tag"
              type="text"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-primary-200 focus:border-primary-300 text-gray-900 bg-gray-50 placeholder-gray-400 transition text-base"
              placeholder="e.g., exciting, cool, maybe"
            />
          </div>
          <div class="flex space-x-3 pt-2">
            <button type="submit" class="flex-1 btn-primary rounded-lg py-3 text-base font-bold">Save Changes</button>
            <button type="button" @click="closeCardModal" class="flex-1 btn-secondary rounded-lg py-3 text-base font-bold">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useFirestore } from '../composables/useFirestore';
import { where, orderBy } from 'firebase/firestore';

const router = useRouter();
const { user, logout } = useAuth();
const { addDocument, updateDocument, deleteDocument, subscribeToCollection } = useFirestore();

const stacks = ref([]);
const cards = ref([]);
const randomCard = ref(null);
const showAddCardModal = ref(false);
const showCardModal = ref(false);
const selectedStackId = ref(null);
const editingCard = ref({});
const newCard = ref({
  title: '',
  description: '',
  tag: ''
});

const defaultStacks = [
  { name: 'Ideas I Like', id: 'ideas-i-like' },
  { name: 'Maybe Later', id: 'maybe-later' },
  { name: 'Someday...', id: 'someday' }
];

const getStackCards = (stackId) => {
  return cards.value.filter(card => card.stackId === stackId);
};

const initializeStacks = async () => {
  for (const stack of defaultStacks) {
    await addDocument('stacks', {
      ...stack,
      userId: user.value.uid
    });
  }
};

const handleLogout = async () => {
  await logout();
  router.push('/');
};

const openAddCardModal = (stackId) => {
  selectedStackId.value = stackId;
  showAddCardModal.value = true;
};

const closeAddCardModal = () => {
  showAddCardModal.value = false;
  selectedStackId.value = null;
  newCard.value = {
    title: '',
    description: '',
    tag: ''
  };
};

const addCard = async () => {
  if (!newCard.value.title.trim()) return;
  if (!selectedStackId.value || !user.value?.uid) {
    alert('Missing stack or user info.');
    return;
  }
  const result = await addDocument('cards', {
    ...newCard.value,
    stackId: selectedStackId.value,
    userId: user.value.uid
  });
  if (!result.success) {
    alert('Failed to save idea: ' + (result.error || 'Unknown error'));
    return;
  }
  closeAddCardModal();
};

const openCardModal = (card) => {
  editingCard.value = { ...card };
  showCardModal.value = true;
};

const closeCardModal = () => {
  showCardModal.value = false;
  editingCard.value = {};
};

const updateCard = async () => {
  if (!editingCard.value.title.trim()) return;
  await updateDocument('cards', editingCard.value.id, {
    title: editingCard.value.title,
    description: editingCard.value.description,
    tag: editingCard.value.tag
  });
  closeCardModal();
};

const deleteCard = async () => {
  if (confirm('Are you sure you want to delete this idea?')) {
    await deleteDocument('cards', editingCard.value.id);
    closeCardModal();
  }
};

const deleteCardDirect = async (cardId) => {
  if (confirm('Are you sure you want to delete this idea?')) {
    await deleteDocument('cards', cardId);
  }
};

const onDragStart = (event, card) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(card));
};

const onDrop = async (event, stackId) => {
  event.preventDefault();
  const cardData = JSON.parse(event.dataTransfer.getData('text/plain'));
  if (cardData.stackId !== stackId) {
    await updateDocument('cards', cardData.id, {
      stackId: stackId
    });
  }
};

const selectRandomCard = () => {
  if (cards.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * cards.value.length);
    randomCard.value = cards.value[randomIndex];
  }
};

let stacksInitialized = false;

const mergeDefaultStacks = (fetchedStacks) => {
  const stackIds = new Set(fetchedStacks.map(s => s.id));
  const merged = [...fetchedStacks];
  for (const def of defaultStacks) {
    if (!stackIds.has(def.id)) {
      merged.push({ ...def });
    }
  }
  return merged.sort((a, b) => a.name.localeCompare(b.name));
};

const subscribeUserCollections = () => {
  if (user.value && user.value.uid) {
    subscribeToCollection('stacks', [
      where('userId', '==', user.value.uid),
      orderBy('createdAt')
    ], async (data) => {
      const mergedStacks = mergeDefaultStacks(data);
      stacks.value = mergedStacks;
      if (data.length === 0 && !stacksInitialized) {
        stacksInitialized = true;
        await initializeStacks();
      }
    });
    subscribeToCollection('cards', [
      where('userId', '==', user.value.uid),
      orderBy('createdAt', 'desc')
    ], (data) => {
      cards.value = data;
      selectRandomCard();
    });
  }
};

onMounted(() => {
  subscribeUserCollections();
});

watch(
  () => user.value,
  (val) => {
    if (val && val.uid) {
      subscribeUserCollections();
    }
  }
);
</script>