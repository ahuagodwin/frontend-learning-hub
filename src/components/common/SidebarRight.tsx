// src/components/SidebarRight.tsx
import { defineComponent, type PropType } from 'vue'
import { Icon } from '@iconify/vue'
import { ProgressBar, UserInfo } from '../ui'

interface CoursesProps {
  courses: CourseItem[]
  selectedCourse?: CourseItem | null
}

const SidebarRight = defineComponent({
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
  setup(props: CoursesProps) {
    const completedCount = props.courses.filter((course) => course.completed).length
    const completedPercentage = Math.round(
      (props.courses.filter((course) => course.completed).length / props.courses.length) * 100
    )

    return () => (
      <div class="p-5 hidden lg:block w-[22rem] border-l border-l-gray-300">
        <div class="flex justify-start items-start flex-col">
          <span class="text-[20px] text-tertiary font-semibold">About the Course</span>
          {props.selectedCourse && <UserInfo description={props.selectedCourse.description} />}
        </div>

        <h3 class="font-semibold text-lg mb-4 text-tertiary">Course Completion</h3>

        <section class="mx-4 mb-4">
          <div class="flex justify-between items-center mt-2 text-gray-400 font-semibold">
            <span>{completedPercentage}% Completed</span>
            <span>
              {completedCount}/{props.courses.length}
            </span>
          </div>
          <ProgressBar completedPercentage={completedPercentage} />
        </section>

        {/* Course list */}

        <section class="h-[35rem] overflow-y-auto">
          {props.courses.length === 0 ? (
            <p>No courses available.</p>
          ) : (
            <ul>
              {props.courses.map((item) => (
                <li
                  key={item.id}
                  class={`flex justify-between items-center gap-4 p-4 ${props.selectedCourse?.id === item.id ? 'bg-secondary' : ''}`}
                >
                  <p
                    class={`flex justify-center items-center gap-4 ${item.completed ? 'text-gray-400 line-through' : ''}`}
                  >
                    <span>{item.id}</span>
                    <span>{item.title}</span>
                  </p>
                  {item.completed ? (
                    <Icon icon="bi-check" class="text-green-500 text-lg" />
                  ) : item.current ? (
                    <Icon
                      icon="bi-hourglass"
                      class="text-yellow-500 text-lg"
                      aria-label="In progress"
                    />
                  ) : (
                    <Icon icon="bi-x" class="text-black text-lg" aria-label="Not started" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    )
  }
})

export default SidebarRight
