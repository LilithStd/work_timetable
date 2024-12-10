import { CLIENT_DATA_STATUS, DAYS } from "@/const/const";
import { create } from "zustand";
import { TIME_TO_CLIENT } from "@/const/const";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { DATA_BASE_ACTIONS, DATA_BASE_ROUTES } from "@/const/baseActions";
import { ClientDataStatus, User } from "@/const/types";
import isEqual from 'lodash/isEqual';
import { time } from "console";

const date = dayjs().format('DD MMMM YYYY');

type ClientNameProps = {
    id:string,
    name:string
}

type UpdateClientProps = {
  id?:string,
  day?:string,
  time?:string,
  clientName?:string
}

type SearchCriteria<T> = (item: T) => boolean;

type ClientDataToDB = {
    status:ClientDataStatus
}

type ClientDayType = {
    timeToClient:{
      id:string,
      time:string,
      name:string
    }
}

type ClientDayTypeTest = {
  time:string,
  name:string
}

type ClientDaysType = {
    id:string,
    day:string,
    client:ClientDayType[]
}

type useClientStoreProps = {
    clientByDay:ClientDaysType[],
    editOpenStatus:boolean,
    clientName:ClientNameProps,
    // clientData:{}
    clientDataStatus:string,
    clientDataAction:string,
    loadingDB:boolean,
    statusDataFromDB:boolean,
    error:string | null,
    addClientCompleted:boolean,
    getDataDB:() => void,
    updateClientByDaysData:(data:UpdateClientProps) => void,
    checkClientData:(name:string, day:string,time:string, update?:boolean) => boolean,
    setEditStatus: (status:boolean) => void,
    searchViewClient: (id:string,day:string,time:string) => string,
    setClientName: (data:ClientNameProps) => void,
    setClientDataAction:(status:string) => void,
    searchClient:(criteria: {day:string, id:string, time:string}) => string,
    setClientData:(id:string,day:string, status:string, data:ClientDayType) => void,
    // sendDataToDB:(day:string, data:ClientDayType) => void
    sendDataToDB:(status:string,data:{day:string, clientData:ClientDayType }) => void
}

const initialState: ClientDaysType[] = [
  {
    id:date,
    day: DAYS.MONDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.TUESDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.WEDNESDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.THURSDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.FRIDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.SATURDAY,
    client: [],
  },
  {
    id:date,
    day: DAYS.SUNDAYS,
    client: [],
  },
];


