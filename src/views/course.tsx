import { Layout, SidebarRight, Tabs } from '@/components'
import { useCourseStore } from '@/stores/courses'
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const CourseManagement = defineComponent({
  setup() {
    const courseStore = useCourseStore()
    const route = useRoute()
    const courseDetails = ref<CourseItem | null>(null)

    onMounted(async () => {
      await courseStore.fetchCourses()

      // Getting the courseId from the route params
      const courseId = route.params.id as string

      if (courseId) {
        const course = courseStore.getCourseById(courseId)
        console.log('Course Details by ID:', course)
        courseDetails.value = course
      }
    })

    // Extracting YouTube Video ID
    const getYouTubeEmbedUrl = (url: string) => {
      const videoId = new URL(url).searchParams.get('v')
      return `https://www.youtube.com/embed/${videoId}`
    }

    const courses = computed(() => courseStore.courses)
    const selectedCourse = computed(() => courseDetails.value)

    const tabs = computed(() => [
      {
        label: 'Description',
        content: <div>{courseDetails.value?.description || 'No description available.'}</div>
      },
      { label: 'Reviews', content: <div>Here are the reviews for this course.</div> },
      { label: 'Discussion', content: <div>Join the discussion about this course here.</div> },
      { label: 'Resources', content: <div>Resources for this course can be found here.</div> },
      { label: 'Instructor', content: <div>Learn more about the instructor here.</div> }
    ])

    return () => (
      <Layout selectedCourse={selectedCourse.value} courses={courses.value}>
        <div class="mt-6">
          {/* Embed YouTube video via iframe */}
          <div class="w-full h-[25rem] bg-gray-200 rounded-md flex items-center justify-center">
            {courseDetails.value?.video ? (
              <iframe
                width="100%"
                height="100%"
                src={getYouTubeEmbedUrl(courseDetails.value?.video)}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            ) : (
              <div>No video available for this course.</div>
            )}
          </div>
        </div>

        <Tabs tabs={tabs.value} />
      </Layout>
    )
  }
})

export default CourseManagement
