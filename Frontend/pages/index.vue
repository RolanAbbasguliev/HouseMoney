<template>
  <div
    class="container flex flex-col mx-auto px-2.5 h-screen"
    v-if="products.length > 0"
  >
    <header class="header flex pt-10 gap-10 justify-center text-black">
      <select name="filter" class="filter p-2" v-model="filter">
        <option value="" selected disabled hidden>Search filter</option>
        <option value="title" selected>title</option>
        <option value="description">description</option>
        <option value="price">price</option>
        <option value="rating">rating</option>
        <option value="stock">stock</option>
        <option value="brand">brand</option>
        <option value="category">category</option>
      </select>
      <input
        type="text"
        class="search w-2/5 p-2 outline-none text-black"
        v-model="query"
        :placeholder="placehodler"
      />
      <NuxtLink to="createProduct">
        <button class="bg-emerald-400 p-2 px-4">CREATE PRODUCT</button>
      </NuxtLink>
    </header>
    <main class="main mx-auto flex flex-col items-center">
      <div class="products flex flex-col gap-10 max-w-screen-xl mt-10">
        <div
          class="product"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <NuxtLink :to="linkTo(product.id)">
            <card :product="product"></card>
          </NuxtLink>
        </div>
      </div>
      <div class="pagination my-10 flex gap-10">
        <button
          @click="updatePage(index)"
          class="pagination__btn text-xl border-solid bg-emerald-500 px-4 py-2"
          v-for="index in pagesNum"
          :key="index"
        >
          {{ index }}
        </button>
      </div>
    </main>
  </div>

  <loading v-else></loading>
</template>

<script>
import card from '~/components/Card/card.vue';
import loading from '~/components/Loading/loading.vue';

export default {
  components: [card, loading],
  data() {
    return {
      filter: 'title',
      pagesNum: 0,
      currentPage: 1,
      products: [],
      query: '',
    };
  },

  methods: {
    updatePage(page) {
      fetch(`http://46.229.215.146:5000/products/pagination/${page}`)
        .then((res) => res.json())
        .then((data) => {
          this.products = data;
        })
        .catch((err) => console.log(err));
    },
    linkTo(id) {
      return `/product/${id}`;
    },
  },

  computed: {
    filteredProducts: function () {
      return this.products.filter((product) => {
        return product[`${this.filter}`]
          .toString()
          .toLowerCase()
          .match(this.query.toLowerCase().toString());
      });
    },

    placehodler() {
      return `🔍 search by ${this.filter}`;
    },
  },

  mounted() {
    fetch('http://46.229.215.146:5000/products/total')
      .then((res) => res.json())
      .then((data) => (this.pagesNum = Math.ceil(data / 10)));

    fetch('http://46.229.215.146:5000/products/pagination/1')
      .then((res) => res.json())
      .then((data) => (this.products = data));
  },
};
</script>

<style>
body {
  color: white;
  background-color: #020617;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
