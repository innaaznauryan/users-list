import { usersData } from '../constants/users';

const DB_NAME = 'UserDataDB'
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

function withStore(type, callback) {
  return openDB().then(db => {
    const transaction = db.transaction(STORE_NAME, type)
    const store = transaction.objectStore(STORE_NAME)

    return callback(store)
  })
}

async function addUser(user) {
  return await withStore('readwrite', store => {
    store.add(user)
  })
}

async function getAllUsers() {
  return await withStore('readonly', store => {
    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = function (event) {
        resolve(event.target.result)
      }
      request.onerror = function (event) {
        reject(event.target.error)
      }
    })
  })
}

async function updateUser(user) {
  return await withStore('readwrite', store => {
    store.put(user)
  })
}


async function removeUser(id) {
  return await withStore('readwrite', store => {
    store.delete(id)
  })
}

export { addUser, getAllUsers, updateUser, removeUser }