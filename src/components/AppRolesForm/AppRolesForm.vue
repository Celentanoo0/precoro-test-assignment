<script setup>
import { computed, inject, ref } from 'vue';

const disableAll = inject('disableAll');
const tabsData = inject('tabsData');
const accessLevels = ref([
  {
    name: 'View only',
    keyName: 'view_only',
    value: false
  },
  {
    name: 'Create',
    keyName: 'create',
    value: false
  },
  {
    name: 'Approve',
    keyName: 'approve',
    value: false
  },
  {
    name: 'Pay',
    keyName: 'pay',
    value: false
  },
]);
const managementSelectAll = ref(false);
const fullAccessGranted = computed(
  () => tabsData.roles.management.find((elem) => elem.id === 'admin')?.value
);
const getDisabledAccessButtons = (accessButtonId) => {
  return accessButtonId !== 'admin' ? fullAccessGranted.value : false;
};
const selectAllAccessCheckboxes = (accessLevelKeyName, accessLevelValue) => {
  tabsData.roles.access.forEach((accessArea) => {
    if (typeof accessArea.values[accessLevelKeyName] === 'boolean') {
      accessArea.values[accessLevelKeyName] = accessLevelValue;
    }
  });
};
const selectAllManagementCheckboxes = (event) => {
  const managementValue = event.target.checked;

  tabsData.roles.management.forEach((managementItem) => {
    if (managementItem.id !== 'admin') {
      managementItem.value = managementValue;
    }
  });
}
const onAccessAreaLevelChange = (accessLevel) => {
  accessLevels.value.find((level) => level.keyName === accessLevel).value = false;
};
const onManagementChange = () => {
  managementSelectAll.value = false;
};
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row app-form__row--flex app-form__row--flex--margin">
      <div class="app-form__row-block app-form__row-block--flex app-form__row-block--first-block">
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
              @change="
                (event) => selectAllAccessCheckboxes(levelData.keyName, event.target.checked)
              "
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
      <div class="app-form__row-block--one-row app-form__row-block--flex">
        <div class="app-form__row-item--management">
          Management: <img src="src/assets/info.svg" alt="info-img" />
        </div>
        <ul class="app-form__list">
          <li class="app-form__list-item app-form__list-item-all">
            <input
              v-model="managementSelectAll"
              type="checkbox"
              id="management-select-all"
              :disabled="fullAccessGranted || disableAll"
              @change="selectAllManagementCheckboxes"
            />
            <label for="management-select-all"> All bellow </label>
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
          The user becomes a <a href="#">Power user</a> if at least ONE of the following roles is
          selected: Approve, View only, Configuration, Suppliers and Items, Budgets, Warehouse
          manager.
        </p>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.app-form__row {
  .app-form__row-block--description {
    display: flex;
    font-size: 12px;
    gap: 10px;
    padding: 10px 15px;
    background: rgba(244, 244, 255, 0.5);
    border-radius: 8px;
    font-weight: 500;
    line-height: 18px;
    color: rgba(29, 36, 82, 0.5);
    a {
      text-decoration: underline;
    }
    img {
      max-width: 20px;
    }
  }
}

.app-form__row-item--management {
  display: flex;
  width: 100%;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 24px;
  color: #676f8f;
  gap: 7px;
  img {
    max-width: 20px;
  }
}
.app-form__list {
  display: flex;
  flex-direction: column;
  height: 100%;
  font-weight: 500;
  font-size: 12px;
  line-height: 23px;
  gap: 6px;
}
.app-form__list-item {
  display: flex;
  gap: 10px;
  color: #676f8f;
}
.app-form__list-item-all {
  font-weight: 600;
}

.app-form__row-block--one-row {
  padding: 10px;
}

.app-form__row--flex {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  max-width: 100%;
}

.app-form__row--flex--margin {
  margin-bottom: 32px;
}

.app-form__row-block--first-block {
  text-align: center;
  padding: 10px;
}

.app-form__row-block--flex {
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  flex: 0 1 calc(70%); /* Change the width of the first row block */
}

.app-form__row-block--flex:last-child {
  flex: 0 1 calc(30%);
}

.app-form__row-block {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(9, auto);
}

.app-form__row-item {
  display: contents;
}

.app-form__row-item-name {
  grid-column: 1;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: start;
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

@media (min-width: 767px) {
  .app-form__row--flex {
    flex-direction: row;
  }
  .app-form__row-block--flex:first-child {
    border-right: 1px solid #dddee5;
    font-weight: 600;
    font-size: 12px;
    line-height: 24px;
    color: #676f8f;
    text-align: right;
  }

  .app-form__row-item-values {
    height: 100%;
  }

  .app-form__row {
    .app-form__row-block--description {
      font-size: 14px;
      line-height: 18px;
      max-width: 80%;
    }
  }
}
</style>
