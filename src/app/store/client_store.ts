import {CLIENT_DATA_STATUS, DAYS} from '@/const/const';
import {create} from 'zustand';
import {DATA_BASE_ACTIONS, DATA_BASE_ROUTES} from '@/const/baseActions';
import ObjectId from 'bson-objectid';

type ClientDayType = {
	timeToClient: {
		id: string;
		time: string;
		name: string;
	};
};

type TimeToClient = {
	id: string;
	time: string;
	name?: string;
};

type DocumentData = {
	_id: string;
	data: DayData[];
};

type Client = {
	timeToClient: TimeToClient;
};

type DayData = {
	id: string;
	day: string;
	client: Client[];
};

type useClientStoreProps = {
	clientByDay: DocumentData[];
	// editOpenStatus:boolean,
	loadingDB: boolean;
	statusDataFromDB: boolean;
	error: string | null;
	addClientCompleted: boolean;
	getDataDB: () => void;
	searchClientData: (day: string, time: string) => Client[];
	checkClientData: (
		name: string,
		day: string,
		time: string,
		update?: boolean,
	) => boolean;
	// setEditStatus: (status:boolean) => void,
	searchViewClient: (id: string, day: string, time: string) => string;
	searchClient: (criteria: {day: string; id: string; time: string}) => string;
	setClientData: (
		day: string,
		status: string,
		data: ClientDayType,
		id: string,
	) => void;
	setIdDate: (id: string) => void;
	sendDataToDB: (
		status: string,
		data:
			| {day: string; clientData: ClientDayType; _id?: string}
			| DocumentData[],
	) => void;
};
const initialState: DocumentData[] = [
	{
		_id: new ObjectId().toString(),
		data: [
			{
				id: '',
				day: DAYS.MONDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.TUESDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.WEDNESDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.THURSDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.FRIDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.SATURDAY,
				client: [],
			},
			{
				id: '',
				day: DAYS.SUNDAYS,
				client: [],
			},
		],
	},
];

