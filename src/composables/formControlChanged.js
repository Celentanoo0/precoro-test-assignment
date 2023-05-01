export const formControlChanged = (tabs, activeTabName) => {
  tabs.find((tabItem) => tabItem.tabComponentName === activeTabName).submitted = false
}
