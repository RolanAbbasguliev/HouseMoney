<template>
  <div
    class="card flex gap-10 hover:bg-emerald-900 p-10 cursor-pointer transition ease-in-out delay-10"
  >
    <!-- <img class="card__img" :src="product.thumbnail" :alt="product.thumbnail" /> -->
    <carousel
      @click.prevent=""
      :slides="product.images"
      :interval="3000"
      controls
    ></carousel>

    <div class="card__info flex flex-col justify-between">
      <div class="card__info-title">Title: {{ product.title }}</div>
      <div class="card__info-description">
        Description: {{ product.description }}
      </div>
      <div class="card__info-price">Price: {{ product.price }}</div>
      <div class="card__info-discount">
        Discount: {{ product.discountPercentage }}
      </div>
      <div class="card__info-rating">Rating: {{ product.rating }}</div>
      <div class="card__info-stock">Stock: {{ product.stock }}</div>
      <div class="card__info-brand">Brand: {{ product.brand }}</div>
      <div class="card__info-category">Category: {{ product.category }}</div>
    </div>
  </div>
</template>

<script>
import carousel from '~/components/Carousel/Carousel.vue';
export default {
  components: [carousel],

  props: {
    product: {},
  },
};
</script>
