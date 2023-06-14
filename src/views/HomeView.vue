<template>
  <main>
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px'
      }"
    >
      <div class="list">
        <ListItem v-for="item in comics" :item="item" :key="item.id" />
      </div>
      <LoadingSpin v-if="isLoading" :style="{ marginTop: '13px' }" />
      <button v-else class="more-button" @click="more">More</button>
    </div>
  </main>
</template>

<script>
import md5 from 'md5'
import axios from 'axios'
import ListItem from '../components/ListItem.vue'
import LoadingSpin from '../components/LoadingSpin.vue'

const timestamp = new Date().getTime().toString()
const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY
const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY
const inputString = timestamp + privateKey + publicKey
const hash = md5(inputString)

const url = `https://gateway.marvel.com/v1/public/comics?ts=${timestamp}&hash=${hash}&apikey=${publicKey}`

export default {
  components: {
    ListItem,
    LoadingSpin
  },
  data() {
    return {
      comics: [],
      limit: 20,
      isLoading: false
    }
  },
  async created() {
    if (!this.comics[0]) this.isLoading = true
    await this.getData()
  },
  methods: {
    async more() {
      this.isLoading = true
      this.limit += 20
      await this.getData()
    },
    async getData() {
      try {
        const newUrl = url + `&limit=${this.limit}`
        const response = await axios.get(newUrl)
        this.comics = await response.data.data.results
        if (this.comics[0]) this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-gap: 30px;
  padding: 30px;
  a {
    color: black;
    text-decoration: none;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
    grid-gap: 20px;
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
    grid-gap: 20px;
    padding: 20px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
    grid-gap: 20px;
    padding: 20px;
  }
}

.more-button {
  width: fit-content;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ee171f;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.15s ease-in;
  }
}
</style>
