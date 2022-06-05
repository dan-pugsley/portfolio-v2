<?php

$isConsole = app()->runningInConsole();

return [
    'meta' => [
        'description' => 'Daniel Pugsley is a full-stack web developer specialising in large, complex projects using Laravel and React.js.',
        'twitterHandle' => '@pugs_ly',
    ],
    'resumeUrl' => $isConsole ? '' : asset('doc/resume.pdf'),
    'emailAddress' => 'daniel.pugsley@gmail.com',
    'navBar' => [
        'hideVel' => 0.07,
        'showVel' => 0.185,
    ],
    'bio' => [
        'name' => env('APP_NAME'),
        'subtitle' => 'Full stack web developer',
        'avatar' => [
            'imgUrl' => [
                'x1' => $isConsole ? '' : asset('img/bio/avatar.jpg'),
                'x2' => $isConsole ? '' : asset('img/bio/avatar-2x.jpg'),
            ],
            'tags' => [
                'imgUrls' => [
                    'small' => [
                        'x1' => $isConsole ? '' : asset('img/bio/tags/small.png'),
                        'x2' => $isConsole ? '' : asset('img/bio/tags/small-2x.png'),
                    ],
                    'med' => [
                        'x1' => $isConsole ? '' : asset('img/bio/tags/med.png'),
                        'x2' => $isConsole ? '' : asset('img/bio/tags/med-2x.png'),
                    ],
                    'large' => [
                        'x1' => $isConsole ? '' : asset('img/bio/tags/large.png'),
                        'x2' => $isConsole ? '' : asset('img/bio/tags/large-2x.png'),
                    ],
                ],
                'imgAlt' => 'PHP • SQL • JavaScript • CSS • PHP • SQL • JavaScript • CSS • PHP • SQL • JavaScript',
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
        'twitterUrl' => '#',
        'gitHubUrl' => '#',
        'linkedInUrl' => '#',
        'instagramUrl' => '#',
    ],
    'repoUrl' => 'https://github.com/dnpgsly/portfolio-v2',
];
