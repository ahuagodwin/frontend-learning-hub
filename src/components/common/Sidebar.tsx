// src/components/Sidebar.tsx
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'
import { Images } from '@/constants/Images'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { paths } from '@/constants/paths'

const Sidebar = defineComponent({
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const menuItems = [
      { id: 1, icon: 'mdi-home', path: paths.overview },
      { id: 2, icon: 'mdi-calendar', path: '#' },
      { id: 3, icon: 'mdi-account-group', path: '#' },
      { id: 4, icon: 'mdi-chart-bar', path: '#' }
    ]

    const handleLogout = () => {
      userStore.logout()
      router.push('/')
    }

    return () => (
      <aside class="w-20 min-h-screen bg-white border-r border-r-gray-300 flex justify-start items-center flex-col relative">
        <img src={Images.Logo} width={40} height={40} class="mt-5" />

        <div class="mt-5 w-full">
          {menuItems?.map((item) => (
            <div
              class={` px-3 py-4 text-center flex justify-center mb-4 text-gray-500 ${window.location.pathname.startsWith(item?.path) ? 'bg-secondary border-r-2 border-r-primary text-primary' : ''}`}
              key={item?.id}
            >
              <a href={item?.path} class="text-[24px] ">
                <Icon icon={item?.icon} />
              </a>
            </div>
          ))}
          <div class="flex justify-center items-center gap-4 mt-auto absolute bottom-20 right-10 left-10">
            <a
              href="#"
              class="text-[24px] text-red-500 cursor-pointer"
              onClick={() => handleLogout()}
            >
              <Icon icon="ic-outline-logout" />
            </a>
          </div>
        </div>
      </aside>
    )
  }
})

export default Sidebar
