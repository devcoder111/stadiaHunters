import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from "../../providers/auth.service.ts.service";
import { Observable, BehaviorSubject } from 'rxjs';
import { scan, tap, map } from 'rxjs/operators';

interface QueryConfig {
  path: string, //  path to collection
  field: string, // field to orderBy
  limit: number, // limit per query
  reverse: boolean, // reverse order?
  prepend: boolean // prepend to source?
  sort: any
}

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  // Source data
  private _done = new BehaviorSubject(false);
  private _loading = new BehaviorSubject(false);
  _data = new BehaviorSubject<any[]>([]);

  private query: QueryConfig = { 
    path: '',
    field:'',
    limit: 2,
    reverse: false,
    prepend: false,
    sort: {}
  }

  // Observable data
  data: Observable<any> = new Observable();
  done: Observable<boolean> = this._done.asObservable();
  loading: Observable<boolean> = this._loading.asObservable();

  constructor(private afs: AngularFirestore,
    private auth: AuthService
    ) {}

  // Initial query sets options and defines the Observable
  // passing opts will override the defaults
  init(path: string, field: string, opts?: any) {
    this._data = new BehaviorSubject<any[]>([]);
    this._done.next(false)
    this._loading.next(false)

    this.query = { 
      path,
      field,
      limit: 10,
      reverse: false,
      prepend: false,
      ...opts
    }

    this.safeInit()
  }

  async safeInit() {
    this.auth.isLoggedIn().pipe(
      tap(user => {
        if (user) {
          const first = this.afs.collection(this.query.path, ref => {
            return ref
                    .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
                    .limit(this.query.limit)
          })
      
          this.mapAndUpdate(first)
      
          // Create the observable array for consumption in components
          this.data = this._data.pipe(
              scan((acc, val) =>  this.query.prepend ? val.concat(acc) : acc.concat(val)),
              map(array => {
                let result = this.uniqueValues(array)
                result.sort((a, b) => this.doubleSort(a, b, this.query))
                return result
              })
          )
        } else {
          this.auth.anonymousSignIn()
        }
      })
    )
    .subscribe()
  }

  uniqueValues(array: any[]){
    var unique = [];
    var distinct = [];
    for( let i = 0; i < array.length; i++ ){
      if(!unique[array[i]._id]){
        distinct.push(array[i]);
        unique[array[i]._id] = 1;
      }
    }
    return distinct
  }

  doubleSort(a: any, b: any, query: QueryConfig){
    var result = 0
    if (a[query.field] == b[query.field] && query.sort) {
      result = query.sort.reverse ? this.get(b, query.sort.field) - this.get(a,query.sort.field) : this.get(a,query.sort.field) - this.get(b, query.sort.field)
    } else {
      result = query.reverse ? this.get(b, query.field) - this.get(a, query.field) : this.get(a, query.field) - this.get(b, query.field)
    }
    return result
  }

  get(object:any, field: string){
    if(field == 'players'){
      return object[field].length
    } else{
      return object[field]
    }
  }
 
  // Retrieves additional data from firestore
  more() {

    if(this._data.value.length === 0) return
    const cursor = this.getCursor()

    const more = this.afs.collection(this.query.path, ref => {
      return ref
              .orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
              .limit(this.query.limit)
              .startAfter(cursor)
    })
    this.mapAndUpdate(more)
  }


  // Determines the doc snapshot to paginate query 
  private getCursor() {
    const current = this._data.value
    if (current.length) {
      return this.query.prepend ? current[0].doc : current[current.length - 1].doc 
    }
    return null
  }


  // Maps the snapshot to usable format the updates source
  private mapAndUpdate(col: AngularFirestoreCollection<any>) {

    if (this._done.value || this._loading.value) { return undefined };

    // loading
    this._loading.next(true)
    // Map snapshot with doc ref (needed for cursor)
    return col.snapshotChanges(['added', 'removed']).pipe(
      tap(arr => {
        let values = arr.map(snap => {
          const data = snap.payload.doc.data()
          const doc = snap.payload.doc
          return { _id: doc.id, ...data, doc }
        })
  
        // If prepending, reverse the batch order
        values = this.query.prepend ? values.reverse() : values
      
        // update source with new values, done loading
        this._data.next(values)
        this._loading.next(false)

        // no more values, mark done
        if (!values.length) {
          this._done.next(true)
        }
    }))
    .subscribe()

  }
}
