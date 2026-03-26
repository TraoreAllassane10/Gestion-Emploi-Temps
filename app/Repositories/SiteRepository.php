<?php

namespace App\Repositories;

use App\Models\Site;

class SiteRepository
{
    public function all()
    {
        return Site::latest()->get();
    }

    public function create(array $data)
    {
        return Site::create($data);
    }

    public function update(Site $site, array $data)
    {
        return $site->update($data);
    }

    public function delete(Site $site)
    {
        return $site->delete();
    }
}
