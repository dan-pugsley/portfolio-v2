<?php

use App\Models\Project;
use App\Models\Resource;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/tags', function () {
    return Tag::join('project_tag', 'project_tag.tag_id', '=', 'tags.id')
        ->distinct()
        ->get(['tags.id', 'tags.name']);
});

Route::get('/projects', function (Request $request) {
    $request->validate(['tag_id' => 'integer|exists:tags,id|nullable']);
    $query = Project::leftJoin('companies', 'companies.id', '=', 'projects.company_id');

    if (isset($request['tag_id']))
    {
        $query->join('project_tag', 'project_tag.project_id', '=', 'projects.id')
            ->join('tags', 'tags.id', '=', 'project_tag.tag_id')
            ->where('tags.id', '=', $request['tag_id']);
    }

    $projects = $query->orderByDesc('projects.started_at')
        ->get([
            'projects.id',
            'projects.name',
            'companies.name AS company_name',
            'projects.role',
            'projects.duration',
            'projects.github_url',
            'projects.live_url',
            'projects.description'
        ]);

    foreach ($projects as &$project)
    {
        $project->tags = array_column($project->tags()->get(['name'])->toArray(), 'name');
        $project->resources = Resource::where('project_id', '=', $project->id)->get(['name', 'url', 'is_video']);
    }

    return $projects;
});
