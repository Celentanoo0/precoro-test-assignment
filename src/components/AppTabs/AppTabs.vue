<script setup>
import { computed, provide, ref, toRefs } from 'vue'
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
  mainLocation: 'Main Precoro US',
  locations: [
    {
      name: 'Berlin',
      id: 'berlin',
      value: false
    },
    {
      name: 'Poland Office',
      id: 'poland_office',
      value: false
    },
    {
      name: 'Venice Office',
      id: 'venice_office',
      value: false
    },
    {
      name: 'Mexico',
      id: 'mexico',
      value: false
    },
    {
      name: 'USA Office',
      id: 'usa_office',
      value: false
    },
    {
      name: 'Ukraine Kiyv Lukivska 7 Main Office',
      id: 'ua_main_office',
      value: false
    },
    {
      name: 'Canada',
      id: 'canada',
      value: false
    }
  ],
  roles: {
    access: {
      warehouse_requests: {
        name: 'Warehouse requests',
        values: {
          view_only: false,
          create: false,
          approve: false
        }
      },
      purchase_requests: {
        name: 'Purchase requests',
        values: {
          view_only: false,
          create: false,
          approve: false
        }
      },
      request_for_proposals: {
        name: 'Request for proposals',
        values: {
          view_only: false,
          create: false,
          approve: false
        }
      },
      purchase_orders: {
        name: 'Purchase orders',
        values: {
          view_only: false,
          create: false,
          approve: false
        }
      },
      receipts: {
        name: 'Receipts',
        values: {
          view_only: false,
          create: false,
          approve: false
        }
      },
      invoices: {
        name: 'Invoices',
        values: {
          view_only: false,
          create: false,
          approve: false,
          pay: false
        }
      },
      expenses: {
        name: 'Expenses',
        values: {
          view_only: false,
          create: false,
          approve: false,
          pay: false
        }
      }
    },
    management: [
      {
        name: 'Configuration',
        id: 'configuration',
        value: false
      },
      {
        name: 'Suppliers and items',
        id: 'suppliers_and_items',
        value: false
      },
      {
        name: 'Budgets',
        id: 'budgets',
        value: false
      },
      {
        name: 'Warehouse manager',
        id: 'warehouse_manager',
        value: false
      },
      {
        name: 'Reports',
        id: 'reports',
        value: false
      },
      {
        name: 'Admin (Full access)',
        id: 'admin',
        value: false
      }
    ]
  }
})
const disableAll = ref(false)

provide('tabsData', tabsData)

const activeTab = ref(tabs.value[0].tabComponentName)

const changeActiveTab = (newActiveTabName) => {
  activeTab.value = newActiveTabName
}
const checkValidation = () => {}
const nextTab = () => {
  activeTab.value = Object.keys(components)[Object.keys(components).indexOf(activeTab.value) + 1]
}
const submitPopup = () => {
  checkValidation()
  disableAll.value = true
  const dataToSend = JSON.stringify(tabsData.value)
  console.log(dataToSend)
}

const lastTabIsReached = computed(
  () => Object.keys(components).indexOf(activeTab.value) < Object.keys(components).length - 1
)
const actionBtnText = computed(() => {
  return lastTabIsReached.value ? 'Next Step' : 'Invite User'
})
</script>

