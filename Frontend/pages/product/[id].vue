<template>
  <div class="container mx-auto flex flex-col">
    <cardView :product="product" v-if="product"></cardView>
  </div>
</template>

<script>
import cardView from '~/components/CardView/cardView.vue';

export default {
  data() {
    return {
      id: this.$route.params.id,
      product: {},
    };
  },

  mounted() {
    fetch(`http://46.229.215.146:5000/products/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.product = data));
  },
};
</script>

<style lang="scss" scoped></style>
