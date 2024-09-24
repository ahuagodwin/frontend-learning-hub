import { defineComponent, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { paths } from '@/constants/paths'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/stores/courses'

const Navbar = defineComponent({
  setup() {
    const courseStore = useCourseStore()
    const route = useRoute()
    const courseDetails = ref<CourseItem | null>(null)

    const courseId = route.params.id

    onMounted(async () => {
      await courseStore.fetchCourses()

      // Getting the courseId from the route params
      const id = courseId as string

      if (id) {
        const course = courseStore.getCourseById(id)
        console.log('Course Details by ID:', course)
        courseDetails.value = course
      }
    })

    return () => (
      <div>
        <nav class="text-gray-500 text-sm mb-6">
          {window.location.pathname === `/dashboard/courses/${courseId}` ? (
            <span class="font-medium text-tertiary">
              My Courses / {courseDetails?.value?.course} / {courseDetails?.value?.title}
            </span>
          ) : (
            <span class="font-medium text-tertiary">
              Learn the skills you need to take the next step
            </span>
          )}
        </nav>

        {/* Main Header */}
        <div class="flex items-start justify-between">
          {window.location.pathname === paths.overview ? (
            <a href={paths.overview} class="text-tertiary font-bold text-[30px]">
              Keep moving up
            </a>
          ) : (
            <div>
              <h1 class="text-3xl font-bold">{courseDetails?.value?.course}</h1>
              <p class="text-gray-600 mt-2">{courseDetails?.value?.instructor}</p>
            </div>
          )}
          <div class="flex justify-center items-center gap-2">
            <button class="p-4 bg-white rounded-full border border-secondary">
              <Icon icon="bi-share-fill" />
            </button>
            <button class="p-4 bg-white rounded-full border border-secondary">
              <Icon icon="subway-mark-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }
})

export default Navbar
