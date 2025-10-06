<?php

$name = env('APP_NAME');
$subtitle = "Senior Full-Stack Developer";
$assetUrl = env('ASSET_URL');
$emailAddress = 'daniel.pugsley@gmail.com';

return [
    'meta' => [
        'title' => $name,
        'description' => "Daniel is a senior full-stack developer specializing in front-end development and React ecosystems. With over 9 years of professional experience across award-winning games, private aviation, ed-tech and betting platforms, he brings obsessive attention to detail and a game-developer’s eye for fluid, responsive interaction. Daniel thrives on complexity, taking pride in building large systems that not only look great, but feel great to use.",
    ],
    'resumeUrl' => "$assetUrl/doc/resume.pdf",
    'mailtoUrl' => "mailto:$emailAddress",
    'meetingUrl' => 'https://calendly.com/dan-pugsley/intro',
    'navBar' => [
        'hideVel' => 0.07,
        'showVel' => 0.185,
    ],
    'bio' => [
        'name' => $name,
        'subtitle' => $subtitle,
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
        'pageSize' => 6,
    ],
    'social' => [
        'gitHubUrl' => 'https://github.com/dan-pugsley',
        'linkedInUrl' => 'https://www.linkedin.com/in/dpugsley/',
        'instagramUrl' => 'https://www.instagram.com/dan_pugsley/',
    ],
    'repoUrl' => 'https://github.com/dan-pugsley/portfolio-v2',
];
