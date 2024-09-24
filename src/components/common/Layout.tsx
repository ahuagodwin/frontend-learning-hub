// src/views/ProjectManagement.tsx
import { Navbar, SidebarLeft, SidebarRight } from '@/components'
import { paths } from '@/constants/paths'
import { defineComponent, ref, type PropType } from 'vue'

const Layout = defineComponent({
  props: {
    courses: {
      type: Array as PropType<CourseItem[]>,
      required: true
    },
    selectedCourse: {
      type: Object as PropType<CourseItem | null>,
      default: null
    }
  },
  setup(props, { slots }) {
    const content = ref(<div>OPS!! DATA IS REQUIRED</div>)

    return () => (
      <div class="flex h-screen">
        {/* Sidebar */}
        <SidebarLeft />

        {/* Main Content */}
        <div class="flex-1 p-8 overflow-y-auto">
          {/* Breadcrumb */}
          <Navbar />
          {slots.default ? slots.default() : content.value}
        </div>

        {window.location.pathname === paths.overview ? null : (
          <SidebarRight courses={props.courses} selectedCourse={props.selectedCourse} />
        )}
      </div>
    )
  }
})

export default Layout
