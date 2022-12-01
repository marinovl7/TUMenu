import { Box, useTheme } from '@mui/material'
import { Dishes } from '../../types/FoodPlaceMenu'
import { Labels } from '../../types/Labels'
import DishCard from './DishCard'

interface CardGridProps {
  dailyMeals: Dishes[]
  labels: Labels[]
  height: number
}
export default function CardGrid({ dailyMeals, labels, height }: CardGridProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        columnGap: theme.spacing(4),
        rowGap: theme.spacing(4),
        flexWrap: 'wrap',
        my: theme.spacing(4),
        minHeight: height,
      }}>
      {dailyMeals.map((meal) => (
        <DishCard key={meal.name} meal={meal} labels={labels} />
      ))}
    </Box>
  )
}