<template>
  <div class="app-tabs">
    <ul class="app-tabs__nav app-tabs__nav_margin-bottom">
      <li
        v-for="(tabNavItem, index) of tabs"
        :key="index"
        class="app-tabs__nav-item"
        :class="{ 'tab_active-main': tabNavItem.tabComponentName === activeTab }"
      >
        <button class="app-tabs__nav-button" @click="changeActiveTab(tabNavItem.tabComponentName)">
          <span
            class="app-tabs__nav-button-index"
            :class="{ tab_active: tabNavItem.tabComponentName === activeTab }"
          >
            {{ index + 1 }}
          </span>
          <span
            class="app-tabs__nav-button-name"
            :class="{ tab_active: tabNavItem.tabComponentName === activeTab }"
          >
            {{ tabNavItem.tabName }}
          </span>
        </button>
      </li>
    </ul>
    <div class="app-tabs__tabs-content app-tabs__tabs-content_margin">
      <component :is="components[activeTab]" :disable-all="disableAll" />
    </div>
    <div
      class="app-tabs__actions-block app-tabs__actions-block_margin"
      :class="{ 'app-tabs__actions-block-without-switch': activeTab !== 'AppMainInfoForm' }"
    >
      <div
        class="app-tabs__toggle-switch app-tabs__toggle-switch_margin"
        v-if="activeTab === 'AppMainInfoForm'"
      >
        <label for="check" class="app-tabs__toggle-switch-item">
          <input
            type="checkbox"
            name="check"
            id="check"
            class="input"
            v-model="tabsData.activeInAllComp"
            :disabled="disableAll"
          />
          <span class="switch"></span>
          <span>Active in all companies</span>
        </label>
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
    flex-direction: column;
    gap: 10px;
  }
  &__nav_margin-bottom {
    margin: 0 0 24px 0;
  }

  &__nav-button,
  &__nav-button-index,
  &__nav-button-name {
    display: inline-block;
  }

  &__nav-button {
    background: inherit;
    display: flex;
    gap: 5px;
    align-items: center;
    min-height: 100%;
    position: relative;
  }
  &__nav-button-index {
    background: rgba(65, 90, 218, 0.05);
    width: 30px;
    height: 30px;
    padding: 6px;
    border-radius: 50%;
    font-weight: 600;
    font-size: 12px;
    line-height: 17px;
    color: #5e6a75;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__nav-button-name {
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: rgba(29, 36, 82, 0.5);
    text-wrap: none;
  }

  .tab_active {
    color: #415ada;
  }

  &__tabs-content_margin {
    margin: 0 0 10px 0;
  }

  &__actions-block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80px;
  }
  &__toggle-switch {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 23px;
    color: #1d2452;
    gap: 5px;
    flex: 0 1 240px;
    img {
      opacity: 0.4;
    }
  }
  &__tab-submit-button {
    padding: 11px 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    background: #1d2452;
    color: white;
    border-radius: 20px;
  }
}

//slider checkbox
.app-tabs__toggle-switch-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  position: relative;
  width: 100%;
  height: 100%;
}
.input {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.switch {
  --switch-container-width: 50px;
  --switch-size: calc(var(--switch-container-width) / 2);
  display: flex;
  align-items: center;
  position: relative;
  height: var(--switch-size);
  flex-basis: var(--switch-container-width);
  border-radius: var(--switch-size);
  background-color: #e2e8f0;
  flex-shrink: 0;
  transition: background-color 0.25s ease-in-out;
}
.switch::before {
  content: '';
  position: absolute;
  left: 1px;
  height: calc(var(--switch-size) - 4px);
  width: calc(var(--switch-size) - 4px);
  border-radius: 9999px;
  background-color: white;
  transition: transform 0.375s ease-in-out;
}
.input:checked + .switch {
  background-color: #415ada;
}
.input:checked + .switch::before {
  border-color: #7a89d0;
  transform: translateX(calc(var(--switch-container-width) - var(--switch-size)));
}
.input:focus + .switch::before {
  border-color: #cbd5e0;
}
.input:disabled + .switch {
  background-color: #cbd5e0;
}
.input:disabled + .switch::before {
  background-color: #a0aec0;
  border-color: #a0aec0;
}

@media (min-width: 767px) {
  .app-tabs {
    &__nav {
      flex-direction: row;
      gap: 24px;
      position: relative;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 16px;
    }
    &__nav_margin-bottom {
      margin: 0 0 24px 0;
    }

    &__nav-button {
      gap: 8px;
    }
    &__nav-button-name {
      font-size: 16px;
    }
    &__nav-button-index {
      font-size: 14px;
    }

    &__tabs-content_margin {
      margin: 0 0 33px 0;
    }

    &__actions-block {
      position: relative;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: auto;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding: 20px 0 0 0;
    }
    &__actions-block-without-switch {
      justify-content: flex-end;
    }
  }

  .tab_active-main {
    position: relative;
  }
  .tab_active-main::after {
    content: '';
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 2px;
    background: #415ada;
    top: calc(100% + 15px);
    left: 0;
  }
}
</style>
