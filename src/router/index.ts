import { createRouter, createWebHistory } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import HomePage from '../pages/HomePage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.isReady().then(() => {
  const productStore = useProductStore()
  const queryTerm = router.currentRoute.value.query.query as string

  if (queryTerm) {
    productStore.setSearchTerm(queryTerm)
  }
})

export default router
