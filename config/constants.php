<?php

$isConsole = app()->runningInConsole();

return [
    'resumeUrl' => $isConsole ? '' : asset('doc/resume.pdf'),
    'emailAddress' => 'daniel.pugsley@gmail.com',
    'bio' => [
        'name' => env('APP_NAME'),
        'subtitle' => 'Full stack web developer',
        'avatar' => [
            'imgUrls' => [
                '_1x' => $isConsole ? '' : asset('img/bio/avatar.jpg'),
                '_2x' => $isConsole ? '' : asset('img/bio/avatar-2x.jpg'),
            ],
            'tags' => [
                'imgUrls' => [
                    'small' => [
                        '_1x' => $isConsole ? '' : asset('img/bio/tags/small.png'),
                        '_2x' => $isConsole ? '' : asset('img/bio/tags/small-2x.png'),
                    ],
                    'med' => [
                        '_1x' => $isConsole ? '' : asset('img/bio/tags/med.png'),
                        '_2x' => $isConsole ? '' : asset('img/bio/tags/med-2x.png'),
                    ],
                    'large' => [
                        '_1x' => $isConsole ? '' : asset('img/bio/tags/large.png'),
                        '_2x' => $isConsole ? '' : asset('img/bio/tags/large-2x.png'),
                    ],
                ],
                'imgAlt' => 'PHP • SQL • JavaScript • CSS • PHP • SQL • JavaScript • CSS • PHP • SQL • JavaScript',
                'scrollRatio' => 0.6,
                'friction' => 0.00023,
                'maxAngularVel' => 0.0135,
            ],
        ],
    ],
    'expLoader' => [
        'startTime' => 100,
        'endTime' => 280,
        'logAmount' => 10,
    ],
    'social' => [
        'twitterUrl' => '#',
        'gitHubUrl' => '#',
        'linkedInUrl' => '#',
        'instagramUrl' => '#',
    ],
];
