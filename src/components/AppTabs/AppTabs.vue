<script setup>
import {computed, provide, ref, toRefs} from 'vue'
import AppRolesForm from '@/components/AppRolesForm/AppRolesForm.vue'
import AppMainInfoForm from '@/components/AppMainInfoForm/AppMainInfoForm.vue'
import AppLocationsForm from '@/components/AppLocationsForm/AppLocationsForm.vue'

const components = {
  AppMainInfoForm,
  AppLocationsForm,
  AppRolesForm
}

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  }
})
const { tabs } = toRefs(props)

const tabsData = ref({
  firstName: '',
  secondName: '',
  email: '',
  phone: '',
  position: '',
  company: 'Precoro',
  activeInAllComp: false,
  // ['Precoro', 'Google', 'Microsoft']
  mainLocation: ['Main Precoro US', 'Ukraine', 'USA'],
  locations: [
    'Berlin',
    'Poland Office',
    'Venice Office',
    'Mexico',
    'USA Office',
    'Ukraine Kiyv Lukivska 7 Main Office',
    'Canada'
  ]
})

provide('tabsData', tabsData)

const activeTab = ref(tabs.value[0].tabComponentName)

const changeActiveTab = (newActiveTabName) => {
  activeTab.value = newActiveTabName
}

const nextTab = () => {
  activeTab.value = Object.keys(components)[Object.keys(components).indexOf(activeTab.value) + 1]
}
const submitPopup = () => {}

const lastTabIsReached = computed(
  () => Object.keys(components).indexOf(activeTab.value) < Object.keys(components).length - 1
)

const actionBtnText = computed(() => {
  return lastTabIsReached.value ? 'Next Step' : 'Invite User'
})
</script>

<template>
  <div class="app-tabs">
    <ul class="app-tabs__nav">
      <li v-for="(tabNavItem, index) of tabs" :key="index" class="app-tabs__nav-item">
        <button class="app-tabs__nav-button" @click="changeActiveTab(tabNavItem.tabComponentName)">
          <span class="app-tabs__nav-button-index">
            {{ index + 1 }}
          </span>
          <span class="app-tabs__nav-button-name">
            {{ tabNavItem.tabName }}
          </span>
        </button>
      </li>
    </ul>
    <div class="app-tabs__tabs-content">
      <component :is="components[activeTab]" />
    </div>
    <div class="app-tabs__actions-block">
      <div class="app-tabs__toggle-switch" v-if="activeTab === 'AppMainInfoForm'">
        <input type="checkbox" name="check" id="check" v-model="tabsData.activeInAllComp"/>
        <span>Active in all companies</span>
        <img src="src/assets/info.svg" alt="info-button" />
      </div>
      <button
        :disabled="false"
        @click="lastTabIsReached ? nextTab() : submitPopup()"
        class="app-tabs__tab-submit-button"
      >
        {{ actionBtnText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-tabs {
  &__nav {
    display: flex;
    gap: 30px;
  }
  &__nav-button,
  &__nav-button-index,
  &__nav-button-name {
    display: inline-block;
  }
  &__nav-button {
    background: inherit;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__nav-button-index {
    background: rgba(65, 90, 218, 0.05);
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 50%;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    color: #5e6a75;
  }
  &__nav-button-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 144%;
    color: rgba(29, 36, 82, 0.5);
  }

  &__tab-submit-button {
    background: inherit;
  }
}
</style>
