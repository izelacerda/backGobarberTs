"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _beeQueue = _interopRequireDefault(require("bee-queue"));

var _CadastroOrderMail = _interopRequireDefault(require("../app/jobs/CadastroOrderMail"));

var _CancelOrderMail = _interopRequireDefault(require("../app/jobs/CancelOrderMail"));

var _cache = _interopRequireDefault(require("../config/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jobs = [_CadastroOrderMail.default, _CancelOrderMail.default];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({
      key,
      handle
    }) => {
      this.queues[key] = {
        bee: new _beeQueue.default(key, {
          redis: _cache.default
        }),
        handle
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const {
        bee,
        handle
      } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }

}

var _default = new Queue();

exports.default = _default;