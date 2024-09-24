import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

export const useCourseStore = defineStore('course', () => {
  const courses = ref<CourseItem[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Fetch courses from API
  const fetchCourses = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.get<CourseItem[]>('/api/courses')

      if (Array.isArray(response.data)) {
        courses.value = response.data
      } else {
        throw new Error('Unexpected data format: expected an array of courses')
      }
    } catch (err) {
      const axiosError = err as AxiosError
      error.value = axiosError.message || 'Failed to fetch courses'
    } finally {
      isLoading.value = false
    }
  }

  // Get a specific course by its ID
  const getCourseById = (id: string): CourseItem | null => {
    return courses.value.find((course) => course.id === id) || null
  }

  return {
    courses,
    fetchCourses,
    isLoading,
    error,
    getCourseById
  }
})
