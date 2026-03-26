<?php

namespace App\Services;

use App\Models\Site;
use App\Repositories\SiteRepository;

class SiteService
{
    public function __construct(
        protected SiteRepository $siteRepository
    ){}

    public function getAllSites() {
        return $this->siteRepository->all();
    }

    public function createSite(array $data) {
        return $this->siteRepository->create($data);
    }

    public function updateSite(Site $site, array $data) {
        return $this->siteRepository->update($site, $data);
    }

    public function deleteSite(Site $site) {
        return $this->siteRepository->delete($site);
    }
}
