import { Layout } from '@/components'
import { useCourseStore } from '@/stores/courses'
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const Courses = defineComponent({
  setup() {
    const courseStore = useCourseStore()
    const router = useRouter()

    onMounted(async () => {
      await courseStore.fetchCourses()
    })

    const goToCourseManagement = (courseId: string | undefined) => {
      router.push({
        name: 'courses-management',
        params: { id: courseId }
      })
    }

    return () => (
      <Layout courses={courseStore.courses} selectedCourse={null}>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-10">
          {courseStore.isLoading ? (
            <div>Loading courses...</div>
          ) : courseStore.error ? (
            <div>Error: {courseStore.error}</div>
          ) : (
            courseStore.courses.map((course) => (
              <div
                key={course.id}
                onClick={() => goToCourseManagement(course.id)}
                class="cursor-pointer"
              >
                <div class="w-full h-40">
                  <img
                    src={
                      course.image ||
                      'https://images.pexels.com/photos/5537937/pexels-photo-5537937.jpeg?auto=compress&cs=tinysrgb&w=1200'
                    }
                    class="w-full h-full"
                  />
                </div>
                <div class="flex justify-start items-start flex-col">
                  <span class="text-tertiary text-[14px] font-semibold">
                    {course.title?.slice(0, 40) || 'Course Title'}
                  </span>
                  <span class="text-gray-400 text-[12px]">
                    {course.instructor?.slice(0, 20) || 'Instructor Name'},{' '}
                    {course.role?.slice(0, 20)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Layout>
    )
  }
})

export default Courses
