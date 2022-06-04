<!DOCTYPE html>
<html lang="{{str_replace('_', '-', app()->getLocale())}}">
    <head>
        <x-head
            :title="config('app.name')"
            :description="config('constants.meta.description')"
            :imgUrl="config('constants.meta.imgUrl')"
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
