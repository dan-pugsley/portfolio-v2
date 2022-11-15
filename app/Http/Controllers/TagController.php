<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function list(Request $request)
    {
        return Tag::join('project_tag', 'project_tag.tag_id', '=', 'tags.id')
                ->join('projects', 'projects.id', '=', 'project_tag.project_id')
                ->where('projects.is_hidden', '=', 0)
                ->distinct()
                ->orderBy('tags.name')
                ->get(['tags.id', 'tags.name']);
    }
}
