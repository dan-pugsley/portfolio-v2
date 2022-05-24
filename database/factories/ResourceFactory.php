<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'project_id' => $this->faker->randomElement(Project::Pluck('id')->toArray()),
            'name' => $this->faker->randomElement([
                'Achtung! Cthulhu Poster',
                'Achtung! Cthulhu Gameplay',
                'Ogre Gameplay',
                'Plague Inc. Evloved Poster',
            ]),
            'url' => $this->faker->randomElement([
                'https://cdn.akamai.steamstatic.com/steam/apps/874460/capsule_616x353.jpg?t=1592571523',
                'https://i.ytimg.com/vi/pSat_gLDXPc/maxresdefault.jpg',
                'https://cdn.akamai.steamstatic.com/steam/apps/765810/capsule_616x353.jpg?t=1623144957',
                'https://cdn.mos.cms.futurecdn.net/a5fgK9428EwVEy2FGiUXoG.png',
                'https://assets2.rockpapershotgun.com/ogre.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/ogre.jpg',
                'https://cdn.cloudflare.steamstatic.com/steam/apps/517780/capsule_616x353.jpg?t=1652890621',
            ]),
        ];
    }
    
    public function video()
    {
        return $this->state(function (array $attributes) {
            return [
                'url' => $this->faker->randomElement([
                    'https://youtu.be/pSat_gLDXPc',
                    'https://youtu.be/O6has2MD6e0',
                ]),
                'is_video' => true,
            ];
        });
    }
}
