import { usersData } from '../constants/users';

const DB_NAME = 'UsersDataDB'
const DB_VERSION = 1
const STORE_NAME = 'users'

function openDB() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION)

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
        objectStore.createIndex('name', 'name', { unique: false })
        usersData.forEach(user => objectStore.add(user))
      }
    }

    openRequest.onerror = function (event) {
      reject(event.target.error)
    }

    openRequest.onsuccess = function (event) {
      resolve(event.target.result)
    }
  })
}

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction(STORE_NAME, 'readonly')
      const store = transaction.objectStore(STORE_NAME)
      const getRequest = store.getAll()
      getRequest.onsuccess = function (event) {
        resolve(event.target.result)
      }
      getRequest.onerror = function (event) {
        reject(event.reject.error)
      }
    }).catch(err => console.log(err))
  })
}

function addUser(user) {
  openDB().then(db => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.add(user)
  }).catch(err => console.log(err))
}

function updateUser(user) {
  openDB().then(db => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.put(user)
  }).catch(err => console.log(err))
}

function removeUser(id) {
  openDB().then(db => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    store.delete(id)
  }).catch(err => console.log(err))
}

export { getAllUsers, addUser, updateUser, removeUser }