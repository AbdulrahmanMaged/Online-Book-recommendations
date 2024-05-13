import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ObservableLike } from 'rxjs';



@Component({
  selector: 'app-db-remover',
  templateUrl: './db-remover.component.html',
  styleUrl: './db-remover.component.css', 

})
export class DbRemoverComponent implements OnInit{
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];

  books!: any[];


  Message() {
    this.bookRemovedMessage="Book Removed Sucessfully"
  }



  bookRemovedMessage: string | null = null;
  userArray: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private activateRoute:ActivatedRoute,
    
  ){}

  ngOnInit(): void {
this.getBooks();
  }

getBooks(){

  this.httpClient.get<any[]>('https://project-database-1b68a-default-rtdb.firebaseio.com/booksDatabase.json')
  .subscribe((Response) => {
    this.books = Object.values(Response);
    this.userArray = Object.values(Response);
    console.log(this.userArray);
    console.log(this.userArray[1]);
  }
);

}

  onDeleteBook(bookKey:string,book:Object){
    console.log(bookKey);
    for (let i = 0; i < this.userArray.length; i++) {
      if (this.userArray[i].bookId === bookKey) {
        // Do something if bookId matches bookKey

        this.httpClient.delete(
          'https://project-database-1b68a-default-rtdb.firebaseio.com/booksDatabase/book.json',
          this.userArray[i]
        )
        .subscribe((Response) => console.log(Response));
      }




        console.log('Book found:', this.userArray[i]);
        break; // Exit loop if book is found
      }
    }

    /*
    this.httpClient.get('https://project-database-1b68a-default-rtdb.firebaseio.com/booksDatabase.json', {
      params: new HttpParams()
      .set("orderBy",'"bookId"')
      .set('equalTo',`"${book.}"`)})
      .subscribe(user =>{
        const userArray = Object.values(user);
        const matchedUser = userArray.find((user: any) => user.username === loginForm.value.username);
*/
  }



 



