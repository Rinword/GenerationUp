const firebaseAdmin = require('firebase-admin');
// const db = firebaseAdmin.firestore();
const db = firebaseAdmin.database();
// const userCollection = db.collection('users');
const itemsRef = db.ref('user/player3/storage/items');
const uuidv4 = require('uuid/v4');

class BlueprintService {
    async getAllItems() {
        let items = null;
        await itemsRef.once('value', snapshot => {
            items = snapshot.val();
        }, error => {
            return { message: error.message }
        })

        return items;
    }

    async addItem(data) {
        const id = uuidv4();
        console.log('HERE', data);
        try {
            await itemsRef.update({
                [id]: data
            });
        } catch (err) {
            console.log('ERROR DB UPDATE addItem');
            console.log(err);
        }
    }

    async deleteItem(id) {
        try {
            await itemsRef.child(id).remove();
        } catch (err) {
            console.log('ERROR DB UPDATE deleteItem');
            console.log(err);
        }
    }
}

module.exports = BlueprintService;
