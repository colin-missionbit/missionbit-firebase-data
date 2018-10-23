import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseStoreProvider } from '../../providers/firebase-store/firebase-store'
//import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/rx';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movies: Observable<any[]>;
  
  constructor(public navCtrl: NavController, 
    public firebaseProvider: FirebaseStoreProvider, 
    public alertCtrl: AlertController) {
    
      this.movies = firebaseProvider.listMovies();

    //console.log(this.movies);
    const myObserver = {
      next: x => {
       console.log("Got next value: ");
       console.log(x)},
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification'),
    };
    this.movies.subscribe(myObserver);
  }

  addMovie(){
    let prompt = this.alertCtrl.create({
      title: 'Add Movie',
      message: "Add a new movie",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'genre',
          placeholder: 'Genre'
        },
        {
          name: 'year',
          placeholder: 'Year',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.addMovie(data);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteMovie(title, id){
    const confirm = this.alertCtrl.create({
      title: 'Delete this movie?',
      message: 'Do you really want to delete "' + title + '"?',
      buttons: [
        {
          text: 'Cancel',          
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.deleteMovie(id);  
          }
        }
      ]
    });
    confirm.present();
  }

  updateMovie(item){
    let prompt = this.alertCtrl.create({
      title: 'Edit movie',
      message: "Edit movie data",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: item.title
        },
        {
          name: 'genre',
          placeholder: 'Genre',
          value: item.genre
        },
        {
          name: 'year',
          placeholder: 'Year',
          type: 'number', 
          value:item.year
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.firebaseProvider.updateMovie(item.id, data);
          }
        }
      ]
    });
    prompt.present();
  }

    // addTest(){
    //   console.log("test!");
    //   this.firebaseProvider.addMovie({title: "test1", genre: "test2", year: 1977 });
    // }

    // deleteTest(){
    //   this.firebaseProvider.deleteTest();
    // }

}
