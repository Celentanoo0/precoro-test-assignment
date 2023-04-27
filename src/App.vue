<script setup>
import AppTabs from '@/components/AppTabs/AppTabs.vue'

const tabs = [
  {
    tabName: 'Main Info',
    tabComponentName: 'AppMainInfoForm'
  },
  {
    tabName: 'Available Locations',
    tabComponentName: 'AppLocationsForm'
  },
  {
    tabName: 'Roles',
    tabComponentName: 'AppRolesForm'
  }
]
</script>

<template>
  <div class="app-wrapper">
    <div class="app-popup">
      <div class="app-popup__header app-popup__header_margin">
        <div class="app-popup__description">
          <h1>Invite User</h1>
        </div>
        <div class="app-popup__close-btn">
          <button>
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

.app-popup {
  background: #ffffff;
  box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);
  border-radius: 16px;
  padding: 24px;
  flex: 0 1 80%;

  &__header{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__header_margin{
    margin: 0 0 14px 0;
  }
  &__description{
    h1{
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: #1D2452;
      margin: 0;
    }
  }
  &__close-btn{
    button{
      background: inherit;
      width: 26px;
      img{
        max-width: 100%;
      }
    }
  }
}
</style>
