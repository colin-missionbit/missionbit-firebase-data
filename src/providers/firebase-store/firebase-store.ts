import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

/*
  Generated class for the FirebaseStoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseStoreProvider {

  constructor(public afs: AngularFirestore) {
    console.log('Hello FirebaseStoreProvider Provider');
  }

  listMovies(){
    return this.afs.collection('/movies').snapshotChanges().pipe(    
        map(actions => actions.map(item => {
          const id = item.payload.doc.id;
          const data = item.payload.doc.data();
          data['id'] = id;
          return data;
        }))
    );
  }

  addMovie(value){
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/movies').add({
        title: value.title,
        genre: value.genre,
        year: parseInt(value.year)
      })
      .then(
        (res) => {
          resolve(res)
        },
        err => reject(err)
      )
      })
  }

  deleteMovie(id){
    this.afs.doc('/movies/' + id).delete();
  }

  updateMovie(id, data){
    this.afs.doc('/movies/' + id).update(data);
  }
//  deleteTest(vaule){
//    console.log(this.afs.doc('/movies/aUH59m3pUA2evnTgVL9F').update({title: "foo"}));
   // console.log(this.afs.doc('/movies/aUH59m3pUA2evnTgVL9F').delete());
  //}

}
