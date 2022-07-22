<script setup>
import Cookies from "js-cookie";
import { computed, reactive } from "vue";
import api from "@/helpers/api";
import { useStore } from "vuex";

const store = useStore();

const loading = computed(() => {
  return store.state.loading;
});

const account = reactive(JSON.parse(Cookies.get("account")));

const updateAccount = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const res = await api.put(`/accounts/${account._id}`, { account });

    Cookies.remove("account");
    Cookies.set("account", JSON.stringify(res.data.account));

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: res.data.msg, type: "success" },
      { root: true }
    );

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: error.message, type: "error" },
      { root: true }
    );
  }
};

const logOut = () => {
  Cookies.remove("token");
  Cookies.remove("account");

  window.location.reload();
};

const deleteAccount = async () => {
  store.commit("setLoading", true, { root: true });
  try {
    const res = await api.delete(`/accounts/${account._id}`);

    Cookies.remove("account");
    Cookies.remove("token");

    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: res.data.msg, type: "success" },
      { root: true }
    );

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    store.commit("setLoading", false, { root: true });
    store.commit(
      "setToast",
      { show: true, msg: error.message, type: "error" },
      { root: true }
    );
  }
};
</script>

<template>
  <div
    class="account-page min-h-screen flex justify-center items-start bg-white"
  >
    <div
      class="account flex py-12 flex-col justify-center items-center w-[800px]"
    >
      <div class="account-img shadow-md w-44">
        <img
          class="w-full object-cover rounded"
          :src="`https://avatars.dicebear.com/api/initials/${account.fullname}.svg`"
          alt=""
        />
      </div>
      <div class="account-content space-y-6 w-[500px]">
        <div class="input-field w-full mt-6 flex flex-col items-start">
          <label for="fullname">Ism familiya</label>
          <input
            id="fullname"
            v-model="account.fullname"
            type="text"
            class="outline-none border rounded px-6 py-3 w-full"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="account.username"
            type="text"
            class="outline-none border rounded px-6 py-3 w-full"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <select
            v-model="account.gender"
            class="outline-none border rounded px-6 py-3 w-full"
          >
            <option :selected="account.gender === 'Erkak'" value="Erkak">
              Erkak
            </option>
            <option :selected="account.gender === 'Ayol'" value="Ayol">
              Ayol
            </option>
          </select>
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="age">Yosh</label>
          <input
            id="age"
            v-model="account.age"
            type="text"
            placeholder="Yoshingizni kiriting!"
            class="outline-none border w-full rounded px-6 py-3"
          />
        </div>
        <div class="input-field w-full flex flex-col items-start">
          <label for="city">Shahar</label>
          <input
            id="city"
            v-model="account.city"
            type="text"
            placeholder="Shahringizni kiriting!"
            class="outline-none border w-full rounded px-6 py-3"
          />
        </div>
      </div>
      <div
        class="account-buttons w-[500px] flex flex-row justify-between mt-6 items-center"
      >
        <div class="left">
          <button
            @click="updateAccount()"
            :disabled="loading"
            class="save-btn transition hover:bg-sky-600 px-4 py-2 rounded bg-sky-500 text-white disabled:bg-gray-50"
          >
            Saqlash
          </button>
        </div>
        <div class="right">
          <button
            @click="logOut()"
            :disabled="loading"
            class="logout-btn transition hover:bg-gray-500 px-4 py-2 rounded bg-gray-400 text-white mr-4 disabled:bg-gray-50"
          >
            Chiqish
          </button>
          <button
            @click="deleteAccount()"
            :disabled="loading"
            class="delete-btn transition hover:bg-red-500 px-4 py-2 rounded bg-red-400 text-white disabled:bg-gray-50"
          >
            O'chirish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
