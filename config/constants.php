<?php

$name = env('APP_NAME');
$role = 'React specialist';
$assetUrl = env('ASSET_URL');
$twitterUsername = 'dan_pugsley';
$emailAddress = 'dan@pugs.ly';
return [
    'meta' => [
        'title' => $name,
        'description' => "$name is a $role, who loves building complex, highly interactive UI for anything from video games to fine-art portfolios.",
        'twitterHandle' => "@$twitterUsername",
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
        'subtitle' => $role,
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
        'twitterUrl' => "https://twitter.com/$twitterUsername",
        'gitHubUrl' => 'https://github.com/dan-pugsley',
        'linkedInUrl' => 'https://www.linkedin.com/in/dpugsley/',
        'instagramUrl' => 'https://www.instagram.com/dan_pugsley/',
    ],
    'repoUrl' => 'https://github.com/dan-pugsley/portfolio-v2',
];
