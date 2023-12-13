<template>
  <div class="flex flex-col h-screen items-center justify-center">
    <NuxtLink to="/">
      <button class="text-4xl">🏠</button>
    </NuxtLink>
    <form class="mt-10 flex flex-col gap-5" v-if="!created">
      <div class="title flex gap-10 items-center">
        <p class="min-w-[150px]">Title:</p>
        <input
          v-model="newProduct.title"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="description flex gap-10 items-center">
        <p class="min-w-[150px]">description:</p>
        <input
          v-model="newProduct.description"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="price flex gap-10 items-center">
        <p class="min-w-[150px]">price:</p>
        <input
          v-model="newProduct.price"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="discountPercentage flex gap-10 items-center">
        <p class="min-w-[150px]">discountPercentage:</p>
        <input
          v-model="newProduct.discountPercentage"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="rating flex gap-10 items-center">
        <p class="min-w-[150px]">rating:</p>
        <input
          v-model="newProduct.rating"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="stock flex gap-10 items-center">
        <p class="min-w-[150px]">stock:</p>
        <input
          v-model="newProduct.stock"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="brand flex gap-10 items-center">
        <p class="min-w-[150px]">brand:</p>
        <input
          v-model="newProduct.brand"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="category flex gap-10 items-center">
        <p class="min-w-[150px]">category:</p>
        <input
          v-model="newProduct.category"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>
      <div class="thumbnail flex gap-10 items-center">
        <p class="min-w-[150px]">thumbnail:</p>
        <input
          v-model="newProduct.thumbnail"
          placeholder="image link"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>

      <div class="thumbnail flex gap-10 items-center">
        <p class="min-w-[150px]">images:</p>
        <input
          v-model="newProduct.images"
          placeholder="use , to seperate links"
          class="outline-none p-2 text-black"
          type="text"
        />
      </div>

      <button
        class="bg-emerald-400 p-2 px-4 text-black"
        type="submit"
        @click.prevent="submit"
      >
        CREATE
      </button>
    </form>
    <p class="text-center text-4xl text-emerald-600 mt-10 uppercase">
      New product successfully created
    </p>
  </div>
</template>

<script>
import { toRaw } from 'vue';
export default {
  data() {
    return {
      created: false,
      newProduct: {
        title: '',
        description: '',
        price: null,
        discountPercentage: null,
        rating: null,
        stock: null,
        brand: '',
        category: '',
        thumbnail: '',
        images: '',
      },
    };
  },
  methods: {
    submit() {
      fetch(`http://localhost:5000/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toRaw(this.newProduct)),
      })
        .then((res) => res.json())
        .then((data) => (this.created = true))
        .catch((err) => console.log(err));
    },
  },
};
</script>
