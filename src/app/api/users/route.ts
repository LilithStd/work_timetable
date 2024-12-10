import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';
import { DATA_BASE_ACTIONS } from '@/const/baseActions';


const uri = process.env.MONGODB_URI as string; // Считываем URI из переменной окружения
let client: MongoClient;
let db: Db;
let usersCollection: Collection;

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('UsersWorkTimeTable'); // Укажите название вашей базы данных
    usersCollection = db.collection('Users_Work_Time_Table'); // Название коллекции
  }
}

// GET запрос - получение всех пользователей
export async function GET(request: NextRequest) {
  await connectToDatabase();

  try {
    const users = await usersCollection.find({}).toArray();
    return NextResponse.json(users); // Возвращаем список пользователей в JSON формате
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при получении данных' }, { status: 500 });
  }
}

// POST запрос - добавление нового пользователя
export async function POST(request: NextRequest) {
 await connectToDatabase();

  // Извлекаем параметр action из URL
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const requestBody = await request.json();
  try {
    

    // Обработка на основе параметра action
    if (action === DATA_BASE_ACTIONS.ADD_CLIENT_DATA) {
      const {data} = requestBody;
      const result = await usersCollection.insertOne({data});
      return NextResponse.json(
        { message: 'Пользователь добавлен', insertedId: result.insertedId },
        { status: 201 }
      );
    }
    if (action === DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA) {
      const { day, timeToClient } = requestBody
      if (!day || !timeToClient) {
      return NextResponse.json(
        { error: 'Все поля обязательны' },
        { status: 400 }
      );
    }
            const result = await usersCollection.updateOne( {
          _id: new ObjectId('673e2aea44aaf77cfdfc0696'), // Идентификатор документа
             // Дата в массиве data
          'data.day': day, // День недели
          'data.client.timeToClient.id': timeToClient.id, // ID клиента
        },
        {
          $set: {
            'data.$[dateElem].client.$[clientElem].timeToClient.name': timeToClient.name, // Обновляем имя
          },
        },
        {
        arrayFilters: [
          {'dateElem.day': day }, // Фильтр для элемента даты
          { 'clientElem.timeToClient.id': timeToClient.id }, // Фильтр для клиента
        ],
      }
      );
        if (result.matchedCount === 0) {
          return NextResponse.json({ error: 'День или клиент не найден' }, { status: 404 });
      }
      if (result.modifiedCount > 0) {
          return NextResponse.json({ message: 'Имя клиента успешно обновлено' }, { status: 200 });
      } else {
          return NextResponse.json({ message: 'Данные клиента не изменились' }, { status:     304 });
      }
    }
    if(action === DATA_BASE_ACTIONS.CHECK_CLIENT_DATA) {
        try {
          const { clientData } = requestBody;
          console.log('serve ' + clientData.timeToClient.id)
          // Проверяем входные данные
          if (!clientData) {
            return NextResponse.json(
              { error: 'Необходимо передать timeToClientId' },
              { status: 400 }
            );
          }

          // Шаг 1: Ищем документ, содержащий `timeToClient.id`
         const document = await usersCollection.findOne({
            'data.client.timeToClient.id': clientData.timeToClient.id,
          });

          if (document) {
            // Возвращаем `_id`, если найден
            return NextResponse.json(
              { message: 'Объект найден', _id: document._id },
              { status: 200 }
            );
          }

          // Если объект не найден
          return NextResponse.json({ message: 'Объект не найден' }, { status: 404 });
  } catch (error) {
    console.error('Ошибка при обработке данных:', error);
    return NextResponse.json({ error: 'Ошибка на сервере' }, { status: 500 });
  }

    }
     else {
      return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка при обработке запроса' }, { status: 500 });
  }
}
