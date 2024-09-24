import { useUserStore } from '@/stores/user'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

const Login = defineComponent({
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const username = ref('')
    const password = ref('')

    const handleSubmit = async (event: Event) => {
      event.preventDefault()
      const success = await userStore.login(username.value, password.value)

      if (success) {
        router.push('/dashboard/courses')
      }
    }

    return () => (
      <div class="flex justify-center items-center h-screen authBg">
        {/* Centering the login form */}
        <div class="w-full max-w-md bg-white p-10 rounded-lg shadow-lg">
          <h1 class="flex justify-center items-center text-[30px] font-bold pb-10">Login</h1>
          {userStore.error && (
            <p class="text-red-500 pb-2 flex justify-center items-center">{userStore.error}</p>
          )}
          <form class="flex justify-center items-center flex-col" onSubmit={handleSubmit}>
            <input
              v-model={username.value}
              type="text"
              placeholder="Username"
              aria-label="Username"
              class="p-3 rounded-lg mb-2"
            />
            <input
              v-model={password.value}
              type="password"
              placeholder="Password"
              aria-label="Password"
              class="p-3 rounded-lg"
            />
            <button
              type="submit"
              class="bg-primary w-full p-4 rounded-lg text-[20px] font-semibold text-white mt-10 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
})

export default Login
