import { Images } from '@/constants/Images'
import { useUserStore } from '@/stores/user'
import { defineComponent, onMounted, type PropType } from 'vue'

interface UserInfoProps {
  description: string | undefined
}

const UserInfo = defineComponent({
  props: {
    description: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup(props: UserInfoProps) {
    const userStore = useUserStore()

    onMounted(async () => {
      if (userStore.isAuthenticated() && userStore.user?.id) {
        if (!userStore.user.name || !userStore.user.role) {
          await userStore.fetchUserDetailsById(userStore.user.id)
        }
      }
    })

    return () => (
      <div class="flex justify-start items-start flex-col gap-3 my-8 border-b border-b-gray-200 pb-8 w-full">
        <div class="flex justify-start items-center gap-3">
          <section class="w-16 h-16 rounded-[50%] border border-primary">
            <img src={Images.Logo} class="rounded-[50%] w-full h-full" />
          </section>
          <section class="flex justify-start items-start flex-col">
            <span class="text-[20px] text-tertiary font-semibold">{userStore?.user?.name}</span>
            <span class="text-gray-400">{userStore?.user?.role || 'Frontend Developer'}</span>
          </section>
        </div>

        <span>{props.description}</span>
      </div>
    )
  }
})

export default UserInfo
