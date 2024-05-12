import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Friendship } from '../model/Friendship';
import {UserProfile} from "../model/UserProfile";
import {Post} from "../model/Post";
import {Comment} from "../model/Comment";


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        let myClass = new MainClass();
        res.status(200).send('Hello, World!');
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', async (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const role = 'user';
        
        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const user = new User({email: email, password: password, name: name, address: address, nickname: nickname, role: role});
        user.save().then(async data => {
            // Create a blank user profile for the new user
            const userProfile = new UserProfile({
                owner: data._id,
                description: '',
                profilePicture: null
            });

            await userProfile.save();
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/register-friend', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            
            const userId = req.user;
            const email = req.body.email;
            
            // Check if the email already exists
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({ message: 'Nincs ilyen felhasznalo!' + email });
            } else if (userId === existingUser) {
                return res.status(400).json({ message: 'Masik felhasznalo megadasa szukseges!' + email });
            }

            // Create friendship
            const friendship = new Friendship({
                user1: userId,
                user2: existingUser._id
            });

            // Save friendship to database
            await friendship.save();

            res.status(200).json({ message: 'Barátság sikeresen regisztrálva!' });
            
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/createComment', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const userId = req.user;
            const postId = req.body.postId;
            const text = req.body.commentText;

            const comment = new Comment ({
                author: userId,
                post: postId,
                commentText: text
            });

            comment.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/createPost', async (req: Request, res: Response) => {
        if (req.isAuthenticated()) {

            const userId = req.user;
            const postHeader = req.body.postHeader;
            const postText = req.body.postText;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(500).send('User not found.');
            }


            const post = new Post ({
                author: userId,
                postHeader: postHeader,
                postText: postText,
                owner: user.nickname
            });

            post.save().then(data => {
                res.status(200).send(data);
            }).catch(error => {
                res.status(500).send(error);
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getUserProfile', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = UserProfile.findOne({ owner: req.user });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/updateUserProfile', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const { userProfileId, description, profilePicture } = req.body;

            // Assuming req.body contains the updated user profile data
            const updatedUserProfileData = {
                description,
                profilePicture,
            }

            UserProfile.findByIdAndUpdate(userProfileId, updatedUserProfileData, { new: true })
                .then(updatedUserProfile => {
                    if (updatedUserProfile) {
                        res.status(200).json(updatedUserProfile);
                    } else {
                        res.status(404).send('User profile not found.');
                    }
                })
                .catch(error => {
                    console.error(error);
                    res.status(500).send('Internal server error.');
                });
        } else {
            res.status(401).send('User is not authenticated.');
        }
    });

    router.get('/getAllPosts', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Post.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllComments', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Comment.find({ post: req.query.postId });
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllFriends', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const queryFriendships = Friendship.find({
                $or: [
                    { user1: req.user },
                    { user2: req.user }
                ]
            });

            queryFriendships.then(friendships => {
                const friendIds = friendships.map(friendship => {
                    return String(friendship.user1) == String(req.user) ? friendship.user2 : friendship.user1;
                });

                const queryUsers = User.find({
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
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/isAdmin', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.findById(req.user);
            query.then(data => {
                console.log(data);
                res.status(200).send(data && data.role === 'admin');
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })

        } else {
            res.status(500).send(false);
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deletePost', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Post.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.delete('/deleteComment', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = Comment.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.post('/friend-request', async (req: Request, res: Response) => {
        try {
            const { user1Id, user2Id } = req.body;
    
            // Ellenőrizd, hogy a felhasználók léteznek-e
            const user1 = await User.findById(user1Id);
            const user2 = await User.findById(user2Id);
    
            if (!user1 || !user2) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Ellenőrizd, hogy a barátság még nem létezik
            const existingFriendship = await Friendship.findOne({
                $or: [
                    { user1: user1Id, user2: user2Id },
                    { user1: user2Id, user2: user1Id }
                ]
            });
    
            if (existingFriendship) {
                return res.status(400).json({ message: 'Friendship already exists' });
            }
    
            // Ha minden rendben, létrehozunk egy új barátságot
            const friendship = new Friendship({ user1: user1Id, user2: user2Id });
            await friendship.save();
    
            res.status(200).json({ message: 'Friendship created successfully' });
        } catch (error) {
            console.error('Error creating friendship:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    });
    

    return router;
}