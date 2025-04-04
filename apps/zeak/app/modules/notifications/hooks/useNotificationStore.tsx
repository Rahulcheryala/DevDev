import { atom } from "nanostores"
import { useNanoStore } from "~/hooks"

const notificationStore = atom({
  activeStep: 0,
  chartType: "bar"
})

export const useNotificationStore = () => {
  const [store, setStore] = useNanoStore(notificationStore)


  const setActiveStep = (step: number) => {
    setStore(current => ({
      ...current,
      activeStep: step
    }))
  }

  const goToNextStep = () => {
    setStore(current => ({
      ...current, 
      activeStep: current.activeStep + 1
    }))
  }

  const setChartType = (type: "bar" | "line") => {
    setStore(current => ({
      ...current,
      chartType: type
    }))
  }

  return {
    ...store,
    setActiveStep,
    goToNextStep,
    setChartType

  }
}