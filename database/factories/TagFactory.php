<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tag>
 */
class TagFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'PHP',
                'SQL',
                'JavaScript',
                'Node.js',
                'Express.js',
                'HTML',
                'XML',
                'CSS',
                'AWS',
                'Load balancing',
                'Auto-scaling',
                'NGINX',
                'Stripe API',
                'Oxford Dictionary API',
                'Server Sent Events',
                'Figma',
                'Adobe XD',
            ])
        ];
    }
}
