export const DAYS = {
    MONDAY:'Monday',
    TUESDAY:'Tuesday',
    WEDNESDAY:'Wednesday',
    THURSDAY:'Thursday',
    FRIDAY:'Friday',
    SATURDAY:'Saturday',
    SUNDAYS:'Sunday'

}

export const TIME_TO_CLIENT_PER_DAY = {
    FIRST_TIME:'10:00',
    SECOND_TIME:'11:00',
    THIRD_TIME:'12:00',
    FOUR_TIME:'14:00'
}

export const TIME_TO_CLIENT = ['10:00', '11:00', '12:00', '14:00']

export const DAYS_WEEK = [
    { id: '1', day: DAYS.MONDAY, TIME_TO_CLIENT}, 
    { id: '2', day: DAYS.TUESDAY, TIME_TO_CLIENT}, 
    { id: '3', day: DAYS.WEDNESDAY, TIME_TO_CLIENT}, 
    { id: '4', day: DAYS.THURSDAY, TIME_TO_CLIENT}, 
    { id: '5', day: DAYS.FRIDAY, TIME_TO_CLIENT}, 
    { id: '6', day: DAYS.SATURDAY, TIME_TO_CLIENT}, 
    { id: '7', day: DAYS.SUNDAYS, TIME_TO_CLIENT}
]





export const COUNT_CLIENTS_PER_DAY:number = 3
export const COUNT_WORKERS_PER_DAYS:number = 3
export const COUNT_WORKERS_PER_DAY:number = 2

export const CLIENT_DATA_STATUS = {
    STATIC_CLIENT_DATA:'static_client_data',
    UPDATE_CLIENT_DATA:'update_client_data',
    ADD_CLIENT_DATA:'add_client_data'
}
    