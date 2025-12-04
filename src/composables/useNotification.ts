import { ref } from 'vue'

export function useNotification() {
  const showNotification = ref(false)
  const notificationMessage = ref('')

  const show = (message: string) => {
    notificationMessage.value = message
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 2000)
  }

  return {
    showNotification,
    notificationMessage,
    show,
  }
}
