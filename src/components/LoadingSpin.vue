<template>
  <div>
    <div class="spinner"></div>
  </div>
</template>

<style>
.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #ee171f;
  animation: spin 1s infinite linear;
  margin: 0 auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
