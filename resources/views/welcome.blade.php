<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
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

            .links > a {
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

            #logo{              
                position: absolute;
                margin-left:auto;
                margin-right:auto;
                left:0;
                right:0;
                margin-top: auto;
                margin-bottom:auto;
                top: 0;
                bottom: 0;
            }

            #back{
                background: url('img/cadena.gif');
                background-position: center center;
                background-repeat: no-repeat;
                background-size: cover;
                height: 100vh;
                width: 100%;
            }
            #head{
               background-color: wheat;
            }
        </style>
    </head>
    <body id="back">
        <div class="flex-center position-ref full-height">
            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                    <a style="color:white" href="{{ url('/home') }}">Home</a>
                    @else
                        <a style="color:white" href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                        <a style="color:white" href="{{ route('register') }}">Register</a>
                        @endif
                    @endauth
                </div>
            @endif
<!--            <div class="content">

                     <img id='logo' src="{{URL::asset('img/logo.png')}}">
              
            </div>-->
        </div>
    </body>
</html>
