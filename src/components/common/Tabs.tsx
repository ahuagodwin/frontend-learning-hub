import { defineComponent, ref, type PropType } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface Tab {
  label: string
  content: JSX.Element
}

const Tabs = defineComponent({
  name: 'TabsComponent',
  props: {
    tabs: {
      type: Array as PropType<Tab[]>,
      required: true
    }
  },
  setup(props) {
    const activeTab = ref(props.tabs[0]?.label || '')

    const setActiveTab = (tabLabel: string) => {
      activeTab.value = tabLabel
    }

    return () => (
      <div class="mt-8">
        {/* Tabs List */}
        <ul class="flex border-b overflow-x-auto">
          {props.tabs.map((tab) => (
            <span key={tab.label} class="mr-6">
              <span
                class={[
                  'inline-block py-2 px-4 cursor-pointer',
                  activeTab.value === tab.label
                    ? 'text-primary font-semibold border-b-2 border-primary'
                    : 'text-gray-400'
                ]}
                onClick={() => setActiveTab(tab.label)}
              >
                {tab.label}
              </span>
            </span>
          ))}
        </ul>

        {/* Tab Content */}
        <div class="mt-6 w-full">
          {props.tabs.find((tab) => tab.label === activeTab.value)?.content}
        </div>
      </div>
    )
  }
})

export default Tabs
