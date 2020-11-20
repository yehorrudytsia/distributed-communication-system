'use strict';

const v8 = require('v8');

const getStatistics = () => {
  const { heapTotal, heapUsed, external } = process.memoryUsage();
  const heapStat= v8.getHeapStatistics();
  const contexts = heapStat.number_of_native_contexts;
  const detached = heapStat.number_of_detached_contexts;
  return { heapTotal, heapUsed, external, contexts, detached };
};

module.exports = { getStatistics };
