<script setup>
import { inject } from 'vue';
import { formControlChanged } from '@/composables/formControlChanged';
import { companiesAvailable } from '@/components/AppMainInfoForm/constants';

const disableAll = inject('disableAll');
const tabs = inject('tabs');
const activeTab = inject('activeTab');
const tabsData = inject('tabsData');
</script>

<template>
  <form action="#" class="app-form">
    <div class="app-form__row">
      <div class="app-form__row-block">
        <label for="first-name" class="app-form__control-name">First Name</label>
        <input
          v-model="tabsData.firstName"
          type="text"
          name="first-name"
          id="first-name"
          class="app-form__control app-form__control_margin"
          :disabled="disableAll"
          @input="formControlChanged(tabs, activeTab)"
        />
      </div>
      <div class="app-form__row-block app-form__row-block_ml-20">
        <label for="second-name" class="app-form__control-name">Second Name</label>
        <input
          v-model="tabsData.secondName"
          type="text"
          name="second-name"
          id="second-name"
          class="app-form__control app-form__control_margin"
          :disabled="disableAll"
          @input="formControlChanged(tabs, activeTab)"
        />
      </div>
    </div>
    <div class="app-form__row">
      <div class="app-form__row-block">
        <label for="email" class="app-form__control-name">Email Address</label>
        <input
          v-model="tabsData.email"
          type="email"
          name="email"
          id="email"
          class="app-form__control app-form__control_margin"
          :disabled="disableAll"
          @input="formControlChanged(tabs, activeTab)"
        />
      </div>
      <div class="app-form__row-block app-form__row-block_ml-20">
        <label for="phone" class="app-form__control-name">Phone Number</label>
        <input
          v-model="tabsData.phone"
          type="text"
          name="phone"
          id="phone"
          class="app-form__control app-form__control_margin"
          :disabled="disableAll"
          @input="formControlChanged(tabs, activeTab)"
        />
      </div>
    </div>

    <div class="app-form__row">
      <div class="app-form__row-block">
        <label for="position" class="app-form__control-name">Position</label>
        <input
          v-model="tabsData.position"
          type="text"
          name="position"
          id="position"
          class="app-form__control app-form__control_margin"
          :disabled="disableAll"
          @input="formControlChanged(tabs, activeTab)"
        />
      </div>
      <div class="app-form__row-block app-form__row-block_ml-20">
        <label for="company-select" class="app-form__control-name">Available in company</label>
        <select
          v-model="tabsData.company"
          id="company-select"
          :disabled="disableAll"
          class="app-form__control app-form__control_margin"
          @change="formControlChanged(tabs, activeTab)"
        >
          <option v-for="(companyName, index) of companiesAvailable" :key="index">
            {{ companyName }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.app-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__row {
    display: flex;
    flex-wrap: wrap;
  }

  &__row-block {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__control-name {
    color: rgba(29, 36, 82, 0.5);
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
  }
  &__control-name {
    margin: 0 0 5px 0;
  }
  &__control {
    border: 1px solid rgba(29, 36, 82, 0.1);
    border-radius: 8px;
    padding: 8px 9px;
    font-weight: 500;
    font-size: 14px;
    line-height: 10px;
    color: #1d2452;
  }
  &__control_margin {
    margin: 0 0 10px 0;
  }
}

@media (min-width: 767px) {
  .app-form {
    &__row {
      flex-wrap: nowrap;
      gap: 20px;
      width: 80%;
    }
    &__row:last-child {
      .app-form__row-block {
        .app-form__control {
          margin: 0;
        }
      }
    }

    &__row-block {
      flex: 0 1 50%;
    }
  }
}
</style>
