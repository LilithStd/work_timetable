import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Db, Collection } from 'mongodb';
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

  try {
    const data = await request.json();

    // Обработка на основе параметра action
    if (action === DATA_BASE_ACTIONS.ADD_CLIENT_DATA) {
      const result = await usersCollection.insertOne(data);
      return NextResponse.json(
        { message: 'Пользователь добавлен', insertedId: result.insertedId },
        { status: 201 }
      );
    } else if (action === DATA_BASE_ACTIONS.UPDATE_CLIENT_DATA) {
      const { day, client } = await request.json();
      const result = await usersCollection.updateOne(
      { 'clientByDay.day': day }, // Условие для поиска нужного дня
      { $push: { 'clientByDay.$.client': client } } // Добавляем клиента в массив client
      );
        if (result.modifiedCount > 0) {
          return NextResponse.json({ message: 'Клиент обновлён' }, { status: 200 });
        } else {
          return NextResponse.json({ error: 'Документ не найден или клиент уже добавлен' }, { status: 404 });
        }
      // const result = await usersCollection.insertOne({ schedule: data });
      // return NextResponse.json(
      //   { message: 'Обновление клиента завершено', insertedId: result.insertedId },
      //   { status: 201 }
      // );
    } else {
      return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ошибка при обработке запроса' }, { status: 500 });
  }
}
