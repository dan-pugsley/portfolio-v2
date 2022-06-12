<?php

$assetUrl = env('ASSET_URL');
$name = env('APP_NAME');
return [
    'meta' => [
        'description' => "$name is a full stack web developer who co-founded and built Wordpool.",
        'twitterHandle' => '@dan_pugsley',
    ],
    'resumeUrl' => "$assetUrl/doc/resume.pdf",
    'emailAddress' => 'daniel.pugsley@gmail.com',
    'navBar' => [
        'hideVel' => 0.07,
        'showVel' => 0.185,
    ],
    'bio' => [
        'name' => $name,
        'subtitle' => 'Full Stack Web Developer',
        'avatar' => [
            'imgUrl' => [
                'x1' => "$assetUrl/img/avatar.jpg",
                'x2' => "$assetUrl/img/avatar-2x.jpg",
            ],
            'tags' => [
                'imgUrls' => [
                    'small' => [
                        'x1' => "$assetUrl/img/tags/small.png",
                        'x2' => "$assetUrl/img/tags/small-2x.png",
                    ],
                    'med' => [
                        'x1' => "$assetUrl/img/tags/med.png",
                        'x2' => "$assetUrl/img/tags/med-2x.png",
                    ],
                    'large' => [
                        'x1' => "$assetUrl/img/tags/large.png",
                        'x2' => "$assetUrl/img/tags/large-2x.png",
                    ],
                ],
                'imgAlt' => 'React, Laravel, SQL, JavaScript, CSS, HTML, Node.js, PHP, Swift, C#, C++, Autoscaling, AWS, Load balancing, S3',
                'scrollRatio' => 0.6,
                'friction' => 0.00023,
                'maxAngularVel' => 0.0135,
            ],
        ],
    ],
    'exp' => [
        'loader' => [
            'startTime' => 100,
            'endTime' => 280,
            'logAmount' => 10,
        ],
        'pageSize' => 4,
    ],
    'social' => [
        'twitterUrl' => 'https://twitter.com/dan_pugsley',
        'gitHubUrl' => 'https://github.com/dan-pugsley',
        'linkedInUrl' => 'https://www.linkedin.com/in/dpugsley/',
        'instagramUrl' => 'https://www.instagram.com/dan_pugsley/',
    ],
    'repoUrl' => 'https://github.com/dan-pugsley/portfolio-v2',
];
