"use strict";

const TransformFilterHook = (exports = module.exports = {});

TransformFilterHook.formatResponse = (modelInstance, paginationMetadata) => {
  const { total, perPage, lastPage } = paginationMetadata;

  delete paginationMetadata.total;
  delete paginationMetadata.lastPage;
  delete paginationMetadata.perPage;
  delete paginationMetadata.page;

  paginationMetadata.totalRecords = total;
  paginationMetadata.totalPages = lastPage;
  paginationMetadata.pageSize = perPage;
};
