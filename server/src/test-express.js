require('isomorphic-fetch');
const dotenv = require('dotenv');
const express = require('express');
const ShopifyAuth = require('express-shopify-auth');
const session = require('express-session');

dotenv.config();

const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET_KEY} = process.env;

const app = express();

// const server = new koa();
// server.use(session({ secure: true, sameSite: 'none'}, server));
// server.keys = [SHOPIFY_API_SECRET_KEY];
// server.use(
//     createShopifyAuth({
//         apiKey: SHOPIFY_API_KEY,
//         secret: SHOPIFY_API_SECRET_KEY,
//         scopes: ['read_products'],
//         afterAuth(ctx) {
//             const{ shop, accessToken } = ctx.session;
//             ctx.cookies.set('shopOrigin', shop, {
//                 httpOnly: false,
//                 secure: true,
//                 sameSite: 'none'
//             });
//             ctx.redirect('/');
//         }
//     })
// );
// server.use(verifyRequest());
// server.use(async (ctx) => {
//     await handle(ctx.req, ctx.res);
//     ctx.respond = false;
//     ctx.res.statusCode = 200;
//     return
// });
// server.listen(port, () => {
//     console.log(`> Ready on http://localhost:${port}`)
// });

app.use(session({ secret: 'keyboard cat', cookie: { secure: true, sameSite: 'none'}}));

const auth = ShopifyAuth.create({
    appKey: process.env.SHOPIFY_API_KEY,
    appSecret: process.env.SHOPIFY_API_SECRET_KEY,
    // baseUrl: 'http://localhost:8000',
    // authPath: '/auth',
    // authCallbackPath: '/auth/callback',
    // authSuccessUrl: '/success',
    // authFailUrl: '/fail',
    scope: ['read_products'],
    // shop: function (req, done) {
    //     return done(null, req.query.shop);
    // },
    onAuth: function (req, res, shop, accessToken, done) {
        // save auth info to session
        req.session.shopify = { shop: shop, accessToken: accessToken };
        return done();
    },
    afterAuth: (req, accessToken, profile, done) => {
        req.redirect("/");
    }
});

app.use(express.static('/Users/sbarron/react-shopify-app/client/dist'));

app.use(auth);


app.get('*', (req,res) =>{
    // res.sendFile(path.join(__dirname+'/client/dist/index.html'));
    res.sendFile('/Users/sbarron/react-shopify-app/client/dist/index.html')
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});