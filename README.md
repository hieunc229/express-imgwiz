<img src="imgwiz.svg" height="140"/>

# express-imgwiz

Format, resize images on-the-fly for `expressjs`. `express-imgwiz` use `sharp` underneat. It comes as both [middleware](#use-as-a-middleware-serve-static-files) and [request handler](#use-as-a-handler-serve-photos-from-urls).

Tips: Use with a CDN service to not re-generate image every time a request comes in. Remember to set cache TTL for a long period. If you are using Cloudflare, set the option to cache everything.

Example: [resized image url](https://wiz.saltar.co/photos/?url=https://i.imgur.com/MBDUWNw.jpg&sharpen=true&fm=png&h=100)

![resized image](https://wiz.saltar.co/photos/?url=https://i.imgur.com/MBDUWNw.jpg&sharpen=true&fm=png&h=100)


# 1. Installation

`express-imgwiz` is available as a npm package. You can install via `npm` or `yarn` as normal

```ssh
// install using npm
$ npm install express-imgwiz

// install using yarn
$ yarn add express-imgwiz
```

# 2. How to use

You can use `express-imgwiz` as either a middleware or a handler. Note that they took the same arguments, but there is a `/:path` param when using as `handler`.

- Arguments:
    - `staticDir` (string, required): your static image directory 
    - `cacheDir` (string): save generated file on disk into the given directory

### 2.1. Example using as middleware

```js

// For ES6 syntax
import { imgWizMiddleware } from "express-imgwiz";
import path from "path";

// Or vanila nodejs syntax
const { imgWizMiddleware } = require("express-imgwiz");
const path = require("path")

app.use("/photos", imgWizMiddleware({ 
    staticDir: path.join(__dirname, "static"), // comment out to disable serving static files
    cacheDir: path.join(__dirname, "cached") // comment out to disable local caching
}))
```

### 2.2. Example using as handler

```js

// For ES6 syntax
import { imgWizHandler } from "express-imgwiz";
import path from "path";

// Or vanila nodejs syntax
const { imgWizHandler } = require("express-imgwiz");
const path = require("path")

app.get("/photos/:path", imgWizHandler({ 
    staticDir: path.join(__dirname, "static"), // comment out to disable serving static files
    cacheDir: path.join(__dirname, "cached") // comment out to disable local caching
}))
```

### 2.3. Available transform options:

```js
- `h` (number): resize height (h=460)
- `w` (number): resize width (w=640)
- `q` (number): quality (q=80)
- `fit` ("cover" | "contain" | "fill" | "inside" | "outside"): resize fit
- `position` ("top" | "right top" | "right" | "right bottom" | "bottom" | "bottom left" | "left top"): resize position
- `background`: (string): background colour when using a `fit=contain` (background=blue, background=#ffffff, background=(139,195,74,0.4))

- `sharpen` ("true" | "sigma ?, flat (1), jagged (2)"): sharpen target image (sharpen=true, [view more about sharpen](https://sharp.pixelplumbing.com/en/stable/api-operation/#sharpen))
- `fm` ("webp" | "jpg" | "jpeg" | "tiff" | "png"): format target image
- `kernel` ("nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3"): image kernel option
- `enlarge` ("true" | "false"): enlarge image if given size is bigger than actual size
- `blur` ("true" or number (0.1 - 1000)): blur image
- `url` (string, optional): the target photo URL. If no `url` is specify, the library will look up on `staticDir` if enabled. Note: Use `encodeURIComponent` if `url` has query, otherwise it will fail. For example: `encodeURIComponent("https://host.com/photo.png?quey=value")`
```

```js
Example URL using transform queries

// Serving a static file image: 
// https://yourdomain.com/photos/image-file.png&fm=png&q=80&sharpen=true

// Get image from a URL: 
// https://yourdomain.com/photos/?url=https://imagehost.com/image-file.png&fm=png&q=80&sharpen=true
```

### 2.4. Enviroment Variables

- `process.env.EXPRESS_WIZ_CACHE_AGE` (number): Set caching age in seconds (default `31557600`)
- `process.env.EXPRESS_WIZ_404_IMAGE` (string): Set a path to 404 error image (default `undefined`). _Note: Path is relative to the root directory, and only `png`,`jpeg` or `jpg` image is accepted to avoid unnecessary minetype checking_

# 3. Changelog

- v0.1.3: added error handlers and `EXPRESS_WIZ_404_IMAGE` to display a default image 
- v0.1.2: combine codes into a `handleRequest`, update getting `mine` method, clean up code
- v0.1.1: add file extension when it doesn't included in url
- v0.1.0: fix serving staticc `svg` file
- v0.0.9: fix serving local `svg` file, clean up codes
- v0.0.8: fix `.svg` image error, added `background` option (thanks to @TheAndroidGuy)
- v0.0.6-0.0.7: code improvement
- v0.0.5: added local cache
- v0.0.4: update server response status code
- v0.0.3: added local cache
- v0.0.1-v0.0.2: intiate project

Feel free to ask or give feedback. Thank you!