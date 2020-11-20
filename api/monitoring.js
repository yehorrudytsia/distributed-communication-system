async () => {
  const loadavg = libs.os.loadavg();
  const stats = app.stats.getStatistics();
  const { rss, heapTotal, heapUsed, external, contexts } = stats;
  const resident = app.bytestoSize.bytesToSize(rss);
  const total = app.bytestoSize.bytesToSize(heapTotal);
  const used = app.bytestoSize.bytesToSize(heapUsed);
  const ext = app.bytestoSize.bytesToSize(external);
  return { resident, total, used, ext, contexts, loadavg };
};
