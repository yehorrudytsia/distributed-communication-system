'use strict';

const EventEmitter = function() {
  this.events = {};
};

EventEmitter.prototype.on = function(name, fn) {
  const event = this.events[name];
  if (event) event.push(fn);
  else this.events[name] = [fn];
};

EventEmitter.prototype.emit = function(name, ...data) {
  const event = this.events[name];
  if (!event) return;
  for (const listener of event) listener(...data);
};

const eventEmitter = new EventEmitter();

eventEmitter.on('blaow', data => {
  console.dir(data);
});

eventEmitter.emit('blaow', { snap: 'back' });
