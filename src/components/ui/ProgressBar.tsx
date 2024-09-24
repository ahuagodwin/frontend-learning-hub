import { defineComponent } from 'vue'

interface ProgressBarProps {
  completedPercentage: number
}

const ProgressBar = defineComponent({
  props: {
    completedPercentage: {
      type: Number,
      required: true
    }
  },
  setup(props: ProgressBarProps) {
    return () => (
      <div class="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div class="h-full bg-blue-500" style={{ width: `${props.completedPercentage}%` }}></div>
      </div>
    )
  }
})

export default ProgressBar
