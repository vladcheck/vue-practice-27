<script setup lang="ts">
import PaletteGenerator from './components/PaletteGenerator.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Генератор цветовых палитр</h1>
      <p>Создавайте гармоничные цветовые схемы для ваших проектов</p>
    </header>

    <main class="main-content">
      <PaletteGenerator />
    </main>

    <footer class="app-footer">
      <p>Vue 3 Color Palette Generator • Практика 27</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.app-header {
  text-align: center;
  padding: 2rem;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.app-header h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.app-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  margin-top: auto;
}
</style>
