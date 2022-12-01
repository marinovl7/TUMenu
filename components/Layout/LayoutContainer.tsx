import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, Typography, useTheme, Button, Tabs, Tab } from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import minMax from 'dayjs/plugin/minMax'
import { FoodPlace } from '../../types/FoodPlace'
import { Dishes, FoodPlaceMenu } from '../../types/FoodPlaceMenu'
import LayoutContainerHeader from './LayoutContainerHeader'
import CardGrid from './CardGrid'
import NotFound from '../NotFound'
import { Labels } from '../../types/Labels'

export interface LayoutContainerProps {
  foodPlaceMenu: FoodPlaceMenu
  foodPlaceData: FoodPlace
  labels: Labels[]
  height: number
}

dayjs.extend(weekOfYear)
dayjs.extend(minMax)

export default function LayoutContainer({
  foodPlaceMenu,
  foodPlaceData,
  labels,
  height,
}: LayoutContainerProps) {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs())
  const [maxDate, setMaxDate] = useState<dayjs.Dayjs>(dayjs())
  const [minDate, setMinDate] = useState<dayjs.Dayjs>(dayjs())
  const [mealsShown, setMealsShown] = useState<Dishes[]>([])
  const [initialMeals, setInitialMeals] = useState<Dishes[]>([])
  const [filteredValue, setFilteredValue] = useState('All')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== 'All') {
      const filteredMeals = initialMeals.filter((meal) => meal.dish_type === newValue)
      setMealsShown(filteredMeals)
    } else {
      setMealsShown(initialMeals)
    }
    setFilteredValue(newValue)
  }

  useEffect(() => {
    const dailyMeals = foodPlaceMenu.weeks
      .filter((week) => week.year === value?.year() && week.number === value.week() - 1)
      .map((week) => week.days.filter((day) => dayjs(day.date).isSame(value, 'day')))
      .flat(1)
      .map((dailyMenu) => dailyMenu.dishes.map((dish) => dish))
      .flat(1)

    setMealsShown(dailyMeals)
    setInitialMeals(dailyMeals)

    const latestWeek = Math.max(...foodPlaceMenu.weeks.map((week) => week.number))
    const firstWeek = Math.min(...foodPlaceMenu.weeks.map((week) => week.number))
    const lastDay = dayjs.max(
      foodPlaceMenu.weeks
        .filter((week) => week.number === latestWeek)[0]
        .days.map((day) => dayjs(day.date)),
    )
    const firstDay = dayjs.min(
      foodPlaceMenu.weeks
        .filter((week) => week.number === firstWeek)[0]
        .days.map((day) => dayjs(day.date)),
    )

    setMinDate(firstDay)
    setMaxDate(lastDay)
  }, [value, foodPlaceMenu])

  const theme = useTheme()
  const { t } = useTranslation('common')
  return (
    <Box
      sx={{
        ml: theme.spacing(30),
        minHeight: '100%',
        padding: theme.spacing(4),
        backgroundColor: `${theme.palette.primary.main} !important`,
      }}>
      <LayoutContainerHeader
        foodPlaceData={foodPlaceData}
        datePickerValue={value}
        datePickerSetValue={setValue}
        minDate={minDate}
        maxDate={maxDate}
      />
      <Box sx={{ borderBottom: 2, borderColor: 'divider' }}>
        <Tabs value={filteredValue} onChange={handleChange} sx={{ mt: theme.spacing(3) }} centered>
          <Tab value="All" label={t('all')} />
          <Tab value="Fleisch" label={t('meat')} />
          <Tab value="Vegetarisch" label={t('vegetarian')} />
          <Tab value="Wok" label="Wok" />
          <Tab value="Grill" label="Grill" />
          <Tab value="Pasta" label="Pasta" />
          <Tab value="Pizza" label="Pizza" />
          <Tab value="Studitopf" label={t('studyPot')} />
          <Tab value="Beilagen" label={t('sideDish')} />
          <Tab value="Süßspeise" label={t('dessert')} />
        </Tabs>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: theme.spacing(2),
        }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {t('cardGridHeading')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: theme.spacing(2),
          }}>
          <Button
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            }}>
            {t('generateMenu')}
          </Button>
          <Button
            startIcon={<FilterAltIcon />}
            variant="contained"
            size="medium"
            sx={{
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            }}>
            {t('labelFilter')}
          </Button>
        </Box>
      </Box>
      {mealsShown.length !== 0 ? (
        <CardGrid dailyMeals={mealsShown} labels={labels} height={height} />
      ) : (
        <NotFound height={height}/>
      )}
    </Box>
  )
}
