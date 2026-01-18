import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌙 Seeding Luno database...\n');

    // (Rest of the seed script logic is the same, just the init changes)
    // Re-writing the file content to be safe and clean

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 12);

    const luna = await prisma.user.upsert({
        where: { email: 'luna@luno.gg' },
        update: {},
        create: {
            email: 'luna@luno.gg',
            username: 'Luna',
            password: hashedPassword,
            status: 'online',
        },
    });

    const alex = await prisma.user.upsert({
        where: { email: 'alex@luno.gg' },
        update: {},
        create: {
            email: 'alex@luno.gg',
            username: 'Alex',
            password: hashedPassword,
            status: 'online',
        },
    });

    const sam = await prisma.user.upsert({
        where: { email: 'sam@luno.gg' },
        update: {},
        create: {
            email: 'sam@luno.gg',
            username: 'Sam',
            password: hashedPassword,
            status: 'idle',
        },
    });

    const jordan = await prisma.user.upsert({
        where: { email: 'jordan@luno.gg' },
        update: {},
        create: {
            email: 'jordan@luno.gg',
            username: 'Jordan',
            password: hashedPassword,
            status: 'dnd',
        },
    });

    console.log('✅ Created users:', [luna.username, alex.username, sam.username, jordan.username].join(', '));

    // Create the Luno Community server
    const server = await prisma.server.upsert({
        where: { id: 'luno-community' },
        update: {},
        create: {
            id: 'luno-community',
            name: 'Luno Community',
            ownerId: luna.id,
        },
    });

    console.log('✅ Created server:', server.name);

    // Create channels
    const channels = await Promise.all([
        prisma.channel.upsert({
            where: { id: 'welcome' },
            update: {},
            create: {
                id: 'welcome',
                name: 'welcome',
                type: 'text',
                topic: 'Welcome to Luno! Introduce yourself here.',
                serverId: server.id,
                position: 0,
            },
        }),
        prisma.channel.upsert({
            where: { id: 'rules' },
            update: {},
            create: {
                id: 'rules',
                name: 'rules',
                type: 'text',
                topic: 'Server rules and guidelines',
                serverId: server.id,
                position: 1,
            },
        }),
        prisma.channel.upsert({
            where: { id: 'general' },
            update: {},
            create: {
                id: 'general',
                name: 'general',
                type: 'text',
                topic: 'Chat about anything and everything!',
                serverId: server.id,
                position: 2,
            },
        }),
        prisma.channel.upsert({
            where: { id: 'off-topic' },
            update: {},
            create: {
                id: 'off-topic',
                name: 'off-topic',
                type: 'text',
                topic: 'Random discussions',
                serverId: server.id,
                position: 3,
            },
        }),
        prisma.channel.upsert({
            where: { id: 'voice-general' },
            update: {},
            create: {
                id: 'voice-general',
                name: 'General',
                type: 'voice',
                serverId: server.id,
                position: 4,
            },
        }),
    ]);

    console.log('✅ Created channels:', channels.map(c => c.name).join(', '));

    // Add members to server
    const memberships = await Promise.all([
        prisma.serverMember.upsert({
            where: { userId_serverId: { userId: luna.id, serverId: server.id } },
            update: {},
            create: { userId: luna.id, serverId: server.id },
        }),
        prisma.serverMember.upsert({
            where: { userId_serverId: { userId: alex.id, serverId: server.id } },
            update: {},
            create: { userId: alex.id, serverId: server.id },
        }),
        prisma.serverMember.upsert({
            where: { userId_serverId: { userId: sam.id, serverId: server.id } },
            update: {},
            create: { userId: sam.id, serverId: server.id },
        }),
        prisma.serverMember.upsert({
            where: { userId_serverId: { userId: jordan.id, serverId: server.id } },
            update: {},
            create: { userId: jordan.id, serverId: server.id },
        }),
    ]);

    console.log('✅ Added', memberships.length, 'members to server');

    // Create some sample messages
    const generalChannel = channels.find(c => c.id === 'general')!;

    const messages = await Promise.all([
        prisma.message.create({
            data: {
                content: 'Welcome to Luno! 🌙 This is the beginning of our amazing community.',
                authorId: luna.id,
                channelId: generalChannel.id,
            },
        }),
        prisma.message.create({
            data: {
                content: 'Hey everyone! Excited to be here. What are you all working on today?',
                authorId: alex.id,
                channelId: generalChannel.id,
            },
        }),
        prisma.message.create({
            data: {
                content: 'Building some cool stuff with React! Anyone else into frontend development?',
                authorId: sam.id,
                channelId: generalChannel.id,
            },
        }),
        prisma.message.create({
            data: {
                content: 'Just finished setting up my workspace. This dark theme is 🔥',
                authorId: jordan.id,
                channelId: generalChannel.id,
            },
        }),
        prisma.message.create({
            data: {
                content: 'Don\'t forget to check out the user profile feature coming soon!',
                authorId: luna.id,
                channelId: generalChannel.id,
            },
        }),
    ]);

    console.log('✅ Created', messages.length, 'sample messages');

    console.log('\n🌙 Luno database seeded successfully!');
    console.log('\n📝 Demo credentials:');
    console.log('   Email: luna@luno.gg');
    console.log('   Password: password123');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
