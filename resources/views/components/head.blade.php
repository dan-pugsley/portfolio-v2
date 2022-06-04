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
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="alternate icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
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

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="{{$twitterHandle}}">
<meta name="twitter:creator" content="{{$twitterHandle}}">
<meta name="twitter:title" content="{{$title}}">
<meta name="twitter:description" content="{{$description}}">
<meta name="twitter:image" content="{{$imgUrl}}">