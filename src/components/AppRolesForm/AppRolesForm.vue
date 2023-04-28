<script setup>
import { computed, inject, toRefs } from 'vue'

const props = defineProps({
  disableAll: {
    type: Boolean,
    required: false,
    default: false
  }
})
const { disableAll } = toRefs(props)
const tabsData = inject('tabsData')

const fullAccessGranted = computed(
  () => tabsData.value.roles.management.find((elem) => elem.id === 'admin')?.value
)

const getDisabledAccessButtons = (accessButtonId) => {
  return accessButtonId !== 'admin' ? fullAccessGranted.value : false
}
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row app-form__row_flex">
      <div class="app-form__row-block app-form__row-block_flex">
        <div
          v-for="(accessItem, index) in tabsData.roles.access"
          :key="`access-item-id${index}`"
          class="app-form__row-item"
        >
          <div class="app-form__row-item-name">{{ accessItem.name }}</div>
          <div
            v-for="(roleValue, roleKey) in accessItem.values"
            :key="`role-item-id${roleKey}`"
            class="app-form__row-item-values"
          >
            <input
              v-model="accessItem.values[roleKey]"
              type="checkbox"
              :name="index"
              :id="index"
              :disabled="fullAccessGranted || disableAll"
            />
          </div>
        </div>
      </div>
      <div class="app-form__row-block app-form__row-block_flex">
        <ul class="app-form__list">
          <li
            class="app-form__list-item"
            v-for="(managementItem, index) of tabsData.roles.management"
            :key="`management_item_id${index}`"
          >
            <label :for="managementItem.id">{{ managementItem.name }}</label>
            <input
              v-model="managementItem.value"
              type="checkbox"
              :name="managementItem.id"
              :id="managementItem.id"
              :disabled="getDisabledAccessButtons(managementItem.id) || disableAll"
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="app-form__row">
      <div class="app-form__row-block">
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
.app-form__row_flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid red;
}

.app-form__row-block_flex {
  flex: 0 1 70%; /* Change the width of the first row block */
}

.app-form__row-block_flex:last-child {
  flex: 0 1 30%; /* Change the width of the second row block */
  border: 1px solid blue;
}

.app-form__row-block {
  display: grid;
  grid-template-columns: 1fr 20% 20% 20% 20%;
  grid-template-rows: repeat(9, auto);
  grid-gap: 10px;
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