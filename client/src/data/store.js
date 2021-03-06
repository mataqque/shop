import { configureStore } from '@reduxjs/toolkit'
import routesFeatures from './routesStore'
import modalFeatures from './modalStore'
import userStore from './userStore'
import dashboardStore from './dashboardStore'
import sliderMain from './slider/sliderMain'
import ModalGallery from './galleryModal'
import slider from './components/sliderMain'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })

export default configureStore({
    reducer: {
        routesFeatures,
        modalFeatures,
        userStore,
        dashboardStore,
        sliderMain,
        ModalGallery,
        slider,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

