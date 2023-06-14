<template>
  <header class="header">
    <router-link to="/">
      <img src="/public/Marvel_Logo.png" alt="Marvel" />
    </router-link>
    <div :style="{ position: 'relative' }">
      <FillFavoritesIcon :size="getIconSize" color="rgb(245, 245, 245)" />
      <div class="badge">{{ count }}</div>
    </div>
  </header>
</template>

<script>
import FillFavoritesIcon from './icons/FillFavoritesIcon.vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    FillFavoritesIcon,
    RouterLink
  },
  computed: {
    count() {
      return this.$store.state.count
    },
    getIconSize() {
      if (window.innerWidth <= 480) {
        return 22
      } else if (window.innerWidth <= 768) {
        return 32
      } else {
        return 36
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ee171f;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

  img {
    width: 100px;
    height: 40px;
  }

  .badge {
    background-color: #333;
    right: 25px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-size: 11px;
    top: -2px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    position: absolute;
  }

  @media (max-width: 768px) {
    padding: 10px;
    img {
      width: 80px;
      height: 32px;
    }
    .badge {
      font-size: 9px;
      left: -7px;
      width: 8px;
      height: 8px;
    }
  }

  @media (max-width: 480px) {
    padding: 5px;
    img {
      width: 60px;
      height: 24px;
    }
    .badge {
      font-size: 7px;
      width: 6px;
      left: -7px;
      top: 0px;
      height: 6px;
    }
  }

  @media (max-width: 320px) {
    padding: 3px;
    img {
      width: 50px;
      height: 20px;
    }
    .badge {
      font-size: 7px;
      width: 4px;
      height: 4px;
    }
  }
}
</style>
