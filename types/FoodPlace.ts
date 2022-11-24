export type FoodPlace = {
    enum_name: string,
    name: string,
    location: {
        address: string,
        latitude: number,
        longitude: number
    },
    canteen_id: string,
    queue_status: string | null,
    open_hours: {
        mon: {
            start: string,
            end: string
        },
        tue: {
            start: string,
            end: string
        },
        wed: {
            start: string,
            end: string
        },
        thu: {
            start: string,
            end: string
        },
        fri: {
            start: string,
            end: string
        }
    }
}