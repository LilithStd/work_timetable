import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, Db, Collection } from 'mongodb';


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

  try {
    const { name, email } = await request.json();
    const result = await usersCollection.insertOne({ name, email });
    return NextResponse.json({ message: 'Пользователь добавлен', result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Ошибка при добавлении пользователя' }, { status: 500 });
  }
}
