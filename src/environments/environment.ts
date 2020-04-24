// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  zoom : {
    zoomClientId: "eezr713VT0u99HLZYP6wng",
    redirect_url: "https%3A%2F%2Fmtute.herokuapp.com%2Fzoom"
  },
  // firebase : {
  //   apiKey: "AIzaSyAVyXc1Tqi46-xY1RJ_UjyUBujyIP6n5R0",
  //   authDomain: "questionproject-58e1c.firebaseapp.com",
  //   databaseURL: "https://questionproject-58e1c.firebaseio.com",
  //   projectId: "questionproject-58e1c",
  //   storageBucket: "questionproject-58e1c.appspot.com",
  //   messagingSenderId: "259814585439",
  //   appId: "1:259814585439:web:6cd749ecc264126d6817ea",
  //   measurementId: "G-ETC2N83QMY"
  // }

  firebase : {
    apiKey: "AIzaSyD04gUUUibi9QCt47geqWxi9AX7k28zRHk",
    authDomain: "mtute-sl.firebaseapp.com",
    databaseURL: "https://mtute-sl.firebaseio.com",
    projectId: "mtute-sl",
    storageBucket: "mtute-sl.appspot.com",
    messagingSenderId: "922851090683",
    appId: "1:922851090683:web:3ce6ee9c254910e310905e",
    measurementId: "G-VCYP7E3WM3"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

// serviceaccountkey.js in backend
// {
//   "type": "service_account",
//   "project_id": "mtute-sl",
//   "private_key_id": "7d873a9e178b343577f681dc96ec9123734df348",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCaUnRMCg2n/51p\nOZMD/yF3dqHXGIHsi9kzWu9sFJnTST42Oqc2xvOXjIze+5EQTvDwGPt+C/Wn1uEd\nYXIqmTOORb4BBQwYIFfGtTsXjMi6eRfy0Yt9mLw9mLFMbRPMcdZYJB66jLy2QxNq\nNWC/554jVu3JJ5qLjkHFowxEnNmahYzVXDExEr1NcY7vOARYOlphK4Fe8tUrlYMM\nz2X4i4yKPrStzWDSj6xCxo8IkuieEUYtS6GhlW1mIva3RS71PqkOSE+6xMIZW5Xo\nfyKnfz/cvZjebpBnoZ2ZZvDwstIzCgN2nWzmf+74ugJBHep6MG3HhlYlkdKXrRLV\nSAlzKqKFAgMBAAECggEAIXutbwgpYV+VPEz5KH9VOBHd2IkhO302Ya2j0AwCOjUk\nkeiU+k4dcS7WK9ViaqruHPIWswkOQl3dlx3bAwIdjQt1x8vcDWoLEXql+RybOtZm\nS1GK1fPrN+Qm5+Gsz4mNi68+mZRKp7MTBdLSDKFJDvrf+eqlXg0+GQ8g7MwpbJyh\n6nfZPtX5PR8u8at/sCVAqFSEKc1pMNpEbib/4idu20Q4OZ/Bjsqr6OXtQ7hpi5K4\nf4707d8V9DuTi5oVIILwZVUDR4ZpRbBWejYJm3EMvc2ckyt7328v3b1ic5TRxwi/\nDjVVTJod45N+cTTbm6a0mqsqTCAd/7Cw9+fYGLbcMQKBgQDWjCFaAl770NxY4mtY\noymJzl9kZdNJSWm2O9mhIbyAANnREp/a6C8ijaKxniXFVKR+X8LGlhGLbBr1o89A\nPwIRygy22UjNbZ5BhfVzkcVi0XNQjyhRc7blPjJO/0BWMlN8MaNhVHeli6qLuR6X\n+Trb8eUlQFi2V1cCHlO9A3GkbQKBgQC4I3sZmlKk1RtxknCqq2PQbYuI8WzoSAta\nTokLooezfPF/A8TpKuygy7XaF2jEaK7g/BMF9+HT7aKmF6c2eM7H0SNvP0UMg74w\n2GENrOOegLYW266lqfd2D1WlwGIIIp8/klAC8q0nTlbyA2WFrapIneLZpT2JdrQD\nb3T8t1K3eQKBgQCp9OAGuZIc0Vt8XgDDep1ROVZ/5dn2WF2Rqt+/sUXt8L6bzLEt\nbHjKWoDjS3CIXYDhS2K0hfToCX9hz55COqedB/4CayYs9gVDyqaiInvGyD0dOAqs\nW4orF5Yq1jFVFxDjdT8DvzH4xicYAFGn+hsSWRE47TxZVd7rIrMbLDs+EQKBgBpb\nkdJfYbcQfiYqpQ/5CoeaNp/6lvFE5sMdfMZ6lFwf5V2eB4Cs0URPBI/cS/XZWjcA\nPiTbj6rLWD3YIupMLqUxjZXuA49ACGhrgLD5b3ePywDIn149TxvKJCNev2mUsyDh\na6yQWjLHJvDrhYu2CSrt1rv6yC02HZxkRuWpxCBZAoGBAMzOhxEVztbdoVaH1HW4\nlstJMVjvY2e9SQpcbOD72hN0rSr3AsKPF4IGWRoYkkLrVcIOdMmM+sIeGWbfmeyr\nkdxDZ+IZmZjYyZYQowXpibLIGPJwwVIjTq6DPfcggVZZ2OMBiXEg5XJc469FNDWZ\nVVDKt8UwZOXIwp5WusilGMtX\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-kawl7@mtute-sl.iam.gserviceaccount.com",
//   "client_id": "113150970014055287122",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kawl7%40mtute-sl.iam.gserviceaccount.com"
// }

// {
//   "type": "service_account",
//   "project_id": "questionproject-58e1c",
//   "private_key_id": "d19574a7a70ec9d1ecaddf0921ad9f7f9d365525",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqxBsEMboQgkNT\na8ZQ53KnQ3fxY5gUDujcJ0hXygL0TvBK86LPg1GjNcdFXfT6xbL27s4rzoeA89Tk\nS97hnnZbhxd45uhcUUbm3ePyOQzjKpdG0N47ou1p4Y6KEBd9bgizAEdPH9mu9LMM\nw2KmUc7a20MAkLWZCghCAiR38zkNPQPh/OKfIHHJPDS5fcVr+X3kiCyeHl3nUuZZ\n3XATA9oxZzyOuCK4lfruZ3JmYYtS0eWGoB09jJIyi+41qtQxq1BWzgLaA/fiJC8r\n7AYQ3WVzmxE7tuv62X+EQfVRUcF1jBkb5Fqwlm7dGDPSJ6O7PqJ9HqZt/dGemqiB\ndSooCLmDAgMBAAECggEAO8oBs4w9mz4gmHqpqvX+XLXwruGyA4Pc4AgY+jPOqP9i\nfrujC4js8noH1S+6cHr72B1wrkHXi7zTk0NFPDWhNxarjzc5r+j9LCQQhWSYMIlf\nAfprdPHssh+5KnnL36zA+vtj/D4ol2sxrYxTY+xMwq/2W6JPEtBCZ+ocHqtYFFvw\nHUudxowS7zzr/eVO447oRWNyPhSS0npDQn7FMKNeXWydBIybNqH+v2ZWVQ5zwWc3\n+kucmwL8aCv4Upca/UpXu+n/ElLsQeXL6o0UbQCGDT9Vl/LzWvuZD/mW5f+8e62D\n0A94bFN1rK0aHmEjPAKFqPpPei2/KNi0gGMsVgT7EQKBgQDX4151q5bODD4grZDL\n7HmSOTJOxQnzniq73ejrH6Nja/OSze5R9DULFrFGMXrZblrojIGKNDIqT4ot1U5K\ncemMVXk4qXZT363NAGmkNM7CXq08A9OLT1g2z503oE3CxjkkVuMFvQ6vmlb2QaMa\neJs4zS6vUDMUwvZRH9QbOXwYfQKBgQDKfoV9Xz7UO44NUjhieOWxeRbQPf5WWSps\nKn02v9OzYzfKrKp9hltMbVULytCvWbASiXyXpf8sYv3RnkmCcr0uFF4PpbKsl1BG\nRkYrkg5KY5zIIOCNNTvvE/sVYxzp1BioQxr8l9L3EJBMdAgwTo5rdKEJyYBJKDj6\nKqzancK5/wKBgQDS0zdrsiWTEmGZh+XfPw95vGFkiwcs4UjaLdtHwZ3NeZ5jvrb9\nUX57Va3I3okZzKr6bjwSuuZCa2qFV8kc6iEo6k93BgaH4efYSo7fzLIdHlgOQ65S\nXSnIXPcrW2CU1P74feE1uWqeEhraYT7mmuD6l2T/z1IS9FGW5347F+gYAQKBgEo4\nJ4t1Xp0BmyZszXfiYiYzgNYg8tkJY5Az3qMzmk+0/R0PPoo1tb8Ej9h7pROwZuXU\neNNIp4fIXMn5H25tycNa+cL4c83oxCaN2Whc51oCutNroYKAUZBmnXAQXOejssnx\nlrGgoFWoP4uWN+4kzPS70c65iYjG8mNXQvX6PwZXAoGADSTzYoBGLEbVSZqNT+Bz\nzRI+oqs5TTLd8Z85Yj8SN7LMP9PMaYk9kYX8k35fUkYv/C5aV5TWE3S90INepBx0\n9zPmq4CUboMd0WUwVRy88LSdWYndWDb0VadlCaI6899tMfyHwlgNHzHCXY1PrqlV\nCoR5+Lg+4oCK3EqfyNRi49E=\n-----END PRIVATE KEY-----\n",
//   "client_email": "firebase-adminsdk-kwpx0@questionproject-58e1c.iam.gserviceaccount.com",
//   "client_id": "113846447050062899523",
//   "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//   "token_uri": "https://oauth2.googleapis.com/token",
//   "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//   "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kwpx0%40questionproject-58e1c.iam.gserviceaccount.com"
// }
