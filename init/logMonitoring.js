'use strict';

const startMonitoring = app => {
  const config = app.config.units.monitoring;
  setInterval(() => {
    const stats = app.stats.getStatistics();
    const { rss, heapTotal, heapUsed, external, contexts, detached } = stats;
    const resident = app.bytestoSize.bytesToSize(rss);
    const total = app.bytestoSize.bytesToSize(heapTotal);
    const used = app.bytestoSize.bytesToSize(heapUsed);
    const ext = app.bytestoSize.bytesToSize(external);
    console.log(`Rss: used ${resident}`);
    console.log(`Heap: used ${used} of ${total}, external: ${ext}`);
    console.log(`Contexts: ${contexts}, detached: ${detached}`);
  }, config.interval);
};

module.exports = startMonitoring;
