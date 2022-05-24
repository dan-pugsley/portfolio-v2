<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'company_id' => $this->faker->randomElement(Company::pluck('id')->toArray()),
            'name' => $this->faker->unique()->randomElement([
                'Calorie app',
                'Simple sleep log',
                'Wordpool',
                'Interactive book',
                'Not Telling You Blog',
                'Achtung! Cthulhu',
                'Steve Jackson\'s Ogre',
                'Mars Horizon',
                'Plague Inc. Evolved',
                'Zombie FPS game',
                'Portfolio',
            ]),
            'role' => $this->faker->randomElement([
                'Programmer',
                'Lead programmer',
                'Web developer',
                'Co-founder/CTO',
            ]),
            'duration' => $this->faker->randomElement([
                '1 yr 10 mos',
                '1 week',
                '1 mo',
                '7 mos',
                '1 yr',
            ]),
            'github_url' => 'https://github.com/dnpgsly/portfolio-v2',
            'live_url' => 'https://pugs.ly/',
            'description' => $this->faker->realTextBetween(200, 500),
            'started_at' => $this->faker->dateTimeBetween('-7 years'),
        ];
    }
    
    public function personal()
    {
        return $this->state(function (array $attributes) {
            return [
                'company_id' => null,
                'role' => null,
            ];
        });
    }
}
