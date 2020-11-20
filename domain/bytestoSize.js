'use strict';

const SIZE = ['', ' Kb', ' Mb', ' Gb'];

const bytesToSize = bytes => {
  if (bytes === 0) return '0';
  const exp = Math.floor(Math.log(bytes) / Math.log(1000));
  const size = bytes / 1000 ** exp;
  const short = Math.round(size, 2);
  const unit = SIZE[exp];
  return short + unit;
};

module.exports = { bytesToSize };
