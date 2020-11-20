'use strict';

const v8 = require('v8');

const getStatistics = () => {
  const { rss, heapTotal, heapUsed, external } = process.memoryUsage();
  const heapStat= v8.getHeapStatistics();
  const contexts = heapStat.number_of_native_contexts;
  const detached = heapStat.number_of_detached_contexts;
  return { rss, heapTotal, heapUsed, external, contexts, detached };
};

module.exports = { getStatistics };
