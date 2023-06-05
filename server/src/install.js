import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Role } from './models/Role.js';
import { Person } from './models/Person.js';
import { User } from './models/User.js';

async function main() {
    // Загрузка конфига и инициализация инстанции для работы с базой данных 
    dotenv.config()
    const prisma = new PrismaClient();

    // Проверка ссылки базы данных
    if (
        !process.env.DB_URL_POSTGRES.length ||
        process.env.DB_URL_POSTGRES === 'postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require&pgbouncer=true&statement_cache_size=0'
    ) {
        console.error('[ ERROR ] Please, provide database connection string in .env');
        process.exit(1);
    }

    // Проверка связи с базой данных
    try {
        await prisma.$connect();
        await prisma.$disconnect();
    } catch (e) {
        console.error(`[ ERROR ] An error occurred while trying to connect to the database: "${e.toString()}"`);
        process.exit(1);
    }

    // Создание ролей по умолчанию
    try {
        const roles = await prisma.role.findFirst({});

        if (roles) {
            console.info('[ INFO ] The database is already installed!');
            process.exit(0);
        }

        await prisma.role.createMany({
            data: [
                new Role({ name: 'Студент', access_level: 0, is_default: true }).toJSON(),
                new Role({ name: 'Ответственный за практику', access_level: 10, is_default: false }).toJSON(),
                new Role({ name: 'Руководитель практики', access_level: 20, is_default: false }).toJSON(),
                new Role({ name: 'Администратор', access_level: 100, is_default: false }).toJSON()
            ]
        });
    } catch (e) {
        console.error(`[ ERROR ] An error occurred while trying to create roles: "${e.toString()}"`);
        process.exit(1);
    }

    // Создание персоны администратора
    let person;

    try {
        person = await prisma.person.create({
            data: new Person({
                first_name: 'Администратор',
                last_name: 'Платформы',
                position: 'admin',
            }).toJSON()
        });
    } catch (e) {
        console.error(`[ ERROR ] An error occurred while trying to create administrator person: "${e.toString()}"`);
        process.exit(1);
    }

    // Создание пользователя администратора
    let user;

    try {
        user = await prisma.user.create({
            data: new User({
                person_id: person.id,
                username: 'admin',
                login: 'admin',
                password: 'changeme'
            }).toJSON()
        });
    } catch (e) {
        console.error(`[ ERROR ] An error occurred while trying to create administrator user: "${e.toString()}"`);
        process.exit(1);
    }

    // Присвоение ролей администратору
    try {
        const role = await prisma.role.findFirst({
            where: { name: 'Администратор' }
        })

        await prisma.roleAssignments.create({
            data: { user_id: user.id, role_id: role.id }
        });
    } catch (e) {
        console.error(`[ ERROR ] An error occurred while trying to update administrator roles: "${e.toString()}"`);
        process.exit(1);
    }

    console.log(
        '[ * ] The server is successfully installed, your credentials: \n' +
        '\n' +
        '[ * ] Username: admin\n' +
        '[ * ] Login: admin\n' +
        '[ * ] Password: changeme\n'
    );
    process.exit(0);
}

await main();