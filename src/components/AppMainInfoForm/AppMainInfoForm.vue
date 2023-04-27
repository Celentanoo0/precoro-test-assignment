<script setup>
import { inject } from 'vue'

const tabsData = inject('tabsData')
const companiesAvailable = ['Precoro', 'Google', 'Microsoft']
</script>

<template>
  <form action="#" class="main-info-form">
    <div class="main-info-form__row">
      <div class="main-info-form__row-block">
        <label for="first-name">First Name</label>
        <input
          v-model="tabsData.firstName"
          type="text"
          name="first-name"
          id="first-name"
          class="main-info-form__control"
        />
      </div>
      <div class="main-info-form__row-block main-info-form__row-block_ml-20">
        <label for="second-name">Second Name</label>
        <input v-model="tabsData.secondName" type="text" name="second-name" id="second-name" />
      </div>
    </div>
    <div class="main-info-form__row">
      <div class="main-info-form__row-block">
        <label for="email">Email Address</label>
        <input v-model="tabsData.email" type="email" name="email" id="email" />
      </div>
      <div class="main-info-form__row-block main-info-form__row-block_ml-20">
        <label for="phone">Phone Number</label>
        <input v-model="tabsData.phone" type="text" name="phone" id="phone" />
      </div>
    </div>

    <div class="main-info-form__row">
      <div class="main-info-form__row-block">
        <label for="position">Position</label>
        <input type="text" name="position" id="position" v-model="tabsData.position" />
      </div>
      <div class="main-info-form__row-block main-info-form__row-block_ml-20">
        <label for="company-select">Available in company</label>
        <select v-model="tabsData.company" id="company-select">
          <option v-for="(companyName, index) of companiesAvailable" :key="index">
            {{ companyName }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
input[type='text'],
input[type='email'] {
  border: 1px solid black;
}
</style>
