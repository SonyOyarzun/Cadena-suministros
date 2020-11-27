<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
@laravelPWA

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Cadena de Suministros</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    {{--<script src="https://www.gstatic.com/firebasejs/6.3.4/firebase.js"></script>--}}
    {{-- <script src="{{ asset('firebase-messaging-sw.js') }}" defer></script>--}}
    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js"></script>

    <!-- Styles -->
    <style>
        html,
        body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Nunito', sans-serif;
            font-weight: 200;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links>a {
            color: #636b6f;
            padding: 0 25px;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
        }

        .m-b-md {
            margin-bottom: 30px;
        }
    </style>

<script>

const config = {
        apiKey: "AIzaSyDYfNh7s4SFh2VDJJ9HplC2y7ehO1NhvfE",
        authDomain: "larafire-240b4.firebaseapp.com",
        databaseURL: "https://larafire-240b4.firebaseio.com",
        projectId: "larafire-240b4",
        storageBucket: "larafire-240b4.appspot.com",
        messagingSenderId: "557048720428",
        appId: "1:557048720428:web:690fee0ef9ff5181acf589",
        measurementId: "G-JEJ1MZ09QJ"
    };
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging
        .requestPermission()
        .then(function () {
            return messaging.getToken()
        })
        .then(function (token) {
            console.log(token)

            const params = {
            fcm_token: token
            }

            axios
                .post('/save-device-token', params,{
                    headers: {
                        Authorization: `Bearer ${localStorage.usertoken}`
                    }
                })
                .then(response => {
                    console.log(response)

                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(function (err) {
            console.log("Unable to get permission to notify.", err);
        })

    messaging.onMessage(function (payload) {
        const noteTitle = payload.notification.title;
        const noteOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        }
        new Notification(noteTitle, noteOptions);
    })
          
       
</script>

<body class="back">
    <div id="root"></div>
    <div id="message"></div>
    <div id="load"></div>
    <script src="{{ asset('js/app.js') }}"></script>
  
</body>

</html>