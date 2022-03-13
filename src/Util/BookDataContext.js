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



       // ------------- Filter Logic START -------------

       Filter = (companyName, city, district, street, postalCode, category, subCategory) => {


              let q = query(bookCollectionRef)

              if (companyName !== "") {
                     q = query(q, where("name", "==", companyName))
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

       // ------------- Filter Logic END -------------


       // ----------------------- Total Search Results Logic START -----------------------

       Results = (companyName, city, district, street, postalCode, category, subCategory) => {


              let r = query(bookCollectionRef)

              if (companyName !== "") {
                     r = query(r, where("name", "==", companyName))
              }
              if (city !== "") {
                     r = query(r, where("city", "==", city))
              }
              if (district !== "") {
                     r = query(r, where("district", "==", district))
              }

              if (street !== "") {
                     r = query(r, where("street", "==", street))
              }

              if (postalCode !== "") {
                     r = query(r, where("postalCode", "==", postalCode))
              }
              if (category !== "") {
                     r = query(r, where("category", "==", category))
              }
              if (subCategory !== "") {
                     r = query(r, where("subCategory", "==", subCategory))
              }
        
              return getDocs(r);
       }

       // ----------------------- Total Search Results Logic END -----------------------




       GetNext = (companyName, city, district, street, postalCode, category, subCategory, lastDoc) => {

              let q = query(bookCollectionRef)

              if (companyName !== "") {
                     q = query(q, where("name", "==", companyName))
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
