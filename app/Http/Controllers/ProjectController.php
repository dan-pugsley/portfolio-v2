<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    public function list(Request $request)
    {
        $request->validate([
            'tag_id' => 'integer|exists:tags,id|nullable',
            'page' => 'integer|min:0|nullable',
        ]);

        $query = Project::leftJoin('companies', 'companies.id', '=', 'projects.company_id');
    
        if (isset($request['tag_id']))
        {
            $query->join('project_tag', 'project_tag.project_id', '=', 'projects.id')
                ->join('tags', 'tags.id', '=', 'project_tag.tag_id')
                ->where('tags.id', '=', $request['tag_id']);
        }
    
        $pageIndex = $request['page'] ?? 0;
        $pageSize = config('constants.exp.pageSize');
        
        $projects = $query
            ->orderBy(DB::raw('ISNULL(companies.id)'))
            ->orderByDesc(DB::raw('ISNULL(projects.ended_at)'))
            ->orderByDesc('projects.ended_at')
            ->orderByDesc('projects.started_at')
            ->skip($pageIndex * $pageSize)
            ->take($pageSize)
            ->get([
                'projects.id',
                'projects.name',
                'companies.name AS company_name',
                'projects.role',
                DB::raw('DATEDIFF(IFNULL(ended_at, NOW()), started_at) AS days'),
                'projects.github_url',
                'projects.live_url',
                'projects.description_html'
            ]);
    
        foreach ($projects as &$project)
        {
            $project->tags = array_column($project->tags()->get(['name'])->toArray(), 'name');
            $project->resources = Resource::where('project_id', '=', $project->id)->get(['id', 'name', 'url', 'url_2x', 'url_max', 'is_yt_embed']);

            foreach ($project->resources as &$resource)
            {
                $resource->url = $this->prepareResourceUrl($resource->url);
                $resource->url_2x = $this->prepareResourceUrl($resource->url_2x);
                $resource->url_max = $this->prepareResourceUrl($resource->url_max);
            }
        }
    
        return $projects;
    }

    private function prepareResourceUrl($value)
    {
        // If the URL is a local path, convert it to asset URL.
        return $value && stream_is_local($value) ? asset($value) : $value;
    }
}
