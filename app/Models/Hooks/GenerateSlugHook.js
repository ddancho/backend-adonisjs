"use strict";

const slugify = require("slugify");
const { v4: uuidv4 } = require("uuid");

const GenerateSlugHook = (exports = module.exports = {});

GenerateSlugHook.create = (table) => {
  const slug = table.title + "-" + uuidv4();
  table.slug = slugify(slug, {
    lower: true,
    strict: true,
  });
};
