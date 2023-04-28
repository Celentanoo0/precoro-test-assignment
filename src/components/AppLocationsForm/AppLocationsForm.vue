<script setup>
import { inject } from 'vue'

const mainLocations = ['Main Precoro US', 'Ukraine', 'USA']
const tabsData = inject('tabsData')

const selectAllLocations = (event) => {
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
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row">
      <label for="main-location">Main Location</label>
      <select
        v-model="tabsData.mainLocation"
        name="main-location"
        id="main-location"
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
    <div class="app-form__row">
      <label for="select-all">Select All Locations</label>
      <input
          type="checkbox"
          name="select-all"
          id="select-all"
          @change="selectAllLocations"
      />
    </div>
    <div class="app-form__row">
      <ul class="app-form__list app-form__list--two-col">
        <li
          class="app-form__list-item"
          v-for="(location, index) of tabsData.locations"
          :key="`location_id${index}`"
        >
          <label :for="location.id">{{ location.name }}</label>
          <input
            v-model="location.value"
            type="checkbox"
            :name="location.id"
            :id="location.id"
          />
        </li>
      </ul>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.app-form__list {
  &.app-form__list--two-col {
    columns: 2;
  }
}
</style>
