<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Project;
use App\Models\Resource;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Company::factory(3)->create();
        $projects = Project::factory(7)->create();
        $projects = $projects->merge(Project::factory(3)->personal()->create());
        Resource::factory(20)->create();
        Resource::factory(4)->video()->create();

        $numTags = 15;
        $tags = Tag::factory($numTags)->create();

        foreach ($projects as $project)
        {
            $numTagsToAttach = rand(2, 4);
            $tagIndex = rand($numTagsToAttach, $numTags - 1);

            while ($numTagsToAttach--)
                $project->tags()->attach($tags[--$tagIndex]);
        }
    }
}
