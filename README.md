# [T0mFuchs/nextjs-demo](https://github.com/T0mFuchs/nextjs-demo) `with docker`

## `Last build log`

```
Route (pages)                                            Size     First Load JS
┌ ○ /                                                    2.27 kB        62.7 kB
├   /_app                                                0 B            55.9 kB
├ λ /[user]/entry/[title]                                1.62 kB        62.1 kB
├   └ css/e343da1735bbc06f.css                           413 B
├ ○ /[user]/verify-email                                 1.56 kB          62 kB
├ ○ /404                                                 859 B          56.7 kB
├ ○ /500                                                 859 B          56.7 kB
├ ○ /about                                               4.67 kB        60.6 kB
├   └ css/f9f4ef44a26c3b4c.css                           375 B
├ λ /api/[user]/entries                                  0 B            55.9 kB
├ λ /api/[user]/entries/[sort_key]/[sort_value]          0 B            55.9 kB
├ λ /api/[user]/entry/[title]                            0 B            55.9 kB
├ λ /api/[user]/nodemailer/new-user                      0 B            55.9 kB
├ λ /api/[user]/nodemailer/verification-success          0 B            55.9 kB
├ λ /api/[user]/verify-email                             0 B            55.9 kB
├ λ /api/auth/[...nextauth]                              0 B            55.9 kB
├ λ /api/entries                                         0 B            55.9 kB
├ λ /api/entries/[skip]/[limit]/[sort_key]/[sort_value]  0 B            55.9 kB
├ λ /api/entry/[title]                                   0 B            55.9 kB
├ λ /api/entry/createOne                                 0 B            55.9 kB
├ λ /api/entry/deleteOne                                 0 B            55.9 kB
├ λ /api/entry/updateOne                                 0 B            55.9 kB
├ λ /api/user/with-session                               0 B            55.9 kB
├ ○ /auth/error                                          859 B          56.7 kB
├ ○ /auth/new-user                                       1.61 kB        62.1 kB
├ ○ /auth/signin                                         2.9 kB         58.8 kB
├ ○ /entries                                             3.36 kB        63.8 kB
├   └ css/70d7c8d3c1c153d8.css                           811 B
└ λ /entry/[title]                                       1.67 kB        62.1 kB
    └ css/7cf2f1d7293cd875.css                           386 B
+ First Load JS shared by all                            57.2 kB
  ├ chunks/main-44250e5275139e19.js                      36.1 kB
  ├ chunks/pages/_app-8f831e3260a395d4.js                17.2 kB
  ├ chunks/webpack-c44dbf5f6b47af52.js                   2.62 kB
  └ css/d8e576cb4b83ef1c.css                             1.35 kB

λ  (Server)  server-side renders at runtime (uses getInitialProps or getServerSideProps) 
○  (Static)  automatically rendered as static HTML (uses no initial props)
```
