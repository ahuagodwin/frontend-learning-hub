interface CourseItem {
  id?: string
  title?: string
  completed?: boolean
  current?: boolean
  isLoading?: boolean
  video?: string
  image?: string
  course?: string
  description?: string
  instructor?: string
  duration?: string
  progress?: number
  role?: string
  course_list?: Array<{ label: string }>
}

interface UserInfo {
  id: number
  name?: string
  email?: string
  username?: string
  lastLogin?: string
  enrolledCourses?: number[]
  role?: string
  status?: boolean
  progress?: Record<number, number>
}

interface UserLogin {
  id: string
  username?: string
  password?: string
  name?: string
  email?: string
  role?: string
  lastLogin?: string
  enrolledCourses?: number[]
  status?: boolean
  progress?: Record<string, number>
}

interface UserState {
  user: UserLogin | null
  error: string | null
  token: string | null
}
