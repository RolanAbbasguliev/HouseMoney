import type { Title } from '../../.nuxt/components'; import type loadingVue from
'../Loading/loading.vue';
<template>
  <form
    v-if="!deleted && !updated"
    class="container justify-center flex flex-col h-screen items-center w-100"
  >
    <NuxtLink to="/">
      <button class="mt-5 text-4xl p-5">🏠</button>
    </NuxtLink>
    <div class="card flex gap-20 justify-between p-10">
      <img
        class="card__img"
        :src="product.thumbnail"
        :alt="product.thumbnail"
      />
      <div class="card__info flex flex-col justify-between">
        <div class="card__info-title flex gap-5">
          Title:
          <input
            v-model="newProduct.title"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.title"
          />
        </div>
        <div class="card__info-description">
          Description:
          <input
            v-model="newProduct.description"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.description"
          />
        </div>
        <div class="card__info-price">
          Price:
          <input
            v-model="newProduct.price"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.price"
          />
        </div>
        <div class="card__info-discount">
          Discount:
          <input
            v-model="newProduct.discountPercentage"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.discountPercentage"
          />
        </div>
        <div class="card__info-rating">
          Rating:
          <input
            v-model="newProduct.rating"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.rating"
          />
        </div>
        <div class="card__info-stock">
          Stock:
          <input
            v-model="newProduct.stock"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.stock"
          />
        </div>
        <div class="card__info-brand">
          Brand:
          <input
            v-model="newProduct.brand"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.brand"
          />
        </div>
        <div class="card__info-category">
          Category:
          <input
            v-model="newProduct.category"
            type="text"
            class="title bg-transparent border-solid outline-none border-1"
            :placeholder="product.category"
          />
        </div>
      </div>
    </div>

    <div class="footer flex gap-20">
      <button
        class="mt-5 text-2xl p-5 bg-emerald-500"
        type="submit"
        @click.prevent="submit"
      >
        UPDATE
      </button>
      <button
        class="mt-5 text-2xl p-5 bg-rose-600"
        type="submit"
        @click.prevent="deleteProduct"
      >
        DELETE
      </button>
    </div>
  </form>
  <div
    class="flex items-center justify-center flex-col h-screen gap-20"
    v-if="deleted"
  >
    <NuxtLink to="/">
      <button class="mt-5 text-4xl p-5">🏠</button>
    </NuxtLink>
    <p class="text-center text-4xl text-emerald-600 uppercase">
      PRODUCT SUCCESSFULLY DELETED
    </p>
  </div>
  <div
    class="flex items-center justify-center flex-col h-screen gap-20"
    v-if="updated"
  >
    <NuxtLink to="/">
      <button class="mt-5 text-4xl p-5">🏠</button>
    </NuxtLink>
    <p class="text-center text-4xl text-emerald-600 uppercase">
      PRODUCT SUCCESSFULLY UPDATED
    </p>
  </div>
</template>

<script>
import { toRaw } from 'vue';
export default {
  props: {
    product: {},
  },

  data() {
    return {
      updated: false,
      deleted: false,
      id: this.$route.params.id,
      newProduct: {
        title: this.product.title,
        description: this.product.description,
        price: this.product.description,
        discountPercentage: this.product.discountPercentage,
        rating: this.product.rating,
        stock: this.product.stock,
        brand: this.product.brand,
        category: this.product.category,
      },
    };
  },

  methods: {
    submit() {
      fetch(`http://localhost:5000/products/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(toRaw(this.newProduct)),
      })
        .then((data) => (this.updated = true))
        .catch((err) => console.log(err));
      //   .catch((error) => console.log(error));

      e.preventDefault();
    },

    deleteProduct() {
      fetch(`http://localhost:5000/products/${this.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => (this.deleted = true))
        .catch((err) => console.log(err));
    },
  },
};
</script>
