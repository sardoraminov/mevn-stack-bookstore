<template>
  <div
    class="register flex justify-center items-center min-h-screen text-center"
  >
    <form @submit="(e) => register(e)" class="register-box">
      <h1 class="text-sky-500 text-2xl font-bold mb-4">Ro'yxatdan o'tish</h1>
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
          class="button bg-sky-500 transition border border-sky-500 text-white rounded p-2 px-4 hover:bg-sky-600 hover:border-sky-600"
          type="submit"
        >
          Jo'natish
        </button>
      </div>
      <p class="text-sm font-semibold mt-4">
        Allaqachon ro'yxatdan o'tmaganmisiz
        <router-link to="/login" class="text-sky-500 underline"
          >Kirish</router-link
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { reactive } from "vue";

const store = useStore();

const user = reactive({
  username: "",
  password: "",
});

const register = async (e) => {
  e.preventDefault();
  if (!user.username || !user.password) {
    alert("Hamma qatorlarni to'ldiring");
  } else {
    store.dispatch('auth/register', user)
  }
};
</script>

<style></style>
