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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var User_1 = require("../model/User");
var Friendship_1 = require("../model/Friendship");
var Post_1 = require("../model/Post");
var Comment_1 = require("../model/Comment");
function generateTestData() {
    return __awaiter(this, void 0, void 0, function () {
        var userData, usersResult, friendshipData, postData, postResult, commentData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 6, 8]);
                    return [4 /*yield*/, mongoose_1["default"].connect('mongodb://localhost:6000/fakebook').then(function (_) {
                            console.log('Successfully connected to MongoDB.');
                        })["catch"](function (error) {
                            console.log(error);
                            return;
                        })];
                case 1:
                    _a.sent();
                    userData = [
                        // Sima userek
                        { email: 'adam@test.com', 'name': 'Elemér György', address: 'Sehonnai', nickname: 'Elemér az egér', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        { email: 'eve@test.com', 'name': 'Szent Ferenc', address: 'Kis utca 8', nickname: 'HeUrÉkA', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        { email: 'roll@test.com', 'name': 'Ötlet Gábor', address: 'Szeged, átmeneti utca sarka', nickname: 'A Gondozó', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        { email: 'teszt1@test.com', 'name': 'Teszt 1', address: 'Teszt utca 1', nickname: 'Teszt 1', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        { email: 'teszt2@test.com', 'name': 'Teszt 2', address: 'Teszt utca 2', nickname: 'Teszt 2', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        { email: 'teszt3@test.com', 'name': 'Teszt 3', address: 'Teszt utca 3', nickname: 'Teszt 3', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS' },
                        // Admin
                        { email: 'admin@admin.com', 'name': 'Admin Admin', address: 'Nincs', nickname: 'Az ADMIN', password: '$2b$10$gXj3l7AbYbJkQo.G8QL5We8ECEvLfEqK0haPfcYNzveJjCPpfURJS', role: 'user' },
                    ];
                    return [4 /*yield*/, User_1.User.insertMany(userData)];
                case 2:
                    usersResult = _a.sent();
                    console.log("Felhasznalok beszurva.");
                    friendshipData = [
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
                    ];
                    return [4 /*yield*/, Friendship_1.Friendship.insertMany(friendshipData)];
                case 3:
                    _a.sent();
                    console.log("Baratsagok beszurva.");
                    postData = [
                        { author: usersResult[0]._id, postHeader: 'Soha nem elég a könyvekből!', postText: 'Ma elmerültem egy fantasztikus könyvben, és egyszerűen nem tudtam letenni! Az olvasás valóban az egyik legjobb módja annak, hogy eltöltsük az időnket.', owner: usersResult[0].nickname, createdAt: '2024-04-12T16:30:38.359Z' },
                        { author: usersResult[1]._id, postHeader: 'Csodálatos nap a természetben!', postText: 'Ma kirándultam a hegyekben, és lenyűgözött a természet szépsége. Semmi sem veri meg a friss levegőt és a gyönyörű kilátást!', owner: usersResult[1].nickname, createdAt: '2024-04-13T06:23:12.359Z' },
                        { author: usersResult[0]._id, postHeader: 'Ma végre befejeztem a projektet!', postText: 'Hosszú hónapok kemény munkája után végre befejeztem a projektet! Örömmel tölt el, hogy láthatom, mennyit fejlődtem az elmúlt időszakban.', owner: usersResult[0].nickname, createdAt: '2024-04-16T12:28:23.359Z' },
                        { author: usersResult[0]._id, postHeader: 'További', postText: 'További szöveg', owner: usersResult[0].nickname, createdAt: '2024-04-19T08:01:45.359Z' },
                        { author: usersResult[2]._id, postHeader: 'További 1', postText: 'További szöveg', owner: usersResult[2].nickname, createdAt: '2024-04-21T18:50:28.359Z' },
                        { author: usersResult[3]._id, postHeader: 'További 2', postText: 'További szöveg', owner: usersResult[3].nickname, createdAt: '2024-05-5T17:13:08.359Z' },
                        { author: usersResult[2]._id, postHeader: 'További 3', postText: 'További szöveg', owner: usersResult[2].nickname, createdAt: '2024-05-12T14:43:54.359Z' },
                    ];
                    return [4 /*yield*/, Post_1.Post.insertMany(postData)];
                case 4:
                    postResult = _a.sent();
                    console.log("Posztok beszurva.");
                    commentData = [
                        { post: postResult[0]._id, author: usersResult[1]._id, commentText: 'Teljesen egyetértek! Az olvasás a legjobb módja annak, hogy utazásra induljunk anélkül, hogy elhagynánk az otthonunkat.', createdAt: '2024-04-12T16:35:40.359Z' },
                        { post: postResult[0]._id, author: usersResult[2]._id, commentText: 'Igen, az olvasás kikapcsolja az elmét és az új világokba vezet minket. Ez a legjobb érzés!', createdAt: '2024-04-15T08:10:40.359Z' },
                        { post: postResult[1]._id, author: usersResult[2]._id, commentText: 'Az hangzik, mintha fantasztikus napot töltöttél volna! A természet mindig segít újra feltöltődni és elgondolkodni az élet fontosságos dolgairól.', createdAt: '2024-04-15T08:18:05.359Z' },
                        { post: postResult[1]._id, author: usersResult[0]._id, commentText: 'Hogy is lehetne jobb, mint egy nap a hegyekben? Az ilyen napoknak mindenki szüksége van néha.', createdAt: '2024-04-17T08:11:30.359Z' },
                        { post: postResult[2]._id, author: usersResult[0]._id, commentText: 'Gratulálok! Nagyszerű érzés lehet, hogy befejezted azt a projektet, amelyen olyan régóta dolgoztál.', createdAt: '2024-05-10T23:31:46.359Z' },
                    ];
                    return [4 /*yield*/, Comment_1.Comment.insertMany(commentData)];
                case 5:
                    _a.sent();
                    console.log("Kommentek beszurva.");
                    // Insert test data into the database
                    console.log('BESZURAS KESZ');
                    return [3 /*break*/, 8];
                case 6: 
                // Close the connection
                return [4 /*yield*/, mongoose_1["default"].disconnect()];
                case 7:
                    // Close the connection
                    _a.sent();
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
generateTestData()["catch"](console.error);
