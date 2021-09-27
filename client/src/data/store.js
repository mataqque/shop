import { configureStore } from '@reduxjs/toolkit'
import routesFeatures from './routesStore'
import modalFeatures from './modalStore'

export default configureStore({
    reducer: {routesFeatures,modalFeatures},
})
