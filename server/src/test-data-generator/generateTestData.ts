import mongoose from "mongoose";
import {User} from "../model/User";
import {Friendship} from "../model/Friendship";
import {Post} from "../model/Post";
import {Comment} from "../model/Comment";
import bcrypt from "bcrypt";

async function generateTestData() {
    try {
        await mongoose.connect('mongodb://localhost:6000/fakebook').then((_) => {
            console.log('Successfully connected to MongoDB.');
        }).catch(error => {
            console.log(error);
            return;
        });

        // Felhasználók
        const userData = [
            // Sima userek
            { email: 'adam@test.com', 'name': 'Elemér György', address: 'Sehonnai', nickname: 'Elemér az egér', password: 'alma123' },
            { email: 'eve@test.com', 'name': 'Szent Ferenc', address: 'Kis utca 8', nickname: 'HeUrÉkA', password: 'alma123' },
            { email: 'roll@test.com', 'name': 'Ötlet Gábor', address: 'Szeged, átmeneti utca sarka', nickname: 'A Gondozó', password: 'alma123' },
            { email: 'teszt1@test.com', 'name': 'Teszt 1', address: 'Teszt utca 1', nickname: 'Teszt 1', password: 'alma123' },
            { email: 'teszt2@test.com', 'name': 'Teszt 2', address: 'Teszt utca 2', nickname: 'Teszt 2', password: 'alma123' },
            { email: 'teszt3@test.com', 'name': 'Teszt 3', address: 'Teszt utca 3', nickname: 'Teszt 3', password: 'alma123' },

            // Admin
            { email: 'admin@admin.com', 'name': 'Admin Admin', address: 'Nincs', nickname: 'Az ADMIN', password: 'alma123', role: 'user' },
        ]

        // await Promise.all(userData.map(async user => {
        //     const salt = await bcrypt.genSalt(10);
        //     const encryptedPassword = await bcrypt.hash(user.password, salt);
        //     user.password = encryptedPassword;
        // }));

        const usersResult = await User.insertMany(userData);
        console.log(`Felhasznalok beszurva.`);

        // Barátságok
        const friendshipData = [
            // adam@test.com
            { user1: usersResult[0]._id, user2: usersResult[1]._id },
            { user1: usersResult[0]._id, user2: usersResult[2]._id },
            { user1: usersResult[0]._id, user2: usersResult[3]._id },
            { user1: usersResult[0]._id, user2: usersResult[3]._id },
            { user1: usersResult[0]._id, user2: usersResult[4]._id },
            { user1: usersResult[0]._id, user2: usersResult[5]._id },

            // eve@test.com
            { user1: usersResult[1]._id, user2: usersResult[1]._id },
            { user1: usersResult[1]._id, user2: usersResult[3]._id },

            // roll@test.com
            { user1: usersResult[2]._id, user2: usersResult[5]._id },
        ]

        await Friendship.insertMany(friendshipData);
        console.log(`Baratsagok beszurva.`);

        // Posztok
        const postData = [
            { author: usersResult[0]._id, postHeader: 'Soha nem elég a könyvekből!', postText: 'Ma elmerültem egy fantasztikus könyvben, és egyszerűen nem tudtam letenni! Az olvasás valóban az egyik legjobb módja annak, hogy eltöltsük az időnket.', owner: usersResult[0].nickname, createdAt: '2024-04-12T16:30:38.359Z' },
            { author: usersResult[1]._id, postHeader: 'Csodálatos nap a természetben!', postText: 'Ma kirándultam a hegyekben, és lenyűgözött a természet szépsége. Semmi sem veri meg a friss levegőt és a gyönyörű kilátást!', owner: usersResult[1].nickname, createdAt: '2024-04-13T06:23:12.359Z' },
            { author: usersResult[0]._id, postHeader: 'Ma végre befejeztem a projektet!', postText: 'Hosszú hónapok kemény munkája után végre befejeztem a projektet! Örömmel tölt el, hogy láthatom, mennyit fejlődtem az elmúlt időszakban.', owner: usersResult[0].nickname, createdAt: '2024-04-16T12:28:23.359Z' },
            { author: usersResult[0]._id, postHeader: 'További', postText: 'További szöveg', owner: usersResult[0].nickname, createdAt: '2024-04-19T08:01:45.359Z' },
            { author: usersResult[2]._id, postHeader: 'További 1', postText: 'További szöveg', owner: usersResult[2].nickname, createdAt: '2024-04-21T18:50:28.359Z' },
            { author: usersResult[3]._id, postHeader: 'További 2', postText: 'További szöveg', owner: usersResult[3].nickname, createdAt: '2024-05-05T17:13:08.359Z' },
            { author: usersResult[2]._id, postHeader: 'További 3', postText: 'További szöveg', owner: usersResult[2].nickname, createdAt: '2024-05-12T14:43:54.359Z' },
        ]

        const postResult = await Post.insertMany(postData);
        console.log(`Posztok beszurva.`);

        // Kommentek
        const commentData = [
            { post: postResult[0]._id, author: usersResult[1]._id, commentText: 'Teljesen egyetértek! Az olvasás a legjobb módja annak, hogy utazásra induljunk anélkül, hogy elhagynánk az otthonunkat.', createdAt: '2024-04-12T16:35:40.359Z' },
            { post: postResult[0]._id, author: usersResult[2]._id, commentText: 'Igen, az olvasás kikapcsolja az elmét és az új világokba vezet minket. Ez a legjobb érzés!', createdAt: '2024-04-15T08:10:40.359Z' },

            { post: postResult[1]._id, author: usersResult[2]._id, commentText: 'Az hangzik, mintha fantasztikus napot töltöttél volna! A természet mindig segít újra feltöltődni és elgondolkodni az élet fontosságos dolgairól.', createdAt: '2024-04-15T08:18:05.359Z' },
            { post: postResult[1]._id, author: usersResult[0]._id, commentText: 'Hogy is lehetne jobb, mint egy nap a hegyekben? Az ilyen napoknak mindenki szüksége van néha.', createdAt: '2024-04-17T08:11:30.359Z' },

            { post: postResult[2]._id, author: usersResult[0]._id, commentText: 'Gratulálok! Nagyszerű érzés lehet, hogy befejezted azt a projektet, amelyen olyan régóta dolgoztál.', createdAt: '2024-05-10T23:31:46.359Z' },
        ]

        await Comment.insertMany(commentData);
        console.log(`Kommentek beszurva.`);





        // Insert test data into the database
        console.log('BESZURAS KESZ');
    } finally {
        // Close the connection
        await mongoose.disconnect();
    }
}

generateTestData().catch(console.error);