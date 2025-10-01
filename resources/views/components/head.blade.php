<!-- General -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{$title}}</title>
<meta name="title" content="{{$title}}">
<meta name="description" content="{{$description}}">
<meta name="image" content="{{$imgUrl}}">

<!-- Style -->
<link href="https://use.typekit.net/fyp6lja.css" rel="stylesheet">
<link href="{{mix('/css/app.css')}}" rel="stylesheet">

<!-- Google -->
<x-gtag id="G-XNYLMQ4DR7" />
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
<meta name="google-site-verification" content="SdZxZT94YVw3I_kdu4JgsZvFpZrAEfGB5EVLLLVfRCw">

<!-- Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#032f40">
<meta name="msapplication-TileColor" content="#2b5797">
<meta name="theme-color" content="#ffffff">

<!-- Script -->
<script src="{{ mix('/js/app.js') }}" defer></script>

<!-- OG/Facebook -->
<meta property="og:title" content="{{$title}}">
<meta property="og:description" content="{{$description}}">
<meta property="og:image" content="{{$imgUrl}}">
<meta property="og:url" content="{{config('app.url')}}">
<meta property="og:type" content="website">
