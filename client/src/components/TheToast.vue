<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore();

const toastOptions = computed(() => {
  return store.state.toast;
});
</script>

<template>
  <div class="toast fixed top-3 left-0 w-full flex items-center justify-center">
    <div
      :class="[
        'toast-box bg-white shadow-md rounded-md border-2 py-2 px-4',
        toastOptions.type === 'error'
          ? 'border-red-600'
          : toastOptions.type === 'success'
          ? 'border-green-600'
          : 'border-sky-600',
      ]"
    >
      <p class="msg">{{ toastOptions.msg }}</p>
    </div>
  </div>
</template>

<style scoped>
.toast {
  z-index: 99999999999999999999;
}
.toast-box {
  animation: fade-up 0.4s ease;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(-30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
