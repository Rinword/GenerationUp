const firebaseAdmin = require('firebase-admin');
// const db = firebaseAdmin.firestore();
const db = firebaseAdmin.database();
// const userCollection = db.collection('users');
const userRef = db.ref('users');

class UserService {
    async getAllUsers() {
        let users = null;
        await userRef.once('value', snapshot => {
            console.log('!service', snapshot.val())
            users = snapshot.val();
        }, error => {
            return { message: error.message }
        })

        return users;

        // return await userCollection.get().then(snapshot => {
        //     return snapshot.forEach(item => users.push(item.data()))
        // }).catch(error => {
        //     return { message: error.message }
        // })
    }

    async setUserData(data) {
        const { name = 'player2' } = data;
        try {
            await userRef.update({
                    [name]: {
                        blueprints: [
                            {
                                name: 'Devotion',
                                rare: 1,
                                stat1: 'strength'
                            },
                            {
                                name: 'Silence',
                                rare: 2,
                                stat1: 'spirit'
                            }
                        ],
                        characters: [
                            {
                                name: 'Joe',
                                level: 12,
                                class: '14'
                            },
                            {
                                name: 'Aeryn',
                                level: 8,
                                class: '05'
                            }
                        ]
                    }
            });
        } catch (err) {
            console.log('ERROR DB UPDATE setUserData');
            console.log(err);
        }
    }
}

module.exports = UserService;