export const useClientStore = create<useClientStoreProps>()((set, get) => ({
	clientByDay: initialState,
	// editOpenStatus:false,
	loadingDB: false,
	statusDataFromDB: false,
	addClientCompleted: false,
	error: '',
	getDataDB: async () => {
		set({loadingDB: true});
		try {
			const response = await fetch('/api/users');
			const data = await response.json();
			if (data.length === 0) {
				return;
			} else {
				return set({
					clientByDay: data,
					loadingDB: false,
					statusDataFromDB: true,
				});
			}
		} catch (error) {
			console.error('Error fetching data:', error);
			return set({loadingDB: false, statusDataFromDB: false});
		}
	},
	setIdDate: (id) => {
		set({
			clientByDay: get().clientByDay.map((document) => ({
				...document,
				data: document.data.map((item) => ({
					...item,
					id: id, // Обновляем поле id
				})),
			})),
		});
	},
	searchClientData: (day, time) => {
		return get().clientByDay.flatMap((item) =>
			item.data
				.filter((element) => element.day === day) // Фильтруем по `day`
				.flatMap(
					(clients) =>
						clients.client.filter(
							(client) => client.timeToClient.time === time,
						), // Фильтруем по `time`
				),
		);
	},
	searchClient: (criteria) => {
		const clientByDay: DocumentData[] = get().clientByDay; // Получаем данные из состояния
		const clientByTime = clientByDay.flatMap((document) => document.data);
		const hasUniqueId = (array: DayData[]) => {
			return array.some((document) =>
				document.client.some((item) => {
					const currentId = item.timeToClient.id;
					return (
						array.filter(
							(document) =>
								document.client.filter(
									(otherItem) => otherItem.timeToClient.id === currentId,
								).length === 1,
						).length === 1
					);
				}),
			);
		};
		const resultSearch = clientByDay.flatMap((document) =>
			document.data // Перебираем массив `data` внутри каждого документа
				.filter((dayRecord) => dayRecord.day === criteria.day) // Ищем нужный день
				.flatMap(
					(dayRecord) =>
						dayRecord.client // Перебираем массив клиентов текущего дня
							// .filter((client) => client.timeToClient.time === criteria.time)
							.filter(
								(client) =>
									client.timeToClient.time === criteria.time &&
									hasUniqueId(document.data),
							)
							// Фильтруем по `id`
							.map((client) => client.timeToClient.name || 'EDIT'),
					// Возвращаем имя или "EDIT"
				),
		);
		// return resultSearch;
		return resultSearch.length > 0 ? resultSearch[0] : 'EDIT'; // Возвращаем первый результат или "EDIT"
	},
	searchViewClient: (id, day, time) => {
		let clientNameTemp = '';
		get().clientByDay.flatMap((document) =>
			document.data
				.filter((element) => element.day === day)
				.flatMap((item) =>
					item.client.map((element) => {
						if (
							element.timeToClient.id === id &&
							element.timeToClient.time === time
						) {
							return clientNameTemp === element.timeToClient.name;
						}
					}),
				),
		);
		return clientNameTemp;
	},
	checkClientData: (id, name, day, time) => {
		return get().clientByDay.some((document) =>
			document.data.some(
				(item) =>
					item.day === day &&
					item.client.some((element) => element.timeToClient.id === id),
			),
		);
	},
	// setEditStatus: (status) => set({ editOpenStatus: status })
	// ,
	setClientData: (day, status, data, id) => {
		switch (status) {
			case CLIENT_DATA_STATUS.STATIC_CLIENT_DATA:
				if (id) {
					set({
						clientByDay: get().clientByDay.map((document) => ({
							...document,
							data: document.data.map((item) => ({
								...item,
								id: id, // Обновляем поле id
							})),
						})),
					});
				}
				break;
			case CLIENT_DATA_STATUS.ADD_CLIENT_DATA:
				set({
					clientByDay: get().clientByDay.map((document) => ({
						...document,
						data: document.data.map((item) => {
							if (item.day === day) {
								// Проверяем, существует ли клиент с указанным временем
								const clientExists = item.client.some(
									(element) => element.timeToClient.id === data.timeToClient.id,
								);

								if (!clientExists) {
									// Создаём новый массив клиентов с добавленным пользователем
									return {
										...item,

										client: [
											...item.client,
											{
												timeToClient: {
													id: data.timeToClient.id,
													time: data.timeToClient.time,
													name: data.timeToClient.name,
												},
											},
										],
									};
								}
							}
							return item; // Возвращаем элемент без изменений, если условие не выполнено
						}),
					})),
				});
				get().sendDataToDB(
					DATA_BASE_ACTIONS.ADD_CLIENT_DATA,
					get().clientByDay,
				);
				break;
			case CLIENT_DATA_STATUS.UPDATE_CLIENT_DATA:
				console.log('update path');
				set({
					clientByDay: get().clientByDay.map((document) => ({
						...document,
						data: document.data.map((item) => {
							if (item.day === day) {
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
							}
							return item;
						}),
					})),
				});
				const ids = get().clientByDay.map((item) => item._id);
				get().sendDataToDB(DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA, {
					day: day,
					clientData: data,
					_id: ids[0],
				});
				break;
			case CLIENT_DATA_STATUS.CHECK_CLIENT_DATA:
				get().sendDataToDB(DATA_BASE_ACTIONS.CHECK_CLIENT_DATA, {
					day: day,
					clientData: data,
				});
			default:
		}
	},
	sendDataToDB: async (status, data) => {
		set({loadingDB: true, error: null});
		switch (status) {
			case DATA_BASE_ACTIONS.ADD_CLIENT_DATA:
				try {
					const response = await fetch(DATA_BASE_ROUTES.ADD_CLIENT_DATA_ROUTE, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(data),
						// body: JSON.stringify(get().clientByDay),
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
					set({loadingDB: false, error: null});
					// сбрасываем состояние отправки
				}
				break;
			case DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA:
				try {
					const response = await fetch(
						DATA_BASE_ROUTES.UPDATE_CLIENT_DATA_ROUTE,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						},
					);

					if (response.ok) {
						const result = await response.json();
						console.log(result.message);
					} else {
						console.error('Ошибка при обновлении клиента');
					}
				} catch (error) {
					console.error('Произошла ошибка при отправке данных:', error);
				} finally {
					set({loadingDB: false, error: null});
					// сбрасываем состояние отправки
				}
				break;
			case DATA_BASE_ACTIONS.CHECK_CLIENT_DATA:
				try {
					const response = await fetch(
						DATA_BASE_ROUTES.CHECK_CLIENT_DATA_ROUTE,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data),
						},
					);
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
}));
