<script setup>
import { computed, inject, ref, toRefs } from 'vue'

const props = defineProps({
  disableAll: {
    type: Boolean,
    required: false,
    default: false
  }
})
const { disableAll } = toRefs(props)
const tabsData = inject('tabsData')
const accessLevels = ref([
  {
    name: 'View only',
    keyName: 'view_only',
    value: false,
  },
  {
    name: 'Create',
    keyName: 'create',
    value: false,
  },
  {
    name: 'Approve',
    keyName: 'approve',
    value: false,
  },
  {
    name: 'Pay',
    keyName: 'pay',
    value: false,
  },
]);
const managementSelectAll = ref(false);
const fullAccessGranted = computed(
  () => tabsData.value.roles.management.find((elem) => elem.id === 'admin')?.value
)
const getDisabledAccessButtons = (accessButtonId) => {
  return accessButtonId !== 'admin' ? fullAccessGranted.value : false
}
const selectAllAccessCheckboxes = (accessLevelKeyName, accessLevelValue) => {
  tabsData.value.roles.access.forEach((accessArea) => {
    if (typeof accessArea.values[accessLevelKeyName] === 'boolean') {
      accessArea.values[accessLevelKeyName] = accessLevelValue;
    }
  });
}
const selectAllManagementCheckboxes = (event) => {
  const managementValue = event.target.checked;

  tabsData.value.roles.management.forEach((managementItem) => {
    if (managementItem.id !== 'admin') {
      managementItem.value = managementValue;
    }
  });
}
const onAccessAreaLevelChange = (accessLevel) => {
  accessLevels.value.find((level) => level.keyName === accessLevel).value = false;
}
const onManagementChange = () => {
  managementSelectAll.value = false;
  //ddddddddd
  // На change любого форм контрола инпут селект и тд сбрасыать tabs[index].submitted = false,
  // по tabs[index].submitted ориентироваться как отображать таб на странице
}
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row app-form__row_flex">
      <div class="app-form__row-block app-form__row-block_flex">
        <div class="app-form__row-item">
          <div class="app-form__row-item-name">Access to:</div>
          <div
            v-for="(levelData, index) of accessLevels"
            :key="`level-data-name-${index}`"
            class="app-form__row-item-values"
          >
            {{ levelData.name }}
          </div>
        </div>
        <div class="app-form__row-item">
          <div class="app-form__row-item-name">All bellow</div>
          <div
            v-for="(levelData, index) of accessLevels"
            :key="`level-data-key-name-${index}`"
            class="app-form__row-item-values"
          >
            <input
              v-model="levelData.value"
              type="checkbox"
              :name="levelData"
              :id="levelData"
              @change="(event) => selectAllAccessCheckboxes(levelData.keyName, event.target.checked)"
              :disabled="fullAccessGranted || disableAll"
            />
          </div>
        </div>
        <div
          v-for="(accessArea, index) of tabsData.roles.access"
          :key="`access-access-area-${index}`"
          class="app-form__row-item"
        >
          <div class="app-form__row-item-name">
            {{ accessArea.name }}
          </div>
          <div
            v-for="(accessItemKey, accessItemIndex) of Object.keys(accessArea.values)"
            :key="`access-item-${accessItemIndex}`"
            class="app-form__row-item-values"
          >
            <input
              v-model="accessArea.values[accessItemKey]"
              type="checkbox"
              :name="accessItemKey"
              :disabled="fullAccessGranted || disableAll"
              @change="onAccessAreaLevelChange(accessItemKey)"
            />
          </div>
        </div>
      </div>
      <div class="app-form__row-block_one-row app-form__row-block_flex">
        <div class="app-form__row-item">Management: <img src="src/assets/info.svg" alt="info-img"></div>
        <ul class="app-form__list">
          <li class="app-form__list-item">
            <input
              v-model="managementSelectAll"
              type="checkbox"
              id="management-select-all"
              :disabled="fullAccessGranted || disableAll"
              @change="selectAllManagementCheckboxes"
            />
            <label for="management-select-all">
              All bellow
            </label>
          </li>
          <li
            class="app-form__list-item"
            v-for="(managementItem, index) of tabsData.roles.management"
            :key="`management_item_id${index}`"
          >
            <input
              v-model="managementItem.value"
              type="checkbox"
              :name="managementItem.id"
              :id="managementItem.id"
              :disabled="getDisabledAccessButtons(managementItem.id) || disableAll"
              @change="onManagementChange"
            />
            <label :for="managementItem.id">{{ managementItem.name }}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="app-form__row">
      <div class="app-form__row-block app-form__row-block--description">
        <img src="src/assets/info.svg" alt="info-img" />
        <p>
          The user becomes a <span>Power user</span> if at least ONE of the following roles is
          selected: Approve, View only, Configuration, Suppliers and Items, Budgets, Warehouse
          manager.
        </p>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.app-form__row{
  .app-form__row-block--description{
    display: flex;
    flex-direction: column;
    img{
      max-width: 20px;
    }
  }
}

.app-form__row_flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  border: 1px solid red;
  //gap: 30px;
}

.app-form__row-block_flex {
  flex: 0 1 calc(70% - 30px); /* Change the width of the first row block */
}
//.app-form__row-block_flex:first-child {
//  border-right: 1px solid #DDDEE5;
//}

.app-form__row-block_flex:last-child {
  flex: 0 1 calc(30% - 30px); /* Change the width of the second row block */
  //border: 1px solid blue;
}

.app-form__row-block {
  display: grid;
  grid-template-columns: 1fr 20% 20% 20% 20%;
  grid-template-rows: repeat(9, auto);
  //grid-gap: 10px;
}

.app-form__row-item {
  display: contents;
}

.app-form__row-item-name {
  grid-column: 1;
}

.app-form__row-item-values {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app-form__row-item-values:nth-child(2) {
  grid-column: 2;
}

.app-form__row-item-values:nth-child(3) {
  grid-column: 3;
}

.app-form__row-item-values:nth-child(4) {
  grid-column: 4;
}

.app-form__row-item-values:nth-child(5) {
  grid-column: 5;
}
</style>
