<template>
  <div class="login flex justify-center items-center min-h-screen text-center">
    <form @submit="(e) => login(e)" class="login-box">
      <h1 class="text-sky-500 text-2xl font-bold mb-4">Login</h1>
      <div
        class="box shadow bg-white w-80 border-2 space-y-4 flex flex-col p-5"
      >
        <input
          v-model="user.username"
          type="text"
          class="input-field border outline-none px-3 py-2"
          placeholder="Username"
        />
        <input
          v-model="user.password"
          type="password"
          class="input-field input-field border outline-none px-3 py-2"
          placeholder="Password"
        />
        <button
          :disabled="loading"
          class="button bg-sky-500 transition border border-sky-500 text-white rounded p-2 px-4 hover:bg-sky-600 hover:border-sky-600 disabled:bg-gray-200 disabled:cursor-default disabled:border-none"
          type="submit"
        >
          Kirish
        </button>
      </div>
      <p class="text-sm font-semibold mt-4">
        Hali ro'yxatdan o'tmaganmisiz?
        <router-link to="/register" class="text-sky-500 underline"
          >Ro'yxatdan o'tish</router-link
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive, computed } from "vue";

const store = useStore();

const user = reactive({
  username: "",
  password: "",
});

const loading = computed(() => {
  return store.state.loading;
});

const login = async (e) => {
  e.preventDefault();
  if (!user.username || !user.password) {
    alert("Hamma qatorlarni to'ldiring");
  } else {
    store.dispatch("auth/login", user);
  }
};
</script>

<style></style>
