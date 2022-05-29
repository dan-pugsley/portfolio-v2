<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <!-- Fonts -->
        <link href="https://use.typekit.net/fyp6lja.css" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ mix('/css/app.css') }}" rel="stylesheet">

        <!-- Scripts -->
        <script>
            const constants = {{ Js::from(config('constants')) }};

            // TODO: Pass/pull in on page load
            const tags = [
                {id: 0, name: 'All'},
                {id: 1, name: 'C#'},
                {id: 2, name: 'React.js'}
            ];
        </script>
        <script src="{{ mix('/js/app.js') }}" defer></script>
    </head>
    <body>
        <div id="js-container" class="container"></div>
    </body>
</html>
