import { configureStore } from '@reduxjs/toolkit'
import routesFeatures from './routesStore'
import modalFeatures from './modalStore'
import userStore from './userStore'
import dashboardStore from './dashboardStore'

export default configureStore({
    reducer: {routesFeatures,modalFeatures, userStore, dashboardStore},
})
