import { faker } from '@faker-js/faker';
import { ObjectId } from "mongodb";
import { PrismaService} from '../prisma.service'

const prisma = new PrismaService();

async function generateUsers() {
    // Generate 20 users
    
    
    for (let i = 0; i < 20; i++) {
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: "USER",
                trips: {
                    create: Array.from({ length: 3 }, () => ({
                        title: faker.lorem.words(3),
                        location: faker.location.city(),
                        image: faker.image.url(),
                        startDate: faker.date.future(),
                        endDate: faker.date.future(),
                        activities: Array.from({ length: 20 }, () => ({
                            id: new ObjectId().toString(), // Unique ID for activities
                            title: faker.lorem.words(2),
                            location: faker.location.streetAddress(),
                            date: faker.date.future(),
                        })),
                    })),
                },
            },
        });

        console.log(`Created user: ${user.email}`);
    }
}

generateUsers()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