export const useClientStore = create<useClientStoreProps>()(
    (set, get) => ({
        clientByDay:initialState,
        editOpenStatus:false,
        clientName:{id:'',name:''},
        loadingDB:false,
        statusDataFromDB:false,
        addClientCompleted:false,
        clientDataStatus:CLIENT_DATA_STATUS.STATIC_CLIENT_DATA,
        clientDataAction:DATA_BASE_ACTIONS.STATIC_CLIENT_DATA,
        error:'',
        getDataDB: async () => {
          set({ loadingDB: true });
          try {
            const response = await fetch('/api/users');
            const data = await response.json();
            return set({ clientByDay: data, loadingDB: false, statusDataFromDB:true });
          } catch (error) {
            console.error('Error fetching data:', error);
            return set({loadingDB: false, statusDataFromDB:false });
          }
        },
        searchClient: (criteria) => {
           const resultSearch = get().clientByDay
            .filter((element) => element.day === criteria.day) // Оставляем только нужные дни
            .flatMap((element) => 
              element.client
                .filter((item) => item.timeToClient.id === criteria.id) // Фильтруем по времени
                .map((item) => item.timeToClient.name || 'EDIT') // Возвращаем имя или "EDIT"
            );
            return resultSearch.length > 0 ? resultSearch[0] : 'EDIT'; // Возвращаем первый результат или "EDIT"
            
        },

        updateClientByDaysData: ({id,day,time,clientName}:UpdateClientProps) => {
         const storeData =  get().clientByDay.find((item) => item.day === day)
         storeData?.client.find((client) => client)
         return storeData
        },
        setClientDataAction:(status) => {
          set({clientDataStatus: status})
        },
        searchViewClient: (id, day, time) => {
          let clientNameTemp = ''
          get().clientByDay.map((element) => {
            if(element.day === day) {
              element.client.map((item) => {
                if(item.timeToClient.id === id && item.timeToClient.time === time){
                  return clientNameTemp = item.timeToClient.name
                }
              })
            }
          })
          return clientNameTemp
        },
        checkClientData: (id,name, day,time) => {
          return get().clientByDay.some((item) => 
            item.day === day && item.client.some((element) => element.timeToClient.id === id))
        },
        setEditStatus: (status) => set({ editOpenStatus: status }),
        setClientName:(data) => {
          set({ clientName:{id:data.id,name:data.name}})
          
        },
        setClientData: (id,day,status,data) => {
          switch(status) {
            case CLIENT_DATA_STATUS.STATIC_CLIENT_DATA :
              get().clientByDay.find((element) => 
                element.day === day 
                && element.client.find((firstArgument) => firstArgument.timeToClient.time) 
                 && element.client.find((secondArgument) => secondArgument.timeToClient.name === data.timeToClient.name))
              break
            case CLIENT_DATA_STATUS.ADD_CLIENT_DATA:
              set({
                clientByDay: get().clientByDay.map((item) => {
                  if(item.day === day && item.client.map((element) => element.timeToClient.time !== data.timeToClient.time)) {
                     item.client.push({
                      timeToClient:{
                        id:data.timeToClient.id,
                        time:data.timeToClient.time,
                        name:data.timeToClient.name
                      }
                     }) 
                  }
              return item;
              
            })
          });
            // get().sendDataToDB(DATA_BASE_ACTIONS.ADD_CLIENT_DATA)
            break
          case CLIENT_DATA_STATUS.UPDATE_CLIENT_DATA:
            set({clientByDay:get().clientByDay.map((element) =>{
              if(element.day === day) {
                return {
                  ...element,
                  client:element.client.map((client) => {
                    if(client.timeToClient.time === data.timeToClient.time) {
                      return {
                        ...client,
                        timeToClient:{
                          ...client.timeToClient,
                          name:data.timeToClient.name
                        },
                      };
                    }
                    return client;
                  })
                }
              }
              return element
            }
            )});
            get().sendDataToDB(DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA, {day:day,clientData:data})
            break
            case CLIENT_DATA_STATUS.CHECK_CLIENT_DATA: 
              get().sendDataToDB(DATA_BASE_ACTIONS.CHECK_CLIENT_DATA, {day:day, clientData:data})
            default:
          }
        },
        sendDataToDB: async (status,data) =>  {
            set({ loadingDB: true, error: null });
            switch(status) {
              case DATA_BASE_ACTIONS.ADD_CLIENT_DATA:
                try {
                  const response = await fetch(DATA_BASE_ROUTES.ADD_CLIENT_DATA_ROUTE, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(get().clientByDay),
                  });

                  if (response.ok) {
                      const result = await response.json();
                      console.log(result.message);
                  } else {
                      console.error('Ошибка при добавлении клиента');
                  }
              } catch (error) {
                  console.error('Произошла ошибка при отправке данных:', error);
              } finally {
                set({ loadingDB: false, error: null });
                  // сбрасываем состояние отправки
              }
              break;
              case DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA:
                try {
                  const response = await fetch(DATA_BASE_ROUTES.UPDATE_CLIENT_DATA_ROUTE, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(data),
                  });

                  if (response.ok) {
                      const result = await response.json();
                      console.log(result.message);
                  } else {
                      console.error('Ошибка при обновлении клиента');
                  }
              } catch (error) {
                  console.error('Произошла ошибка при отправке данных:', error);
              } finally {
                set({ loadingDB: false, error: null });
                  // сбрасываем состояние отправки
              }
              break;
              case DATA_BASE_ACTIONS.CHECK_CLIENT_DATA: 
                try{
                  const response = await fetch(DATA_BASE_ROUTES.CHECK_CLIENT_DATA_ROUTE, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    });
                    if (response.ok) {
                        const result = await response.json();
                        console.log(result.message);
                    } else {
                        console.error('Ошибка при обновлении клиента');
                    }
                } catch (error) {

                } finally {

              }
            } 
            
            
          
  },
    })
)

            // try {
            //       const response = await fetch(DATA_BASE_ROUTES.ADD_CLIENT_DATA_ROUTE, {
            //           method: 'POST',
            //           headers: {
            //               'Content-Type': 'application/json',
            //           },
            //           body: JSON.stringify(get().clientByDay),
            //       });

            //       if (response.ok) {
            //           const result = await response.json();
            //           console.log(result.message);
            //       } else {
            //           console.error('Ошибка при добавлении клиента');
            //       }
            //   } catch (error) {
            //       console.error('Произошла ошибка при отправке данных:', error);
            //   } finally {
            //     set({ loadingDB: false, error: null });
            //       // сбрасываем состояние отправки
            //     set({clientDataAction: CLIENT_DATA_STATUS.STATIC_CLIENT_DATA})
            //   }