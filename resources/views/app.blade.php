<!DOCTYPE html>
<html lang="{{str_replace('_', '-', app()->getLocale())}}">
    <head>
        <x-head
            :title="config('constants.meta.title')"
            :description="config('constants.meta.description')"
            :imgUrl="asset('img/og.png?v=4')"
            :twitterHandle="config('constants.meta.twitterHandle')"
        />
    </head>
    <body>
        <x-svg-resources />
        <div id="js-container" class="container"></div>
        <script>
            const constants = {{Js::from(config('constants'))}};
            const tags = {{Js::from($tags)}};
        </script>
    </body>
</html>
