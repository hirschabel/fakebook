"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const Friendship_1 = require("../model/Friendship");
const Post_1 = require("../model/Post");
const Comment_1 = require("../model/Comment");
const configureRoutes = (passport, router) => {
    router.get('/', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.status(200).send('Hello, World!');
    });
    router.post('/login', (req, res, next) => {
        passport.authenticate('local', (error, user) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });
    router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const role = 'user';
        // Check if the email already exists
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = new User_1.User({ email: email, password: password, name: name, address: address, nickname: nickname, role: role });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    }));
    router.post('/register-friend', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
            const userId = req.user;
            const email = req.body.email;
            // Check if the email already exists
            const existingUser = yield User_1.User.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: 'Nincs ilyen felhasznalo!' + email });
            }
            else if (userId === existingUser) {
                return res.status(400).json({ message: 'Masik felhasznalo megadasa szukseges!' + email });
            }
            // Create friendship
            const friendship = new Friendship_1.Friendship({
                user1: userId,
                user2: existingUser._id
            });
            // Save friendship to database
            yield friendship.save();
            res.status(200).json({ message: 'Barátság sikeresen regisztrálva!' });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    }));
    router.post('/createComment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.isAuthenticated()) {
            const userId = req.user;
            const postId = req.body.postId;
            const text = req.body.commentText;
            const comment = new Comment_1.Comment({
                author: userId,
                post: postId,
                commentText: text
            });
            comment.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    }));
    router.post('/createPost', (req, res) => {
        if (req.isAuthenticated()) {
            const userId = req.user;
            const postHeader = req.body.postHeader;
            const postText = req.body.postText;
            const post = new Post_1.Post({
                author: userId,
                postHeader: postHeader,
                postText: postText
            });
            post.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllPosts', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Post_1.Post.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllComments', (req, res) => {
        if (req.isAuthenticated()) {
            const query = Comment_1.Comment.find({ post: req.query.postId });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllFriends', (req, res) => {
        if (req.isAuthenticated()) {
            const queryFriendships = Friendship_1.Friendship.find({
                $or: [
                    { user1: req.user },
                    { user2: req.user }
                ]
            });
            queryFriendships.then(friendships => {
                const friendIds = friendships.map(friendship => {
                    console.log(friendship, " --- ", req.user);
                    console.log(friendship.user1 === req.user ? friendship.user2 : friendship.user1);
                    if (String(friendship.user1) == String(req.user)) {
                        console.log('==');
                        return friendship.user2;
                    }
                    else {
                        console.log('!=');
                        return friendship.user1;
                    }
                    return friendship.user1 === req.user ? friendship.user2 : friendship.user1;
                });
                const queryUsers = User_1.User.find({
                    _id: { $in: friendIds }
                });
                queryUsers.then(users => {
                    res.status(200).send(users);
                }).catch(error => {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                });
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/getAllUsers', (req, res) => {
        if (req.isAuthenticated()) {
            const query = User_1.User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.get('/checkAuth', (req, res) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);
        }
        else {
            res.status(500).send(false);
        }
    });
    router.delete('/deleteUser', (req, res) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User_1.User.deleteOne({ _id: id });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    router.post('/friend-request', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { user1Id, user2Id } = req.body;
            // Ellenőrizd, hogy a felhasználók léteznek-e
            const user1 = yield User_1.User.findById(user1Id);
            const user2 = yield User_1.User.findById(user2Id);
            if (!user1 || !user2) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Ellenőrizd, hogy a barátság még nem létezik
            const existingFriendship = yield Friendship_1.Friendship.findOne({
                $or: [
                    { user1: user1Id, user2: user2Id },
                    { user1: user2Id, user2: user1Id }
                ]
            });
            if (existingFriendship) {
                return res.status(400).json({ message: 'Friendship already exists' });
            }
            // Ha minden rendben, létrehozunk egy új barátságot
            const friendship = new Friendship_1.Friendship({ user1: user1Id, user2: user2Id });
            yield friendship.save();
            res.status(200).json({ message: 'Friendship created successfully' });
        }
        catch (error) {
            console.error('Error creating friendship:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }));
    return router;
};
exports.configureRoutes = configureRoutes;
