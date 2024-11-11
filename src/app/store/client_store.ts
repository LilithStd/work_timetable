import { CLIENT_DATA_STATUS, DAYS } from "@/const/const";
import { create } from "zustand";
import { TIME_TO_CLIENT } from "@/const/const";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { DATA_BASE_ACTIONS, DATA_BASE_ROUTES } from "@/const/baseActions";
import { ClientDataStatus } from "@/const/types";

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


type ClientDataToDB = {
    status:ClientDataStatus
}

type ClientDayType = {
    timeToClient:{
      time:string,
      name:string
    }
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
    error:string | null,
    updateClientByDaysData:(data:UpdateClientProps) => void
    setEditStatus: (status:boolean) => void,
    setClientName: (data:ClientNameProps) => void,
    setClientData:(id:string,day:string, data:ClientDayType) => void,
    sendDataToDB:(day:string, data:ClientDayType) => void
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
        clientDataStatus:CLIENT_DATA_STATUS.STATIC_CLIENT_DATA,
        clientDataAction:DATA_BASE_ACTIONS.STATIC_CLIENT_DATA,
        error:'',
        updateClientByDaysData: ({id,day,time,clientName}:UpdateClientProps) => {
         const storeData =  get().clientByDay.find((item) => item.day === day)
         storeData?.client.find((client) => client)
         return storeData
        },
        // updateClientByDaysData: (day, clientName) => {
        //   set((state) => {
        //     const updatedDaysCell = state.clientByDay.map((item) =>
        //       item.day === day && !item.client.find((worker) => worker.name === clientName )
        //         ? { ...item, workers: [...item.client, { name: clientName }] }
        //         : item
        //     );
        //     return { daysCell: updatedDaysCell };
        //   });
        // },
        setEditStatus: (status) => set({ editOpenStatus: status }),
        setClientName:(data) => {
          set({ clientName:{id:data.id,name:data.name}})
          
        },
        setClientData: (id,day,data) => {
         set({
            clientByDay: get().clientByDay.map((item) => {
              
              if (item.day === day && item.client.length !== 0) {
                return {
                  ...item,
                  client: item.client.map((client) => {
                    
                    if (client.timeToClient.time === data.timeToClient.time) {
                      return {
                        ...client,
                        timeToClient: {
                          ...client.timeToClient,
                          name: data.timeToClient.name,
                        },
                      };
                    }
                    return client;
                  }),
                };
              }else{
                if(item.day === day) {
                    item.client.push({
                      timeToClient:{
                        time:data.timeToClient.time,
                        name:data.timeToClient.name
                      }
                    })
                } 
              }
              return item;
            }),
          });
        }
            
          // const updatedArray = get().clientByDay.map((item) => {
          //     if (item.id === id) {
          //       // Проверяем, есть ли поле `client`, если нет — добавляем пустой массив
          //       const clientArray = item.client || [];
                
          //       // Проверяем, существует ли элемент с указанным `time`
          //       const clientIndex = clientArray.findIndex(
          //         (clientItem) => clientItem.timeToClient.id === id
          //       );

          //       // Если элемент найден, обновляем его `name`
          //       if (clientIndex !== -1) {
          //         clientArray[clientIndex] = {
          //           ...clientArray[clientIndex],
          //           timeToClient: {
          //             ...clientArray[clientIndex].timeToClient,
          //             name: data.timeToClient.name,
          //           }
          //         };
          //       } else {
          //         // Если элемент с `time` не найден, добавляем его
          //         clientArray.push({
          //           timeToClient: { id , name: data.timeToClient.name}
          //         });
          //       }

          //       // Возвращаем обновленный объект
          //       return {
          //         ...item,
          //         client: clientArray,
          //       };
          //     }
          //     return item;
          //   });


          //   // Обновляем состояние
          //   return { clientByDay: updatedArray };
          ,
        
        // setClientData:(day,data) => {
            
          // get().clientByDay.map((item) => item.day === day 
          //   && item.client.map((item) => item.timeToClient.time === data.timeToClient.time 
          //   && item.timeToClient.name !== data.timeToClient.name ? set({}) : '') 
          // )
        // },
        sendDataToDB: async (day, data) =>  {
            
            set({ loadingDB: true, error: null });
            // if(get().clientByDay.find((item) => item.client.map((item) => item.timeToClient)))
            switch(get().clientDataAction) {
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
              break
              case DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA:
                try {
                  const response = await fetch(DATA_BASE_ROUTES.UPDATE_CLIENT_DATA_ROUTE, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(get().clientName),
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
            }
            
            
          
  },
        // sendDataToDB: () =>  get().clientName.name !== ''  && get().editOpenStatus !== true ? set({
        //     dataToDB: {id:get().clientName.id, name:get().clientName.name}
        // }) : set({dataToDB: {id:'',name:'none'}})
    })
)