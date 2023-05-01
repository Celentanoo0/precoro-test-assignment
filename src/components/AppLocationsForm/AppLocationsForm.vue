<script setup>
import { inject, ref, toRefs } from 'vue'

const props = defineProps({
  disableAll: {
    type: Boolean,
    required: false,
    default: false
  }
})
const tabs = inject('tabs');
const activeTab = inject('activeTab');
const { disableAll } = toRefs(props)
const mainLocations = ['Main Precoro US', 'Ukraine', 'USA']
const tabsData = inject('tabsData')
const selectAllLocationCheckboxes = ref(false);
const onLocationsChange = () => {
  formControlChanged(activeTab);
  selectAllLocationCheckboxes.value = false;
}
const selectAllLocations = (event) => {
  formControlChanged(activeTab);
  if (event.target.checked) {
    for (const elem of tabsData.value.locations) {
      elem.value = true
    }

    return
  }
  for (const elem of tabsData.value.locations) {
    elem.value = false
  }
}
// Sdelat composable
const formControlChanged = (activeTabName) => tabs.value.find(
  (tabItem) => tabItem.tabComponentName === activeTabName,
).submitted = false;
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row">
      <div class="app-form__select">
        <label for="main-location" class="app-form__select-label">Main Location</label>
        <select
          v-model="tabsData.mainLocation"
          name="main-location"
          id="main-location"
          class="app-form__select-item"
          :disabled="disableAll"
          @change="formControlChanged(activeTab)"
        >
          <option
            v-for="(mainLocation, index) of mainLocations"
            :key="`main_location_id${index}`"
            :value="mainLocation"
          >
            {{ mainLocation }}
          </option>
        </select>
      </div>
    </div>
    <div class="app-form__row">
      <div class="app-form__row-item">
        <input
          type="checkbox"
          name="select-all"
          id="select-all"
          class="app-form__checkbox"
          v-model="selectAllLocationCheckboxes"
          :disabled="disableAll"
          @change="selectAllLocations"
        />
        <label for="select-all">Select All Locations</label>
      </div>
    </div>
    <div class="app-form__row">
      <div class="app-form__list-text app-form__list-text_margin-bottom">Available Locations</div>
      <div class="app-form__row-item">
        <ul class="app-form__list app-form__list--two-col">
          <li
            class="app-form__list-item app-form__list-item_margin"
            v-for="(location, index) of tabsData.locations"
            :key="`location_id${index}`"
          >
            <input
              v-model="location.value"
              type="checkbox"
              class="app-form__checkbox"
              :name="location.id"
              :id="location.id"
              :disabled="disableAll"
              @change="onLocationsChange"
            />
            <label :for="location.id" class="app-form__list-item-label">{{ location.name }}</label>
          </li>
        </ul>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.app-form {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &__row-item,
  &__list-item,
  &__list-text {
    display: flex;
    gap: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #1d2452;
  }

  &__list-text {
    line-height: 23px;
    color: rgba(29, 36, 82, 0.6);
  }
  &__list-text_margin-bottom {
    margin-bottom: 10px;
  }

  &__select {
    display: flex;
    flex-direction: column;
    gap: 4px;
    .app-form__select-label {
      font-weight: 600;
      font-size: 12px;
      line-height: 15px;
      color: rgba(29, 36, 82, 0.5);
    }
    .app-form__select-label:after {
      content: '*';
      color: red;
      margin-left: 2px;
    }
    .app-form__select-item {
      background: #ffffff;
      border: 1px solid rgba(29, 36, 82, 0.1);
      border-radius: 8px;
      padding: 9px 8px;
      font-weight: 500;
      font-size: 16px;
      line-height: 23px;
      color: #1d2452;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .app-form__checkbox {
    flex: 0 0 18px;
  }
}

@media (min-width: 767px) {
  .app-form__list {
    display: block;
    width: 70%;
    &.app-form__list--two-col {
      columns: 2;
    }
    .app-form__list-item {
      min-height: 18px;
    }
  }
  .app-form__list-item_margin {
    margin-bottom: 17px;
  }

  .app-form {
    &__select {
      max-width: 40%;
    }
  }
}
</style>
