<script setup>
import AppTabs from '@/components/AppTabs/AppTabs.vue';
import { provide, reactive, ref } from 'vue';

const tabs = reactive([
  {
    tabName: 'Main Info',
    tabComponentName: 'AppMainInfoForm',
    submitted: false,
  },
  {
    tabName: 'Available Locations',
    tabComponentName: 'AppLocationsForm',
    submitted: false,
  },
  {
    tabName: 'Roles',
    tabComponentName: 'AppRolesForm',
    submitted: false,
  }
]);
const popupIsOpen = ref(true);
const formElementsDisabled = ref(false);
const closePopup = () => {
  popupIsOpen.value = false;
};
const openPopup = () => {
  popupIsOpen.value = true;
  if(!formElementsDisabled.value){
    formElementsDisabled.value = true;
  }
};

provide('tabs', tabs);
provide('disableAll', formElementsDisabled);
</script>

<template>
  <div class="app-wrapper">
    <div v-if="!popupIsOpen" class="app-open-popup">
      <button class="app-popup-open-button" @click="openPopup">Open popup</button>
    </div>
    <div v-else class="app-popup">
      <div class="app-popup__header app-popup__header_margin">
        <div class="app-popup__description">
          <h1>Invite User</h1>
        </div>
        <div class="app-popup__close-btn">
          <button @click="closePopup">
            <img src="./assets/close-button.svg" alt="close-btn" />
          </button>
        </div>
      </div>
      <div class="app-popup__main">
        <app-tabs :tabs="tabs" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: lightgray;
}

.app-popup-open-button {
  padding: 10px 20px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 0 10px 0 white;
}

.app-popup {
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);
  padding: 24px;
  border-radius: 16px;
  flex: 0 1 90%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header_margin {
    margin: 0 0 10px 0;
  }
  &__description {
    h1 {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      color: #1d2452;
      margin: 0;
    }
  }
  &__close-btn {
    button {
      background: inherit;
      width: 22px;
      img {
        max-width: 100%;
      }
    }
  }
}

@media (min-width: 767px) {
  .app-popup{
    flex: 0 1 80%;
  }
}
</style>