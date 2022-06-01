<?php

namespace App\Http\Controllers;

use App\Models\Tag;

class TagController extends Controller
{
    public function list()
    {
        return Tag::join('project_tag', 'project_tag.tag_id', '=', 'tags.id')
                ->distinct()
                ->get(['tags.id', 'tags.name']);
    }
}
