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

    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js"></script>

    <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
    <script src="https://www.gstatic.com/firebasejs/8.1.1/firebase-analytics.js"></script>

    <script>
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        var firebaseConfig = {
            apiKey: "AIzaSyBk9Y7_TsbZiA0lciQ1vvwSo3ez8jtYtso",
            authDomain: "cadenasuministros.firebaseapp.com",
            databaseURL: "https://cadenasuministros.firebaseio.com",
            projectId: "cadenasuministros",
            storageBucket: "cadenasuministros.appspot.com",
            messagingSenderId: "967812490146",
            appId: "1:967812490146:web:ab6fd137d2a80de9d548fb",
            measurementId: "G-T7Q6EB91JH"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    </script>

</head>

<script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
    {{--<script src="https://www.gstatic.com/firebasejs/6.3.4/firebase.js"></script>--}}
   {{-- <script src="{{ asset('firebase-messaging-sw.js') }}" defer></script>--}}
    <script src="https://www.gstatic.com/firebasejs/7.23.0/firebase.js"></script>
    <script>
        $(document).ready(function(){
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
                .then(function(token) {
                    console.log(token)
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    });
                    $.ajax({
                        url: '{{ URL::to('/save-device-token') }}',
                        type: 'POST',
                        data: {
                            user_id: {!! json_encode(Auth::id() ?? '') !!},
                            fcm_token: token
                        },
                        dataType: 'JSON',
                        success: function (response) {
                            console.log(response)
                        },
                        error: function (err) {
                            console.log(" Can't do because: " + err);
                        },
                    });
                })
                .catch(function (err) {
                    console.log("Unable to get permission to notify.", err);
                });

            messaging.onMessage(function(payload) {
                const noteTitle = payload.notification.title;
                const noteOptions = {
                    body: payload.notification.body,
                    icon: payload.notification.icon,
                };
                new Notification(noteTitle, noteOptions);
            });
        });
    </script>


<body class="back">
    <div id="root"></div>
    <div id="message"></div>
    <div id="load"></div>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>