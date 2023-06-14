<template>
  <div v-for="comic in comics" :key="comic.id">
    <div class="comic">
      <div class="comic-first-child">
        <div>
          <img
            :src="comic.thumbnail.path + '.' + comic.thumbnail.extension"
            :alt="comic.title"
            class="comic-img"
          />
        </div>
        <div class="comic-info">
          <h2 class="title">{{ comic.title }}</h2>

          <div :style="{ display: 'flex' }">
            <p :style="{ fontSize: '16px', textAlign: 'justify' }">
              <strong>Description: </strong> {{ comic.description }}
            </p>
          </div>
          <div :style="{ display: 'flex', flexWrap: 'wrap' }">
            <strong
              :style="{ fontSize: '16px', margin: '0', marginTop: '-2px', marginRight: '5px' }"
              >Creators:</strong
            >
            <p
              v-for="creator in comic.creators.items"
              :key="creator.name"
              :style="{
                fontSize: '14px',
                overflowWrap: 'break-all',
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
          <div :style="{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }">
            <strong :style="{ fontSize: '16px', marginTop: '-2px', marginRight: '5px' }"
              >Characters:</strong
            >
            <p
              v-for="character in comic.characters.items"
              :key="character.name"
              :style="{
                fontSize: '14px',
                overflowWrap: 'break-all',
                margin: '0',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#333',
                opacity: '0.75'
              }"
            >
              {{ character.name }},
            </p>
          </div>
          <div :style="{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }">
            <strong :style="{ fontSize: '16px', marginTop: '-2px', marginRight: '5px' }"
              >Price:</strong
            >
            <p
              v-for="price in comic.prices"
              :key="price"
              :style="{
                fontSize: '14px',
                overflowWrap: 'break-all',
                margin: '0',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#333',
                opacity: '0.75'
              }"
            >
              ${{ price.price }}
            </p>
          </div>

          <div :style="{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }">
            <strong :style="{ fontSize: '16px', marginTop: '-2px', marginRight: '5px' }"
              >Page Count:</strong
            >
            <p
              :style="{
                fontSize: '14px',
                overflowWrap: 'break-all',
                margin: '0',
                textAlign: 'justify',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#333',
                opacity: '0.75'
              }"
            >
              {{ comic.pageCount }},
            </p>
          </div>

          <div :style="{ display: 'flex', marginTop: '10px', flexWrap: 'wrap' }">
            <strong :style="{ fontSize: '16px', marginTop: '-2px', marginRight: '5px' }"
              >Series:</strong
            >
            <p
              :style="{
                fontSize: '14px',
                overflowWrap: 'break-all',
                margin: '0',
                textAlign: 'justify',

                marginRight: '5px',
                marginBottom: '5px',
                color: '#333',
                opacity: '0.75'
              }"
            >
              {{ comic.series.name }}
            </p>
          </div>

          <div
            :style="{
              textAlign: 'left',
              marginTop: '10px',
              display: 'flex',
              flexWrap: 'wrap'
            }"
          >
            <strong :style="{ fontSize: '16px', marginTop: '-2px', marginRight: '5px' }"
              >Stories:</strong
            >
            <p
              v-for="story in comic.stories.items"
              :key="story.name"
              :style="{
                fontSize: '14px',
                textAlign: 'justify',
                margin: '0',
                overflowWrap: 'break-all',
                marginRight: '5px',
                marginBottom: '5px',
                color: '#333',
                opacity: '0.75'
              }"
            >
              {{ story.name }},
            </p>
          </div>

          <div class="favorites-icon">
            <FillFavoritesIcon
              @click="deleteFromFavorites"
              color="red"
              size="28"
              v-if="isFavorite"
            />
            <UnFillFavoritesIcon @click="addToFavorites" color="red" size="32" v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import axios from 'axios'
import FillFavoritesIcon from '../components/icons/FillFavoritesIcon.vue'
import UnFillFavoritesIcon from '../components/icons/UnFillFavoritesIcon.vue'

const timestamp = new Date().getTime().toString()
const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY
const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY
const inputString = timestamp + privateKey + publicKey
const hash = md5(inputString)

const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&hash=${hash}&apikey=${publicKey}`

export default {
  components: {
    FillFavoritesIcon,
    UnFillFavoritesIcon
  },
  data() {
    return {
      comics: {},
      isFavorite: false,
      isUndefined: true
    }
  },
  mounted() {
    const favorites = this.$store.state.favorites
    for (let i = 0; i < favorites.length; i++) {
      if (favorites[i] == this.$route.params.id) {
        this.isFavorite = true
      }
    }
  },
  async created() {
    await this.getData()
  },
  methods: {
    async getData() {
      try {
        const newUrl = url + `&id=${this.$route.params.id}`
        const response = await axios.get(newUrl)
        this.comics = response.data.data.results
        console.log(this.comics)
      } catch (error) {
        console.error(error)
      }
    },
    addToFavorites() {
      this.$store.commit('addToFavorites', this.$route.params.id)
      this.isFavorite = !this.isFavorite
    },
    deleteFromFavorites() {
      this.$store.commit('deleteFromFavorites', this.$route.params.id)
      this.isFavorite = !this.isFavorite
    }
  }
}
</script>

<style lang="scss" scoped>
.comic {
  padding: 0px 200px;
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-size: 30px;
  border-radius: 10px;

  .comic-first-child {
    display: flex;
  }

  .title {
    font-size: 28px;
    margin-top: 0px;
  }

  .comic-img {
    width: 300px;
    height: auto;
    display: block;
    margin: 0 auto;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
      transition: transform 0.15s ease-in-out;
    }
  }
  .favorites-icon {
    margin-top: 10px;
    cursor: pointer;
  }

  .comic-info {
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 1024px) {
    padding: 0px 50px;

    .comic-first-child {
      display: block;
    }

    .comic-img {
      margin: auto;
      margin-bottom: 50px;
    }
    .comic-info {
      margin: 0px;
    }
  }
  @media (max-width: 768px) {
    padding: 0px 30px;

    .comic-img {
      width: 330px;
    }
    .title {
      font-size: 22px;
    }
  }

  @media screen and (max-width: 375px) {
    padding: 0px 10px;

    .comic-img {
      width: 290px;
    }
  }
}
</style>
