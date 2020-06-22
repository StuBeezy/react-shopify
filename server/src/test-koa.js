const serve = require('koa-static');
const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');

const app = new Koa();
const router = new Router();

// router.get('/(.*)', async (ctx, next) => {
//     await send(ctx, '/Users/sbarron/react-shopify-app/client/dist/index.html');
// });

app.use(serve('/Users/sbarron/react-shopify-app/client/dist'));
//
// app.use(router.routes());
//
// // app.use(async (ctx, next) => {
// //     await send(ctx, '/Users/sbarron/react-shopify-app/client/dist/index.html')
// // });
// app.use( function *(ctx){
//     // this.body = 'Invalid URL!!!';
//     // await send(ctx, '/Users/sbarron/react-shopify-app/client/dist/index.html')
//     // or redirect etc
//     this.redirect('/');
// });

app.use(async (ctx, next) => {
    await serve('/Users/sbarron/react-shopify-app/client/dist/')(
        Object.assign(ctx, { path: 'index.html'}),
        next
    )
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`)
});
