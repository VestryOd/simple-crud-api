import Router from "./Router";
const router = new Router();

router.get('/person', (req) => {
  console.log('--person get', req);
});

export default router;
