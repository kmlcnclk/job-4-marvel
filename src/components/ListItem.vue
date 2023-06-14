<template>
  <div class="list-item">
    <div class="favorites-icon">
      <FillFavoritesIcon @click="deleteFromFavorites" color="red" size="28" v-if="isFavorite" />
      <UnFillFavoritesIcon @click="addToFavorites" color="red" size="32" v-else />
    </div>

    <router-link :to="`/comics/` + item.id">
      <h2 class="title">
        {{ item.title }}
      </h2>
      <img
        :src="item.thumbnail.path + '.' + item.thumbnail.extension"
        :alt="item.title"
        class="list-item-img"
      />
    </router-link>

    <div :style="{ display: 'flex' }">
      <p :style="{ fontSize: '16px', textAlign: 'justify' }" class="description">
        <strong>Description: </strong> {{ item.description }}
      </p>
    </div>
    <div :style="{ display: 'flex', flexWrap: 'wrap' }" class="creator">
      <strong :style="{ fontSize: '16px', margin: '0', marginTop: '-2px', marginRight: '5px' }"
        >Creators:</strong
      >
      <p
        v-for="creator in item.creators.items"
        :key="creator.name"
        :style="{
          fontSize: '14px',
          margin: '0',
          marginRight: '5px',
          marginBottom: '5px',
          color: '#333',
          opacity: '0.75'
        }"
      >
        {{ creator.name }},
      </p>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import FillFavoritesIcon from './icons/FillFavoritesIcon.vue'
import UnFillFavoritesIcon from './icons/UnFillFavoritesIcon.vue'

export default {
  components: {
    RouterLink,
    FillFavoritesIcon,
    UnFillFavoritesIcon
  },
  props: {
    item: Object
  },
  computed: {},
  created() {
    const favorites = this.$store.state.favorites
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] == this.item.id) {
        this.isFavorite = true
      }
    }
  },
  methods: {
    addToFavorites() {
      this.$store.commit('addToFavorites', this.item.id)
      this.isFavorite = !this.isFavorite
    },
    deleteFromFavorites() {
      this.$store.commit('deleteFromFavorites', this.item.id)
      this.isFavorite = !this.isFavorite
    }
  },
  data() {
    return {
      isFavorite: false
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  position: relative;
  padding: 20px 30px;
  font-size: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.15s ease-in;
  }

  .list-item-img {
    width: 300px;
    height: auto;
    display: block;
    margin: 0 auto;
    object-fit: contain;
  }

  .favorites-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .description {
    max-height: 3.6em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .creator {
    max-height: 2em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  a {
    text-decoration: none !important;
    color: black;

    .title {
      font-size: 20px;
      margin: 20px 0px;
    }

    &:hover {
      text-decoration: none !important;
    }
  }

  @media screen and (max-width: 1440px) {
    .list-item-img {
      width: 250px;
      height: auto;
    }
  }

  @media screen and (max-width: 768px) {
    .list-item {
      padding: 15px;
      font-size: 24px;

      .list-item-img {
        width: 200px;
        height: auto;
      }

      .description,
      .creator {
        max-height: none;
      }

      a {
        .title {
          font-size: 18px;
          margin: 10px 0px;
        }
      }
    }
  }
  @media screen and (max-width: 425px) {
    .list-item-img {
      width: 200px;
      height: auto;
    }
  }
}
</style>
