async () => {
  const loadavg = libs.os.loadavg();
  const stats = app.stats.getStatistics();
  const { rss, heapTotal, heapUsed, external, contexts } = stats;
  const rss = app.bytestoSize.bytesToSize(rss);
  const total = app.bytestoSize.bytesToSize(heapTotal);
  const used = app.bytestoSize.bytesToSize(heapUsed);
  const ext = app.bytestoSize.bytesToSize(external);
  return { rss, total, used, ext, contexts, loadavg };
};
