import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, query, where, orderBy, limit, startAfter } from "firebase/firestore";


const bookCollectionRef = collection(db, "companies");
class BookDataService {

       // 1) insert
       // newBook is the new record
       addBooks = (newBook) => {
              return addDoc(bookCollectionRef, newBook);
       };

       // 2) Update
       // bookDoc -> Existing record
       // updatedBook -> Updated record
       updateBook = (id, updatedBook) => {
              const bookDoc = doc(db, "companies", id);
              return updateDoc(bookDoc, updatedBook)
       };

       // 3) Delete
       deleteBook = (id) => {
              const bookDoc = doc(db, "companies", id);
              return deleteDoc(bookDoc);
       };

       // 4) Fetch All Books in db
       getAllBooks = () => {

              const q = query(bookCollectionRef, limit(5))
              return getDocs(q);
       };

       // 5) Fetch an individual book
       getBook = (id) => {
              const bookDoc = doc(db, "companies", id);
              return getDoc(bookDoc);
       }



       //testing method

       Filter = (companyName, country, city, district, street, postalCode, category, subCategory) => {



              let q = query(bookCollectionRef)

              if (companyName !== "") {
                     q = query(q, where("name", "==", companyName))
              }
              if (country !== "") {
                     q = query(q, where("country", "==", country))
              }
              if (city !== "") {
                     q = query(q, where("city", "==", city))
              }
              if (district !== "") {
                     q = query(q, where("district", "==", district))
              }

              if (street !== "") {
                     q = query(q, where("street", "==", street))
              }

              if (postalCode !== "") {
                     q = query(q, where("postalCode", "==", postalCode))
              }
              if (category !== "") {
                     q = query(q, where("category", "==", category))
              }
              if (subCategory !== "") {
                     q = query(q, where("subCategory", "==", subCategory))
              }

              q = query(q, limit(20))



              return getDocs(q);
       }


       GetNext = (companyName, country, city, district, street, postalCode, category, subCategory, lastDoc) => {

              let q = query(bookCollectionRef)

              if (companyName !== "") {
                     q = query(q, where("name", "==", companyName))
              }
              if (country !== "") {
                     q = query(q, where("country", "==", country))
              }
              if (city !== "") {
                     q = query(q, where("city", "==", city))
              }
              if (district !== "") {
                     q = query(q, where("district", "==", district))
              }

              if (street !== "") {
                     q = query(q, where("street", "==", street))
              }

              if (postalCode !== "") {
                     q = query(q, where("postalCode", "==", postalCode))
              }
              if (category !== "") {
                     q = query(q, where("category", "==", category))
              }
              if (subCategory !== "") {
                     q = query(q, where("subCategory", "==", subCategory))
              }


              q = query(q, startAfter(lastDoc), limit(20));

              return getDocs(q);

       }




       QueryMaker = (feild, feildvalue) => {

              const q = query(bookCollectionRef, orderBy('name', 'desc'))
              return q
       }


}

export default new BookDataService();
