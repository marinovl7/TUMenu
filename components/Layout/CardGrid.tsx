import { Box, useTheme } from '@mui/material'
import { Dishes } from '../../types/FoodPlaceMenu'
import { Labels } from '../../types/Labels'
import DishCard from './DishCard'

interface CardGridProps {
  dailyMeals: Dishes[]
  labels: Labels[]
}
export default function CardGrid({ dailyMeals, labels }: CardGridProps) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        columnGap: theme.spacing(4),
        rowGap: theme.spacing(4),
        flexWrap: 'wrap',
        my: theme.spacing(4),
      }}>
      {dailyMeals.map((meal) => (
        <DishCard key={meal.name} meal={meal} labels={labels} />
      ))}
    </Box>
  )
}