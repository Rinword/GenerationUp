const firebaseAdmin = require('firebase-admin');
// const db = firebaseAdmin.firestore();
const db = firebaseAdmin.database();
// const userCollection = db.collection('users');
const blueprintsRef = db.ref('blueprints');
const uuidv4 = require('uuid/v4');

class BlueprintService {
    async getAllBlueprints() {
        let blueprints = null;
        await blueprintsRef.once('value', snapshot => {
            console.log('!service', snapshot.val())
            blueprints = snapshot.val();
        }, error => {
            return { message: error.message }
        })

        return blueprints;
    }

    async addBlueprint(data) {
        const id = uuidv4();
        try {
            await blueprintsRef.update({
                [id]: data
            });
        } catch (err) {
            console.log('ERROR DB UPDATE addBlueprint');
            console.log(err);
        }
    }

    async deleteBlueprint(id) {
        try {
            await blueprintsRef.child(id).remove();
        } catch (err) {
            console.log('ERROR DB UPDATE deleteBlueprint');
            console.log(err);
        }
    }
}

module.exports = BlueprintService;
