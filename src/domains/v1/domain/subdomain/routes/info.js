const { InfoController: Controller } = require('../controllers');
const { InfoMemoryRepository: Repository } = require('../repositories');
const { InfoService: Service } = require('../services');
const authorization = require('../../../../../app/authorization');

const repository = new Repository();
const service = new Service(repository);
const controller = new Controller(service);

const prefix = 'info';

exports.loadIn = function loadIn(router) {
  router.get('/', (req, res, next) => controller.get(req, res, next));
  router.get('/:id',
    (req, res, next) => authorization({
      domain: 'domain',
      subdomain: 'subdomain',
      grants: req.token.grants,
    })(req, res, next),
    (req, res, next) => controller.getById(req, res, next));
  router.del('/:id', (req, res, next) => controller.del(req, res, next));

  return prefix;
};
